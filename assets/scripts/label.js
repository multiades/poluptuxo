document.addEventListener('DOMContentLoaded', () => { 
  // Find all labels that control other elements and cycle through them
  document.querySelectorAll('label[for]').forEach(toggle_label => {
    const subject = document.getElementById(toggle_label.getAttribute('for'));

    toggle_label.addEventListener('keydown', event => {
      // Keyboard accessibility guidelines demand spacebar for activating custom controls
      if ((event.key === 'Enter' || event.key === ' ') && subject && subject.type ===  'checkbox') {
        subject.checked = !subject.checked;
        subject.dispatchEvent(new Event('change', { bubbles: true })); // Dispatch a new event for event based changes to take effect
        event.preventDefault(); // Stop spacebar from scrolling page
      }
    });
  });
});