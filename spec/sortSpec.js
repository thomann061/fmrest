const Sort = require('../lib/sort.js');

describe('Sort', () => {

    it('should set an obj with a key value pair', () => {
        let sort = new Sort('County', 'ascend').toObj();
        expect(sort).toEqual({ 'fieldName' : 'County', 'sortOrder': 'ascend' });
    });
});