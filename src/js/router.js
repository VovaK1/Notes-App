import Controller from './controller.js';

export default {
  handle(route) {
    const routeName = route + 'Route';
    Controller[routeName]();
  },
  handleNote(action, target) {
    const noteAction = action + 'Note';
    Controller[noteAction](target); 
  }
}