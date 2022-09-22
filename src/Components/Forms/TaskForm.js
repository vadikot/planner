import Task from "../Task";
// import tas

export default class TaskForm {
    // addBtnEl.addEventListener('click', func);
    // mainEl.insertAdjacentHTML('beforeend', taskList.render());
    // mainEl.insertAdjacentHTML('beforeend', categoryList.render());
    init() {
        this.appElement = document.querySelector('#app');
        this.addHandler(); //this.initEvents();
        this.render();
    }

    initEvents() {}
    addOnPage() {
    }

    func(event) {
        event.preventDefault();
        // constructor(title, description, category, date, isFinished, startTime, pauseTime, endTime, planningTime, complexity, order) {
        const formEl = document.forms['taskForm'];
        const formItems = formEl.elements;

        const title = formItems['title'].value;
        const description = formItems['description'].value;

        let newTestTaskFromForm = new Task(title, description, 3);
        console.log(newTestTaskFromForm);


        // for (let item of formItems) {
        //     console.log(item.name + '' + item.value);
        //     // taskList
        //     console.log(item.type);
        // }
    }

    addHandler() {
        const addBtnEl = document.querySelector('.task__form__btn');

        addBtnEl.addEventListener('click', this.func);
    }

    render() {
        // console.log(1);
        // TODO: write new addHandler method that will be work without setTimeOut
        setTimeout(this.addHandler.bind(this), 100);
        return `
            <form class="task__form" name="taskForm">
                <input type="text" placeholder="title" name="title" required>
                <input type="text" placeholder="description" name="description">
                <button type="submit" class="task__form__btn">add</button>
            </form>
        `;
    }
}