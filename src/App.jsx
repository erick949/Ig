import { useEffect, useRef, useState } from "react";
import "./styles.css";

/* ---------- Datos curiosos ---------- */
const funFacts = [
  "Los pulpos tienen tres corazones.",
  "El 90 % de la población mundial vive en el hemisferio norte.",
  "Los cacahuates no son frutos secos, sino legumbres.",
  "La miel nunca caduca: se han encontrado tarros de más de 3 000 años comestibles.",
  "Saturno flotaría en agua… ¡si cupiera en una bañera lo bastante grande!",
  "Las vacas tienen mejores amigas y se estresan si se separan.",
  "Las huellas de la lengua son únicas, como las dactilares.",
  "El corazón de una ballena azul puede ser tan grande como un coche pequeño.",
  "Las abejas pueden reconocer rostros humanos.",
  "Los flamencos no nacen rosados; su color viene de su dieta.",
  "Los tiburones existen desde antes que los árboles.",
  "Un día en Venus dura más que un año en Venus.",
  "La letra más usada en español es la 'e'.",
  "Los koalas tienen huellas digitales casi idénticas a las humanas.",
  "Los camarones mantis pueden ver 12 colores primarios, los humanos solo 3.",
  "Hay más combinaciones de una baraja que átomos en la Tierra.",
  "El cuerpo humano brilla débilmente, pero 1 000 × menos de lo visible.",
  "Las cebras son negras con rayas blancas, no al revés.",
  "Las jirafas duermen apenas 10-20 min seguidos.",
  "La nariz humana distingue más de un billón de olores.",
  "Compartimos ~60 % del ADN con los plátanos.",
  "Los árboles se comunican por redes de hongos bajo tierra.",
  "Las estrellas de mar no tienen cerebro ni sangre.",
  "Las mariposas saborean con las patas.",
  "El pez payaso cambia de sexo si la hembra alfa muere.",
  "La Torre Eiffel crece hasta 15 cm en verano por dilatación térmica."
];

export default function App() {
  const [fact, setFact] = useState(funFacts[0]);
  const [isPortrait, setIsPortrait] = useState(false);
  const audioCtx = useRef(null);
  const analyser = useRef(null);
  const dataArray = useRef(null);
  const detectInterval = useRef(null);

  const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    document.body.classList.add("fs-lock");
  } else {
    document.exitFullscreen().catch(() => {});
    document.body.classList.remove("fs-lock");
  }
};

  // Cambiar dato curioso
  const newFact = () => {
    const next = funFacts[Math.floor(Math.random() * funFacts.length)];
    setFact(next);
  };

  // Crear estrella
  const spawnStar = () => {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
  };

  // Activar micrófono
  const enableMic = async () => {
    const THRESHOLD = 0.18;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.current.createMediaStreamSource(stream);

      analyser.current = audioCtx.current.createAnalyser();
      analyser.current.fftSize = 4096;
      analyser.current.smoothingTimeConstant = 0.7;

      source.connect(analyser.current);
      const bufferLength = analyser.current.fftSize;
      dataArray.current = new Uint8Array(bufferLength);

      detectInterval.current = setInterval(() => {
        analyser.current.getByteTimeDomainData(dataArray.current);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = (dataArray.current[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / bufferLength);
        if (rms > THRESHOLD) spawnStar();
      }, 150);
    } catch {
      alert("No se pudo acceder al micrófono.");
    }
  };

  // Limpieza al salir
  useEffect(() => {
    return () => {
      clearInterval(detectInterval.current);
      audioCtx.current && audioCtx.current.close();
    };
  }, []);
// Detectar orientación
useEffect(() => {
  const checkOrientation = () => {
    const portrait = window.innerHeight > window.innerWidth;
    setIsPortrait(portrait);
  };

  checkOrientation();
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("orientationchange", checkOrientation);

  return () => {
    window.removeEventListener("resize", checkOrientation);
    window.removeEventListener("orientationchange", checkOrientation);
  };
}, []);

// Funciones para pantalla completa
const tryEnterFullscreen = () => {
  if (!document.fullscreenElement && !isPortrait) {
    document.documentElement.requestFullscreen().catch(() => {});
    document.body.classList.add("fs-lock");
  }
};

const exitFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
    document.body.classList.remove("fs-lock");
  }
};

// Salir de pantalla completa al hacer scroll
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 40) {
      exitFullscreen();
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Mostrar aviso si está en vertical
if (isPortrait) {
  return (
    <div className="orientation-warning">
      <p>
        🔄 Gira tu dispositivo a <strong>horizontal</strong><br />
        para la experiencia completa.
      </p>
    </div>
  );
}

// Contenido principal
return (
  <div className="card" onDoubleClick={toggleFullscreen}>
    <h2>Dato curioso del día 🪐</h2>
    <button className="button" onClick={newFact}>
      Mostrar otro
    </button>
    <p>{fact}</p>
    <hr className="divider" />
    <p className="small">
      Sople al micro para ver estrellas.<br />
      El permiso se solicita en cada visita.
    </p>
    <button className="button" onClick={enableMic}>
      Activar micrófono 🎤
    </button>
  </div>
);


}
