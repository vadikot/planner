import Data from "./Data";
import CategoryList from "./List/CategoryList";
import {categoryForm} from "./Forms/CategoryForm";

const app = {
    el: document.querySelector('.app .app__container'),
    settings: {},
    init() {
        try {

            this.data = new Data('localstorage');
            this.categoryList = new CategoryList(this.data.getByName('categories'));

            this.insertBlock('.first-block', 'category', 'block', true);

            // this.insertBlock('.second-block', 'form', 'addCategory', true);
            // this.insertBlock('.second-block', 'category', 'addForm', true);


            categoryForm.render('.categories', this.data, this.categoryList);


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
                break;
            }
            case 'form': {
                usedObj = this.categoryForm;
                categoryForm.render('.categories', this.data, this.categoryList);
                break;
            }
            default: {
                throw `Oops, we cant add your element. Check the passed parameters in the "insertBlock" method.`;
            }
        }

        createdElement.element = usedObj.render(type);

        if (isListener) {
            if ('handler' in this.categoryList) {
                createdElement.handler = this.categoryList.handler;
            } else {
                throw `Error in "returnElement" method; Listener not founded.`;
            }
        }


        return createdElement;
    }
}

export default app;