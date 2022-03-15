;
(function() {
  const svgElements = qa('.lazyanimation');
  if (svgElements.length > 0) {
    const svgElementsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        const target = entry.target;
        if (entry.intersectionRatio > 0) {
          target.classList.add('lazyloaded');
          svgElementsObserver.unobserve(target);
        }
      });
    });
    svgElements.forEach(svgElement => svgElementsObserver.observe(svgElement));
  }
})();