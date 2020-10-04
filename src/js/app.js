import AppDOM from './AppDOM';
import AppController from './AppController';

const appDOM = new AppDOM();

const appCtrl = new AppController(appDOM);

appCtrl.init();
