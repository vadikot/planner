import Data from "./Data";
import CategoryList from "./List/CategoryList";
import TaskList from "./List/TaskList";
import {categoryForm} from "./Forms/CategoryForm";

const app = {
    el: document.querySelector('.app .app__container'),
    settings: {},
    init() {
        try {

            // this.data = new Data('localstorage');
            this.data = new Data('file');

            this.categoryList = new CategoryList(this.data.getByName('categories'));
            this.insertBlock('.first-block', 'category', 'block', true);
            // если вставлять форму намного ниже, то все работает, если это делать тут, то выбивает ошибку
            setTimeout(()=>this.insertBlock('.second-block', 'form', 'addCategory', true),0); //ну или так, так тоже работает
            // this.insertBlock('.second-block', 'form', 'addCategory', true);




            this.taskList = new TaskList(this.data.getByName('tasks'), this.categoryList);
            this.insertBlock('.third-block', 'task', 'block', false);

            this.categoryForm = categoryForm;

            this.insertBlock('.first-block', 'category', 'block', true);


            // this.insertBlock('.second-block', 'category', 'addForm', true);



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

        switch (name) {
            case 'category': {
                usedObj = this.categoryList;
                break;
            }
            case 'task': {
                usedObj = this.taskList;
                break;
            }
            case 'form': {
                usedObj = this.categoryForm;
                break;
            }
            default: {
                throw `Oops, we cant add your element. Check the passed parameters in the "insertBlock" method.`;
            }
        }

        // categoryForm.render('.categories', this.data, this.categoryList);

        createdElement.element = usedObj.render(type);

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