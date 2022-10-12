import Timer from "./Timer";

export default class Task {
    constructor(id, title, description, category, isCompleted, timer, planningTime, date, complexity, order) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.isCompleted = isCompleted;
        this.timer = timer;
        this.timerObj = new Timer(timer.runTimeSec);
    }

    getTimerInfo() {
        const timerInfo = {
            className: '',
            btnTitle: 'Start timer',
            availability: this.isCompleted ? 'disable-events' : '',
        }

        if (this.timer.status === 'started') {
            timerInfo.className= 'start';
            timerInfo.btnTitle = 'Pause timer';
        }
        if (this.timer.status === 'paused') {
            timerInfo.className= 'pause';
            timerInfo.btnTitle = 'Continue timer';
        }
        timerInfo.runTime = this.getRunTime();

        return timerInfo;
    }
    getRunTime() {
        const min = Math.floor(this.timer.runTimeSec / 60);
        const h = Math.floor(min /60);
        const sec =  (this.timer.runTimeSec % 60).toFixed(0);

        return `${h}h ${min}m ${sec}s`
    }

    updateTimerOnPage() {
        console.log(lol);
    }

    render() {

        this.timerObj.init();
        const timerInfo = this.getTimerInfo();

        return `<li class='task__list__item item ${this.isCompleted ? 'done' : ''} ${timerInfo.className}'>
                    <p><b>${this.title}.</b> ${this.description}</p>
                    <p>Категория: ${this.category.title}</p>
                    <div class="timer">time: ${timerInfo.runTime}</div>
                    <div class="task__item__btn-edit btn" data-id="${this.id}">edit</div>
                    <div class="task__item__btn-remove btn" data-id="${this.id}">remove</div>
                    <div class="task-timer btn ${timerInfo.availability}" data-id="${this.id}">${timerInfo.btnTitle}</div>
                    <div class="task-isCompleted btn" data-id="${this.id}">${this.isCompleted ? 'cancel' : 'done'}</div>
                </li>`;
    }
}
