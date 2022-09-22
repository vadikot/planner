export default class Category {
    id = Date.now();

    constructor(title, description, order) {
        this.title = title;
        this.description = description;
        this.order = order;
    }

    render() {
        return `<li class='category__list__item item' data-id="${this.id}">
                    ${this.title}. Описание: ${this.description}
                    <div class="category__item__btn-remove btn">remove</div>
                    <div class="category__item__btn-edit btn">edit</div>
                </li>`;
    }
}
