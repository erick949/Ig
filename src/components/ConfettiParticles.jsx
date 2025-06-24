// src/components/ConfettiParticles.js
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function ConfettiParticles({ count = 100 }) {
  const groupRef = useRef();
  const [particles, setParticles] = useState([]);

  // Generar partículas aleatorias
  useEffect(() => {
    const newParticles = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      position: [
        (Math.random() - 0.5) * 5, // X aleatorio entre -2.5 y 2.5
        Math.random() * 5 + 2, // Y entre 2 y 7 para que caigan desde arriba
        (Math.random() - 0.5) * 5, // Z aleatorio
      ],
      velocity: [
        (Math.random() - 0.5) * 0.02, // Velocidad lateral
        -0.02 - Math.random() * 0.01, // Velocidad hacia abajo
        (Math.random() - 0.5) * 0.02, // Velocidad lateral Z
      ],
      color: ["#FFC107", "#FF4081", "#4CAF50", "#2196F3", "#9C27B0"][
        Math.floor(Math.random() * 5)
      ],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
    }));

    setParticles(newParticles);
  }, [count]);

  // Animación
  useFrame(() => {
    particles.forEach((particle) => {
      // Movimiento
      particle.position[0] += particle.velocity[0];
      particle.position[1] += particle.velocity[1];
      particle.position[2] += particle.velocity[2];

      // Rotación
      particle.rotation += particle.rotationSpeed;

      // Si cae fuera de la vista, reinícialo arriba
      if (particle.position[1] < -2) {
        particle.position[1] = Math.random() * 5 + 2;
        particle.position[0] = (Math.random() - 0.5) * 5;
        particle.position[2] = (Math.random() - 0.5) * 5;
      }
    });

    // Obligamos a React Three Fiber a actualizar
    if (groupRef.current) {
      groupRef.current.children.forEach((mesh, idx) => {
        const p = particles[idx];
        mesh.position.set(...p.position);
        mesh.rotation.y = p.rotation;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position} rotation={[0, particle.rotation, 0]}>
          <boxGeometry args={[0.05, 0.05, 0.01]} />
          <meshStandardMaterial color={particle.color} />
        </mesh>
      ))}
    </group>
  );
}
