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
  /* ---------- Temporizador para cambiar de vista y doble clic global ---------- */
useEffect(() => {
  // Cambiar a CakeView después de 10 segundos
  const timer = setTimeout(() => setShowNext(true), 10_000);

  // Escuchar doble clic global para alternar pantalla completa
  const handleDoubleClick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      document.body.classList.add("fs-lock");
    } else {
      document.exitFullscreen().catch(() => {});
      document.body.classList.remove("fs-lock");
    }
  };

  document.addEventListener("dblclick", handleDoubleClick);

  return () => {
    clearTimeout(timer);
    document.removeEventListener("dblclick", handleDoubleClick);
  };
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
  <div className="app-root" >
    {isPortrait ? (
      <OrientationAlert />
    ) : showNext ? (
      <CakeView />
    ) : (
      <FactCard
        fact={fact}
        onNewFact={() =>
          setFact(funFacts[Math.floor(Math.random() * funFacts.length)])
        }
        onEnableMic={() => enableMic(spawnStar)}
      />
    )}
  </div>
);


}
