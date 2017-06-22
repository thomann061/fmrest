const Global = require('../lib/global.js');

describe('Global', () => {

    it('should set an obj with a key value pair', () => {
        let global = new Global('label', 'Food').toObj();
        expect(global).toEqual({ 'label': 'Food' });
    });
});