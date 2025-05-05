// Configurazione player audio
const audioPlayer = document.getElementById('radio-stream');
const playPauseBtn = document.getElementById('playPauseBtn');

// Toggle Play/Pause
playPauseBtn.addEventListener('click', () => {
    if(audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
});


// Controlli audio base
playBtn.addEventListener('click', () => audioPlayer.play());
pauseBtn.addEventListener('click', () => audioPlayer.pause());

// Funzione esistente per i metadati (corretta)
async function fetchRadioData() {
    try {
        const response = await fetch('https://radiokiki.airtime.pro/api/live-info');
        const data = await response.json();
        
        // Traccia CORRENTE
        document.getElementById('current-track').textContent = data.current.metadata.track_title;
        document.getElementById('current-artist').textContent = data.current.metadata.artist_name;

        // Traccia SUCCESSIVA
       if(data.next) {
            document.getElementById('next-track').textContent = data.next.metadata.track_title;
            document.getElementById('next-artist').textContent = data.next.metadata.artist_name;
        } else {
            document.getElementById('next-track').textContent = "No upcoming tracks";
        }

    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
    }
}

// Aggiornamento metadati ogni 5 secondi
setInterval(fetchRadioData, 5000);
fetchRadioData(); // Chiamata iniziale

// Correzione sintassi: rimossa la parentesi graffa e parentesi tonfa chiusa superflua alla fine
