const Koli = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const koli = await Koli.find();
            res.status(200).json({ data: koli });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    detailKoli: async (req, res) => {
        try {
            const { id } = req.params;
            const koli = await Koli.findOne({ _id: id });
            if (!koli) {
                return res.status(404).json({ message: 'Koli data not found' });
            }
            res.status(200).json({ data: koli });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    createKoli: async (req, res) => {
        try {
            const { length, awbUrl, chargeableWeight, width, surcharge, height, description, formulaId, connote, weight, customField, code } = req.body;

            let koli = await Koli({ length, awbUrl, chargeableWeight, width, surcharge, height, description, formulaId, connote, weight, customField, code });
            await koli.save();

            res.status(201).json({
                data: koli,
                message: 'New koli saved'
            });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    editKoli: async (req, res) => {
        try {
            const { id } = req.params;
            const { length, awbUrl, chargeableWeight, width, surcharge, height, description, formulaId, connote, weight, customField, code } = req.body;
            const koli = await Koli.findOne({_id: id});
            if (!koli) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            payload = { length, awbUrl, chargeableWeight, width, surcharge, height, description, formulaId, connote, weight, customField, code }
            const new_koli = await Koli.findOneAndUpdate({_id: id}, payload, { new: true });
            res.status(201).json({ 
                data: new_koli,
                message: 'Koli updated'
            });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    deleteKoli: async (req, res) => {
        try {
            const { id } = req.params;
            const koli = await Koli.findOne({_id: id});
            if (!koli) {
                return res.status(404).json({ message: 'Koli not found' });
            }

            await Koli.findOneAndRemove({_id: id});
            res.status(201).json({ message: 'Koli delete' });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    }
}
