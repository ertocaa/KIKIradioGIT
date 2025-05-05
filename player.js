// Configurazione elementi
const audioPlayer = document.getElementById('radio-stream');
const playPauseBtn = document.getElementById('playPauseBtn');
let isPlaying = false; // Stato iniziale: pausa

// Funzione principale per i metadati
async function fetchRadioData() {
    try {
        const response = await fetch('https://radiokiki.airtime.pro/api/live-info');
        const data = await response.json();

        // Controllo stato offline
        if(data.current === null && data.next === null) {
            setOfflineStatus();
        } else {
            updateTrackInfo(data);
        }

    } catch (error) {
        setOfflineStatus();
    }
}

// Aggiorna i testi delle tracce
function updateTrackInfo(data) {
    // Funzione helper per impostare i testi
    const setField = (id, value) => {
        const element = document.getElementById(id);
        element.textContent = value || "--- OFFLINE :c ---";
    };

    // Current Track
    setField('current-track', data.current?.metadata?.track_title);
    setField('current-artist', data.current?.metadata?.artist_name);

    // Next Track
    setField('next-track', data.next?.metadata?.track_title);
    setField('next-artist', data.next?.metadata?.artist_name);
}

// Imposta stato offline solo sui testi
function setOfflineStatus() {
    const elements = [
        'current-track', 'current-artist',
        'next-track', 'next-artist'
    ];
    elements.forEach(id => {
        document.getElementById(id).textContent = "--- OFFLINE :c ---";
    });
}

// Gestione play/pause indipendente dallo stato offline
playPauseBtn.addEventListener('click', () => {
    if(isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play().catch(error => {
            console.log('Errore riproduzione:', error);
        });
    }
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
});

// Sincronizza stato con eventi nativi
audioPlayer.addEventListener('playing', () => {
    isPlaying = true;
    playPauseBtn.textContent = 'Pause';
});

audioPlayer.addEventListener('pause', () => {
    isPlaying = false;
    playPauseBtn.textContent = 'Play';
});

// Aggiornamento metadati ogni 5 secondi
setInterval(fetchRadioData, 5000);
fetchRadioData(); // Chiamata iniziale
