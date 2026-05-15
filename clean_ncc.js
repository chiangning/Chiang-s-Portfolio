const fs = require('fs');

let content = `
# NCC 2025 changes architects and project managers can use today

**If your code strategy waits until permit stage, NCC 2025 will charge interest.**

## Executive summary

NCC 2025 is not a broad three-year rewrite. It is a **targeted** code cycle aimed at the areas regulators thought were hardest to defend: water ingress, carpark fire safety, commercial operational energy, condensation, and selected safety and amenity clarifications. Building Ministers also explicitly decided that **no further residential energy-efficiency uplift** and **no new EV-charging provisions** would be introduced in NCC 2025, while confirming stronger commercial energy reforms including **mandatory on-site solar PV**. citeturn0search0turn16view0turn20search0

For architects and PMs, the immediate practical point is simple: **commercial, mixed-use and apartment-adjacent work gets more front-loaded**. The most tangible items to act on now are: assume **more sprinklered mixed-use/open-deck carparks**; redesign **balconies, podiums and concrete roofs** around explicit falls, drainage and substrate rules; treat **Section J** as a concept-stage design driver, not a late consultant report; update **ventilation/condensation details**; and tighten your **evidence-of-suitability and standards-version control**. citeturn5view0turn6view0turn3search0

The code remains performance-based, but several pathways are now less permissive or more evidence-heavy. Structural Performance Solutions now require quantified reliability indices and tighter Deemed-to-Satisfy equivalence; fire-hazard and combustibility testing is more explicitly tied to accredited testing; and official guidance stresses that permit, occupancy and project records should identify the exact referenced-document edition and publication date used. In practice, that means fewer defensible late substitutions and more need for early consultant coordination. citeturn5view0turn3search0turn17view0

Jurisdictional rollout is fragmented. As at 8 May 2026, entity["state","Victoria","Australia"] has adopted NCC 2025, the entity["state","Australian Capital Territory","Australia"] has a dual-code year, entity["state","New South Wales","Australia"], entity["state","Queensland","Australia"] and entity["state","South Australia","Australia"] have deferred building-code adoption to 1 May 2027, entity["state","Tasmania","Australia"] has adopted with major variations, entity["state","Western Australia","Australia"] has published 2026 state bulletins and confirmed selected commencements, and the entity["state","Northern Territory","Australia"] has declared NCC 2025 does not apply until the next NCC edition. For national practices, version-control risk is now a first-order delivery issue. citeturn16view0turn9view0turn12view0turn10search0turn10search3turn13search1turn15view0turn15view1turn14search2

This report assumes **no specific project type**. The most acute impacts are on commercial, apartment and mixed-use projects, especially podium carparks, exposed external slabs, façade packages, and projects relying on late Performance Solutions. citeturn0search0turn5view0turn6view0

## The immediate-use changes that matter

The table below isolates the NCC 2025 items that are most tangible in live projects now, with the clause numbers that are available from official regulator summaries.

| Area | NCC 2022 baseline | NCC 2025 shift | Immediate task | Key clauses / evidence |
|---|---|---|---|---|
| EV charging | NCC 2022 had already made commercial EV-charging changes, but the final NCC 2025 package did **not** add a new national EV-charging mandate | Building Ministers expressly excluded new EV-charging provisions from NCC 2025; however the Section J reference-building method now **includes EV charging** in Specification 40 | Do **not** assume NCC 2025 itself mandates new charger numbers or bays. Check local planning rules, client ESG brief and network-capacity scope. If EV charging is included in the project, make sure it is reflected in Section J modelling assumptions | Treasury says EV-charging provisions “would not be introduced at this time”; BPC says Spec 40 now includes EV charging. citeturn0search0turn6view0 |
| Waterproofing / exposed external slabs | Water-management logic was more fragmented across Section F and old Part F3; structural substrate movement was easier to treat separately | Section F is restructured; old Part F3 is merged into Part F1; new DtS rules explicitly cover concrete roofs, balconies and podiums, including falls, drainage, membrane placement and set-downs; structure must also consider **10-year deflection** | Freeze threshold, falls, membrane and drainage geometry during concept or early DD. Make balcony/podium details a coordinated architect-structural-waterproofing package | **F1P1, F1V1, F1D2, F1D4, F1D5, F1D7, F1D10, F1D15, B1D2(b)**. Official summaries also identify a 1:80 substrate fall to waste, membrane on substrate, self-draining or direct-fixed finish, and 70 mm minimum set-down measured from structural substrate. citeturn5view0turn6view0 |
| Carpark fire | Open-deck carparks in multi-class buildings had broader FRL and sprinkler concessions | Open-deck carparks in multi-class buildings lose earlier concessions unless sprinkler-protected; extra sprinkler triggers apply where **car stackers** are installed or **more than 40 vehicles** are present | Treat podium/open-deck carpark fire strategy as a schematic-design issue. Re-cost hydraulics, plant space and FRL assumptions early | **S5C19, S5C22**, plus related Section E sprinkler clarifications. citeturn5view0turn6view0 |
| Section J / mandatory PV | Section J was less stringent and did not impose the same final-package PV requirement | Commercial energy rules are materially stronger, with **mandatory on-site solar PV**, stronger envelope and sealing rules, tighter verification methods and tougher HVAC/lighting settings; Class 2 is carved out and continues under NCC 2022 settings | Reserve usable roof area for PV early; lock façade, shading and HVAC assumptions earlier; do not leave Section J until late-stage consultant coordination | **J1P1, J1P4, J1V1–J1V4, J2D2, J4, J5, J6, Spec 40, Spec 46–48**. citeturn0search0turn6view0turn16view0 |
| Ventilation / IAQ / condensation | Natural ventilation and kitchen-exhaust pathways were narrower or more ambiguous; condensation controls still left practical gaps | Natural ventilation can now also be demonstrated using **AS 1668.4**; ventilation wording now applies to any occupied room or space; kitchen exhaust terminology is aligned more closely with AS 1668.1; wall cavities and roof-space ventilation are tightened for condensation control | Use AS 1668.4 where it simplifies compliance; review kitchen-exhaust schedules; redesign wall and roof build-ups, particularly in higher condensation-risk climate zones | **F6D6, F6D12, F8D3, F8D5, F8D6**; housing equivalents include **H4D7** and **10.8.1, 10.8.3, 10.8.4**. citeturn6view0turn7view0 |

## What changed in the code and proof-of-compliance

The official policy architecture matters because it explains why some anticipated reforms are absent. At the October 2025 entity["event","Building Ministers’ Meeting","October 2025 communiqué"], ministers finalised NCC 2025 around four retained packages: **water management**, **carpark fire safety**, **commercial energy efficiency including mandatory on-site PV**, and **condensation mitigation**. The same communiqué says voluntary embodied-carbon provisions would instead be published as **ABCB guidance**, and that **EV-charging provisions and residential energy-efficiency changes would not be introduced** in NCC 2025. citeturn0search0

The code-structure change with the biggest defect-prevention impact is the restructuring of Section F. Official regulator guidance says the former Part F3 has been merged into Part F1, the Performance Requirements have been consolidated into **F1P1**, the Verification Method **F3V1** is now **F1V1**, and the defined term **“Water”** broadens the logic beyond surface wetting to include ground moisture, rising damp, groundwater and related sources. That is more than editorial tidy-up; it changes how projects should package structure, thresholds, membrane sequencing, falls and drainage. citeturn5view0turn6view0

The deeper procedural shift is in **how compliance is proved**. In official BPC guidance, **A2G2(5)** removes the old structural pathway that relied on demonstrating compliance with all Performance Requirements for this specific structural issue and instead requires equivalence to the Deemed-to-Satisfy provisions; **A4G1** introduces the new Register of Alternative Referenced Documents; and explanatory material emphasises that the exact standard edition and publication date used should be recorded in building-permit documentation, occupancy documentation and relevant project records. citeturn3search0

That matters because NCC 2025 also hardens the evidence chain. Official summaries say **A5G3** sharpens Evidence of Suitability, while fire-hazard-property and combustibility pathways are tied more explicitly to accredited testing. For architects and PMs, the immediate implication is that “equivalent” product substitution is less defensible if the report set does not clearly show the right edition, test method, accreditation and scope of application. citeturn3search0turn5view0

## Tangible technical shifts by topic

### Fire safety

The most commercially significant fire change is the tightening of carpark concessions. Official regulator summaries identify **S5C19** and **S5C22** as the main pressure points: open-deck carparks in multi-class buildings no longer receive previous reduced-FRL concessions unless they are adequately sprinkler-protected, and sprinkler exemptions are removed where car stackers are installed or more than 40 vehicles are present. That will hit mixed-use podiums and apartment-over-retail schemes hardest. citeturn5view0turn6view0

The evidence rules are also tighter. Under BPC’s official Volume One summary, **C1V3** for external wall classification via AS 5113 and **S7C4** for fire-hazard properties now require testing by an **Accredited Testing Laboratory**, described as an organisation accredited or recognised by NATA. This is a major “use today” change because it goes straight to façade packages, internal lining selections and substitution control. citeturn5view0

There are also several smaller but practical updates: **S5C11** now allows fire-protected steel in limited Type A situations; **C3D13(2)(b)** clarifies that pressurisation equipment must serve the whole exit path, not only the stairs; **S11C2** and **S11C3** make smoke dampers explicit for duct penetrations through smoke-proof walls; and **E1D2** clarifies acceptable combined sprinkler-hydrant standards and requires non-plastic above-ground pipes and fittings in combined systems. citeturn5view0turn6view0

### Energy, sustainability and carbon

The real 2025 energy shift is in **commercial** buildings, not housing. The official Victorian summary says Section J is materially stronger for commercial buildings excluding Class 2, with tighter energy-use and greenhouse-gas targets under **J1P1**, clarified energy-storage concessions in **J1P4**, tougher verification methods in **J1V1–J1V4**, stronger envelope and sealing rules in **J4** and **J5**, tougher HVAC/ventilation expectations in **J6**, and updated methods in **Specification 40** and the new **Specifications 46–48**. It also explicitly states that the final package includes **mandatory on-site solar PV**. citeturn6view0turn16view0

For housing, the key message is continuity rather than uplift. The official government position is that NCC 2025 does **not** introduce a new national residential energy-efficiency step-change. The 7-star NatHERS thermal shell and **Whole-of-Home** annual energy-use allowance introduced through NCC 2022 remain the baseline. In practical terms, architects should stop telling clients that NCC 2025 itself is another residential NatHERS jump; it is not. citeturn0search0turn20search0

On carbon, the final position is narrower than many expected earlier in the cycle. Building Ministers say embodied-carbon provisions were removed from the code package and will instead be issued as **ABCB guidance**. The practical reading is that **operational energy and emissions are now more directly regulated in commercial code compliance, while embodied carbon remains primarily a client-brief, planning-policy, procurement and ratings-tool issue unless a jurisdiction or client adds a stronger requirement**. That is an inference, but it is strongly supported by the split ministers adopted. citeturn0search0

### Accessibility, wayfinding and sanitary facilities

Accessibility changes are modest in count but immediate in application. Official Volume One guidance says **D1P10** introduces a new Performance Requirement for wayfinding signage, and **D3D31** provides the Deemed-to-Satisfy pathway requiring signage for stairways, floor levels and sole-occupancy units, with tactile, Braille and high-contrast visual elements. For PMs, this is a classic late-stage coordination risk because signage often sits too far downstream in fitout packages. citeturn5view0turn6view0

Amenities planning changes are similarly tangible. **F4D4(6)** requires sanitary-product dispensers in facilities for use by females. **F4D4(12)–(14)** introduce an optional DtS pathway for all-gender sanitary facilities in Class 3–9 buildings, with up to 50% of required facilities able to be all-gender if privacy, hygiene, location and identification requirements are met. **F4D8(1)(a)** extends privacy expectations to those all-gender facilities. The official guidance also notes increased female closet-pan ratios in **Table F4D4i** for some Class 9b occupancies. citeturn6view0turn9view0

For housing, the national policy position did not reopen the core Livable Housing debate, but the updated Livable Housing Design Standard includes several detail clarifications that matter at permit stage, including the shift from “site” to “allotment” in the step-free-path concession and practical clarifications around towel rails, reinforcement zones, timber reinforcing and niches. citeturn7view0

### Structural, materials and waterproofing specifics

The structural reform that matters most to Performance Solutions is the quantification of reliability. Official summaries say **B1P1** now requires minimum reliability indices via Tables **B1P1a–c**, **B1V1** now requires combinations of actions rather than isolated loads, and **A2G2(5)** requires structural Performance Solutions against **B1P1(2)** to demonstrate equivalence to the DtS provisions. Volume Two mirrors this in **H1P1** and **H1V1**. This is a real shift away from qualitative structural narratives. citeturn5view0turn7view0

The most immediately usable technical detail in the whole package is the waterproofing/substrate interface. Official guidance links **B1D2(b)** to the new Part F1 and requires structural actions to allow for **10-year deflection** of structural substrates. The new water-management clauses **F1D4** and **F1D5** set explicit rules for concrete roofs, balconies and podiums; **F1D7** requires the membrane to be applied directly to the substrate; **F1D10** requires either a self-draining finish or direct fixing to the membrane; and the BPC summary identifies a **1:80 minimum gradient to a floor waste at substrate level** and a **70 mm minimum set-down** from internal floor level, measured from the structural substrate. citeturn5view0turn6view0

For materials, the code is selectively more permissive and more demanding at the same time. **S5C11** opens a limited DtS path for fire-protected steel in certain Type A construction, but fire-test regimes are tighter. In housing, the official Volume Two summary also points to **AS 5346** as a new DtS route for EIFS other than direct-fix systems, while keeping fire-safety obligations intact. citeturn5view0turn7view0

### Services, EV charging, HVAC, ventilation and IAQ

The services story in NCC 2025 is less about one big new clause and more about how several changes converge. In commercial Section J, the official BPC summary points to **lower fan-power limits**, more modulating-control scenarios, removal of some earlier concessions and tougher plant-efficiency settings in **J6**, plus stronger envelope-sealing assumptions that make late services changes more consequential. citeturn6view0

Ventilation and IAQ are addressed more through pathways and moisture control than through a standalone IAQ chapter. Official summaries say **F6D6** now allows compliance using **AS 1668.4** for natural ventilation and clarifies that ventilation applies to any occupied room or space, while **F6D12** aligns kitchen exhaust wording more closely with AS 1668.1. On the condensation side, **F8D3** requires drained and vented cavities and a Class 4 vapour-permeable control layer in specified wall build-ups, and **F8D5/F8D6** add clearer roof-space ventilation requirements. The housing equivalents are **H4D7** and **10.8.1/10.8.3/10.8.4**. citeturn6view0turn7view0

EV charging is the area where the safest advice is also the most useful: **there is no new national NCC 2025 EV-charging mandate to brief as a code certainty**. Ministers expressly removed new EV-charging provisions from NCC 2025. However, the official Section J summary says the reference-building method in **Specification 40** now includes EV charging. The practical message is to treat EV charging as a **project brief / jurisdiction / Section J modelling coordination issue**, not as a universal new NCC 2025 base-building requirement. citeturn0search0turn6view0

## Transition, state variation and enforcement

The official rollout sequence is materially fragmented. The timeline below reflects the position evident from official jurisdictional pages as at 8 May 2026. citeturn0search0turn16view0turn9view0turn12view0turn10search0turn10search3turn13search1turn15view0turn15view1turn14search2

\`\`\`mermaid
timeline
    title NCC 2025 adoption and divergence
    2025-10-22 : Building Ministers finalise NCC 2025 scope
    2026-02-01 : NCC 2025 preview published
    2026-05-01 : Victoria adopts NCC 2025
               : ACT dual-code period starts
               : Tasmania commences NCC 2025 with major variations
               : WA confirms PCA 2025 and selected BCA 2025 commencements
               : NT declares NCC 2025 does not apply
    2026-11-01 : ACT DA / Works Approval cut-off for extended dual-code flexibility
    2027-05-01 : ACT mandatory NCC 2025
               : NSW adopts NCC 2025
               : Queensland adopts NCC 2025
               : South Australia adopts Building Code within NCC 2025
\`\`\`

The jurisdictional position that matters most to national practices is summarised below.

| Jurisdiction | Position as at 8 May 2026 | What to watch |
|---|---|---|
| entity["state","Victoria","Australia"] | NCC 2025 applies from **1 May 2026**; Victoria says projects already commenced in design or construction can continue under the standards in place when work commenced; Victoria also keeps an earlier lead-free plumbing start date than the national extension | Version control on partly designed projects; lead-free plumbing from 1 May 2026 in Victoria even though the national lead-free start is later. citeturn16view0 |
| entity["state","Australian Capital Territory","Australia"] | NCC 2025 commences **1 May 2026** but is **not mandatory until 1 May 2027**; projects in the dual-code window may comply with **either** NCC 2022 or NCC 2025, but cannot mix them; DAs/Works Approvals lodged before **1 November 2026** may preserve dual-code flexibility longer | Wrong-version risk is especially high in the ACT because mixed-code compliance is expressly not allowed. citeturn9view0 |
| entity["state","New South Wales","Australia"] | Adoption deferred to **1 May 2027**; NSW says variations will include flexibility for remedial waterproofing and will exclude new energy-efficiency standards from apartment-building common areas | Carefully distinguish new-build from remedial waterproofing scope; do not assume national common-area energy settings apply in NSW. citeturn12view0 |
| entity["state","Queensland","Australia"] | NCC 2022 remains mandatory until **30 April 2027**; NCC 2025 becomes mandatory **1 May 2027** | For Queensland projects currently in design, the immediate issue is preparation rather than legal adoption. citeturn10search0 |
| entity["state","South Australia","Australia"] | Building Code within NCC 2025 adopts **1 May 2027** | South Australia frames the delay as giving industry time to adjust and minimising disruption and cost to projects already in design. citeturn10search3 |
| entity["state","Tasmania","Australia"] | NCC 2025 commenced **1 May 2026**, but Tasmania’s FAQ says major areas are varied so that: residential stays at **6 stars**, condensation provisions do not change, sanitary-facility changes in Part F4 are not adopted, and existing Tasmanian variations carry through | Tasmania is a major trap for national “one-size-fits-all” NCC 2025 articles. citeturn13search1 |
| entity["state","Western Australia","Australia"] | WA has published 2026 NCC bulletins and Schedule 11 variations; official bulletins confirm **PCA 2025** commences 1 May 2026 and that for **new private swimming pools** BCA 2025 is mandatory from 1 May 2026, while WA retains AS 1926.1:2012 rather than 2024 for private pools | Check WA Schedule 11 carefully; do not assume the national pool-barrier clauses apply unmodified. citeturn15view0turn15view1 |
| entity["state","Northern Territory","Australia"] | The Territory has declared NCC 2025 **does not apply** from 1 May 2026 until the next NCC edition is published | Any national advice that assumes automatic 2026 adoption is wrong for NT projects. citeturn14search2 |

The likely enforcement flashpoints are clear. The first is **wrong-code-version selection** in delayed or dual-code jurisdictions. The second is **product and test-report quality**, especially where façade, lining, or FRL claims are not backed by the right accredited evidence. The third is **waterproofing geometry**: falls, set-downs, structure and membrane sequencing are now obvious inspection targets because the DtS logic is much more explicit. The fourth is **late Section J redesign**, especially where PV, glazing, sealing, HVAC and EV assumptions were not stabilised early. These are partly analytical conclusions, but they are the most direct practical reading of the official transition frameworks and technical changes. citeturn9view0turn12view0turn3search0turn5view0turn6view0

## Practical impact on design workflow, procurement, cost and risk

For architects, the biggest workflow change is that **code-critical interfaces move earlier**. Under NCC 2025, balconies, podiums, thresholds, façade sealing, carpark fire strategy, wayfinding signage, amenities planning and Section J all become riskier if deferred. This is not because the code has become universally more complex; it is because the clauses that changed are precisely the ones that sit across consultant boundaries. citeturn5view0turn6view0

For PMs, the biggest delivery change is **harder substitution governance**. With **A4G1**, the Alternative Referenced Document Register, stronger **A5G3** evidence expectations, and explicit accredited-testing requirements in **C1V3/S7C4**, tender and shop-drawing packages need much clearer rules about what counts as an acceptable equivalent. If the contract still treats “equal approved” as a vague commercial convenience, NCC 2025 increases the chance of permit delay or non-conformance arguments later. citeturn3search0turn5view0

On cost and programme, the most likely pressure points are mixed-use carpark sprinklers and FRL changes, exposed external slab detailing, earlier Section J modelling and PV coordination, and specification administration. That does not automatically mean every project becomes materially more expensive; it means **the cost of late coordination rises**. The states that delayed adoption—especially NSW, Queensland and South Australia—have effectively acknowledged that implementation risk and redesign cost were real enough to justify extra lead time. citeturn12view0turn10search0turn10search3

## Actionable recommendations and stage checklist

The single best operating rule is this: **treat NCC 2025 as a coordination issue first, and a clause issue second**. The article hook for practitioners is stronger if it says what to do, not just what changed: lock the jurisdiction and code edition; front-load fire, water and Section J decisions; and make evidence-of-suitability a contract deliverable, not an afterthought. citeturn3search0turn5view0turn6view0

| Project stage | Immediate architect tasks | Immediate PM tasks | Why this matters now |
|---|---|---|---|
| Bid / brief | Confirm jurisdiction, building classes, mixed-use interfaces, climate zone and likely code edition; identify whether the project sits in a dual-code or delayed-adoption jurisdiction | Add “applicable NCC edition and state appendix” as a project risk item on day one | The same design may be lawful under different code versions in one jurisdiction and not in another. citeturn9view0turn12view0turn10search0turn10search3 |
| Concept | Decide whether the scheme needs open-deck carpark concessions, major exposed balconies/podiums, or a Performance Solution-heavy strategy; reserve real roof area for PV | Commission early fire, waterproofing, structural and Section J input together, not sequentially | Carpark sprinklers, waterproofing geometry and Section J now drive concept decisions. citeturn5view0turn6view0 |
| Schematic design | Draw substrate falls, threshold set-downs, membrane position and drainage paths explicitly; identify signage and all-gender toilet implications in planning grids | Freeze the compliance path: DtS versus Performance Solution, and identify evidence packages needed from suppliers | NCC 2025 is much less forgiving of late submittal-stage coordination. citeturn3search0turn6view0 |
| Design development | Coordinate façade build-up, vapour-control layers, cavities, roof ventilation, glazing, HVAC efficiencies and EV assumptions in one model | Require a referenced-documents schedule listing exact standard editions and publication dates | A4G1 and the new record-keeping emphasis make version control a live compliance item. citeturn3search0turn6view0turn7view0 |
| Documentation / permit | State the nominated NCC edition and state appendix on the drawings and permit documents; identify all code-critical details in enlarged details and schedules | Run a pre-lodgement code audit focused on version control, accredited testing and state variations | The official ACT guidance explicitly prohibits mixing codes, and official regulator guidance expects clear records. citeturn9view0turn3search0 |
| Procurement | Tighten specifications for fire testing, façade evidence, water-management assemblies, HVAC efficiencies and PV performance | Make accredited reports, product evidence and standards-edition compliance contractual deliverables; require approval before substitutions | NCC 2025 hardens the evidence chain. citeturn5view0turn3search0 |
| Construction | Inspect waterproofing geometry before finishes conceal it; inspect carpark sprinkler scope and smoke-control interfaces; verify signage package against D3D31 | Maintain an evidence register and force substitution review through the same code gate as original selections | The highest-risk failures are now physical interface issues, not abstract code theory. citeturn6view0 |
| Handover | Check the as-built against the nominated NCC edition and referenced-document set | Ensure the occupancy / completion pack includes final evidence-of-suitability and referenced-document records | Official guidance expressly calls for those records to be retained. citeturn3search0 |

## Key references and limitations

The core official sources used here are urlBuilding Ministers’ Meeting October 2025 communiquéturn0search0, urlVictoria building standards and NCC 2025 commencement pageturn2search4, urlACT NCC adoption pageturn8search1, urlNSW adoption media releaseturn11search0, urlQBCC Navigating the NCC pageturn10search0, urlSouth Australia Building Code updates pageturn10search3, urlTasmania NCC 2025 FAQ pageturn13search1, urlWA Industry Bulletin 175 on BCA 2025 state additions and variationsturn14search0, urlWA Industry Bulletin 173 on PCA 2025 adoptionturn14search14, and urlNorthern Territory Gazette S31turn14search2. Technical clause-level interpretation relied heavily on the official urlBuilding and Plumbing Commission Practitioner Education Seriesturn3search1, especially the Volume One, Volume Two and governing-requirements transcripts. citeturn3search1turn3search0turn5view0turn7view0

A limitation of this report is that direct, clause-by-clause access to the ABCB-hosted NCC text was constrained in this research environment, so clause references are drawn mainly from official regulator summaries and official state adoption materials rather than from the ABCB text itself. That is strong enough for a practical article draft, but project teams should still verify the final adopted volume, appendix and referenced-document set that apply in the project jurisdiction before issuing permit, tender or construction documents. citeturn3search0turn5view0turn7view0
`;

const stateMap = {
  '["state","Victoria","Australia"]': 'Victoria',
  '["state","Australian Capital Territory","Australia"]': 'ACT',
  '["state","New South Wales","Australia"]': 'NSW',
  '["state","Queensland","Australia"]': 'Queensland',
  '["state","South Australia","Australia"]': 'South Australia',
  '["state","Tasmania","Australia"]': 'Tasmania',
  '["state","Western Australia","Australia"]': 'WA',
  '["state","Northern Territory","Australia"]': 'NT',
  '["event","Building Ministers’ Meeting","October 2025 communiqué"]': 'Building Ministers’ Meeting (October 2025 communiqué)'
};

content = content.replace(/cite[^]*/g, '');
content = content.replace(/entity(.*?)/g, (match, p1) => stateMap[p1] || p1);
content = content.replace(/url(.*?).*?/g, '$1');
content = content.trim();

fs.writeFileSync('clean_ncc.md', content);
