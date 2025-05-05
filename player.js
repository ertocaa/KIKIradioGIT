// Configurazione player
const audioPlayer = document.getElementById('radio-stream');
const playPauseBtn = document.getElementById('playPauseBtn');
let isPlaying = false;

// Debug iniziale
console.log('Elementi trovati:', {
    audioPlayer,
    playPauseBtn,
    currentTrack: document.getElementById('current-track'),
    currentArtist: document.getElementById('current-artist'),
    nextTrack: document.getElementById('next-track'),
    nextArtist: document.getElementById('next-artist')
});

// Controllo play/pause
playPauseBtn.addEventListener('click', () => {
    console.log('Stato pre-click:', {isPlaying, paused: audioPlayer.paused});
    if(isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play().catch(err => {
            console.error('Errore riproduzione:', err);
            setOfflineStatus();
        });
    }
    isPlaying = !isPlaying;
    updateButtonState();
});

// Aggiornamento interfaccia
function updateButtonState() {
    playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
    console.log('Nuovo stato pulsante:', {isPlaying, text: playPauseBtn.textContent});
}

// Gestione metadati
async function fetchRadioData() {
    try {
        console.log('Inizio fetch metadati...');
        const response = await fetch('https://radiokiki.airtime.pro/api/live-info');
        const data = await response.json();
        console.log('Dati API:', data);

        if(!data.current && !data.next) {
            console.log('Rilevato stato offline via API');
            setOfflineStatus();
        } else {
            updateTrackInfo(data);
            if(!isPlaying) {
                console.log('Ripristino stato play');
                isPlaying = true;
                updateButtonState();
            }
        }

    } catch (error) {
        console.error('Errore fetch:', error);
        setOfflineStatus();
    }
}

// Aggiorna i testi
function updateTrackInfo(data) {
    console.log('Aggiornamento tracce con:', data);
    const setText = (elementId, text) => {
        const el = document.getElementById(elementId);
        if(el) el.textContent = text || '--- OFFLINE :c ---';
    };

    setText('current-track', data.current?.metadata?.track_title);
    setText('current-artist', data.current?.metadata?.artist_name);
    setText('next-track', data.next?.metadata?.track_title);
    setText('next-artist', data.next?.metadata?.artist_name);
}

// Gestione offline
function setOfflineStatus() {
    console.log('Attivazione modalità offline');
    ['current-track', 'current-artist', 'next-track', 'next-artist'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.textContent = '--- OFFLINE :c ---';
    });

    if(isPlaying) {
        console.log('Forzatura stop riproduzione');
        audioPlayer.pause();
        isPlaying = false;
        updateButtonState();
    }
}

// Controlli automatici
audioPlayer.addEventListener('playing', () => {
    console.log('Evento playing attivato');
    isPlaying = true;
    updateButtonState();
});

audioPlayer.addEventListener('pause', () => {
    console.log('Evento pause attivato');
    isPlaying = false;
    updateButtonState();
});

// Avvia il sistema
setInterval(fetchRadioData, 5000);
fetchRadioData();
