import List from "./List";
import Task from "../Task";

export default class TaskList extends List {
    constructor(items,categories) {
        super(items,categories);
    }

    addNewTask(...fields) {
        const newTask = new Task(
            fields['title'],
            fields['description'],
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            this.getLength() + 1
        );

        this._items.push(newTask);
    }

    parseDataToObj(items, categoryList) {
        return items.map((item, index) => {
            return new Task(
                item['title'],
                item['description'],
                categoryList.getItemById(item['categoryId']),
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                index
            );
        });
    }

    render() {
        return `
                <ul class='task__list list'>
                    <h2 class="tasks__article article">TODO list:</h2>
                    ${this.renderItems()}
                </ul>`;
    }
}