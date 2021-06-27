import template from '.././templates/note.hbs';
import notes from './initialNotes.js';


export default {
  renderNote(noteData) {
    const tbody = document.querySelector('tbody');    
    const tr = document.createElement('tr');
    const note = template(noteData);
    tr.innerHTML = note;
    tbody.append(tr);
  },

  toggleModal(data = null) {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('hidden');
    this.changeButton(data);
    if (data) {
      this.pasteIntoFields(data);
    } else {
      this.resetForm();
    }
  },

  pasteIntoFields(data) {
    const form = document.querySelector('form');
    const radioButtons = form.elements.category;
    for (let radio of radioButtons) {
      if (radio.value === data.category) {
        radio.checked = true;
      }
    }
    form.elements.name.value = data.name;
    form.elements.date.value = data.created;
    form.elements.content.value = data.content;
  },

  resetForm() {
    const form = document.querySelector('form');
    if (form) {
      form.reset();
    }
  },

  changeButton(data) {
    const button = document.getElementById('submit') || document.getElementById('edit');
    if (data) {
      button.id = 'edit';
      button.textContent = 'Edit';
    } else {
      button.id = 'submit';
      button.textContent = 'Submit';
    }
  },

  deletePreviousNote() {
    const tableRows = document.querySelectorAll('tr');
    for (let tr of tableRows) {
      if (tr.classList.contains('editing')) {
        tr.remove();
      }
    }
  },

  loadInitialNotes() {
   for (const note of notes) {
     this.renderNote(note);
   }
  },

  updateSummaryTable(quantity, column) {
    if (column === 'active') {
      for (let key in quantity) {
        let cell = document.getElementById(`${key}Active`);
        cell.textContent = quantity[key];
        }
    }
  }
}