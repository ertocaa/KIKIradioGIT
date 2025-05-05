async function updateMetadata() {
    try {
        const response = await fetch('https://radiokiki.airtime.pro/api/live-info');
        const data = await response.json();
        
        // Estrai i dati della traccia corrente
        const currentTrack = data.current.metadata.track_title || "Traccia sconosciuta";
        const currentArtist = data.current.metadata.artist_name || "Artista sconosciuto";
        
        // Estrai i dati della prossima traccia (se disponibili)
        let nextTrack = "Nessuna traccia in coda";
        let nextArtist = "";
        
        if(data.next && data.next.metadata) {
            nextTrack = data.next.metadata.track_title;
            nextArtist = data.next.metadata.artist_name;
        }

        // Aggiorna il DOM
        document.getElementById('current-track').textContent = currentTrack;
        document.getElementById('current-artist').textContent = currentArtist;
        document.getElementById('next-track').textContent = nextTrack;
        document.getElementById('next-artist').textContent = nextArtist;

    } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
        document.getElementById('current-track').textContent = "Errore nel caricamento";
    }
}

// Aggiorna ogni 5 secondi e all'avvio
setInterval(updateMetadata, 5000);
window.addEventListener('DOMContentLoaded', updateMetadata);
