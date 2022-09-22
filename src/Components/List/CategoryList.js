import List from "./List";
import Category from "../Category";
import Task from "../Task";

export default class CategoryList extends List {
    constructor(items) {
        super(items);
    }

    addNewCategory(...fields) {
        const newTask = new Category(
            fields[0],
            fields[1],
            this.getLength() + 1
        );

        this._items.push(newTask);
    }

    del() {
        const btns =document.querySelectorAll('.category__item__btn-remove');
        console.log(btns);

        console.log('category removed')

        // user = el.dataset.user;

    }

    parseDataToObj(items) {
        return items.map((item, index) => {
            return new Category(item['title'], item['description'], index);
        });
    }

    render(onlyItems = false) {

        // category__item__btn-remove
        // category__item__btn-edit
        // setTimeout(()=>console.log(111), 500);
        setTimeout(()=>this.del(), 500);
        if (!onlyItems) {
            return `
                <div class="categories">
                    <h2 class="category__article atricle">Categories items:</h2>
                    <ul class='category__list list'>
                        ${this.renderItems()}
                    </ul>
                </div>
        `;
        } else {
            return `${this.renderItems()}`;
        }
    }
}