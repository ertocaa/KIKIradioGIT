async function fetchRadioData() {
    try {
        const response = await fetch('https://radiokiki.airtime.pro/api/live-info');
        const data = await response.json();
        
        // Traccia CORRENTE
        const current = data.current.metadata;
        document.getElementById('current-track').textContent = current.track_title;
        document.getElementById('current-artist').textContent = current.artist_name;

        // Traccia SUCCESSIVA (controllo se esiste)
        const next = data.next;
        if(next) {
            document.getElementById('next-track').textContent = next.metadata.track_title;
            document.getElementById('next-artist').textContent = next.metadata.artist_name;
        } else {
            document.getElementById('next-track').textContent = "Nessuna traccia in programma";
            document.getElementById('next-artist').textContent = "";
        }

    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
    }
}
// Aggiorna i dati ogni 5 secondi
setInterval(fetchRadioData, 5000);
fetchRadioData(); // Chiamata iniziale

// Configurazione player
const audioPlayer = document.getElementById('radioStream');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

// Funzioni base
playBtn.addEventListener('click', () => {
    audioPlayer.play();
});

pauseBtn.addEventListener('click', () => {
    audioPlayer.pause();
});

// Opzionale: Disabilita il pulsante pause all'avvio
pauseBtn.disabled = true;

// Opzionale: Cambia stato pulsanti durante la riproduzione
audioPlayer.addEventListener('play', () => {
    playBtn.disabled = true;
    pauseBtn.disabled = false;
});

audioPlayer.addEventListener('pause', () => {
    playBtn.disabled = false;
    pauseBtn.disabled = true;
});
