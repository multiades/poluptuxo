// Wait until all HTML elements are fully parsed, is not necessary if the script is at the end of the html's body but it does not add overhead and it future-proofs the script.
document.addEventListener('DOMContentLoaded', () => { 
  function scaleSchedule() {
    const targetWidth = window.innerWidth * 0.8;

    document.querySelectorAll('figure.schedule').forEach(figure => {
        const scale = Math.min(1, targetWidth / 384);
        figure.style.transform = `scale(${scale})`;
    });
  }
  
  window.addEventListener('load', scaleSchedule);
  window.addEventListener('resize', scaleSchedule);
});