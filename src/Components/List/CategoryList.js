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

    updateAllNodeItems() {
        const categoryListEl = document.querySelector('.category__list');
        categoryListEl.innerHTML=this.render('list');
    }

    updateNodeItem() {}

    // in listener we bind app this, otherwise we can't work with DATA object
    handler(event) {
        const clickedItemID = event.target.dataset.id;

        if (event.target.classList.contains('category__item__btn-remove')) {
            this.categoryList.removeItemById(clickedItemID);
            this.categoryList.updateAllNodeItems();
            this.data.saveData('categories', this.categoryList.getAllItems());
        }

        if (event.target.classList.contains('category__item__btn-edit')) {
            this.categoryList.openCategoryEditForm(clickedItemID, event);
        }

        if (event.target.classList.contains('save-btn')) {
            this.categoryList.saveChanges(clickedItemID);
            this.data.saveData('categories', this.categoryList.getAllItems());
        }

    }

     openCategoryEditForm(id, event) {
         const changedCategory = this.getItemById(id)
         const categoryEditForm= this.render('categoryEditForm', changedCategory);
         const changedItemEl = event.target.closest('.category__list__item');

         changedItemEl.insertAdjacentHTML('afterbegin',categoryEditForm);
     }

    saveChanges(id) {
        const changedCategory = this.getItemById(id)
        const formName = 'categoryForm'+id;
        const formElements = document.forms[formName].elements;

        changedCategory.title = formElements['title'].value;
        changedCategory.description = formElements['description'].value;

        this.updateAllNodeItems();
    }

    parseDataToObj(items) {
        return items.map((item, index) => {
            return new Category(item['id'], item['title'], item['description'], index);
        });
    }

    render(templateName, ...args) {
        return this.templates[templateName](this, ...args);
    }

    templates = {
        block(that) {
            return `
                    <div class="categories">
                        <h2 class="category__article atricle">Categories items:</h2>
                        <ul class='category__list list'>
                            ${that.renderItems()}
                        </ul>
                    </div>
                   `;
        },

        list(that) {
            return that.renderItems();
        },

        select(that){
            return `
                    <select name="categories">
                        ${that.getAllItems().reduce((str,item)=> str+'<option value="'+item.id+'">'+item.title+'</option>', '')}
                    </select>
                   `
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