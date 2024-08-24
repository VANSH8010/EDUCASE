const express = require('express');
const connection = require('./db');
const router = express();

// POST/api/addschool   
router.post('/api/addschool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // VALIDATE INPUT
    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return res.status(400).json({ error: 'Latitude or Longitude out of range' });
    }
    const query = 'INSERT INTO style (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const values = [name, address, latitude, longitude];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const payload = {
            schoolId: results.insertId,
            name,
            address,
            latitude,
            longitude
        };

        return res.status(201).json(payload);
    });
});

// This is a Haversine formula
// Haversine formula is used to calculate the distance between user's coordinates and each school's coordinates.
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};
// // GET/api/listschool
router.get('/api/listschool', (req, res) => {
    const { latitude, longitude } = req.query;
    console.log(latitude, longitude);

    // Validate input
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const query = 'SELECT * FROM style';

    connection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Calculate distance and add it to each school
        const schoolsWithDistance = results.map(school => {
            const distance = haversineDistance(userLat, userLon, school.latitude, school.longitude);
            return { ...school, distance };
        });

        // Sort by distance
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    });
});
module.exports = router;
