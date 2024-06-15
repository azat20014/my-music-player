const apiKey = 'ВАШ_API_KEY'; // Ваш API ключ Google
const folderId = 'ВАШ_FOLDER_ID'; // ID папки в Google Drive

const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const repeatBtn = document.getElementById('repeat-btn');

let currentTrackIndex = 0;
let playlist = [];

function fetchPlaylist() {
    fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        playlist = data.files;
        if (playlist.length > 0) {
            loadTrack(currentTrackIndex);
        }
    })
    .catch(error => console.error('Error fetching playlist:', error));
}

function loadTrack(index) {
    const track = playlist[index];
    trackTitle.textContent = track.name;
    // Дополнительно можно извлечь и установить информацию об исполнителе
    trackArtist.textContent = 'Неизвестный исполнитель'; // Это статическое значение для примера
    audioSource.src = `https://www.googleapis.com/drive/v3/files/${track.id}?alt=media&key=${apiKey}`;
    audioPlayer.load();
}

audioPlayer.addEventListener('ended', () => {
    if (currentTrackIndex < playlist.length - 1) {
        currentTrackIndex++;
        loadTrack(currentTrackIndex);
    }
});

repeatBtn.addEventListener('click', () => {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
});

document.addEventListener('DOMContentLoaded', () => {
    fetchPlaylist();
});
