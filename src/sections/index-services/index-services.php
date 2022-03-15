<section class="index-services container sect-underline sect-two-col"<?php echo $section_id ?>>
  <div class="sect-inner">
    <h2 class="index-services__title sect-h2 sect-left"><?php echo $section['title'] ?></h2>
    <ul class="index-services__items services sect-right"> <?php
    // $svg_icons declared in functions.php
      foreach ( $section['items'] as $item ) : ?>
        <li class="services__service service">
          <div class="service__icon"> <?php
            echo $svg_icons[ $item['icon'] ] ?>
          </div>
          <h3 class="service__title sect-h3"><?php echo $item['title'] ?></h3>
          <p class="service__descr"><?php echo $item['descr'] ?></p>
        </li> <?php
      endforeach ?>
    </ul>
  </div>
</section>