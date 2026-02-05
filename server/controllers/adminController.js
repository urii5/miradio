const StreamMetadata = require('../models/StreamMetadata');
const axios = require('axios');

exports.updateMetadata = (req, res) => {
    const { title, artist, album, artwork_url } = req.body;

    if (!title || !artist) {
        return res.status(400).send({ message: "Title and Artist are required" });
    }

    StreamMetadata.update(title, artist, album, artwork_url, (err, result) => {
        if (err) return res.status(500).send({ message: "Error updating metadata" });

        // Optional: Update Icecast metadata via its admin API here if needed
        // axios.get(`${process.env.ICECAST_SERVER}/admin/metadata?mount=${process.env.STREAM_MOUNT}&mode=updinfo&song=${encodeURIComponent(artist + ' - ' + title)}`, {
        //     auth: { username: process.env.ICECAST_ADMIN_USER, password: process.env.ICECAST_ADMIN_PASSWORD }
        // });

        res.json({ message: "Metadata updated successfully", data: result });
    });
};

exports.updateSettings = (req, res) => {
    const { key, value } = req.body;
    StreamMetadata.updateSetting(key, value, (err) => {
        if (err) return res.status(500).send({ message: "Error updating setting" });
        res.json({ message: "Setting updated" });
    });
};

exports.getStats = async (req, res) => {
    // Fetch real stats from Icecast
    try {
        // Mock response for now, or implement real axios call to Icecast
        // const response = await axios.get(...)
        res.json({
            listeners: 12,
            peak_listeners: 45,
            stream_uptime: "2d 4h 12m"
        });
    } catch (error) {
        res.status(500).json({ message: "Could not fetch stats" });
    }
};
