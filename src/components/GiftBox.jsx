import React from "react";

export default function GiftBox({ position = [0, 0, 0], size = 1 }) {
  return (
    <group position={position}>
      {/* Caja base */}
      <mesh position={[0, size / 2, 0]}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color="#ff4d4d" />
      </mesh>

      {/* Tapa */}
      <mesh position={[0, size + 0.05, 0]}>
        <boxGeometry args={[size * 1.05, 0.2, size * 1.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Listón vertical */}
      <mesh position={[0, size / 2, 0]}>
        <boxGeometry args={[size * 0.1, size * 1.1, size * 1.1]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>

      {/* Listón horizontal */}
      <mesh position={[0, size / 2, 0]}>
        <boxGeometry args={[size * 1.1, size * 1.1, size * 0.1]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>

      {/* Lazo (simple) */}
      <mesh position={[0, size + 0.2, 0]}>
        <torusGeometry args={[0.15, 0.05, 16, 100]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
    </group>
  );
}
