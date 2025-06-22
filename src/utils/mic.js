export const enableMic = (spawnStarRef) => {
  const THRESHOLD = 0.18;
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 4096;
  analyser.smoothingTimeConstant = 0.7;

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const interval = setInterval(() => {
      analyser.getByteTimeDomainData(dataArray);
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = (dataArray[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / bufferLength);
      if (rms > THRESHOLD) spawnStarRef();
    }, 150);
  }).catch(() => {
    alert("No se pudo acceder al micrófono.");
  });
};
