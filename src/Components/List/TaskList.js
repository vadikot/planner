import List from "./List";
import Task from "../Task";
import TaskForm from "../Forms/TaskForm";

export default class TaskList extends List {
    constructor(items) {
        super(items);

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

    parseDataToObj(items) {
        return items.map((item, index) => {
            return new Task(
                item['title'],
                item['description'],
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
        const addForm = new TaskForm();

        return `${addForm.render()}
                <ul class='task__list list'>
                    <h2 class="tasks__article article">TODO list:</h2>
                    ${this.renderItems()}
                </ul>`;
    }
}