import Data from "./Data";
import CategoryList from "./List/CategoryList";
import TaskList from "./List/TaskList";
import {categoryForm} from "./Forms/CategoryForm";
import {taskForm} from "./Forms/TaskForm";

const app = {
    el: document.querySelector('.app .app__container'),
    settings: {},
    init() {
        try {

            // this.data = new Data('file');
            this.data = new Data('localstorage');

            // insert CategoryList
            this.categoryList = new CategoryList(this.data.getByName('categories'));
            this.insertBlock('.third-block', 'category', 'block', true);

            // insert TaskList
            this.taskList = new TaskList(this.data.getByName('tasks'), this.categoryList);
            this.insertBlock('.fourth-block', 'task', 'block', true);

            // insert form for adding a CATEGORY
            this.categoryForm = categoryForm;
            this.insertBlock('.first-block', 'category', 'form', true);

            // insert form for adding a TASK
            this.taskForm = taskForm;
            this.insertBlock('.second-block', 'task', 'form', true);


            // categoryForm.render('.categories', this.data, this.categoryList);
            this.insertBlock('.second-block', 'form', 'addCategory', true);





        } catch (e) {
            console.error(e);
        }
    },

    /**
     * Creating & inserting elements on page.
     *
     * @param {string} where CSS class name.
     * @param {string} what category, task, goal $ etc.
     * @param {string} type block/select/form/list.
     * @param {boolean} isListener true - add listener. default - false.
     * @return {string} block/select/form/list.
     */
    insertBlock(where, what, type, isListener = false) {
        const whereInsertEl = document.querySelector(where);
        const newEl = this.returnElement(what, type, isListener);

        whereInsertEl.insertAdjacentHTML('beforeend', newEl.element);

        if (isListener && newEl.handler !== null) {
            // Need to rewrite the code
            // If two or more elements are inserted in one <div>,
            // then all listeners will only be added to the first child element
            let insertedEl = whereInsertEl.firstElementChild;
            insertedEl.addEventListener('click', newEl.handler.bind(this));
        }
    },

    returnElement(name, type, isListener) {
        const createdElement = {
            element: null,
            handler: null,
        };
        let usedObj;
        let someData;

        switch (name) {
            case 'category': {
                if (type==='form') {
                    usedObj = this.categoryForm;
                } else {
                    usedObj = this.categoryList;
                }
                break;
            }
            case 'task': {
                usedObj = this.taskList;
                if (type==='form') {
                    usedObj = this.taskForm;
                    someData = this.categoryList.render('select');
                } else {
                    usedObj = this.taskList;
                }
                break;
            }
            case '': {

                break;
            }
            default: {
                throw `Oops, we cant add your element. Check the passed parameters in the "insertBlock" method.`;
            }
        }



        createdElement.element = usedObj.render(type, someData);

        if (isListener) {
            if ('handler' in usedObj) {
                createdElement.handler = usedObj.handler;
            } else {
                throw `Error in "returnElement" method; Listener not founded.`;
            }
        }


        return createdElement;
    }
}

export default app;