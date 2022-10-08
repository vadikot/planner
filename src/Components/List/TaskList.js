import List from "./List";
import Task from "../Task";

export default class TaskList extends List {
    constructor(items,categories) {
        super(items,categories);
    }

    addNewTask(fields) {
        const newTask = new Task(
            Date.now(),
            fields['title'],
            fields['description'],
            fields['category'],
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
                item['id'],
                item['title'],
                item['description'],
                categoryList.getItemById(item['category'].id),
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

    render(type) {
        return this.templates[type](this);
    }

    templates = {
        block(that) {
            return `
                    <div class="tasks">
                        <h2 class="task__article atricle">ToDo list:</h2>
                        <ul class='task__list list'>
                            ${that.renderItems()}
                        </ul>
                    </div>
                   `;
        },

        list(that) {
            return that.renderItems();
        },

        categoryEditForm(that, category) {
            return `
                    <form class="category__form-edit" name="categoryForm${category.id}">
                        <input class="category__form__input category__form__input-edit input" type="text" placeholder="title" name="title" value="${category.title}">
                        <input class="category__form__input category__form__input-edit input" type="text" placeholder="description" name="description" value="${category.description}">
                        <div class="save-btn btn" data-id="${category.id}">Save</div>
                    </form>
                   `;
        },
    };
}