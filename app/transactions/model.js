const mongoose = require('mongoose');

let transactionSchema = mongoose.Schema({
    customerName : {
        type: String,
        maxlength: [255, 'panjang nama customer harus antara 3 - 255 karakter'],
        minlength: [3, 'panjang nama custoner harus antara 3 - 255 karakter'],
        required: [true, 'nama harus diisi'],
    },
    customerCode : {
        type: String,
        maxlength: [10, 'panjang customerCode harus antara 3 - 10 karakter'],
        minlength: [1, 'panjang customerCode harus antara 3 - 10 karakter'],
        required: [true, 'code harus diisi'],
    },
    amount : {
        type: Number,
        default: 0,
    },
    discount : {
        type: Number,
        default: 0,
    },
    additionalField : {
        type: String,
    },
    paymentType : {
        type: Number,
        required: [true, 'tipe payment harus diisi'],
    },
    state : {
        type: String,
        required: [true, 'state harus diisi'],
    },
    code : {
        type: String,
        required: [true, 'code harus diisi'],
    },
    order : {
        type: Number,
        required: [true, 'order harus diisi'],
    },
    location : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    organizationId : {
        type: Number,
        default: 0,
    },
    paymentTypeName : {
        type: String,
        default: 0,
    },
    cashAmount : {
        type: Number,
        default: 0,
    },
    cashChange : {
        type: Number,
        default: 0,
    },
    customerAttribute : {
        type: Object,
        required: [true, 'customer attribute harus diisi'],
    },
    connote : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Connote'
    },
    originData : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    destinationData : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    koliData : [
        {
            koli : {
                type:  mongoose.Schema.Types.ObjectId,
                ref: 'Koli'
            }
        }
    ],
    customField : {
        type: Object,
    },
    currentLocation : {
        type: Object
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
