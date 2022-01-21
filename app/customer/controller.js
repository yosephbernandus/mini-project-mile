const Customer = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const customer = await Customer.find();
            res.status(200).json({ data: customer });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    detailCustomer: async (req, res) => {
        try {
            const { id } = req.params;
            const customer = await Customer.findOne({ _id: id });
            if (!customer) {
                return res.status(404).json({ message: 'Customer data not found' });
            }
            res.status(200).json({ data: customer });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    createCustomer: async (req, res) => {
        try {
            const { name, address, email, phone, addressDetail, zipCode, zoneCode, organizationId } = req.body;

            let customer = await Customer({ name, address, email, phone, addressDetail, zipCode, zoneCode, organizationId });
            await customer.save();

            res.status(201).json({
                data: customer,
                message: 'New customer saved'
            });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    editCustomer: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, address, email, phone, addressDetail, zipCode, zoneCode, organizationId } = req.body;
            const customer = await Customer.findOne({_id: id});
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            payload = { name, address, email, phone, addressDetail, zipCode, zoneCode, organizationId }
            const new_customer = await Customer.findOneAndUpdate({_id: id}, payload, { new: true });
            res.status(201).json({ 
                data: new_customer,
                message: 'Customer updated'
            });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    },

    deleteCustomer: async (req, res) => {
        try {
            const { id } = req.params;
            const customer = await Customer.findOne({_id: id});
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            await Customer.findOneAndRemove({_id: id});
            res.status(201).json({ message: 'Customer delete' });
        } catch (err) {
            res.status(500).json({message: err.message || 'Internal server error'});
        }
    }
}
