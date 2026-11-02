# Replacement visual direction: selected resources

Researched 2 November 2026 following rejection of the procedural wire sculpture. This is a resource-selection record, not a claim that the replacement has been implemented.

## Decision

Discard the wire sculpture and shape-morphing art direction. Build a cinematic project showcase: a quiet studio scene containing recognizable devices and interface panels, with a scroll-controlled camera visiting the work. The portfolio owner's name, role and project evidence must remain explicit.

The distinguishing material should come from the projects: a real Weavelet interface, the semantic-search interface and actual research figures. The 3D device is a presentation surface rather than the subject of the portfolio. Avoid substituting another arbitrary orb, glass blob or particle experiment.

## Selected sources and their jobs

| Source | Selection | Application |
| --- | --- | --- |
| [Apple AirPods Pro](https://www.apple.com/airpods-pro/) | Primary art-direction reference | Recognizable physical forms, soft studio lighting, generous negative space, close-ups and clear feature hierarchy. Reference the presentation approach; do not reuse Apple's proprietary renders. |
| [Dennis Snellenberg](https://dennissnellenberg.com/) | Primary portfolio-structure reference | Clear personal identity, concise role, prominent work and direct contact. Adapt the hierarchy rather than reproduce its layout or portrait treatment. |
| [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Selected motion foundation | A pinned timeline controls camera/object transforms and panel reveals. Use native scrolling, responsive setups, accessible static content and cleanup on Astro navigation. |
| [Three.js glTF loading](https://threejs.org/manual/pages/load-gltf.html) | Selected 3D rendering foundation | Load proper device geometry and materials, put project imagery on display surfaces, and control a real perspective camera. The library is MIT licensed; assets have separate licenses. |
| [Poly Haven Studio Small 09](https://polyhaven.com/a/studio_small_09) | Selected lighting resource | CC0 softbox environment for controlled reflections on metal and glass. Use a suitably small environment map and measure the result rather than ship the default large download. |
| [Codrops Astro/WebGL gallery tutorial](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/) | Selected implementation reference | Synchronizing project images with WebGL planes and transitioning into detail views. Preserve existing Astro navigation rather than add a second router. |

The [GSAP showcase](https://gsap.com/showcase/) was used to discover current portfolios. [Guillaume Colombel](https://guillaumecolombel.fr/) was visually inspected after loading and scrolling: it demonstrates cohesive scene-based project presentation, but its environment, sound and theatrical styling are too dominant to copy into this minimal AI/research portfolio. [Mike Fernandez](https://www.mike-fernandez.dev/) was inspected at its entrance scene; its illustrated-world direction is also outside the selected style.

## Reusable device asset candidates

These are concrete downloadable resources, with specifications and publisher license statements inspected. Their rendered quality has not yet been approved for integration.

- [Innerscene: round smartwatch](https://www.innerscene.com/tools/library/3d-parts/round-smartwatch-23c37920). Generic round screen, metallic body and silicone strap; GLB; publisher states CC0. This is the more relevant form for Weavelet. Replace the stock watch face with a project-specific screen. Browser inspection of this asset page timed out, so visual and geometry assessment remains necessary.
- [Innerscene: 6.1-inch slab smartphone](https://www.innerscene.com/tools/library/3d-parts/6-1-inch-slab-smartphone-c523fe00). Generic phone, aluminum frame, glass and replaceable display content; publisher states CC0. The listed 10.4 MB download needs inspection and optimization before web use.
- [Grab3D: smartwatch](https://grab3d.com/models/electronics/smartwatch/). Publisher lists a 546 KB GLB, 7,186 triangles and CC0. Its square, stylized form is a fallback candidate rather than the first choice for Weavelet.
- [Khronos glTF sample assets](https://github.khronos.org/glTF-Assets/) were checked as a model/material reference. The catalog's Chronograph Watch is an analog watch, so it is not the right visual representation of a Wear OS music app.

## Other resources evaluated

- [Osmo](https://www.osmo.supply/): polished reusable components, including shutter transitions and radial cards. Useful secondary reference for timing and small interactions. Much of the toolkit requires membership; no purchase or account access is needed for the selected foundation.
- [Spline scroll events](https://docs.spline.design/interaction-states-events-and-actions/events/scroll-event) and [Spline's growing-plant scroll tutorial](https://spline.design/academy/tutorials/create-a-3d-scroll-animation-integrate-into-framer): a useful scene-authoring alternative. Not selected as the default because direct control of model assets, project screens and the existing Astro implementation is more appropriate here.
- [Codrops gallery source repository](https://github.com/J0SUKE/gsap-threejs-codrops): its README advertises MIT, but the linked LICENSE returned 404 during this research. Treat the tutorial as a technical reference; verify a complete license notice before copying source. Do not reuse its stock gallery photographs as portfolio content.

## Concrete replacement sequence

1. **Identity and work:** name and role visible immediately, with one deliberately composed studio view of the project devices/panels. Establish real work before a slogan.
2. **MEDVSE:** the camera approaches a phone carrying project-specific content; a paper figure or model diagram enters next to it. Keep research status and paper action visible.
3. **Semantic search:** a large interface panel comes forward; explain the text-to-image interaction using the actual system's interface and assets.
4. **Weavelet:** a round watch moves into focus, showing the app interface. Rotate only enough to reveal its material and physical depth while keeping the screen readable.
5. **Research and contact:** release the scene into a normal, compact publication list and the rest of the portfolio.

Objects retain recognizable geometry throughout. Transitions move the camera and rearrange objects; they do not melt the phone into a flower or turn a waveform into a device.

## Content evidence and build gates

The [Weavelet repository](https://github.com/celestialtaha/Weavelet) currently says screenshots are coming soon. The [semantic-search repository](https://github.com/celestialtaha/visual-semantic-search) documents the runnable application but does not supply a ready portfolio screenshot in its README. Actual UI captures therefore need to be produced from the projects, rather than labeled as already available or replaced by invented screenshots. [MEDVSE](https://github.com/MahdiFarvardin/MEDVSE) and the linked papers provide research context.

Before rebuilding the full homepage, make and visually inspect one finished still of the actual scene: composition, materials, lighting, a readable project screen, and personal identity. Once that still works, build first/middle/end camera states, then add the scroll timeline. This directly addresses the failure of polishing motion around an unconvincing object.

No portfolio UI, runtime dependency, public deployment, commit or push was changed during this resource-selection pass.

## User correction: expertise leads the scene

The subsequent instruction supersedes the device/project storyboard above. The hero should represent professional expertise and research, especially AI agents, orchestration and backend engineering. Phones, watches and project-specific objects are no longer the organizing concept. Selected projects appear later only when they provide substantial evidence.

### Revised composition: an intelligence workbench

One restrained studio composition contains a coherent modular system. Recognizable objects explain a workflow rather than decorate it:

| Area | Object / visual metaphor | Scroll behavior |
| --- | --- | --- |
| Agent systems | Compact processing modules beside task/document cards | A task enters; planning, tool use, memory and checking become visible as distinct steps. Labels make these software concepts explicit. |
| Orchestration | A precision patch panel / routing board | The camera follows a task through a branch, parallel paths and a joined result. Paths communicate handoffs and coordination. |
| Backend engineering | A cutaway service chassis with a request queue and data-storage module | Layers separate to expose API, workers, queue and persistence, then align as a working system. These are conceptual software layers, not a claim of hardware/network engineering expertise. |
| Research / perception | A camera or optical assembly observing a simple physical specimen | A scan reveals geometry and opens into authentic research figures and paper context. Research content remains specific to verified publications. |

The modules should look like intentional machined objects: restrained geometry, realistic surfaces, soft studio lighting and carefully composed framing. Do not turn the site into a room full of stock props, a game world or a collection of floating technology logos. Avoid humanoid robot mascots and arbitrary shape morphs.

The scene is an explanatory visualization, so its labels and workflow must be technically coherent. Avoid inventing a deployed agent architecture, customer outcome or professional achievement from an illustrative animation. The user's current instruction supplies the expertise areas; the existing experience copy does not yet document detailed agent/backend case studies.

### Updated resource selection

Keep Apple as a lighting/composition reference, Dennis Snellenberg for portfolio hierarchy, GSAP for the timeline, Three.js for the scene and Poly Haven for illumination. Retire the previously shortlisted phone/watch assets for the hero.

Additional object references found:

- [Innerscene network switch](https://www.innerscene.com/tools/library/3d-parts/network-switch-926f8cdf): publisher lists a CC0 GLB. Useful as a reference for ports, material treatment and a routing-panel construction; not a literal depiction of software orchestration. Render quality and geometry have not been inspected.
- [Grab3D server rack](https://grab3d.com/models/electronics/server-rack/): listed as a lightweight CC0 GLB candidate. Consider only if it suits the restrained scene after inspection; a stock rack alone does not explain backend development.
- [Sketchfab robot arm by David06](https://sketchfab.com/3d-models/robot-arm-2370f3522d4446eaabd1a319d10b7e22): downloadable object reference for robotics research. Asset license and rendered quality are not approved for use. It is not the representation for generative AI agents.

### Featured work decision from currently reviewed material

MEDVSE is the strongest evidenced case-study candidate: the portfolio documents research, data, model development and mobile deployment, and the work connects to a verified 2026 journal article. The 3D reconstruction survey and rose perception work belong prominently in research. They do not require separate decorative hero objects.

Do not automatically feature Weavelet, semantic search or every library as equally important homepage projects. Keep them in the archive unless an assessment of implementation, original contribution and demonstrable results supports featuring them. The PostgreSQL query builder is relevant to backend/LLM integration, but its implementation should be reviewed before it receives a prominent position. Small demos and the portfolio itself should not fill featured slots by default.

## Implementation decision after visual inspection

The solid-object scene was implemented with Three.js (MIT), its RoundedBoxGeometry and RoomEnvironment helpers, and GSAP ScrollTrigger. The server-rack GLB was downloaded with its CC0 notice and rendered alongside the workbench for comparison. Its separate asset style and proportions did not improve the composition, so it was excluded from the shipped scene. The review files remain outside the repository in `/tmp/portfolio-asset-review/`.

The final objects are authored as a consistent set of solid, rounded meshes: task modules labeled Plan/Act/Check, a routing panel, separable service drawers and a camera/optical assembly with a calibration target. These illustrate areas of practice. No phone, watch or individual project is used as a hero prop. The lighting uses Three.js RoomEnvironment with local lights; an external HDRI was not necessary. The previously considered wire geometry is removed.

The selected-project area now contains one substantial MEDVSE case-study feature. Other projects remain available through the archive, alongside the separately maintained research publication list.
