require('../db');
const request = require("supertest");
const mongoose = require("mongoose");

const Location = require("../app/location/model");
const app = require('../app');


const locationOne = {
    _id: mongoose.Types.ObjectId(),
    name: 'Jakarta Selatan',
    longitude: '13.000000',
    latitude: '12.000000'
}


// Delete all data before test
beforeEach(async () => {
    await Location.deleteMany();
    await new Location(locationOne).save();
})


describe("location.js", () => {
    test("it should create location", async () => {
        // Failed
        const response = await request(app).post("/api/v1/location").send({
            name: '',
            longitude: '120.000000',
            latitude: '130.0000000'
        })

        // Name must filled
        expect(response.statusCode).toBe(500)
        expect(response.body.message).toBe("Location validation failed: name: Nama lokasi harus diisi")

        // Success
        const response2 = await request(app).post("/api/v1/location").send({
            name: 'Jakarta Pusat',
            longitude: '120.000000',
            latitude: '130.0000000'
        })

        expect(response2.body).not.toBeNull()
        expect(response2.body.data.name).toBe("Jakarta Pusat")
    })

    test("it should get all location", async () => {
        const response = await request(app).get('/api/v1/location')

        expect(response.body.data.length).toBe(1)
        expect(response.body.data[0].longitude).toBe("13.000000")
    })

    test("it should get detail location", async () => {
        const response = await request(app).get(`/api/v1/location/detail/${locationOne._id}`)

        expect(response.body.data.name).toBe("Jakarta Selatan")
    })

    test("it should update location", async () => {
        const response = await request(app).put('/api/v1/location/edit/61ead2a9316c0ce81c713088').send({
            name: 'Jakarta',
            longitude: '120.000000',
            latitude: '130.0000000'
        })

        // Invalid data
        expect(response.statusCode).toBe(404)
        expect(response.body.message).toBe('Location not found')

        // Success
        const response3 = await request(app).put(`/api/v1/location/edit/${locationOne._id}`).send({
            name: 'Jakarta',
            longitude: '120.000000',
            latitude: '130.0000000'
        })

        expect(response3.body.data.name).toBe("Jakarta")
    })

    test("it should delete location", async () => {
        const response = await request(app).delete(`/api/v1/location/delete/${locationOne._id}`)

        // Invalid data
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe('Location delete')
    })
})


afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})


// "test": "env-cmd -f ./.env.test jest ----forceExit",