function Goal(title, minToComplete, createdDate) {
    this.title = title;
    this.minToComplete = minToComplete;
}

Goal.prototype.showTimeToFinish = function () {
    const MIN_IN_HOUR = 60;

    return `${Math.floor(this.minToComplete / MIN_IN_HOUR)}h ${this.minToComplete % MIN_IN_HOUR}m`;
}


export default Goal;