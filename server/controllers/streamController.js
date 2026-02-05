const StreamMetadata = require('../models/StreamMetadata');
const axios = require('axios');

exports.getMetadata = (req, res) => {
    StreamMetadata.getCurrent((err, metadata) => {
        if (err) return res.status(500).send({ message: "Error retrieving metadata" });
        if (!metadata) {
            // Return default metadata if nothing found
            return res.json({
                title: "Radio Uri",
                artist: "Live Stream",
                artwork_url: "/assets/images/default-cover.jpg"
            });
        }
        res.json(metadata);
    });
};

exports.getHistory = (req, res) => {
    StreamMetadata.getHistory(10, (err, history) => {
        if (err) return res.status(500).send({ message: "Error retrieving history" });
        res.json(history);
    });
};

exports.getStatus = async (req, res) => {
    try {
        // Try to fetch status from Icecast server
        const icecastUrl = process.env.ICECAST_SERVER;
        // This is a simplified check. A real implementation might parse Icecast JSON/XML
        // For now, we assume if we can reach it, it's up.
        // Or we just return the local settings status

        // Example Icecast JSON status fetch (if enabled on server)
        // const response = await axios.get(`${icecastUrl}/status-json.xsl`);

        StreamMetadata.getSettings((err, settings) => {
            if (err) return res.status(500).json({ status: "unknown" });
            res.json({
                is_live: true, // simplified
                listeners: 0, // placeholder or fetch from Icecast
                settings
            });
        });
    } catch (error) {
        res.status(503).json({ is_live: false, message: "Stream server unreachable" });
    }
};
