export default class Task {
    id = Date.now();

    constructor(title, description, category, date, isFinished, startTime, pauseTime, endTime, planningTime, complexity, order) {
        this.title = title;
        this.description = description;
        this.order = order;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    setTitle(value) {
        this.title = value;
    }
    render() {
        return `<li class='task__list__item item'>${this.title}. Описание: ${this.description}</li>`;
    }
}
