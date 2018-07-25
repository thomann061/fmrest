const Portal = require('../lib/portal.js');

describe('Portal', () => {

    it('should set an obj with a key value pair', () => {
        let portal = new Portal('portal1').toObj();
        expect(portal).toEqual({ 'name' : 'portal1', 'offset': null, 'limit': null });
    });

    it('should set an obj with a key value pair with optional parameters', () => {
        let portal = new Portal('portal1', 1, 1).toObj();
        expect(portal).toEqual({ 'name' : 'portal1', 'offset': 1, 'limit': 1 });
    });
});