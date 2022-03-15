<aside class="menu" style="display:none">
  <div class="menu__cnt container">
    <div class="menu__inner">
      <div class="menu__hdr">
        <img src="<?php echo $logo_url ?>" alt="Logotype" width="66" height="36" class="menu__logo-img">
        <button type="button" class="menu__close close-icon"></button>
      </div> <?php
      wp_nav_menu( [
        'theme_location'  => 'header_menu',
        'container'       => 'nav',
        'container_class' => 'menu__nav',
        'menu_class'      => 'menu__nav-list',
        'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
      ] ) ?>
      <div class="menu__ftr">
        <div class="menu__links">
          <a href="<?php echo $instagram ?>" class="menu__instagram text-green">Instagram</a>
          <a href="<?php echo $facebook ?>" class="menu__facebook text-green">Facebook</a>
        </div>
        <div class="menu__contacts">
          <a href="tel:<?php echo $tel_clean ?>" class="menu__tel contacts-link"><?php echo $tel ?></a>
          <a href="mailto:<?php echo $email ?>" class="menu__email contacts-link"><?php echo $email ?></a>
        </div>
      </div>
    </div>
  </div>
</aside>