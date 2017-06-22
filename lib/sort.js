class Sort {

    constructor(field, order) {

        this.sort = {};
        this.sort.fieldName = field;
        this.sort.sortOrder = order;
        return this;
    }

    toObj() {

        return this.sort;
    }
}

module.exports = Sort;