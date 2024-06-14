const apiKey = 'AIzaSyD9hXkgZggng0UCiapVeu6T1QRuj0qPT6g';
const folderId = '10qHaHoxXMrRN1pkPXLkzaGxU2xLlzEpQ';

async function listFiles() {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`);
    const data = await response.json();
    return data.files;
}

async function initPlayer() {
    const tracks = await listFiles();
    const trackList = document.getElementById('track-list');
    const audioPlayer = document.getElementById('audio-player');

    tracks.forEach(track => {
        const li = document.createElement('li');
        li.textContent = track.name;
        li.onclick = () => {
            audioPlayer.src = `https://www.googleapis.com/drive/v3/files/${track.id}?alt=media&key=${apiKey}`;
            audioPlayer.play();
        };
        trackList.appendChild(li);
    });
}

initPlayer();
