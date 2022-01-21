const Connote = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const connote = await Connote.find();
            res.status(200).json({ data: connote });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    detailConnote: async (req, res) => {
        try {
            const { id } = req.params;
            const connote = await Connote.findOne({ _id: id });
            if (!connote) {
                return res.status(404).json({ message: 'Connote data not found' });
            }
            res.status(200).json({ data: connote });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    createConnote: async (req, res) => {
        try {
            const {
                number,
                service,
                servicePrice,
                code,
                bookingCode,
                order,
                stateId,
                zoneCodeFrom,
                zoneCodeTo,
                surchageAmount,
                transaction,
                actualWeight,
                volumeWeight,
                chargeableWeight,
                organizationId,
                location,
                totalPackage,
                connoteSurchageAmount,
                slaDay,
                connoteLocationName,
                connoteLocationType,
                sourceTarifDb,
                idSourceTarif,
                pod,
                history
            } = req.body;

            let state = 'UNPAID';
            if (stateId == 1) {
                state == "ON PROGRESS";
            } else if (stateId == 2) {
                state == "PAID";
            }
            let connote = await Connote({
                number,
                service,
                servicePrice,
                code,
                bookingCode,
                order,
                stateId,
                state,
                zoneCodeFrom,
                zoneCodeTo,
                surchageAmount,
                transaction,
                actualWeight,
                volumeWeight,
                chargeableWeight,
                organizationId,
                location,
                totalPackage,
                connoteSurchageAmount,
                slaDay,
                connoteLocationName,
                connoteLocationType,
                sourceTarifDb,
                idSourceTarif,
                pod,
                history
            });
            await connote.save();

            res.status(201).json({
                data: connote,
                message: 'New connote saved'
            });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    editConnote: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                number,
                service,
                servicePrice,
                code,
                bookingCode,
                order,
                stateId,
                zoneCodeFrom,
                zoneCodeTo,
                surchageAmount,
                transaction,
                actualWeight,
                volumeWeight,
                chargeableWeight,
                organizationId,
                location,
                totalPackage,
                connoteSurchageAmount,
                slaDay,
                connoteLocationName,
                connoteLocationType,
                sourceTarifDb,
                idSourceTarif,
                pod,
                history
            } = req.body;

            let state = 'UNPAID';
            if (stateId == 1) {
                state == "ON PROGRESS";
            } else if (stateId == 2) {
                state == "PAID";
            }
            const connote = await Connote.findOne({_id: id});
            if (!connote) {
                return res.status(404).json({ message: 'Connote not found' });
            }

            payload = { number,
                service,
                servicePrice,
                code,
                bookingCode,
                order,
                stateId,
                zoneCodeFrom,
                zoneCodeTo,
                surchageAmount,
                transaction,
                actualWeight,
                volumeWeight,
                chargeableWeight,
                organizationId,
                location,
                totalPackage,
                connoteSurchageAmount,
                slaDay,
                connoteLocationName,
                connoteLocationType,
                sourceTarifDb,
                idSourceTarif,
                pod,
                history
            }
            const new_connote = await Connote.findOneAndUpdate({_id: id}, payload, { new: true });
            res.status(201).json({ 
                data: new_connote,
                message: 'Connote updated'
            });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    deleteConnote: async (req, res) => {
        try {
            const { id } = req.params;
            const connote = await Connote.findOne({_id: id});
            if (!connote) {
                return res.status(404).json({ message: 'Connote not found' });
            }

            await Connote.findOneAndRemove({_id: id});
            res.status(201).json({ message: 'Connote delete' });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    }
}
