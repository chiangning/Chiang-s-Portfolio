export const injectSpatialMetadata = async (
  fileContent: ArrayBuffer
): Promise<ArrayBuffer> => {
  const SPHERICAL_XML = `<?xml version="1.0"?><rdf:SphericalVideo xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:GSpherical="http://ns.google.com/videos/1.0/spherical/"><GSpherical:Spherical>true</GSpherical:Spherical><GSpherical:Stitched>true</GSpherical:Stitched><GSpherical:StitchingSoftware>SpatialInjector</GSpherical:StitchingSoftware><GSpherical:ProjectionType>equirectangular</GSpherical:ProjectionType></rdf:SphericalVideo>`;

  // The UUID for spatial metadata (ffcc8263-f855-4a93-8814-587a02521fdd)
  const uuidHex = "ffcc8263f8554a938814587a02521fdd";
  const uuidBytes = new Uint8Array(
    uuidHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );

  const encoder = new TextEncoder();
  const xmlBytes = encoder.encode(SPHERICAL_XML);

  const uuidBoxSize = 4 + 4 + 16 + xmlBytes.length; // size(4) + type(4) + uuid(16) + data
  const uuidBox = new Uint8Array(uuidBoxSize);
  const uuidView = new DataView(uuidBox.buffer);

  uuidView.setUint32(0, uuidBoxSize, false);
  // 'uuid' ascii
  uuidBox.set([0x75, 0x75, 0x69, 0x64], 4);
  uuidBox.set(uuidBytes, 8);
  uuidBox.set(xmlBytes, 24);

  const view = new DataView(fileContent);
  let offset = 0;
  let moovOffset = -1;
  let moovSize = 0;

  // Find moov box
  while (offset < view.byteLength) {
    const size = view.getUint32(offset, false);
    const type = String.fromCharCode(
      view.getUint8(offset + 4),
      view.getUint8(offset + 5),
      view.getUint8(offset + 6),
      view.getUint8(offset + 7)
    );

    if (type === "moov") {
      moovOffset = offset;
      moovSize = size === 1 ? Number(view.getBigUint64(offset + 8, false)) : size;
      break;
    }

    if (size === 1) {
      // 64-bit size
      const bigSize = view.getBigUint64(offset + 8, false);
      offset += Number(bigSize);
    } else if (size === 0) {
      break; // till end of file
    } else {
      offset += size;
    }
  }

  if (moovOffset === -1) {
    throw new Error("Could not find moov box in MP4 structure");
  }

  // Determine injection point: at the end of the moov box
  const injectionPoint = moovOffset + moovSize;

  // Re-build buffer
  const outBuffer = new ArrayBuffer(fileContent.byteLength + uuidBoxSize);
  const outView = new DataView(outBuffer);
  const outBytes = new Uint8Array(outBuffer);
  const inBytes = new Uint8Array(fileContent);

  // Copy everything before injection point
  outBytes.set(inBytes.subarray(0, injectionPoint), 0);
  // Copy new uuid box
  outBytes.set(uuidBox, injectionPoint);
  // Copy everything after injection point
  outBytes.set(inBytes.subarray(injectionPoint), injectionPoint + uuidBoxSize);

  // Update moov size
  if (view.getUint32(moovOffset, false) === 1) {
    outView.setBigUint64(moovOffset + 8, BigInt(moovSize + uuidBoxSize), false);
  } else {
    outView.setUint32(moovOffset, moovSize + uuidBoxSize, false);
  }

  // Now parse the modified outBuffer's moov box to find stco/co64 to correct chunk offsets
  const containers = ["moov", "trak", "mdia", "minf", "stbl"];

  function walk(boxOffset: number, endOffset: number) {
    let curr = boxOffset;
    while (curr < endOffset) {
      const bSize = outView.getUint32(curr, false);
      const bType = String.fromCharCode(
        outView.getUint8(curr + 4),
        outView.getUint8(curr + 5),
        outView.getUint8(curr + 6),
        outView.getUint8(curr + 7)
      );

      let headerSize = 8;
      let actualSize = bSize;

      if (bSize === 1) {
        actualSize = Number(outView.getBigUint64(curr + 8, false));
        headerSize = 16;
      } else if (bSize === 0) {
        break; // safety to prevent infinite loop inside moov
      }

      if (containers.includes(bType)) {
        walk(curr + headerSize, curr + actualSize);
      } else if (bType === "stco") {
        updateStco(curr + headerSize, curr + actualSize);
      } else if (bType === "co64") {
        updateCo64(curr + headerSize, curr + actualSize);
      }

      curr += actualSize;
    }
  }

  function updateStco(dataOffset: number, _end: number) {
    // version and flags (4 bytes)
    const entryCount = outView.getUint32(dataOffset + 4, false);
    let chunkOffsetPos = dataOffset + 8;
    for (let i = 0; i < entryCount; i++) {
      const val = outView.getUint32(chunkOffsetPos, false);
      if (val >= injectionPoint) {
        outView.setUint32(chunkOffsetPos, val + uuidBoxSize, false);
      }
      chunkOffsetPos += 4;
    }
  }

  function updateCo64(dataOffset: number, _end: number) {
    // version and flags (4 bytes)
    const entryCount = outView.getUint32(dataOffset + 4, false);
    let chunkOffsetPos = dataOffset + 8;
    for (let i = 0; i < entryCount; i++) {
      const val = Number(outView.getBigUint64(chunkOffsetPos, false));
      if (val >= injectionPoint) {
        outView.setBigUint64(chunkOffsetPos, BigInt(val + uuidBoxSize), false);
      }
      chunkOffsetPos += 8;
    }
  }

  // Walk inside the new moov box to update offsets
  // Note: we can parse just the `moov` box safely
  walk(moovOffset + 8, moovOffset + moovSize + uuidBoxSize);

  return outBuffer;
};
