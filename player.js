s// Configurazione player audio
const audioPlayer = document.getElementById('radio-stream');
const playPauseBtn = document.getElementById('playPauseBtn');
let isPlaying = false; // Stato iniziale: pausa

// Inizializza correttamente il pulsante
playPauseBtn.textContent = 'Play';

// Controllo audio
playPauseBtn.addEventListener('click', () => {
    if(isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

// Funzione esistente per i metadati (corretta)
async function fetchRadioData() {
    try {
        const response = await fetch('https://radiokiki.airtime.pro/api/live-info');
        const data = await response.json();
        
        // Traccia CORRENTE
        const current = data.current.metadata;
        document.getElementById('current-track').textContent = current.track_title;
        document.getElementById('current-artist').textContent = current.artist_name;

        // Traccia SUCCESSIVA
        const next = data.next;
        if(next) {
            document.getElementById('next-track').textContent = next.metadata.track_title;
            document.getElementById('next-artist').textContent = next.metadata.artist_name;
        } else {
            document.getElementById('next-track').textContent = "Nothing Sheduled";
            document.getElementById('next-artist').textContent = "";
        }

    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
    }
}

// Aggiornamento metadati ogni 5 secondi
setInterval(fetchRadioData, 5000);
fetchRadioData(); // Chiamata iniziale
