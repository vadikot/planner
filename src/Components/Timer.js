export default class Timer {
    constructor(data, isCompleted) {
        this.status = data.status; // none / started / paused
        this.startTime = data.startTime;
        this.runTimeSec = data.runTimeSec;
    }

    start(clickedTaskEl, clickedTaskElBtn) {

        if (this.status === 'none') {
            const timerCounterEl = `<div class="timer-counter">0:0:0</div>`;

            clickedTaskEl.insertAdjacentHTML('beforeend', timerCounterEl);
            this.timerEl = clickedTaskEl.querySelector('.timer-counter');

            this.interval = setInterval(() => {
                this.runTimeSec++;
                this.displayOnPage();
            }, 1000);
        }

        if (this.status === 'paused') {
            this.timerEl = clickedTaskEl.querySelector('.timer-counter');
            this.interval = setInterval(() => {
                this.runTimeSec++;
                this.displayOnPage();
            }, 1000);

        }

        this.status = 'started';

        clickedTaskEl.classList.add('start');
        clickedTaskEl.classList.remove('pause');
        clickedTaskElBtn.innerHTML = 'Pause timer';
    }

    stop(clickedTaskEl, clickedTaskElBtn) {
        this.status = 'paused';
        clearInterval(this.interval);

        clickedTaskEl.classList.add('pause');
        clickedTaskEl.classList.remove('start');
        clickedTaskElBtn.innerHTML = 'Continue timer';
    }

    // string like 'h:m' or 'h:m:s' & etc.
    getTimeInGivingFormat(template) {
        const min = Math.floor(this.runTimeSec / 60);
        const h = Math.floor(min / 60);
        const sec = (this.runTimeSec % 60).toFixed(0);

        let formattedTime = template.replace('h', h);
        formattedTime = formattedTime.replace('m', min);
        formattedTime = formattedTime.replace('s', sec);

        return formattedTime;
    }

    displayOnPage() {
        const timeFormat = 'h:m:s';

        this.timerEl.innerHTML = this.getTimeInGivingFormat(timeFormat);
    }

    render(taskID) {
        const timerInfo = {
            cssClasses: '',
            availability: this.isCompleted ? 'disable-events' : '',

            controlBntEl: '',
            CounterEl: '',
        }

        if (this.status === 'none') {
            timerInfo.cssClasses = '';
            timerInfo.btnTitle = 'Pause timer';

            timerInfo.controlBntEl = `
                <div class="task-timer btn" data-id="${taskID}">Start timer</div>
            `;
            timerInfo.CounterEl = ``;
        }

        if (this.status === 'started') {
            this.status = 'paused'

            timerInfo.cssClasses = 'pause';
            timerInfo.controlBntEl = `
                <div class="task-timer btn" data-id="${taskID}">Continue timer</div>
            `;
            timerInfo.CounterEl = `
                <div class="timer-counter">${this.getTimeInGivingFormat('h:m:s')}</div>
            `;
        }

        if (this.status === 'paused') {
            timerInfo.cssClasses = 'pause';
            timerInfo.controlBntEl = `
                <div class="task-timer btn" data-id="${taskID}">Continue timer</div>
            `;
            timerInfo.CounterEl = `
                <div class="timer-counter">${this.getTimeInGivingFormat('h:m:s')}</div>
            `;
        }

        return timerInfo;
    }
}