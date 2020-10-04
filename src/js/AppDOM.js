export default class AppDOM {
  constructor() {
    this.els = {
      input: null,
      errorMessage: null,
      pinnedTasksList: null,
      pinnedTasksMessage: null,
      allTasksList: null,
      allTasksMessage: null,
    };
    this.onInputListeners = [];
    this.onKeyUpListeners = [];
    this.onAllTasksListClickListeners = [];
    this.onPinnedTasksListClickListeners = [];
  }

  init() {
    this.els.input = document.querySelector('input');
    this.els.input.addEventListener('input', this.onInput.bind(this));
    this.els.input.addEventListener('keyup', this.onKeyUp.bind(this));

    this.els.errorMessage = document.querySelector('.error-message');

    this.els.pinnedTasksList = document.querySelector('.pinned-tasks-list');
    this.els.pinnedTasksList.addEventListener('click', this.onPinnedTasksListClick.bind(this));

    this.els.pinnedTasksMessage = document.querySelector('.pinned-tasks .message');

    this.els.allTasksList = document.querySelector('.all-tasks-list');
    this.els.allTasksList.addEventListener('click', this.onAllTasksListClick.bind(this));

    this.els.allTasksMessage = document.querySelector('.all-tasks .message');
  }

  onInput() {
    this.onInputListeners.forEach((callback) => callback(this.els.input.value));
  }

  onKeyUp(event) {
    this.onKeyUpListeners.forEach((callback) => callback(event.code));
  }

  onAllTasksListClick(event) {
    this.onAllTasksListClickListeners
      .forEach((callback) => callback(event.target, this.els.input.value));
  }

  onPinnedTasksListClick(event) {
    this.onPinnedTasksListClickListeners
      .forEach((callback) => callback(event.target, this.els.input.value));
  }

  hideErrorMessage() {
    this.els.errorMessage.classList.add('hidden');
  }

  showErrorMessage() {
    this.els.errorMessage.classList.remove('hidden');
  }

  hideAllTasksMessage() {
    this.els.allTasksMessage.classList.add('hidden');
  }

  showAllTasksMessage() {
    this.els.allTasksMessage.classList.remove('hidden');
    this.els.allTasksList.innerHTML = '';
  }

  hidePinnedTasksMessage() {
    this.els.pinnedTasksMessage.classList.add('hidden');
  }

  showPinnedTasksMessage() {
    this.els.pinnedTasksMessage.classList.remove('hidden');
    this.els.pinnedTasksList.innerHTML = '';
  }

  checkInput() {
    if (this.els.input.value === '') {
      this.showErrorMessage();
      return 'error';
    }
    return 'ok';
  }

  createTaskEl() {
    const taskEl = document.createElement('li');
    taskEl.textContent = this.els.input.value;
    this.els.input.value = '';

    const pinEl = document.createElement('span');
    pinEl.classList.add('pin');
    taskEl.append(pinEl);
    return taskEl;
  }

  showAllTasksList(tasksEls) {
    this.hideAllTasksMessage();
    this.els.allTasksList.innerHTML = '';
    this.els.allTasksList.append(...tasksEls);
  }

  showPinnedTasksList(taskEls) {
    this.hidePinnedTasksMessage();
    this.els.pinnedTasksList.innerHTML = '';
    this.els.pinnedTasksList.append(...taskEls);
  }
}
