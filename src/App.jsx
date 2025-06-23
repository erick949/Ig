import { useState, useEffect } from "react";
import "./styles.css";
import funFacts from "./data/facts";
import { useOrientation } from "./hooks/useOrientation";
import { enableMic } from "./utils/mic";
import { toggleFullscreen, exitFullscreen } from "./utils/fullscreen";
import FactCard from "./components/FactCard";
import OrientationAlert from "./components/OrientationAlert";
import CakeView  from "./components/CakeView";   // ⬅️ nuevo import

export default function App() {
  const [fact, setFact] = useState(funFacts[0]);
  const [showNext, setShowNext] = useState(false);          // ⬅️ controla la vista nueva
  const isPortrait = useOrientation();

  /* ---------- Temporizador para cambiar de vista ---------- */
  useEffect(() => {
    const timer = setTimeout(() => setShowNext(true), 10_000); // 10 s
    return () => clearTimeout(timer);
  }, []);

  /* ---------- Estrellas ---------- */
  const spawnStar = () => {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
  };

  /* ---------- Salir de FS al hacer scroll ---------- */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) exitFullscreen();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------- Orientación vertical ---------- */
  if (isPortrait) return <OrientationAlert />;

  /* ---------- Vista posterior (después de 10 s) ---------- */
  if (showNext) return <CakeView  />;

  /* ---------- Vista principal (inicial) ---------- */
  return (
    <FactCard
      fact={fact}
      onNewFact={() =>
        setFact(funFacts[Math.floor(Math.random() * funFacts.length)])
      }
      onEnableMic={() => enableMic(spawnStar)}
      onDoubleClick={toggleFullscreen}
    />
  );
}
