// player.js
const audioPlayer = document.getElementById('radio-stream');
const playPauseBtn = document.getElementById('playPauseBtn');
let isPlaying = false;

// Funzione principale
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

// Aggiorna i metadati
function updateTrackInfo(data) {
    const setField = (id, value) => {
        const element = document.getElementById(id);
        element.textContent = value || "--- OFFLINE :c ---";
    };

    // Current Track
    if(data.current) {
        setField('current-track', data.current.metadata?.track_title);
        setField('current-artist', data.current.metadata?.artist_name);
    } else {
        setField('current-track', null);
        setField('current-artist', null);
    }

    // Next Track
    if(data.next) {
        setField('next-track', data.next.metadata?.track_title);
        setField('next-artist', data.next.metadata?.artist_name);
    } else {
        setField('next-track', null);
        setField('next-artist', null);
    }
}

// Gestione offline
function setOfflineStatus() {
    const elements = [
        'current-track', 'current-artist',
        'next-track', 'next-artist'
    ];

    elements.forEach(id => {
        document.getElementById(id).textContent = "--- OFFLINE :c ---";
    });

    if(!audioPlayer.paused) {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.textContent = 'Play';
    }
}

// Controlli play/pause
playPauseBtn.addEventListener('click', () => {
    if(isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play().catch(() => setOfflineStatus());
    }
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
});

// Aggiornamento automatico
setInterval(fetchRadioData, 5000);
fetchRadioData();
