async function fetchRadioData() {
    try {
        const response = await fetch('https://radiokiki.airtime.pro/api/live-info');
        const data = await response.json();

        // Controllo stato offline
        if(data.current === null && data.next === null) {
            setOfflineStatus();
            return;
        }

        // Aggiorna i metadati solo se lo stream è attivo
        updateTrackInfo(data);

    } catch (error) {
        console.error('Errore:', error);
        setOfflineStatus();
    }
}

function updateTrackInfo(data) {
    // Current Track
    const currentElement = document.getElementById('current-track');
    const currentArtist = document.getElementById('current-artist');
    
    if(data.current?.metadata) {
        currentElement.textContent = data.current.metadata.track_title;
        currentArtist.textContent = data.current.metadata.artist_name;
    } else {
        currentElement.textContent = "--- OFFLINE :c ---";
        currentArtist.textContent = "--- OFFLINE :c ---";
    }

    // Next Track
    const nextElement = document.getElementById('next-track');
    const nextArtist = document.getElementById('next-artist');
    
    if(data.next?.metadata) {
        nextElement.textContent = data.next.metadata.track_title;
        nextArtist.textContent = data.next.metadata.artist_name;
    } else {
        nextElement.textContent = "--- OFFLINE :c ---";
        nextArtist.textContent = "--- OFFLINE :c ---";
    }
}

function setOfflineStatus() {
    const offlineText = "--- OFFLINE :c ---";
    document.querySelectorAll('#current-track, #current-artist, #next-track, #next-artist')
           .forEach(el => el.textContent = offlineText);
    
    // Blocca la riproduzione
    if(!audioPlayer.paused) {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.textContent = 'Play';
    }
}
