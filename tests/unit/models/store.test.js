const { validateStore } = require('../../../models/store');

describe('validateStore', () => {
    beforeEach(() => {
        payload = {name: 'Walmart', location: 'Springfield', isleLocation: 1};
    });
    let payload;

    it('should return a valid store object', () => {
        expect(validateStore(payload).value).toMatchObject(payload);
    });
})