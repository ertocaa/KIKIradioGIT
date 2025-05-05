// Configurazione player audio
const audioPlayer = document.getElementById('radio-stream');
const playPauseBtn = document.getElementById('playPauseBtn');
let isPlaying = false;

// Controllo audio unico
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

// Gestione fine traccia
audioPlayer.addEventListener('ended', () => {
    isPlaying = false;
    playPauseBtn.textContent = 'Play';
});

// Funzione metadati
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
            document.getElementById('next-track').textContent = "Nessuna traccia in programma";
            document.getElementById('next-artist').textContent = "";
        }

    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
    }
}

// Aggiornamento metadati
setInterval(fetchRadioData, 5000);
fetchRadioData();
