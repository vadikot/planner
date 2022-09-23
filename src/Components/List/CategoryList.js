import List from "./List";
import Category from "../Category";

export default class CategoryList extends List {
    constructor(items) {
        super(items);
    }

    addNewCategory(...fields) {
        const newTask = new Category(
            Date.now(),
            fields[0],
            fields[1],
            this.getLength() + 1
        );

        this._items.push(newTask);
    }

    del() {
        const btns = document.querySelectorAll('.category__item__btn-remove');
        // console.log(btns);

        // console.log('category removed')

        // user = el.dataset.user;

    }

    updateListOnPage() {
        const categoryListEl = document.querySelector('.category__list');
        categoryListEl.innerHTML=this.render('list');
    }

    listener(event) {
        if (event.target.classList.contains('category__item__btn-remove')) {

            const categoryArrayIndex = this._items.findIndex(item => item.id === parseInt(event.target.dataset.id));
            this._items.splice(categoryArrayIndex, 1);

            this.updateListOnPage();
        }

        if (event.target.classList.contains('category__item__btn-edit')) {
            const categoryArrayIndex = this._items.findIndex(item => item.id === parseInt(event.target.dataset.id));
            let changedCategory = this.getAllItems()[categoryArrayIndex];
            let changeForm=`
                            <form class="category__form-edit" name="categoryForm${changedCategory.id}">
                                <input class="category__form__input category__form__input-edit input" type="text" placeholder="title" name="title" value="${changedCategory.title}">
                                <input class="category__form__input category__form__input-edit input" type="text" placeholder="description" name="description" value="${changedCategory.description}">
                                <div class="save-btn btn" data-id="${changedCategory.id}">Save</div>
                            </form>
                            `;

            let parent = event.target.closest('.category__list__item');
            parent.insertAdjacentHTML('afterbegin',changeForm);
        }
        if (event.target.classList.contains('save-btn')) {
            this.saveChanges(event.target.dataset.id);
        }

    }

    saveChanges(id) {
        const categoryArrayIndex = this._items.findIndex(item => item.id === parseInt(id));
        let changedCategory = this.getAllItems()[categoryArrayIndex];
        let formName = 'categoryForm'+id;
        const formElements = document.forms[formName].elements;

        changedCategory.title = formElements['title'].value;
        changedCategory.description = formElements['description'].value;

        //Update categories on page
        this.updateListOnPage();
    }

    addHandler() {
        console.log(document.querySelector('.categories'));
        document.querySelector('.categories').onclick = this.listener.bind(this);
    }

    parseDataToObj(items) {
        return items.map((item, index) => {
            return new Category(item['id'], item['title'], item['description'], index);
        });
    }

    render(type) {
        // setTimeout(() => this.del(), 500);

        switch (type) {
            case 'block':
                return `
                        <div class="categories">
                            <h2 class="category__article atricle">Categories items:</h2>
                            <ul class='category__list list'>
                                ${this.renderItems()}
                            </ul>
                        </div>
                        `;
            case 'list':
                return `${this.renderItems()}`;
            case 'select':
                return `
                        <select name="categories">
                            ${this.getAllItems().reduce((str,item)=> str+'<option value="'+item.id+'">'+item.title+'</option>', '')}
                        </select>
                        `;
        }
    }
}