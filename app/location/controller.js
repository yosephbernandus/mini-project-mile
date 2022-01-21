const Location = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const location = await Location.find();
            res.status(200).json({ data: location });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    detailLocation: async (req, res) => {
        try {
            const { id } = req.params;
            const location = await Location.findOne({ _id: id });
            if (!location) {
                return res.status(404).json({ message: 'Location not found' });
            }
            res.status(200).json({ data: location });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    createLocation: async (req, res) => {
        try {
            const { name, longitude, latitude } = req.body;

            let location = await Location({ name, longitude, latitude });
            await location.save();

            res.status(201).json({ 
                data: location,
                message: 'New location saved'
            });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    editLocation: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, longitude, latitude } = req.body;
            const location = await Location.findOne({_id: id});
            if (!location) {
                return res.status(404).json({ message: 'Location not found' });
            }
            const new_location = await Location.findOneAndUpdate({_id: id}, {name, longitude, latitude}, { new: true });
            res.status(201).json({ 
                data: new_location,
                message: 'Location updated'
            });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    deleteLocation: async (req, res) => {
        try {
            const { id } = req.params;
            const location = await Location.findOne({_id: id});
            if (!location) {
                return res.status(404).json({ message: 'Location not found' });
            }

            await Location.findOneAndRemove({_id: id});
            res.status(201).json({ message: 'Location delete' });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    }
}
