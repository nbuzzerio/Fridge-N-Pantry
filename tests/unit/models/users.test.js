const { User, validateUser } = require('../../../models/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = { _id: new mongoose.Types.ObjectId().toHexString()}; 
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);

        expect(decoded).toMatchObject(payload);
    });
});

describe('validateUser', () => {
    const payload = {name: 'John', email: 'John@Doe.com', password: '12345' };

    it('should return a valid user object', () => {
        expect(validateUser(payload).value).toMatchObject(payload);
    });

    it('should return an error if payload name is invalid or missing', () => {
        payload.name = 'Jo';
        expect(validateUser(payload).error.details[0].message).toBe("\"name\" length must be at least 3 characters long");
        payload.name = Array(22).join('x');
        expect(validateUser(payload).error.details[0].message).toBe("\"name\" length must be less than or equal to 20 characters long");
        delete payload.name;
        expect(validateUser(payload).error.details[0].message).toBe("\"name\" is required");
    });
});