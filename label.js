document.addEventListener('DOMContentLoaded', () => { 
  // Find all labels that control other elements and cycle through them
  document.querySelectorAll('label[for]').forEach(label => {
    const subject = document.getElementById(label.getAttribute('for'));

    label.addEventListener('keydown', event => {
      // Keyboard accessibility guidelines demand spacebar for activating custom controls
      if ((event.key === 'Enter' || event.key === ' ') && subject && subject.type ===  'checkbox') {
        subject.checked = !subject.checked;
        subject.dispatchEvent(new Event('change', { bubbles: true })); // Dispatch a new event for event based changes to take effect
        event.preventDefault(); // Stop spacebar from scrolling page
      }
    });
  });
});