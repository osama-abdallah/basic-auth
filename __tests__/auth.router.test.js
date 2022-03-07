"use strict";

const supertest = require('supertest');
const server = require('../src/server');
const request = supertest(server.app);
const {db} =require('../src/auth/models/users-model');


beforeAll(async ()=>{
    await db.sync();
});

afterAll(async ()=>{
    await db.drop();
});



describe('Server Testing', () => {


    it('POST to /signup to create a new user', async () => {
        const response = await request.post('/signup').send(
            {
                "username": "osama",
                "password": "1234"
            }
        );
        expect(response.status).toEqual(201);
    });

    it('POST to /signIn to create a new user', async () => {
        const response = await request.post('/signin').auth("osama","1234");

        expect(response.status).toEqual(200);
    });


});