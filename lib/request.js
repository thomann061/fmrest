/**
 * Class representing a Filemaker Find Request
 */
class Request {

    /**
     * Create a new Request
     * @return {Request} - this object
     */
    constructor() {

        this.request = {};
        this.field = '';
        this.value = '';
        this.isOmitted = false;
        return this;
    }

    /**
     * Set a field name
     * @param {string} field - a filemaker field name
     * @return {Request} - this object
     */
    where(field) {
        
        this.field = field;
        return this;
    }

    /**
     * Set a value with valid filemaker operators
     * =, ==, !, <, ≤ or <=, >, ≥ or >=, ..., //, ?, @, #, *, \, "", ~
     * examples: '=fred', '!fred', '*102', '>100'
     * @param {string} value - filemaker value with any valid operators 
     * @return {Request} - this object
     */
    is(value) {

        this.value = value;
        let obj = {};
        obj[this.field] = this.value;
        Object.assign(this.request, obj);
        return this;
    }

    /**
     * Makes the Request omit records from the find (or exclusive)
     * Note: Request by default are inclusive
     * @return {Request} - this object
     */
    omit() {

        this.isOmitted = true;
        return this;
    }

    /**
     * Return the request object
     * @return {Object} - an obj with field, value keys and possibly an omit key
     */
    toObj() {

        if(this.isOmitted)
            Object.assign(this.request, {omit: 'true'});
        return this.request;
    }
}

module.exports = Request;