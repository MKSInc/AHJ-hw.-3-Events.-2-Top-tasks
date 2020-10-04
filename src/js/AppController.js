import Task from './Task';

export default class AppController {
  constructor(appDOM) {
    this.appDOM = appDOM;
    this.tasks = [];
  }

  init() {
    this.appDOM.init();

    this.appDOM.onInputListeners.push(this.onInput.bind(this));
    this.appDOM.onKeyUpListeners.push(this.onKeyUp.bind(this));
    this.appDOM.onAllTasksListClickListeners.push(this.onAllTasksListClick.bind(this));
    this.appDOM.onPinnedTasksListClickListeners.push(this.onPinnedTasksListClick.bind(this));
  }

  onInput(inputText) {
    this.appDOM.hideErrorMessage();
    this.updateAllTasksList(inputText);
  }

  updateAllTasksList(inputText) {
    const filteredTasksEls = this.getNotPinnedTasksEls()
      .filter((taskEl) => taskEl.textContent.toLowerCase().startsWith(inputText.toLowerCase()));

    if (filteredTasksEls.length === 0) this.appDOM.showAllTasksMessage();
    else this.appDOM.showAllTasksList(filteredTasksEls);
  }

  onKeyUp(code) {
    if (code === 'Enter') {
      if (this.appDOM.checkInput() === 'error') return;
      this.appDOM.hideAllTasksMessage();

      const task = new Task(this.appDOM.createTaskEl());
      this.tasks.push(task);
      this.appDOM.showAllTasksList(this.getNotPinnedTasksEls());
    }
  }

  getNotPinnedTasksEls() {
    return this.tasks
      .filter((task) => task.pinned === false)
      .map((task) => task.el);
  }

  onAllTasksListClick(target, inputText) {
    if (!target.classList.contains('pin')) return;
    const taskClick = this.tasks.find((task) => task.el === target.closest('li'));
    taskClick.pinned = true;
    this.updatePinnedTasksList();
    this.updateAllTasksList(inputText);
  }

  onPinnedTasksListClick(target, inputText) {
    if (!target.classList.contains('pin')) return;
    const taskClick = this.tasks.find((task) => task.el === target.closest('li'));
    taskClick.pinned = false;
    this.updatePinnedTasksList();
    this.updateAllTasksList(inputText);
  }

  updatePinnedTasksList() {
    const pinnedTasksEls = this.tasks
      .filter((task) => task.pinned === true)
      .map((task) => task.el);
    if (pinnedTasksEls.length === 0) this.appDOM.showPinnedTasksMessage();
    else this.appDOM.showPinnedTasksList(pinnedTasksEls);
  }
}
