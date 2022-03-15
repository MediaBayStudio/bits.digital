;
(function() {
  window.addEventListener('load', function() {
    // return;
    let body = document.body;
    if (body.classList.contains('block-editor-page') && body.classList.contains('post-type-case')) {
      var allowedBlocks = [
        'core/paragraph',
        'core/image',
        'core/list',
        'core/heading',
        'core/columns',
        'core/column',
        'core/text-columns',
        'core/text-column',
      ];

      wp.blocks.getBlockTypes().forEach(function(blockType) {
        if (allowedBlocks.indexOf(blockType.name) === -1) {
          wp.blocks.unregisterBlockType(blockType.name);
        }
      });
    }
  });
})();