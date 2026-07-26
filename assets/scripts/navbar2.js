// Wait until all HTML elements are fully parsed, is not necessary if the script is at the end of the html's body but it does not add overhead and it future-proofs the script.
document.addEventListener(
  'DOMContentLoaded',
  () => {
    // Error checking, if navbar and button exist
    const nav = document.querySelector('nav');
    const button = nav.querySelector('button');

    button.addEventListener(
      "click", // Browsers make buttons accessible by firing click for every action on an interactive element, you do not need seoarate keydown handlers
      () => {
        nav.classList.toggle("is-expanded");
      }
    );
  }
);
