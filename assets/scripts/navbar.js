// Wait until all HTML elements are fully parsed, is not necessary if the script is at the end of the html's body but it does not add overhead and it future-proofs the script.
document.addEventListener('DOMContentLoaded', () => { 
  const toggler = document.querySelector('input#navbar-toggler'); // The hidden checkbox which toggles the navbar
  const navbar = document.querySelector('nav#navbar');
  // Select every navbar child element apart from the toggler's label and its descendants
  const children = navbar.querySelectorAll('*:not(label[for="navbar-toggler"]):not(label[for="navbar-toggler"] *)');

  function navInter() { 
    const isExpanded = toggler.checked;

    // Announcement of button state on screenreaders, it is required on the control element
    toggler.setAttribute('aria-expanded', String(isExpanded));

    /* Use main's overlay when the navbar is expanded
    if(isExpanded) {
      document.querySelector('main').classList.toggle.overlay;
    }
    */

    children.forEach(child => {
      // Block pointer interaction and user selection on elements when navbar is collapsed
      child.classList.toggle('inert', !isExpanded);

      // Set or remove tab focus depending on the navabar status
      child.tabIndex = isExpanded && ['a', 'label', 'div'].includes(child.tagName.toLowerCase()) ? 0 : -1; /* Excludes uls and lis */

      // Screen reader visibility depending on the navbar status
      child.setAttribute('aria-hidden', String(!isExpanded));

      // Uncheck all of the navbar's nested checkboxes on detraction
      if (!isExpanded && child.tagName.toLowerCase() === 'input' && child.type === 'checkbox') {
        child.checked = false;
      }
    });
  }

  //Visually hidden div trap to focus on the navbar toggler again at the end of the navbar for accessibility purposes
  navbar.querySelector('div#trap').addEventListener('focus', () => { // Run once so as not to add many listeners
    navbar.querySelector('label[for="navbar-toggler"]').focus();
  });

  // Initial navbar interaction run
  navInter();

  // Re-run on navbar toggle
  toggler.addEventListener('change', navInter);
});
