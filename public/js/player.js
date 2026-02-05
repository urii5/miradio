document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio();
    const playBtn = document.getElementById('playBtn');
    const playIcon = playBtn.querySelector('i'); // Assuming FontAwesome or similar
    const volumeSlider = document.getElementById('volumeSlider');
    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    const artwork = document.getElementById('artwork');
    const liveIndicator = document.getElementById('liveIndicator');

    let isPlaying = false;
    let streamUrl = '/radio.mp3'; // Default fallback

    // Fetch configuration from backend
    fetch('/api/stream/config')
        .then(res => res.json())
        .then(data => {
            if (data.streamUrl) {
                streamUrl = data.streamUrl;
                console.log("Stream URL configured:", streamUrl);
            }
        })
        .catch(err => console.error("Could not load stream config:", err));

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            // Reset src to stop buffering
            audio.src = '';
            playBtn.textContent = '▶'; // Simple Unicode icon
            isPlaying = false;
        } else {
            // Add timestamp to prevent caching
            audio.src = streamUrl + '?t=' + Date.now();
            audio.crossOrigin = "anonymous";
            audio.play().then(() => {
                playBtn.textContent = '⏸';
                isPlaying = true;
            }).catch(e => {
                console.error("Playback error:", e);
                playBtn.textContent = '▶';
            });
        }
    }

    playBtn.addEventListener('click', togglePlay);

    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });

    async function updateMetadata() {
        try {
            const response = await fetch('/api/stream/metadata');
            const data = await response.json();

            if (data.title !== trackTitle.textContent) {
                // Animate change
                trackTitle.style.opacity = 0;
                trackArtist.style.opacity = 0;

                setTimeout(() => {
                    trackTitle.textContent = data.title || 'Unknown Title';
                    trackArtist.textContent = data.artist || 'Unknown Artist';
                    if (data.artwork_url) {
                        artwork.src = data.artwork_url;
                    }
                    trackTitle.style.opacity = 1;
                    trackArtist.style.opacity = 1;
                }, 300);
            }
        } catch (error) {
            console.error("Error fetching metadata:", error);
        }
    }

    // Initial fetch
    updateMetadata();
    // Poll every 10 seconds
    setInterval(updateMetadata, 10000);
});
