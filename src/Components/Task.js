import Timer from "./Timer";

export default class Task {
    constructor(id, title, description, category, isCompleted, timerData, planningTime, date, complexity, order) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.isCompleted = isCompleted;
        this.timer = new Timer(timerData);
    }

    render() {

        const timerElements = this.timer.render(this.id);

        return `<li class='task__list__item item ${this.isCompleted ? 'done' : ''} ${timerElements.cssClasses}'>
                    <p><b>${this.title}.</b> ${this.description}</p>
                    <p>Категория: ${this.category.title}</p>
                    <div class="task__item__btn-edit btn" data-id="${this.id}">edit</div>
                    <div class="task__item__btn-remove btn" data-id="${this.id}">remove</div>
                    ${timerElements.controlBntEl}
                    <div class="task-isCompleted btn" data-id="${this.id}">${this.isCompleted ? 'cancel' : 'done'}</div>
                    ${timerElements.CounterEl}
                </li>`;
    }
}
