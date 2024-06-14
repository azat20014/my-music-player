 const audioPlayer = document.getElementById('audioPlayer');
 const playlistDiv = document.getElementById('playlist');

 // Здесь укажите ссылки на ваши песни из Google Drive
 const songs = [
     {
         title: 'Песня 1',
         src: 'https://drive.google.com/uc?export=download&id=ID_ВАШЕГО_ФАЙЛА_1'
     },
     {
         title: 'Песня 2',
         src: 'https://drive.google.com/uc?export=download&id=ID_ВАШЕГО_ФАЙЛА_2'
     }
 ];

 function loadSongs() {
     songs.forEach((song, index) => {
         const button = document.createElement('button');
         button.textContent = song.title;
         button.addEventListener('click', () => playSong(index));
         playlistDiv.appendChild(button);
     });
 }

 function playSong(index) {
     audioPlayer.src = songs[index].src;
     audioPlayer.play();
 }

 loadSongs();
