 const audioPlayer = document.getElementById('audioPlayer');
 const playlistDiv = document.getElementById('playlist');

 // Здесь укажите ссылки на ваши песни из Google Drive
 const songs = [
     {
         title: 'Песня 1',
         src: 'https://drive.google.com/file/d/1e_ftdU5UEot-aYUbT5zjqgrDHyIxbNDd/view?usp=sharing'
     },
     {
         title: 'Песня 2',
         src: 'https://drive.google.com/file/d/1W6yg0sDD5GZIZAnfPnwnbRvWkYBC9Htd/view?usp=drive_link'
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
