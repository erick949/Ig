import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text3D } from "@react-three/drei";
import React, { useState } from "react";
import { useSpring, a } from "@react-spring/three";


function Vela({ position, encendida = true }) {
  const flameSpring = useSpring({
    scale: encendida ? [1, 1, 1] : [0, 0, 0],
    opacity: encendida ? 1 : 0,
    emissiveIntensity: encendida ? 2 + Math.random() * 0.3 : 0,
    config: { tension: 80, friction: 20 },
    loop: encendida
      ? { reverse: true } // Hace que parpadee levemente
      : false,
  });

  return (
    <group position={position}>
      {/* Cuerpo de la vela */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Llama animada */}
      <a.mesh position={[0, 0.25, 0]} scale={flameSpring.scale}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <a.meshStandardMaterial
          color="orange"
          emissive="yellow"
          emissiveIntensity={flameSpring.emissiveIntensity}
          transparent
          opacity={flameSpring.opacity}
        />
      </a.mesh>
    </group>
  );
}
// export  function Pastel() {
export function Pastel({ encendidas }) {

  const velas = [
    { x: -0.4, z: -0.4 },
    { x: 0.4, z: -0.4 },
    { x: 0, z: 0.4 },
  ];

  return (
    <group position={[0, -1.5, 0]}>
      {/* Pastel base */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 1, 32]} />
        <meshStandardMaterial color="#e2b6ff" />
      </mesh>

      {/* Segundo nivel */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.5, 32]} />
        <meshStandardMaterial color="#fcd34d" />
      </mesh>

      {/* Velas */}
      {velas.map((pos, idx) => (
        // <Vela key={idx} position={[pos.x, 1.5, pos.z]} encendida={true} />
        <Vela key={idx} position={[pos.x, 1.5, pos.z]} encendida={encendidas} />
      ))}
    </group>
  );
}

function DecoracionCircular({ cantidad = 10, radius = 1.25, y = 1.25 }) {
  const angleStep = (Math.PI * 2) / cantidad;

  return (
    <group position={[0, y, 0]}>
      {Array.from({ length: cantidad }).map((_, i) => {
        const angle = i * angleStep;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="red" />
          </mesh>
        );
      })}
    </group>
  );
}
function TextoCurvado({ text, radius = 1, y = -1, fontSize = 0.1 }) {
  const arc = Math.PI / 2;
  const step = arc / (text.length - 1);

  return (
    <group position={[0, y, 0]}>
      {text.split("").map((char, i) => {
        const angle = -arc / 2 + i * step;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const rotY = -angle + 2.9;

        const rotX = 3.2;
        const rotZ = 3.2;

        return (
          <group key={i} scale={[fontSize, fontSize, fontSize]}>
            <Text3D
              position={[x / fontSize, 0, z / fontSize]}
              rotation={[rotX, rotY, rotZ]}
              height={0.09}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.01}
              bevelSize={0.005}
              bevelSegments={5}
              font="/fonts/helvetiker_regular.typeface.json"
            >
              {char}
              <meshStandardMaterial color="white" />
            </Text3D>
          </group>
        );
      })}
    </group>
  );
}



// export default function CakeView() {
  export default function CakeView({ velasEncendidas }) {

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#6b21a8" }}>
      <Canvas camera={{ position: [0, 4, 9], fov: 30 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls enableZoom={false} />

        {/* <Pastel /> */}
        <Pastel encendidas={velasEncendidas} />

        <DecoracionCircular cantidad={11} radius={1} y={-0.2} />



        <TextoCurvado text="NADHEA" radius={1.54} y={-1.3} fontSize={0.5} />


        <Text3D
          position={[-5, 1.2, 0]}
          fontSize={0.2}
          height={0.1}
          font="/fonts/helvetiker_regular.typeface.json"
        >
          HAPPY BIRTHDAY
          <meshStandardMaterial color="#fde047" />
        </Text3D>
      </Canvas>
    </div>
  );
}
