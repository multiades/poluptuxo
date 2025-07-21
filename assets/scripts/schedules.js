// Wait until all HTML elements are fully parsed, is not necessary if the script 
// is at the end of the html's body but it does not add overhead and it future-proofs the script.
document.addEventListener('DOMContentLoaded', () => { 
  function scaleSchedules() {
    const scale = Math.min(1, (window.innerWidth * 0.8) / 384);

    document.querySelectorAll('div.wrapper').forEach(wrapper => {
      const figure = wrapper.querySelector('figure.schedule');

      // Remove scaling to measure natural size
      figure.style.transform = 'none';

      // Measure unscaled figure and save mesures
      const { width, height } = figure.getBoundingClientRect();

      // Reapply scaling
      figure.style.transform = `scale(${scale})`;
              
      // Resize wrapper to match scaled dimensions
      wrapper.style.width = `${width * scale}px`;
      wrapper.style.height = `${height * scale}px`;
    });
  }
  
  window.addEventListener('load', scaleSchedules);
  window.addEventListener('resize', scaleSchedules);
});