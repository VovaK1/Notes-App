import '.././index.hbs';
import '.././scss/main.scss';

import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';
import Router from './router.js';

View.loadInitialNotes();
Controller.updateActiveNotes();


document.addEventListener('click', e => {
  Controller.clickHandler(e);
})



