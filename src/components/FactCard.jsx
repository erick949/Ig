export default function FactCard({ fact, onNewFact, onEnableMic, onDoubleClick }) {
  return (
    <div className="card" onDoubleClick={onDoubleClick}>
      <h2>Dato curioso del día 🪐</h2>
      <button className="button" onClick={onNewFact}>Mostrar otro</button>
      <p>{fact}</p>
      <hr className="divider" />
      <p className="small">
        Sople al micro para ver estrellas.<br />
        El permiso se solicita en cada visita.
      </p>
      <button className="button" onClick={onEnableMic}>Activar micrófono 🎤</button>
    </div>
  );
}
