// Wait until all HTML elements are fully parsed, is not necessary if the script is at the end of the html's body but it does not add overhead and it future-proofs the script.
document.addEventListener('DOMContentLoaded', () => { 
  const toggler = document.querySelector('input#navbar_toggle'); // The navbar's toggle hidden checkbox
  const navbar = document.querySelector('nav#navbar'); 

  // Function that renders the navbar non-interactive when it is not expanded
  function navInteractivity () { 
    const isExpanded = toggler.checked;

    // Block pointer interaction when collapsed
    navbar.classList.toggle('inert', !isExpanded);

    // Set or remove tab focus
    navbar.querySelectorAll('a, label.dropdown, div#trap').forEach(focusable => {
      focusable.tabIndex = isExpanded ? 0 : -1;
    });

    // Screen reader visibility depending on the state of the navbar
    navbar.setAttribute('aria-hidden', String(!isExpanded));

    // Announcement of button state on screenreaders
    toggler.setAttribute('aria-expanded', String(isExpanded));

    // Uncheck all of the navbar's nested checkboxes on detraction
    if (!isExpanded) {
      navbar.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
      }); 
    }
  }

  // Initial run
  navInteractivity();

  // Re-run on toggle
  toggler.addEventListener('change', navInteractivity);

  // Use a visually hidden div trap to focus on the navbar toggler again at the end of the navbar for accessibility purposes
  navbar.querySelector('div#trap').addEventListener('focus', () => {
    document.querySelector('label[for="navbar_toggle"]').focus();
  });
});

/*

  Select all anchors and dropdown labels in the nav element
  const nodes = document.querySelectorAll('nav a', 'nav label.dropdown');

  function updateState() {
    const expanded = toggle.checked;
    links.forEach
  
  if (!navbar) return; // Exits the script if navbar does not exist
sidebar.addEventListener('mouseleave', () => {
  const checkboxes = navbar.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
});
*/