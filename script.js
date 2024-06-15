document.addEventListener('DOMContentLoaded', function () {
    const folderId = 'YOUR_FOLDER_ID_HERE';
    const apiKey = 'YOUR_API_KEY_HERE';
    const audio = new Audio();
    let trackList = [];
    let currentTrackIndex = 0;

    // Получаем список файлов из Google Drive
    fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            trackList = data.files.filter(file => file.mimeType === 'audio/mpeg');
            if (trackList.length > 0) {
                loadTrack(currentTrackIndex);
            } else {
                alert('Нет доступных аудиофайлов.');
            }
        });

    function loadTrack(index) {
        if (index >= 0 && index < trackList.length) {
            const track = trackList[index];
            audio.src = `https://www.googleapis.com/drive/v3/files/${track.id}?alt=media&key=${apiKey}`;
            document.getElementById('track-title').textContent = track.name;
        }
    }

    document.getElementById('play').addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    document.getElementById('prev').addEventListener('click', function () {
        currentTrackIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
        loadTrack(currentTrackIndex);
        audio.play();
    });

    document.getElementById('next').addEventListener('click', function () {
        currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
        loadTrack(currentTrackIndex);
        audio.play();
    });

    audio.addEventListener('ended', function () {
        currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
        loadTrack(currentTrackIndex);
        audio.play();
    });
});
