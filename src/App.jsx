import { useState, useEffect } from "react";
import "./styles.css";
import funFacts from "./data/facts";
import { useOrientation } from "./hooks/useOrientation";
import { enableMic } from "./utils/mic";
import { toggleFullscreen, exitFullscreen } from "./utils/fullscreen";
import FactCard from "./components/FactCard";
import OrientationAlert from "./components/OrientationAlert";
import CakeView from "./components/CakeView";



export default function App() {
  const [fact, setFact] = useState(funFacts[0]);
  const [showNext, setShowNext] = useState(false);
  const [velasEncendidas, setVelasEncendidas] = useState(true); // 🕯️ Estado de velas
  const isPortrait = useOrientation();

  // Cambiar a CakeView Presionar el boton de continuar <<instrucciones
  useEffect(() => {
    const timer = setTimeout(() => setShowNext(true), 5_000);

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

  // Estrellas animadas
  const spawnStar = () => {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
  };

  // Salir de FS al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) exitFullscreen();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Orientación incorrecta
  if (isPortrait) return <OrientationAlert />;

  // Vista posterior (con pastel)
  if (showNext) return <CakeView velasEncendidas={velasEncendidas} />;

  // Vista inicial (tarjeta)
  return (
    <div className="app-root">
      <FactCard
        fact={fact}
        onNewFact={() =>
          setFact(funFacts[Math.floor(Math.random() * funFacts.length)])
        }
        // enableMic(() => setVelasEncendidas((prev) => !prev));
        onEnableMic={() => {
          enableMic(() => {
            spawnStar();
            // setVelasEncendidas((prev) => !prev);
            // Esperar 5 segundos y luego cambiar la vista
            // setShowNext(true);
          });
          
        }}
      />
    </div>
  );
}
