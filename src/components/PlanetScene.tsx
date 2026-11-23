import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Color, DoubleSide, Float32BufferAttribute, IcosahedronGeometry, type Group } from "three";
import { useTheme } from "./ThemeProvider";

type Palette = { ocean: string; land: string; ring: string; moon: string };

function readColor(name: string) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  ctx.fillRect(0, 0, 1, 1);
  const pixel = ctx.getImageData(0, 0, 1, 1).data;
  return `rgb(${pixel[0] ?? 0}, ${pixel[1] ?? 0}, ${pixel[2] ?? 0})`;
}

function Planet({ palette, reducedMotion, onReady }: { palette: Palette; reducedMotion: boolean; onReady: () => void }) {
  const model = useRef<Group>(null);
  const didDraw = useRef(false);
  const geometry = useMemo(() => {
    const geo = new IcosahedronGeometry(1.65, 4);
    const position = geo.getAttribute("position");
    const ocean = new Color(palette.ocean);
    const land = new Color(palette.land);
    const colors: number[] = [];
    for (let i = 0; i < position.count; i += 3) {
      const x = position.getX(i), y = position.getY(i), z = position.getZ(i);
      const continent = Math.sin(x * 3.1 + z * 1.7) + Math.cos(y * 4.5 - x * 1.4) + Math.sin(z * 4.2 + y * 2.3) * .55;
      const color = (continent > .65 ? land : ocean).clone().multiplyScalar(.88 + .12 * (Math.sin(i * 17.7) + 1) / 2);
      for (let j = 0; j < 3; j++) colors.push(color.r, color.g, color.b);
    }
    geo.setAttribute("color", new Float32BufferAttribute(colors, 3));
    return geo;
  }, [palette]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame((_, delta) => {
    if (model.current && !reducedMotion) model.current.rotation.y += Math.min(delta, .05) * .09;
    if (!didDraw.current) { didDraw.current = true; onReady(); }
  });
  return (
    <group ref={model} rotation={[.16, 0, -.25]}>
      <mesh geometry={geometry}><meshStandardMaterial vertexColors roughness={.8} flatShading /></mesh>
      <group rotation={[1.18, .12, 0]}>
        <mesh><ringGeometry args={[2.05, 2.16, 160]} /><meshStandardMaterial color={palette.ring} side={DoubleSide} roughness={.65} /></mesh>
        <mesh><ringGeometry args={[2.22, 2.5, 160]} /><meshStandardMaterial color={palette.ring} side={DoubleSide} roughness={.65} /></mesh>
        <mesh><ringGeometry args={[2.55, 2.6, 160]} /><meshStandardMaterial color={palette.ocean} side={DoubleSide} roughness={.6} /></mesh>
      </group>
      <mesh position={[2.95, 1.4, -.6]}><icosahedronGeometry args={[.24, 1]} /><meshStandardMaterial color={palette.moon} flatShading roughness={1} /></mesh>
    </group>
  );
}

export default function PlanetScene() {
  const { theme } = useTheme();
  const [palette, setPalette] = useState<Palette>();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Run after the provider has applied the new theme to the document.
    const frame = requestAnimationFrame(() => setPalette({ ocean: readColor("--planet-ocean"), land: readColor("--planet-land"), ring: readColor("--planet-ring"), moon: readColor("--planet-moon") }));
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update(); media.addEventListener("change", update);
    return () => { cancelAnimationFrame(frame); media.removeEventListener("change", update); };
  }, [theme]);
  return (
    <div className="planet-stage cursor-grab active:cursor-grabbing" role="img" aria-label="Interactive ringed planet" data-scene-ready={ready ? "true" : undefined}>
      {palette && <Canvas dpr={[1, 1.5]} camera={{ position: [0, .8, 8.8], fov: 44 }} gl={{ alpha: true, antialias: true }} fallback={<div className="planet-fallback" />}>
        <ambientLight intensity={1.25} />
        <directionalLight position={[-4, 6, 5]} intensity={3} />
        <directionalLight position={[4, -2, 1]} intensity={.5} />
        <Planet palette={palette} reducedMotion={reducedMotion} onReady={() => setReady(true)} />
        <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={.5} maxPolarAngle={2.5} />
      </Canvas>}
    </div>
  );
}