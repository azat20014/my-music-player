const CLIENT_ID = '1067290421359-52lo6tnbbme7976hd1euvoa7dir3aqm9.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD9hXkgZggng0UCiapVeu6T1QRuj0qPT6g';
const FOLDER_ID = '10qHaHoxXMrRN1pkPXLkzaGxU2xLlzEpQ';

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        gapi.auth2.getAuthInstance().signIn().then(loadFiles);
    }, (error) => {
        console.error(JSON.stringify(error, null, 2));
    });
}

function loadFiles() {
    gapi.client.drive.files.list({
        'q': `'${FOLDER_ID}' in parents and mimeType='audio/mpeg'`,
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name)"
    }).then((response) => {
        const files = response.result.files;
        if (files && files.length > 0) {
            const fileList = document.getElementById('file-list');
            fileList.innerHTML = '';
            files.forEach((file) => {
                const div = document.createElement('div');
                div.className = 'file-item';
                div.textContent = file.name;
                div.onclick = () => playFile(file.id);
                fileList.appendChild(div);
            });
        } else {
            console.log('No files found.');
        }
    });
}

function playFile(fileId) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;
    audioPlayer.play();
}

document.body.onload = handleClientLoad;
