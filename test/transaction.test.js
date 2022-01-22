require('../db');
const request = require("supertest");
const mongoose = require("mongoose");

const Transaction = require("../app/transactions/model");
const Location = require("../app/location/model");
const Customer = require("../app/customer/model");
const Connote = require("../app/connote/model");
const Koli = require("../app/koli/model");
const app = require('../app');
const e = require('express');

const locationOne = {
    _id: mongoose.Types.ObjectId(),
    name: 'Jakarta Selatan',
    longitude: '13.000000',
    latitude: '12.000000'
}

const customerData = [
    {
        _id: mongoose.Types.ObjectId(),
        name: "PT AMARIS HOTEL SIMPANG LIMA",
        address: "JL. KH. AHMAD DAHLAN NO. 01, SEMARANG TENGAH",
        email: null,
        phone: "024-1234567",
        addressDetail: "KOTA SEMARANG SEMARANG TENGAH KARANGKIDUL",
        zipCode: "12420",
        zoneCode: "CGKFT",
        organizationId: 6,
        location: locationOne._id
    },
    {
        _id: mongoose.Types.ObjectId(),
        name: "PT. NARA OKA PRAKARSA",
        address: "JL. KH. AHMAD DAHLAN NO. 100, SEMARANG TENGAH 12420",
        email: "info@naraoka.co.id",
        phone: "024-1234567",
        addressDetail: null,
        zipCode: "50241",
        zoneCode: "SMG",
        organizationId: 6,
        location: locationOne._id
    },
]


const connoteOne = {
    _id: mongoose.Types.ObjectId(),
    number: 3,
    service: "ECO",
    servicePrice: 7071020,
    amount: 7071030,
    code: "AWB0010020908202110",
    bookingCode: "",
    order: 326911,
    stateId: 2,
    state: "PAID",
    zoneCodeFrom: "CGK1FT",
    zoneCodeTo: "SM1G",
    surchageAmount: null,
    transaction: null,
    actualWeight: 20,
    volumeWeight: 0,
    chargeableWeight: 20,
    organizationId: 6,
    location: locationOne._id,
    totalPackage: "3",
    connoteSurchageAmount: "0",
    slaDay: "4",
    connoteLocationName: "Hub Jakarta Selatan",
    connoteLocationType: "HUB",
    sourceTarifDb: "tariff_customers",
    idSourceTarif: "1576868",
    pod: null,
    history: []
}


const koliData = [
    {
        _id: mongoose.Types.ObjectId(),
        length: 1,
        awbUrl: "https:\/\/tracking.mile.app\/label\/AWB00100209082020.9",
        chargeableWeight: 9,
        width: 0,
        height: 0,
        description: "V WARP",
        formulaId: null,
        connote: connoteOne._id,
        volume: 0,
        weight: 9,
        customField: {
            "awbSicepat": "http://sicepat.com/item1",
            "hargaBarang": 20000
        },
        code: "AWB00100209082020.59"
    },
    {
        _id: mongoose.Types.ObjectId(),
        length: 1,
        awbUrl: "https:\/\/tracking.mile.app\/label\/AWB00100209082020.9",
        chargeableWeight: 3,
        width: 100,
        height: 100,
        description: "V WARP",
        formulaId: null,
        connote: connoteOne._id,
        volume: 0,
        weight: 9,
        customField: {
            "awbSicepat": "http://sicepat.com/item1",
            "hargaBarang": 30000
        },
        code: "AWB00100209082020.50"
    },

]

transactionOne = {
    _id: mongoose.Types.ObjectId(),
    customerName: "PT. Mile",
    customerCode: "1678593",
    amount: "70700",
    discount: "0",
    additionalField: "",
    paymentType: "29",
    state: "PAID",
    code: "CGKFT20200715121",
    order: 121,
    location: locationOne._id,
    organizationId: 6,
    paymentTypeName: "Invoice",
    cashAmount: 0,
    cashChange: 0,
    customerAttribute: {
        Nama_Sales: "Radit Fitrawikarsa",
        TOP: "14 Hari",
        Jenis_Pelanggan: "B2B"
    },
    connote: connoteOne._id,
    originData: customerData[0]._id,
    destinationData: customerData[1]._id,
    koliData: [
        {
            koli: koliData[0]._id,
        }
    ],
    customField: {
        catatan_tambahan: "JANGAN DI BANTING \/ DI TINDIH"
    },
    currentLocation: {
        name: "Hub Jakarta Selatan",
        code: "JKTS01",
        type: "Agent"
    }
}


// Delete all data before test
beforeEach(async () => {
    await Location.deleteMany();
    await Customer.deleteMany();
    await Connote.deleteMany();
    await Koli.deleteMany();
    await Transaction.deleteMany();
    await new Location(locationOne).save();
    await new Connote(connoteOne).save();
    await Customer.create(customerData);
    await Koli.create(koliData);
    await new Transaction(transactionOne).save();
})


describe("customer.js", () => {
    test("it should create location", async () => {

        payload = {
            customerName: "o",
            customerCode: "1678593",
            amount: "70700",
            discount: "0",
            additionalField: "",
            paymentType: "29",
            state: "PAID",
            code: "CGKFT20200715121",
            order: 121,
            location: locationOne._id,
            organizationId: 6,
            paymentTypeName: "Invoice",
            cashAmount: 0,
            cashChange: 0,
            customerAttribute: {
                Nama_Sales: "Radit Fitrawikarsa",
                TOP: "14 Hari",
                Jenis_Pelanggan: "B2B"
            },
            connote: connoteOne._id,
            originData: customerData[0]._id,
            destinationData: customerData[1]._id,
            koliData: [
                {
                    koli: koliData[0]._id,
                }
            ],
            customField: {
                catatan_tambahan: "JANGAN DI BANTING \/ DI TINDIH"
            },
            currentLocation: {
                name: "Hub Jakarta Selatan",
                code: "JKTS01",
                type: "Agent"
            }
        }

        //Failed
        let response = await request(app).post("/api/v1/transaction").send(payload)

        // Customer Name must between 3 and 255 characters
        expect(response.statusCode).toBe(500)
        expect(response.body.message).toBe('Transaction validation failed: customerName: panjang nama custoner harus antara 3 - 255 karakter')

        payload.customerName = "PT. ABCA"
        payload.customerCode = ""
        response = await request(app).post("/api/v1/transaction").send(payload)

        // Customer Code required
        expect(response.statusCode).toBe(500)
        expect(response.body.message).toBe('Transaction validation failed: customerCode: code harus diisi')

        payload.customerName = "PT. ABCA"
        payload.customerCode = "0909990901291290129012"
        response = await request(app).post("/api/v1/transaction").send(payload)
        // Customer Code must be between 3 and 255 characters
        expect(response.statusCode).toBe(500)
        expect(response.body.message).toBe('Transaction validation failed: customerCode: panjang customerCode harus antara 3 - 10 karakter')

        // Success
        payload.customerCode = "1678593"
        response = await request(app).post("/api/v1/transaction").send(payload)

        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe('New transaction saved')
        expect(response.body.data.customerCode).toBe('1678593')
        expect(response.body.data.customerName).toBe('PT. ABCA')
        expect(response.body.data.customerAttribute.Jenis_Pelanggan).toBe('B2B')
        expect(response.body.data.code).toBe('CGKFT20200715121')
    })

    test("it should get all transaction", async () => {
        const response = await request(app).get('/api/v1/transaction')

        expect(response.statusCode).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.data[0].customerName).toBe("PT. Mile")
    })

    test("it should get detail transaction", async () => {
        let response = await request(app).get('/api/v1/transaction/detail/61eb42b8bf4134644a4be522')

        // Invalid ID
        expect(response.statusCode).toBe(404)

        response = await request(app).get(`/api/v1/transaction/detail/${transactionOne._id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.data.customerName).toBe("PT. Mile")
        expect(response.body.data.customerCode).toBe("1678593")
    })

    test("it should update transaction", async () => {
        payload = {
            customerName: "PT. ZBACB",
            customerCode: "10000",
            amount: "50000",
            discount: "0",
            additionalField: "",
            paymentType: "29",
            state: "PAID",
            code: "CGKFT20200715121",
            order: 121,
            location: locationOne._id,
            organizationId: 6,
            paymentTypeName: "Invoice",
            cashAmount: 0,
            cashChange: 0,
            customerAttribute: {
                Nama_Sales: "User Test",
                TOP: "30 Hari",
                Jenis_Pelanggan: "B2B"
            },
            connote: connoteOne._id,
            originData: customerData[0]._id,
            destinationData: customerData[1]._id,
            koliData: [
                {
                    koli: koliData[0]._id,
                }
            ],
            customField: {
                catatan_tambahan: "JANGAN DI BANTING \/ DI TINDIH"
            },
            currentLocation: {
                name: "Hub Jakarta Selatan",
                code: "JKTS01",
                type: "Agent"
            }
        }
        let response = await request(app).put(`/api/v1/transaction/edit/${transactionOne._id}`).send(payload)

        // Success
        expect(response.statusCode).toBe(201)
        expect(response.body.data.customerName).toBe('PT. ZBACB')
        expect(response.body.data.customerCode).toBe('10000')
        expect(response.body.data.customerAttribute.Nama_Sales).toBe('User Test')
        expect(response.body.data.customerAttribute.TOP).toBe('30 Hari')


        // Fail
        response = await request(app).put('/api/v1/transaction/edit/61eb42b8bf4134644a4be522').send({
            payload
        })

        // Invalid data
        expect(response.statusCode).toBe(404)
        expect(response.body.message).toBe('Transaction not found')

    })

    test("it should patch transaction", async () => {
        expect(transactionOne.currentLocation.name).toBe("Hub Jakarta Selatan")
        expect(transactionOne.currentLocation.code).toBe("JKTS01")
        expect(transactionOne.currentLocation.type).toBe("Agent")

        let response = await request(app).patch(`/api/v1/transaction/edit/${transactionOne._id}`).send({
            currentLocation: {
                name: "Hub Jakarta Barat",
                code: "JKT501",
                type: "Warehouse"
            }
        })

        // Success
        expect(response.statusCode).toBe(201)
        expect(response.body.data.currentLocation.name).toBe("Hub Jakarta Barat")
        expect(response.body.data.currentLocation.code).toBe("JKT501")
        expect(response.body.data.currentLocation.type).toBe("Warehouse")
        expect(response.body.message).toBe('Transaction updated')
    })

    test("it should delete location", async () => {
        const response = await request(app).delete(`/api/v1/transaction/delete/${transactionOne._id}`)

        // Invalid data
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe('Transaction delete')
    })
})
