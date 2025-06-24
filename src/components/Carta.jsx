import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Carta({ position = [0, 0, 0], folded = true }) {
  const leftPageRef = useRef();

  // Ángulo inicial de la hoja doblada
  let initialRotation = folded ? Math.PI / 2 : 0;

  return (
    <group position={position}>
      {/* Página derecha (fija) */}
      <mesh position={[0.25, 0, 0]}>
        <planeGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#ffffff" side={2} />
      </mesh>

      {/* Página izquierda (doblada sobre la derecha) */}
      <mesh
        ref={leftPageRef}
        position={[-0.25, 0, 0]}
        rotation={[0, initialRotation, 0]}
      >
        <planeGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#ffffff" side={2} />
      </mesh>
    </group>
  );
}
