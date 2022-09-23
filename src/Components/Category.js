export default class Category {

    constructor(id, title, description, order) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.order = order;
    }

    render() {
        return `<li class='category__list__item item'>
                    ${this.title}. Описание: ${this.description}
                    <div class="category__item__btn-edit btn" data-id="${this.id}">edit</div>
                    <div class="category__item__btn-remove btn" data-id="${this.id}">remove</div>
                </li>`;
    }
}
