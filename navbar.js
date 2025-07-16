// Wait until all HTML elements are fully parsed, is not necessary if the script is at the end of the html's body but it does not add overhead and it future-proofs the script.
document.addEventListener('DOMContentLoaded', () => { 
  const navToggler = document.querySelector('input#navToggler'); // The hidden checkbox which toggles the navbar
  const navbar = document.querySelector('nav#navbar');

  function navInter() { 
    const isExpanded = navToggler.checked;

    // Announcement of button state on screenreaders, it is required on the control element
    navToggler.setAttribute('aria-expanded', String(isExpanded));

    // Dynamically apoint aria-hidden on the navbar depending on its state
    navbar.setAttribute('aria-hidden', String(!isExpanded));

    navbar.querySelectorAll('*').forEach(child => {
      // Block pointer and touch interaction on elements when navbar is collapsed
      child.classList.toggle('inert', !isExpanded);

      // Set or remove tab focus on desired navbar children (apart from input, ul, li elements) depending on the navbar status
      child.tabIndex = isExpanded && ['A', 'LABEL'].includes(child.tagName) ? 0 : -1; // tagName returns uppercase type

      // Uncheck all of the navbar's nested checkboxes on detraction
      if (!isExpanded && child.tagName === 'INPUT' && child.type === 'checkbox') {
        child.checked = false;
      }
    });
  }

  // Initial navbar interaction run
  navInter();

  // Re-run on navbar toggle
  navToggler.addEventListener('change', navInter);
});