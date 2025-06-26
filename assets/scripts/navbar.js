// Wait until all HTML elements are fully parsed, is not necessary if the script is at the end of the html's body but it does not add overhead and it future-proofs the script.
document.addEventListener('DOMContentLoaded', () => { 
  const toggler = document.querySelector('input#navbar-toggle'); // The navbar's toggle hidden checkbox
  const navbar = document.querySelector('nav#navbar');
  const owl1 = document.querySelector('img.logo.asleep'); 
  const owl2 = document.querySelector('img.logo.inbetween'); 
  const owl3 = document.querySelector('img.logo.wake'); 

  // Function that renders the navbar non-interactive when it is not expanded
  function navInter() { 
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
  
  // Function that transitions the logo owl images
  function owlTrans(direction = 'forward') { // Why do I need to initialize the parameter here?
    if (direction === 'forward') {
      owl1.style.opacity = '0';
      owl2.style.opacity = '1';

      setTimeout(() => {
        owl2.style.opacity = '0';
        owl3.style.opacity = '1';
      }, 300); // In ms
    } else {
      owl3.style.opacity = '0';
      owl2.style.opacity = '1';

      setTimeout(() => {
        owl2.style.opacity = '0';
        owl1.style.opacity = '1';
      }, 300); // In ms
    }
  }

  // Initial run
  navInter();

  // Re-run on navbar toggle
  toggler.addEventListener('change', () => {
    const direction = toggler.checked ? 'forward' : 'reverse';
    owlTrans(direction);
    navInter();
  });

  // Use a visually hidden div trap to focus on the navbar toggler again at the end of the navbar for accessibility purposes
  navbar.querySelector('div#trap').addEventListener('focus', () => {
    document.querySelector('label[for="navbar-toggle"]').focus();
  });
});
