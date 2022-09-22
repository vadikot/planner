import {taskArray, categoryArray} from "./testData";

export default class Data {
    constructor() {
        this._data = this.getDataFromFile();
    }
    getDataFromFile() {
        return {
            tasks: taskArray,
            categories: categoryArray,
        };
    }
    getByName(name) {
        return this._data[name];
    }
    // cash
    // hash
    getFromLocalStorage(){}
    setFromLocalStorage(){}
    parseToJSON(){}
    parseFromJSON(){}
    show(){}
    showInHTML(){}
}