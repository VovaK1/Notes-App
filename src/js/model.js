export default {

  getNoteData() {
    const form = document.querySelector('form');
    const note = {};
    note.category = this.checkCategoryChoise(form);
    note.name = form.elements.name.value;
    note.date = form.elements.date.value;
    note.content = form.elements.content.value;
    return note;
  },


  checkValidity() {
  const form = document.querySelector('form');
   try {
    if (!this.validateCategoryChoise(form)) {
      throw new Error('Choose note category')
    }
    if (!this.validateFormFields(form)) {
      throw new Error('Please fill in all fields')
    }
   } catch (e) {
     alert(e.message);
     return false;
   }
   return true;
  },

  atLeastOne(element) {
    return element === true;
  },
  
  validateCategoryChoise(form) {
    const radioButtons = form.elements.category;
    const array = []
    for (let button of radioButtons) {
      array.push(button.checked)
    }
    if (array.find(this.atLeastOne)) {
      return true
    } else {
      return false
    }
  },

  validateFormFields(form) {
    if (!form.elements.name.value) {
      return false;
    } else if (!form.elements.date.value) {
      return false;
    } else if (!form.elements.content.value) {
      return false;
    } 
    return true;
  },

  checkCategoryChoise(form) {
    const radioButtons = form.elements.category;
    for (let radio of radioButtons) {
      if (radio.checked === true) {
        return radio.value;
      }
    }
  },

  collectDataForEdit(target) {
    const obj = {};
    const tr = target.closest('tr');
    const allTd = tr.querySelectorAll('td');
    for (let td of allTd) {
      const column = td.dataset.cell;
      const value = td.textContent.trim();
      if (column && value) {
        obj[`${column}`] = value;
      }
    }
    return obj;
  },

  countActiveNotes() {
    const tbody = document.getElementById('activeNotes');
    const notes = tbody.querySelectorAll('tr');
    let task = 0;
    let thought = 0;
    let idea = 0;
    for (let note of notes) {
     const category = note.querySelector('.category-cell').textContent;
     if (category === 'task') {
       task++
     } else if (category === 'thought') {
       thought++
     } else {
       idea++
     }
    }
    const quantity = {
      task: task,
      thought: thought,
      idea: idea
    }
    return quantity;
  }

}