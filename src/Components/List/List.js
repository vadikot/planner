export default class List {

    constructor(items) {
        this._items = this.parseDataToObj(items);
    }

    parseDataToObj(items) {
        {
            throw ": Class extended from \"List\" must implement the parseDataToObj method"
        }
    }

    // get items() {
    // }
    // set items(value) {
    // }
    getAllItems() {
        return this._items;
    }

    getItemBy(fieldName, value) {
    }

    getLength() {
        return this._items.length;
    };

    renderItems() {
        return this._items.reduce((str, item) => str + item.render(), '');
    }

    render() {
        {
            throw ": Class extended from \"List\" must implement the render method"
        }
    }
}