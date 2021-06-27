import Model from './model.js';
import Router from './router.js';
import View from './view.js';

export default {
  createRoute() {
    View.toggleModal();
  },

  cancelRoute() {
    if (this.wasEditing()) {
      const tr = this.wasEditing();
      tr.classList.remove('editing');
      View.toggleModal();
    } else {
      View.toggleModal();
    }
  },

  submitRoute() {
    const isValid = Model.checkValidity();
    if (isValid) {
      const noteData = Model.getNoteData();
      View.renderNote(noteData);
      this.updateActiveNotes();
      View.toggleModal();
    }
  },

  editRoute() {
    const isValid = Model.checkValidity();
    if (isValid) {
      View.deletePreviousNote();
      const noteData = Model.getNoteData();
      View.renderNote(noteData);
      View.toggleModal();
    }
  },

  clickHandler(e) {
    if (this.isButton(e)) {
      if (e.target.id) {
        e.preventDefault();
        const route = e.target.id;
        Router.handle(route);
        }
      }
    if (this.isIconButton(e)) {
        const action = e.target.closest('button').dataset.action;
        Router.handleNote(action, e.target);
    }
  },

  editNote(target) {
   const data = Model.collectDataForEdit(target);
   const tr = target.closest('tr');
   tr.classList.add('editing');
   View.toggleModal(data);
  },

  archiveNote(target) {

  },

  deleteNote(target) {
    const tr = target.closest('tr');
    tr.remove();
    this.updateActiveNotes();
  },

  isButton(e) { 
    if (e.target.tagName === 'BUTTON') {
      return true;
    }  else {
      return false;
    }
  },

  isIconButton(e) {
    if (e.target.tagName === 'use' || e.target.tagName === 'svg') {
      if (e.target.closest('button')) {
        return true;
      }
    }
    return false;
  },

  wasEditing() {
    const tr = document.querySelector('.editing');
    if (tr) {
      return tr;
    } else {
      return false;
    }
  },

  updateActiveNotes() {
   const quantity = Model.countActiveNotes();
   View.updateSummaryTable(quantity, 'active');
  }
}