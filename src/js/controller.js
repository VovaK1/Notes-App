import Model from './model.js';
import Router from './router.js';
import View from './view.js';
import Archive from './archive.js';

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
      View.renderNote(Model.getNoteData(), 'active');
      this.updateActiveNotes();
      View.toggleModal();
    }
  },

  editRoute() {
    const isValid = Model.checkValidity();
    if (isValid) {
      View.deletePreviousNote();
      View.renderNote(Model.getNoteData(), 'active');
      View.toggleModal();
    }
  },

  clickHandler(e) {
    if (this.isButton(e)) {
      const route = e.target.id;
      if (route) {
        e.preventDefault();
        Router.handle(route);
        }
      }
    if (this.isIconButton(e)) {
        const action = e.target.closest('button').dataset.action;
        if (action === 'operate') {
          Archive.operate();
        } else {
          Router.handleNote(action, e.target);
        }
    }
  },

  editNote(target) {
   const data = Model.collectDataFromNote(target);
   const tr = target.closest('tr');
   tr.classList.add('editing');
   View.toggleModal(data);
  },

  archiveNote(target) {
    const data = Model.collectDataFromNote(target);
    if (this.alreadyInArchive(target)) {
      Archive.takeFrom(data);
      View.renderNote(data, 'active')
    } else {
      Archive.putIn(data);
    }
    View.removeTr(target);
    this.updateActiveNotes();
  },

  deleteNote(target) {
    if (this.alreadyInArchive(target)) {
      const data = Model.collectDataFromNote(target);
      Archive.takeFrom(data);
    }
    View.removeTr(target);
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
  },

  alreadyInArchive(target) {
    const tr = target.closest('tr');
    if (tr.classList.contains('archived')) {
      return true;
    } else {
      return false;
    }
  }
}