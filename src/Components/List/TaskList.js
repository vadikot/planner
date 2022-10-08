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

    updateAllNodeItems() {
        const taskListEl = document.querySelector('.task__list');
        taskListEl.innerHTML=this.render('list');
    }

    updateNodeItem() {}

    // in listener we bind app this, otherwise we can't work with DATA object
    // or better send "this" like "that"  -   ??????
    handler(event) {
        const clickedItemID = event.target.dataset.id;

        if (event.target.classList.contains('task__item__btn-remove')) {
            this.taskList.removeItemById(clickedItemID);
            this.taskList.updateAllNodeItems();
            this.data.saveData('tasks', this.taskList.getAllItems());
        }

        if (event.target.classList.contains('task__item__btn-edit')) {
            this.taskList.openTaskEditForm(clickedItemID, event, this);
        }

        if (event.target.classList.contains('save-btn')) {
            this.taskList.saveChanges(clickedItemID, this);
            this.data.saveData('tasks', this.taskList.getAllItems());
        }

    }

    openTaskEditForm(id, event, thisApp) {
        const changedTask = this.getItemById(id);

        console.log(changedTask);

        const categorySelect = thisApp.categoryList.render('select');

        const taskEditForm= this.render('taskEditForm', changedTask, categorySelect);
        const changedItemEl = event.target.closest('.task__list__item');

        changedItemEl.insertAdjacentHTML('afterbegin',taskEditForm);
    }

    saveChanges(id, thisApp) {
        const changedTask = this.getItemById(id)
        const formName = 'taskForm'+id;
        const formElements = document.forms[formName].elements;

        changedTask.title = formElements['title'].value;
        changedTask.description = formElements['description'].value;

        const selectedCategoryIndex= formElements['categories'].selectedIndex;
        const selectedCategoryID = formElements['categories'][selectedCategoryIndex].value;
        const selectedCategory = thisApp.categoryList.getItemById(selectedCategoryID);

        changedTask.category = {
            id: selectedCategory.id,
            title: selectedCategory.title,
        };

        this.updateAllNodeItems();
    }

    render(type, ...args) {
        return this.templates[type](this, ...args);
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

        taskEditForm(that, task, categorySelect) {
            return `
                    <form class="task__form-edit" name="taskForm${task.id}">
                        <input class="task__form__input task__form__input-edit input" type="text" placeholder="title" name="title" value="${task.title}">
                        <input class="task__form__input task__form__input-edit input" type="text" placeholder="description" name="description" value="${task.description}">
                        ${categorySelect}
                        <div class="save-btn btn" data-id="${task.id}">Save</div>
                    </form>
                   `;
        },
    };
}