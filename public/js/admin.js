document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login';
        return;
    }

    // Logout logic
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    });

    // Sections
    const updateForm = document.getElementById('updateMetadataForm');
    const statusMsg = document.getElementById('statusMsg');

    async function fetchStats() {
        try {
            const response = await fetch('/api/admin/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
                return;
            }
            const data = await response.json();

            document.getElementById('liveListeners').textContent = data.listeners || 0;
            document.getElementById('uptime').textContent = data.stream_uptime || '0m';
        } catch (error) {
            console.error("Stats error", error);
        }
    }

    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('metaTitle').value;
        const artist = document.getElementById('metaArtist').value;
        const album = document.getElementById('metaAlbum').value;
        const artwork = document.getElementById('metaArtwork').value;

        try {
            const response = await fetch('/api/admin/metadata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, artist, album, artwork_url: artwork })
            });

            if (response.ok) {
                statusMsg.textContent = "Metadata Updated Successfully!";
                statusMsg.style.color = "#4ade80";
                setTimeout(() => statusMsg.textContent = '', 3000);
            } else {
                statusMsg.textContent = "Update failed.";
                statusMsg.style.color = "#ef4444";
            }
        } catch (error) {
            statusMsg.textContent = "Error network";
        }
    });

    // Initial load
    fetchStats();
    // Refresh stats
    setInterval(fetchStats, 10000);
});
