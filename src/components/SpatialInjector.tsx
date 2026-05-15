"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { injectSpatialMetadata } from "@/lib/mp4-injector";
import { UploadCloud, FileVideo, Download, Loader2, FastForward, Settings2, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useVideoTexture, useTexture } from "@react-three/drei";
import * as THREE from "three";

type Step = "UPLOAD" | "DOWNLOADING_SAMPLE" | "PROCESSING" | "PREVIEW";

const ImageSphere = ({ url }: { url: string }) => {
  const texture = useTexture(url);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

const SphereCameraController = ({ panSpeed }: { panSpeed: number }) => {
  const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false });
  const cameraPositionRef = useRef({ radius: 0.1, phi: Math.PI / 2, theta: 0 });
  const mouseRef = useRef({ isDragging: false, x: 0, y: 0 });
  const fovRef = useRef(75);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (keys.hasOwnProperty(key)) setKeys((k) => ({ ...k, [key]: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (keys.hasOwnProperty(key)) setKeys((k) => ({ ...k, [key]: false }));
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseRef.current.isDragging) return;
      const deltaX = e.clientX - mouseRef.current.x;
      const deltaY = e.clientY - mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      cameraPositionRef.current.theta += deltaX * 0.005 * panSpeed;
      cameraPositionRef.current.phi += deltaY * 0.005 * panSpeed;
    };

    const handleWheel = (e: WheelEvent) => {
      fovRef.current += e.deltaY * 0.05;
      fovRef.current = Math.max(10, Math.min(120, fovRef.current));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel, { passive: true });
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [keys, panSpeed]);

  useFrame((state, delta) => {
    let upDown = 0;
    let leftRight = 0;

    if (keys.w) upDown -= 1; // W looks up
    if (keys.s) upDown += 1; // S looks down
    if (keys.a) leftRight += 1; // A looks left
    if (keys.d) leftRight -= 1; // D looks right

    if (upDown !== 0 || leftRight !== 0) {
      cameraPositionRef.current.theta += leftRight * delta * panSpeed;
      cameraPositionRef.current.phi += upDown * delta * panSpeed;
    }

    // Clamp phi to avoid flipping
    cameraPositionRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraPositionRef.current.phi));

    // Camera stays at center
    state.camera.position.set(0, 0, 0);
    
    // Update FOV if camera is a PerspectiveCamera
    if ((state.camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
      const camera = state.camera as THREE.PerspectiveCamera;
      if (camera.fov !== fovRef.current) {
        camera.fov = fovRef.current;
        camera.updateProjectionMatrix();
      }
    }

    // Calculate target to look at based on spherical coords
    const r = 1;
    const phi = cameraPositionRef.current.phi;
    const theta = cameraPositionRef.current.theta;

    const targetX = r * Math.sin(phi) * Math.sin(theta);
    const targetY = r * Math.cos(phi);
    const targetZ = r * Math.sin(phi) * Math.cos(theta);

    state.camera.lookAt(targetX, targetY, targetZ);
  });

  return null;
};

const VideoSphere = ({ url, playbackSpeed, muted }: { url: string; playbackSpeed: number; muted: boolean }) => {
  const texture = useVideoTexture(url, { crossOrigin: "Anonymous", loop: true, muted: muted });

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      if (texture.image) {
        const video = texture.image;
        video.playbackRate = playbackSpeed;
        video.muted = muted;
      }
    }
  }, [texture, playbackSpeed, muted]);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export const SpatialInjector = () => {
  const [step, setStep] = useState<Step>("UPLOAD");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number, type: "video" | "image" } | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [panSpeed, setPanSpeed] = useState(1.5);
  const [muted, setMuted] = useState(true);

  const sampleLoadedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("sample=true") && !sampleLoadedRef.current) {
      sampleLoadedRef.current = true;
      loadSample();
    }
  }, []);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "video/mp4" || file.type.startsWith("image/"))) {
      processFile(file);
    } else {
      alert("Please upload a valid MP4 video or an image.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "video/mp4" || file.type.startsWith("image/"))) {
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    const isImage = file.type.startsWith("image/");
    setFileInfo({ name: file.name, size: file.size, type: isImage ? "image" : "video" });
    setStep("PROCESSING");

    try {
      if (isImage) {
        // Just display the image, no injection
        const blob = new Blob([await file.arrayBuffer()], { type: file.type });
        const url = URL.createObjectURL(blob);
        setProcessedBlob(blob);
        setFileUrl(url);
        setStep("PREVIEW");
        return;
      }

      const arrayBuffer = await file.arrayBuffer();
      // Use setTimeout to allow UI to render spinner before heavy blocking task
      setTimeout(async () => {
        try {
          const processedBuffer = await injectSpatialMetadata(arrayBuffer);
          const blob = new Blob([processedBuffer], { type: "video/mp4" });
          const url = URL.createObjectURL(blob);
          setProcessedBlob(blob);
          setFileUrl(url);
          setStep("PREVIEW");
        } catch (error) {
          console.error(error);
          alert("Failed to process file. Ensure it is a valid MP4.");
          setStep("UPLOAD");
        }
      }, 100);
    } catch (e) {
      console.error(e);
      setStep("UPLOAD");
    }
  };

  const loadSample = async () => {
    setStep("DOWNLOADING_SAMPLE");
    setDownloadProgress(0);
    setFileInfo({ name: "P215_endless_corridor.mp4", size: 0, type: "video" });
    try {
      const response = await fetch("https://res.cloudinary.com/dphq33wah/video/upload/v1777375405/P215_endless_corridor_svhb3k.mp4");
      if (!response.body) throw new Error("No response body");
      const contentLength = response.headers.get("content-length");
      const total = parseInt(contentLength || "0", 10);
      let loaded = 0;
      
      const reader = response.body.getReader();
      const chunks = [];
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        if (total > 0) {
          setDownloadProgress(Math.round((loaded / total) * 100));
        }
      }
      
      const blob = new Blob(chunks, { type: "video/mp4" });
      const file = new File([blob], "P215_endless_corridor.mp4", { type: "video/mp4" });
      processFile(file);
    } catch (error) {
      console.error(error);
      alert("Failed to load sample video.");
      setStep("UPLOAD");
    }
  };

  const handleDownload = () => {
    if (!processedBlob || !fileInfo) return;
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileInfo.name.replace(".mp4", "_spatial.mp4");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFileUrl(null);
    setProcessedBlob(null);
    setFileInfo(null);
    setStep("UPLOAD");
    sampleLoadedRef.current = false;
    if (typeof window !== "undefined") {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("sample");
      window.history.replaceState(null, "", newUrl.toString());
    }
  };

  return (
    <div className="w-full h-screen relative bg-surface text-on-surface flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {step === "UPLOAD" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center w-full max-w-3xl p-8"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl mb-4 font-normal tracking-wide" style={{ fontFamily: 'var(--font-charter)' }}>
                SpatialInjector
              </h1>
              <p className="text-on-surface-variant text-lg font-normal tracking-wide max-w-xl mx-auto">
                Got a flat 360° video? Upload it here and we'll automatically add the necessary hidden data so it plays correctly in VR headsets and 360° players. 
                Everything happens right in your browser. (You can also drop 360° photos to view them!)
              </p>
            </div>

            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl border border-dashed border-primary/20 hover:border-primary bg-surface-high/50 backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <UploadCloud className="w-12 h-12 text-on-surface-variant group-hover:text-primary transition-colors mb-4" />
              <span className="text-lg font-medium tracking-wide">Drop your MP4 or Image here</span>
              <span className="text-sm text-on-surface-variant mt-2">or click to browse local files</span>
              <input type="file" accept="video/mp4, image/*" className="hidden" onChange={handleFileSelect} />
            </label>
            
            <a 
              href="?sample=true"
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== "undefined") {
                  const newUrl = new URL(window.location.href);
                  newUrl.searchParams.set("sample", "true");
                  window.history.replaceState(null, "", newUrl.toString());
                }
                loadSample();
              }}
              className="mt-6 text-sm flex items-center justify-center text-primary hover:text-primary/80 transition-colors font-medium border border-primary/20 hover:border-primary/50 px-6 py-2 rounded-full"
            >
              Don't have a 360° video? Try our sample
            </a>
            
            <div className="mt-12 text-on-surface-variant text-sm tracking-widest uppercase flex items-center gap-4">
              <span className="h-[1px] w-12 bg-surface-high" />
              Local Processing Only
              <span className="h-[1px] w-12 bg-surface-high" />
            </div>
          </motion.div>
        )}

        {(step === "PROCESSING" || step === "DOWNLOADING_SAMPLE") && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-24 h-24 mb-8 relative flex items-center justify-center">
              <Loader2 className="w-16 h-16 text-primary animate-spin absolute" />
              <div className="w-8 h-8 rounded-full bg-primary/20" />
            </div>
            <h2 className="text-2xl text-on-surface tracking-wide mb-2" style={{ fontFamily: 'var(--font-charter)' }}>
              {step === "DOWNLOADING_SAMPLE" ? `Downloading Sample (${downloadProgress}%)...` : fileInfo?.type === "image" ? "Loading Image..." : "Injecting Metadata..."}
            </h2>
            <p className="text-on-surface-variant font-mono text-sm">{fileInfo?.name}</p>
          </motion.div>
        )}

        {step === "PREVIEW" && fileUrl && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 z-0 cursor-move">
              <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
                <SphereCameraController panSpeed={panSpeed} />
                <Suspense fallback={null}>
                  {fileInfo?.type === "image" ? (
                    <ImageSphere url={fileUrl} />
                  ) : (
                    <VideoSphere url={fileUrl} playbackSpeed={playbackSpeed} muted={muted} />
                  )}
                </Suspense>
              </Canvas>
            </div>

            {/* Overlays / Interface */}
            <div className="absolute pointer-events-none inset-0 flex flex-col justify-between p-6 z-10 w-full h-full">
              <div className="flex justify-between items-end gap-4 pointer-events-auto mt-auto ml-auto w-full max-w-6xl">
                {/* Minimal Engine Controls */}
                <div className="bg-surface-low/90 backdrop-blur-md border border-white/5 p-3 rounded-2xl flex items-center gap-4 shadow-lg">
                  <div className="flex items-center gap-2 group">
                    <Settings2 className="w-4 h-4 text-on-surface-variant" />
                    <input
                      type="range"
                      min="0.5"
                      max="5"
                      step="0.1"
                      value={panSpeed}
                      onChange={(e) => setPanSpeed(Number(e.target.value))}
                      className="w-16 accent-primary opacity-50 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  
                  {fileInfo?.type === "video" && (
                    <>
                      <div className="w-[1px] h-4 bg-white/10" />

                      <button 
                        onClick={() => setMuted(!muted)}
                        className={`p-1.5 rounded-md transition-colors ${!muted ? 'bg-primary/20 text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
                        {!muted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      </button>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-3 ml-auto">
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2 bg-surface-low/90 backdrop-blur-md border border-white/5 hover:bg-surface-high text-sm text-on-surface rounded-full transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  {fileInfo?.type === "video" && (
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-[#d4b57b] text-sm text-surface shadow-[0_0_15px_rgba(239,188,152,0.3)] rounded-full transition-all font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download 360° MP4
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
