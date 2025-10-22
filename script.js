// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const videoUrl = urlParams.get('url');
const fileName = urlParams.get('name') || 'Unknown File';

// Display filename
document.getElementById('filename').textContent = decodeURIComponent(fileName);

// Load video
const player = document.getElementById('player');
if (videoUrl) {
    // Fetch direct link from TechVJ API
    fetch(`https://techlinkapi.vercel.app/getLink?link=${videoUrl}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success' && data.directLink) {
                player.src = data.directLink;
            } else {
                player.src = decodeURIComponent(videoUrl);
            }
        })
        .catch(err => {
            console.error('Error loading video:', err);
            player.src = decodeURIComponent(videoUrl);
        });
} else {
    alert('No video URL provided!');
}

// Player functions
function playVideo(playerType) {
    const videoSrc = player.src;
    let intent = '';
    
    switch(playerType) {
        case 'vlc':
            intent = `vlc://${videoSrc}`;
            break;
        case 'mx':
            intent = `intent:${videoSrc}#Intent;package=com.mxtech.videoplayer.ad;end`;
            break;
        case 'play':
            intent = `playerjs://play?url=${encodeURIComponent(videoSrc)}`;
            break;
        case 'km':
            intent = `kmplayer://play?url=${encodeURIComponent(videoSrc)}`;
            break;
        case 's':
            intent = `splayer://play?url=${encodeURIComponent(videoSrc)}`;
            break;
        case 'hd':
            intent = `hdplayer://play?url=${encodeURIComponent(videoSrc)}`;
            break;
    }
    
    window.location.href = intent;
}

function downloadVideo() {
    const a = document.createElement('a');
    a.href = player.src;
    a.download = fileName;
    a.click();
}
