export default class List {

    constructor(items, categories) {
        this._items = this.parseDataToObj(items, categories);
    }

    parseDataToObj(items, subItems) {
        {
            throw ": Class extended from \"List\" must implement the parseDataToObj method"
        }
    }

    getIndexById(id) {
        return this._items.findIndex(item => parseInt(item.id) === parseInt(id));
    }

    removeItemById(id) {
        this._items.splice(this.getIndexById(id), 1);
    }

    getItemById(id) {
        return this._items[this.getIndexById(id)];
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