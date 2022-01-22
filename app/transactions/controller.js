const Transaction = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const transaction = await Transaction.find()
            .populate('location')
            .populate('connote')
            .populate('originData')
            .populate('destinationData')
            .populate('koliData.koli');
            res.status(200).json({ data: transaction });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    detailTransaction: async (req, res) => {
        try {
            const { id } = req.params;
            const transaction = await Transaction.findOne({ _id: id })
            .populate('location')
            .populate('connote')
            .populate('originData')
            .populate('destinationData')
            .populate('koliData.koli');
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction data not found' });
            }
            res.status(200).json({ data: transaction });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    createTransaction: async (req, res) => {
        try {
            const {
                customerName,
                customerCode,
                amount,
                discount,
                additionalField,
                paymentType,
                state,
                code,
                order,
                location,
                organizationId,
                paymentTypeName,
                cashAmount,
                cashChange,
                customerAttribute,
                connote,
                originData,
                destinationData,
                koliData,
                customField,
                currentLocation
            } = req.body;

            let transaction = await Transaction({
                customerName,
                customerCode,
                amount,
                discount,
                additionalField,
                paymentType,
                state,
                code,
                order,
                location,
                organizationId,
                paymentTypeName,
                cashAmount,
                cashChange,
                customerAttribute,
                connote,
                originData,
                destinationData,
                koliData,
                customField,
                currentLocation
            });
            await transaction.save();

            res.status(201).json({
                data: transaction,
                message: 'New transaction saved'
            });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    editTransaction: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                customerName,
                customerCode,
                amount,
                discount,
                additionalField,
                paymentType,
                state,
                code,
                order,
                location,
                organizationId,
                paymentTypeName,
                cashAmount,
                cashChange,
                customerAttribute,
                connote,
                originData,
                destinationData,
                koliData,
                customField,
                currentLocation
            } = req.body;

            const transaction = await Transaction.findOne({_id: id});
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }

            payload = {
                customerName,
                customerCode,
                amount,
                discount,
                additionalField,
                paymentType,
                state,
                code,
                order,
                location,
                organizationId,
                paymentTypeName,
                cashAmount,
                cashChange,
                customerAttribute,
                connote,
                originData,
                destinationData,
                koliData,
                customField,
                currentLocation
            }
            const new_transaction = await Transaction.findOneAndUpdate({_id: id}, payload, { new: true });
            res.status(201).json({ 
                data: new_transaction,
                message: 'Transaction updated'
            });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    deleteTransaction: async (req, res) => {
        try {
            const { id } = req.params;
            const transaction = await Transaction.findOne({_id: id});
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }

            await Transaction.findOneAndRemove({_id: id});
            res.status(201).json({ message: 'Transaction delete' });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    }
}
