<section class="index-contact container sect-two-col sect-underline"<?php echo $section_id ?>>
  <div class="sect-inner">
    <h2 class="index-contact__title sect-h2 sloping-lines"><?php echo $section['title'] ?></h2>
    <div class="sect-left">
      <p class="index-contact__descr"><?php echo $section['descr'] ?></p>
      <div class="index-contact__links">
        <a href="<?php echo $instagram ?>" target="_blank" class="index-contact__instagram text-green">Instagram</a>
        <a href="<?php echo $facebook ?>" target="_blank" class="index-contact__facebook text-green">Facebook</a>
      </div>
    </div>
    <div class="sect-right"> <?php
      echo do_shortcode( '[contact-form-7 id="' . $section['form'] . '" html_id="contact-form" html_class="index-contact__form"]' ) ?>
    </div>
  </div>
</section>