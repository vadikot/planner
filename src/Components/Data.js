import {taskArray, categoryArray} from "./testData";

export default class Data {
    constructor(from) {
        this.from = from;
        this._data = this.getData('get', from);
    }

    getData(method, type) {
        const methodName = method + 'From' + this.toUpFirstLetter(type);

        return this[methodName]();
    }

    saveData(data, type) {
        const methodName = 'saveTo' + this.toUpFirstLetter(this.from);

        return this[methodName](data, type);
    }

    saveToFile(type, data) {
        const  jsonData = this.parseToJSON(data);

        localStorage.setItem(type, jsonData);
    }

    getFromFile() {
        return {
            tasks: taskArray,
            categories: categoryArray,
        };
    }

    saveToLocalstorage(type, data) {
        const  jsonData = this.parseToJSON(data);

        localStorage.setItem(type, jsonData);
    }

    getFromLocalstorage() {
        const isLocalstorageExist = this.isLocalstorageExist();

        if (isLocalstorageExist) {
            const tasksStr = localStorage.getItem('tasks');
            const categoriesStr = localStorage.getItem('categories');

            return {
                tasks: this.parseFromJSON(tasksStr),
                categories: this.parseFromJSON(categoriesStr),
            };
        } else {
            return {
                tasks: [],
                categories: [],
            };
        }
    }

    isLocalstorageExist() {
        if (localStorage.length === 0) {
            localStorage.setItem('categories', '[]');
            localStorage.setItem('tasks', '[]');

            return false;
        }

        return true;
    }

    getFromIndexDB() {
    }

    saveToIndexDB() {
    }

    getByName(name) {
        return this._data[name];
    }

    parseFromJSON(str) {
        return JSON.parse(str);
    }

    parseToJSON(data) {
        return JSON.stringify(data);
    }

    toUpFirstLetter(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    toLowFirstLetter(str) {
        return str[0].toLowerCase() + str.slice(1);
    }

    // hash
    show() {
    }

    showInHTML() {
    }
}