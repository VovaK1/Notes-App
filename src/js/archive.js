import View from './view.js';
import Model from './model.js';

let archivedNotes = [];

export default {

  operate() {
    this.toggleArchiveWindow();
    this.loadArchivedNotes();
    View.removeEditIcons();
  },

  loadArchivedNotes() {
    for (let note of archivedNotes) {
      View.renderNote(note, 'archived');
    }
  },

  toggleArchiveWindow() {
    const active = document.getElementById('activeNotes');
    const archived = document.getElementById('archivedNotes');
    const notesDisplayed = View.whatNotesAreDisplayed(active, archived);

    if (notesDisplayed === "archived") {
      archived.innerHTML = '';
      active.classList.remove('hidden');
      archived.classList.add('hidden');
    } else {
      archived.innerHTML = '';
      active.classList.add('hidden');
      archived.classList.remove('hidden');
    }
  },

  putIn(note) {
    archivedNotes.push(note);
    this.updateArchivedNotes();
  },

  takeFrom(currentNote) {
    archivedNotes = archivedNotes.filter(note => Model.shallowNotEqual(note, currentNote));
    this.updateArchivedNotes();
  },

  updateArchivedNotes() {
    const quantity = this.countArchivedNotes();
    View.updateSummaryTable(quantity, 'archived')
  },

  countArchivedNotes() {
    const taskNotes = archivedNotes.filter(note => note.category === 'task');
    const thoughtNotes = archivedNotes.filter(note => note.category === 'thought');
    const ideaNotes = archivedNotes.filter(note => note.category === 'idea');
    const quantity = {
      task: taskNotes.length,
      thought: thoughtNotes.length,
      idea: ideaNotes.length
    }
    return quantity;
  }
}