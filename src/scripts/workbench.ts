import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/** Physical objects visualize software concepts; no project is made into a prop. */
export function createWorkbench(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xfaf7ed, 0x8b917c, 1.25));
  const key = new THREE.DirectionalLight(0xfff5df, 3.1);
  key.position.set(-3, 7, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -6;
  key.shadow.camera.right = 6;
  key.shadow.camera.top = 6;
  key.shadow.camera.bottom = -6;
  key.shadow.normalBias = 0.035;
  key.shadow.bias = -0.0001;
  key.shadow.radius = 5;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd7e7df, 1.8);
  rim.position.set(4, 3, -3);
  scene.add(rim);
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];
  const material = (color: number, metalness = 0.1, roughness = 0.35) => {
    const m = new THREE.MeshStandardMaterial({ color, metalness, roughness });
    materials.push(m);
    return m;
  };
  const ivory = material(0xe2e3d8, 0.22, 0.28),
    dark = material(0x29362f, 0.45, 0.28),
    metal = material(0x869080, 0.8, 0.24),
    copper = material(0xb35c35, 0.72, 0.24),
    rubber = material(0x202a25, 0.05, 0.68),
    green = material(0x65755b, 0.5, 0.3);
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x223a38,
    metalness: 0.35,
    roughness: 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
  });
  materials.push(glass);
  const led = new THREE.MeshStandardMaterial({
    color: 0xdf9c60,
    emissive: 0xc77c35,
    emissiveIntensity: 0.5,
    roughness: 0.2,
  });
  materials.push(led);
  const world = new THREE.Group();
  scene.add(world);
  function box(
    parent: THREE.Object3D,
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    m = ivory,
    r = 0.07,
  ) {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, r), m);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function cylinder(
    parent: THREE.Object3D,
    rt: number,
    rb: number,
    h: number,
    x: number,
    y: number,
    z: number,
    m = metal,
  ) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 48), m);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function topLabel(
    parent: THREE.Object3D,
    text: string,
    x: number,
    y: number,
    z: number,
    w = 1,
    color = "#364033",
    bg = "#e2e3d8",
  ) {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 128);
    ctx.fillStyle = color;
    ctx.font = "500 39px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 256, 65);
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    textures.push(texture);
    const m = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.55,
      metalness: 0.05,
    });
    materials.push(m);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, w / 4), m);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }
  function cable(
    parent: THREE.Object3D,
    points: number[][],
    m = dark,
    r = 0.034,
  ) {
    const curve = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...(p as [number, number, number]))),
    );
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 48, r, 8, false),
      m,
    );
    mesh.castShadow = true;
    parent.add(mesh);
    return curve;
  }
  // A single presentation plinth unifies the objects and catches their shadows.
  box(world, 5.4, 0.16, 3.55, 0, -0.03, 0, ivory, 0.16);
  box(world, 5.2, 0.045, 3.36, 0, -0.12, 0, metal, 0.12);
  for (const x of [-2.25, 2.25])
    for (const z of [-1.35, 1.35])
      cylinder(world, 0.1, 0.1, 0.12, x, -0.2, z, rubber);
  topLabel(world, "SYSTEMS / 01", 0, 0.057, 1.52, 1.35, "#69725e");

  // Agents: three distinct task modules with physical sockets and status lights.
  const agents = new THREE.Group();
  world.add(agents);
  agents.position.set(0.15, 0.09, 0.65);
  const agentUnits: THREE.Group[] = [];
  [-1.1, 0, 1.1].forEach((x, i) => {
    const unit = new THREE.Group();
    agents.add(unit);
    unit.position.x = x;
    agentUnits.push(unit);
    box(unit, 0.87, 0.13, 0.95, 0, 0.08, 0, dark, 0.08);
    box(unit, 0.83, 0.36, 0.91, 0, 0.31, 0, i === 1 ? green : ivory, 0.09);
    box(unit, 0.67, 0.028, 0.71, 0, 0.505, 0, i === 1 ? dark : metal, 0.035);
    const face = box(unit, 0.54, 0.024, 0.56, 0, 0.526, 0, dark, 0.025);
    topLabel(
      unit,
      ["PLAN", "ACT", "CHECK"][i],
      0,
      0.541,
      -0.04,
      0.48,
      "#e5e7d9",
      "#29362f",
    );
    cylinder(unit, 0.035, 0.035, 0.012, -0.27, 0.518, 0.3, led);
    for (let k = 0; k < 5; k++)
      box(unit, 0.045, 0.02, 0.13, -0.2 + k * 0.1, 0.529, 0.24, rubber, 0.005);
    for (const dx of [-0.31, 0.31])
      for (const dz of [-0.35, 0.35])
        cylinder(unit, 0.018, 0.018, 0.006, dx, 0.5, dz, dark);
    box(unit, 0.24, 0.11, 0.032, 0, 0.3, 0.463, rubber, 0.01);
    box(unit, 0.12, 0.06, 0.035, 0, 0.3, 0.478, metal, 0.004);
    face.userData.module = i;
  });
  // Orchestration: precision patch board. The route opens into parallel work.
  const routing = new THREE.Group();
  world.add(routing);
  routing.position.set(0.25, 0.1, -0.6);
  box(routing, 2.28, 0.24, 0.95, 0, 0.14, 0, ivory, 0.09);
  box(routing, 2.15, 0.04, 0.82, 0, 0.278, 0, metal, 0.035);
  topLabel(routing, "ORCHESTRATOR", 0, 0.303, -0.17, 1.1, "#dce2d2", "#29362f");
  const routes: THREE.CatmullRomCurve3[] = [];
  [-0.78, 0, 0.78].forEach((x, i) => {
    cylinder(routing, 0.095, 0.095, 0.022, x, 0.31, 0.2, rubber);
    cylinder(routing, 0.057, 0.057, 0.024, x, 0.327, 0.2, copper);
    const endX = [-0.95, 0.15, 1.25][i];
    routes.push(
      cable(
        world,
        [
          [x + 0.25, 0.44, -0.4],
          [x + 0.25, 0.7, -0.1],
          [endX, 0.6, 0.05],
          [endX, 0.23, 0.18],
        ],
        i === 1 ? copper : dark,
        0.035,
      ),
    );
  });
  const tokens = routes.map(() => {
    const token = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 12), led);
    world.add(token);
    return token;
  });

  // Backend: a stack of server drawers, with visible drive trays and ports.
  const backend = new THREE.Group();
  world.add(backend);
  backend.position.set(-1.72, 0.14, -0.55);
  backend.rotation.y = -0.1;
  const drawers: THREE.Group[] = [];
  for (let i = 0; i < 3; i++) {
    const drawer = new THREE.Group();
    backend.add(drawer);
    drawers.push(drawer);
    drawer.position.y = i * 0.26;
    box(drawer, 1.02, 0.22, 1.2, 0, 0.15, 0, ivory, 0.045);
    box(drawer, 0.94, 0.16, 0.032, 0, 0.15, 0.61, dark, 0.012);
    for (let k = 0; k < 3; k++) {
      box(drawer, 0.2, 0.1, 0.022, -0.28 + k * 0.28, 0.15, 0.634, metal, 0.008);
      box(
        drawer,
        0.14,
        0.025,
        0.018,
        -0.28 + k * 0.28,
        0.15,
        0.65,
        rubber,
        0.002,
      );
    }
    box(drawer, 0.04, 0.04, 0.025, 0.4, 0.15, 0.64, led, 0.005);
    for (let k = 0; k < 7; k++)
      box(drawer, 0.5, 0.012, 0.025, 0, 0.263, -0.35 + k * 0.09, rubber, 0.002);
  }
  topLabel(drawers[2], "API / DATA", 0, 0.265, 0, 0.7, "#53624d");
  // Research: a real camera form and layered optical assembly.
  const optics = new THREE.Group();
  world.add(optics);
  optics.position.set(1.85, 0.14, -0.7);
  optics.rotation.y = -0.22;
  box(optics, 0.83, 0.65, 0.52, 0, 0.46, 0, ivory, 0.1);
  box(optics, 0.72, 0.12, 0.6, 0, 0.12, 0, dark, 0.05);
  box(optics, 0.32, 0.08, 0.25, -0.12, 0.82, 0, dark, 0.035);
  cylinder(optics, 0.052, 0.052, 0.035, 0.27, 0.805, 0, copper);
  const lens = new THREE.Group();
  optics.add(lens);
  lens.position.set(0, 0.49, 0.29);
  lens.rotation.x = Math.PI / 2;
  for (let k = 0; k < 4; k++)
    cylinder(
      lens,
      0.285 - (k % 2) * 0.025,
      0.285 - (k % 2) * 0.025,
      0.11,
      0,
      k * 0.085,
      0,
      k === 2 ? metal : rubber,
    );
  const outer = cylinder(lens, 0.27, 0.27, 0.055, 0, 0.34, 0, metal);
  const lensFace = cylinder(lens, 0.226, 0.226, 0.015, 0, 0.375, 0, glass);
  cylinder(lens, 0.16, 0.16, 0.008, 0, 0.388, 0, dark);
  cylinder(lens, 0.095, 0.095, 0.008, 0, 0.396, 0, glass);
  for (let k = 0; k < 24; k++) {
    const a = (k / 24) * Math.PI * 2;
    box(
      lens,
      0.022,
      0.2,
      0.03,
      Math.cos(a) * 0.277,
      0.15,
      Math.sin(a) * 0.277,
      rubber,
      0.004,
    );
  }
  topLabel(optics, "PERCEPTION", 0, 0.795, -0.08, 0.59, "#526048");
  const scan = new THREE.Mesh(
    new THREE.PlaneGeometry(0.9, 0.7),
    new THREE.MeshBasicMaterial({
      color: 0xb75934,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  scan.position.set(1.65, 0.5, 0.5);
  world.add(scan);
  materials.push(scan.material);
  const specimen = new THREE.Group();
  world.add(specimen);
  specimen.position.set(1.92, 0.1, 0.77);
  cylinder(specimen, 0.27, 0.32, 0.065, 0, 0.035, 0, metal);
  box(specimen, 0.51, 0.36, 0.04, 0, 0.26, 0, metal, 0.02);
  const calibrationCanvas = document.createElement("canvas");
  calibrationCanvas.width = 320;
  calibrationCanvas.height = 240;
  const cc = calibrationCanvas.getContext("2d")!;
  cc.fillStyle = "#e2e3d8";
  cc.fillRect(0, 0, 320, 240);
  for (let row = 0; row < 4; row++)
    for (let col = 0; col < 6; col++) {
      cc.fillStyle = (row + col) % 2 ? "#e2e3d8" : "#29362f";
      cc.fillRect(16 + col * 48, 24 + row * 48, 48, 48);
    }
  const calibrationTexture = new THREE.CanvasTexture(calibrationCanvas);
  calibrationTexture.colorSpace = THREE.SRGBColorSpace;
  textures.push(calibrationTexture);
  const calibrationMaterial = new THREE.MeshStandardMaterial({
    map: calibrationTexture,
    roughness: 0.7,
  });
  materials.push(calibrationMaterial);
  const calibrationFace = new THREE.Mesh(
    new THREE.PlaneGeometry(0.47, 0.32),
    calibrationMaterial,
  );
  calibrationFace.position.set(0, 0.26, 0.023);
  specimen.add(calibrationFace);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.ShadowMaterial({ color: 0x46523b, opacity: 0.17 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.265;
  ground.receiveShadow = true;
  scene.add(ground);
  materials.push(ground.material);
  let disposed = false,
    phase = 0;
  // Camera views reveal an intact system, then its individual areas of practice.
  const views = [
    { p: [6.5, 6.2, 8.1], t: [0, 0.15, 0] },
    { p: [3.6, 4.2, 6.2], t: [0.1, 0.3, 0.5] },
    { p: [4.8, 5.7, 5.4], t: [0.05, 0.22, -0.22] },
    { p: [-4.8, 3.1, 5.8], t: [-1, 0.35, -0.4] },
    { p: [4.2, 2.8, 5.8], t: [1.15, 0.35, -0.35] },
  ];
  const cameraTarget = new THREE.Vector3();
  const nextPosition = new THREE.Vector3();
  const nextTarget = new THREE.Vector3();
  function render(progress = phase) {
    if (disposed) return;
    phase = THREE.MathUtils.clamp(progress, 0, 4);
    const from = Math.min(3, Math.floor(phase)),
      to = from + 1;
    const raw = phase - from,
      t = raw * raw * (3 - 2 * raw);
    const a = views[from],
      b = views[to];
    camera.position
      .set(...(a.p as [number, number, number]))
      .lerp(nextPosition.set(...(b.p as [number, number, number])), t);
    cameraTarget
      .set(...(a.t as [number, number, number]))
      .lerp(nextTarget.set(...(b.t as [number, number, number])), t);
    camera.lookAt(cameraTarget);
    const reveal = Math.max(0, 1 - Math.abs(phase - 3));
    drawers.forEach((drawer, i) => {
      drawer.position.y = i * (0.26 + reveal * 0.2);
      drawer.position.z = (i - 1) * reveal * 0.15;
    });
    const agentFocus = Math.max(0, 1 - Math.abs(phase - 1));
    agentUnits.forEach((unit, i) => {
      unit.position.y = agentFocus * (i === 1 ? 0.13 : 0.05);
    });
    const flow = phase / 4;
    tokens.forEach((token, i) => {
      token.position.copy(routes[i].getPointAt((flow * 2 + i * 0.21) % 1));
    });
    const research = Math.max(0, 1 - Math.abs(phase - 4));
    outer.position.y = 0.34 + research * 0.12;
    lensFace.position.y = 0.375 + research * 0.18;
    scan.visible = research > 0.1;
    scan.position.z = 0.35 + research * 0.42;
    renderer.render(scene, camera);
  }
  function resize(w: number, h: number) {
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 1.25 ? 39 : 32;
    camera.zoom = 1.22;
    camera.updateProjectionMatrix();
    render();
  }
  return {
    render,
    resize,
    dispose() {
      disposed = true;
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
        }
      });
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
