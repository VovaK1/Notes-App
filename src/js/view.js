import template from '.././templates/note.hbs';
import notes from './initialNotes.js';


export default {
  renderNote(noteData, type) {
    const tbody = document.getElementById(`${type}Notes`);    
    const tr = document.createElement('tr');
    if (type === 'archived') {
      tr.classList.add('archived');
    }
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
     this.renderNote(note, 'active');
   }
  },

  updateSummaryTable(quantity, column) {
      for (let key in quantity) {
        if (column === 'active') { 
          let cell = document.getElementById(`${key}Active`);
          cell.textContent = quantity[key];
        } else if (column === 'archived')   {
          let cell = document.getElementById(`${key}Archived`);
          cell.textContent = quantity[key];
        }
  }},

  removeTr(note) {
    const tr = note.closest('tr');
    tr.remove();
  },

  whatNotesAreDisplayed(active, archived) {
    if (active.classList.contains('hidden')) {
      return 'archived'
    } else if (archived.classList.contains('hidden')) {
      return 'active'
    }
  },

  removeEditIcons() {
    const tbody = document.getElementById('archivedNotes');
    const editIcons = tbody.querySelectorAll('[data-action="edit"]')
      for (let icon of editIcons) {
        if (!icon.classList.contains('hidden')) {
          icon.classList.add('hidden')
        }
      }
}
}