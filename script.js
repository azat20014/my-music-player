document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById('audio-player');
    const playlist = document.getElementById('playlist');

    // Пример листа песен, замените URL на ссылки на ваши файлы в Google Drive
    const songs = [
        {
            name: "Песня 1",
            url: "https://drive.google.com/file/d/1e_ftdU5UEot-aYUbT5zjqgrDHyIxbNDd/view?usp=drive_link"
        },
        {
            name: "Песня 2",
            url: "https://drive.google.com/file/d/1W6yg0sDD5GZIZAnfPnwnbRvWkYBC9Htd/view?usp=drive_link"
        }
        // добавьте больше песен
    ];

    // Функция для создания плейлиста
    function createPlaylist(songs) {
        songs.forEach(song => {
            const songItem = document.createElement('div');
            songItem.textContent = song.name;
            songItem.addEventListener('click', () => {
                audioPlayer.src = song.url;
                audioPlayer.play();
            });
            playlist.appendChild(songItem);
        });
    }

    // Инициализация плейлиста
    createPlaylist(songs);
});
