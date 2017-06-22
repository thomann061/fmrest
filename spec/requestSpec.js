const Request = require('../lib/request.js');

describe('Request', () => {

    it('should set an obj with a key value pair', () => {
        let request = new Request();
        let r = request.where('field').is('=value').toObj();
        expect(r).toEqual({ 'field' : '=value' });
    });

    it('should set multiple objs with a key value pair', () => {
        let request = new Request();
        let r = request.where('field').is('=value')
                        .where('field2').is('=value2').toObj();
        expect(r).toEqual({ 'field' : '=value', 'field2': '=value2' });
    });

    it('should work with omit', () => {
        let request = new Request();
        let r = request.where('field').is('=value').omit().toObj();
        expect(r).toEqual({ 'field' : '=value', 'omit': 'true' });
    });
});