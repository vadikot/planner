export default class Task {
    constructor(id, title, description, category, date, isFinished, startTime, pauseTime, endTime, planningTime, complexity, order) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
    }

    render() {
        return `<li class='task__list__item item'>
                    <p><b>${this.title}.</b> ${this.description}</p>
                    <p>Категория: ${this.category.title}</p>
                    <div class="task__item__btn-edit btn" data-id="${this.id}">edit</div>
                    <div class="task__item__btn-remove btn" data-id="${this.id}">remove</div>
                </li>`;
    }
}
