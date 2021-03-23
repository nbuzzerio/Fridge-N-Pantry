const { User, validateUser } = require('../../../models/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { before } = require('lodash');
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
    beforeEach(() => {
        payload = {name: 'John', email: 'John@Doe.com', password: '12345' };
    })
    let payload;

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

    it('should return an error if payload email is invalid or missing', () => {
        payload.email = 'ThisIsNotAnEmailAddress';
        expect(validateUser(payload).error.details[0].message).toBe("\"email\" must be a valid email");
        payload.email = 'Jo@g';
        expect(validateUser(payload).error.details[0].message).toBe("\"email\" length must be at least 5 characters long");
        payload.email = Array(52).join('x');
        expect(validateUser(payload).error.details[0].message).toBe("\"email\" length must be less than or equal to 50 characters long");
        delete payload.email;
        expect(validateUser(payload).error.details[0].message).toBe("\"email\" is required");
    });

    it('should return an error if payload password is invalid or missing', () => {
        payload.password = '1234';
        expect(validateUser(payload).error.details[0].message).toBe("\"password\" length must be at least 5 characters long");
        payload.password = Array(1026).join('x');
        expect(validateUser(payload).error.details[0].message).toBe("\"password\" length must be less than or equal to 1024 characters long");
        delete payload.password;
        expect(validateUser(payload).error.details[0].message).toBe("\"password\" is required");
    });
});