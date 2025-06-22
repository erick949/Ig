import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import "./styles.css";

const funFacts = [
  "Los pulpos tienen tres corazones.",
  "El 90 % de la población mundial vive en el hemisferio norte.",
  "Los cacahuates no son frutos secos, sino legumbres.",
  "La miel nunca caduca: se han encontrado tarros de más de 3 000 años comestibles.",
  "Saturno flotaría en agua… ¡si cupiera en una bañera lo bastante grande!",
  "Las vacas tienen mejores amigas y se estresan si se separan.",
  "Las huellas de la lengua son únicas, como las dactilares.",
  "El corazón de una ballena azul puede ser tan grande como un auto pequeño.",
  "Las abejas pueden reconocer rostros humanos.",
  "Los flamencos no nacen rosados; su color viene de su dieta.",
  "Los tiburones existen desde antes que los árboles.",
  "Un día en Venus dura más que un año en Venus.",
  "La letra más usada en español es la 'e'.",
  "Los koalas tienen huellas digitales casi idénticas a las humanas.",
  "Los camarones mantis pueden ver 12 colores primarios, los humanos solo 3.",
  "Hay más posibles combinaciones de una baraja de cartas que átomos en la Tierra.",
  "El cuerpo humano brilla levemente, pero es 1,000 veces más débil que lo que el ojo puede ver.",
  "Las cebras son negras con rayas blancas, no al revés.",
  "Las jirafas solo duermen entre 10 y 20 minutos por vez.",
  "La nariz humana puede distinguir más de un billón de olores diferentes.",
  "El ADN humano es un 60 % similar al de un plátano.",
  "Los árboles pueden comunicarse entre sí a través de redes de hongos en el suelo.",
  "Las estrellas de mar no tienen cerebro ni sangre.",
  "Las mariposas pueden saborear con sus patas.",
  "El pez payaso cambia de sexo si la hembra alfa muere.",
  "La Torre Eiffel puede crecer hasta 15 cm en verano por el calor."
];


function App() {
  const [fact, setFact] = useState(funFacts[0]);

  const getRandomFact = () => {
    const next = funFacts[Math.floor(Math.random() * funFacts.length)];
    setFact(next);
  };

  return (
    <div className="card">
      <h2>Dato curioso del día 🪐</h2>

      <button className="button" onClick={getRandomFact}>
        Mostrar otro
      </button>

      <p>{fact}</p>
    </div>
  );
}

export default App;
