const { validateStore } = require('../../../models/store');

describe('validateStore', () => {
    beforeEach(() => {
        payload = {name: 'Walmart', location: 'Springfield', isleLocation: 1};
    });
    let payload;

    it('should return a valid store object', () => {
        expect(validateStore(payload).value).toMatchObject(payload);
    });

    it('should return an error if payload name is invalid or missing', () => {
        payload.name = 'Shop';
        expect(validateStore(payload).error.details[0].message).toBe("\"name\" length must be at least 5 characters long");
        payload.name = Array(102).join('x');
        expect(validateStore(payload).error.details[0].message).toBe("\"name\" length must be less than or equal to 100 characters long");
        delete payload.name;
        expect(validateStore(payload).error.details[0].message).toBe("\"name\" is required");
    });

    it('should return an error if payload location is invalid or missing', () => {
        payload.location = '1234';
        expect(validateStore(payload).error.details[0].message).toBe("\"location\" length must be at least 5 characters long");
        payload.location = Array(102).join('x');
        expect(validateStore(payload).error.details[0].message).toBe("\"location\" length must be less than or equal to 100 characters long");
        delete payload.location;
        expect(validateStore(payload).error.details[0].message).toBe("\"location\" is required");
    });

    it('should return an error if payload isleLocation is invalid or missing', () => {
        payload.isleLocation = -1;
        expect(validateStore(payload).error.details[0].message).toBe("\"isleLocation\" must be greater than or equal to 0");
        payload.isleLocation = 256;
        expect(validateStore(payload).error.details[0].message).toBe("\"isleLocation\" must be less than or equal to 255");
        delete payload.isleLocation;
        expect(validateStore(payload).error.details[0].message).toBe("\"isleLocation\" is required");
    });
});