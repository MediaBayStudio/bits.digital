      <?php
        global 
          $tel,
          $tel_clean,
          $email,
          $site_url,
          $logo_url,
          $address,
          $address_link,
          $template_directory_uri ?>
      <footer class="ftr container">
        <div class="ftr-inner">
          <img src="<?php echo $logo_url ?>" alt="Logotype" width="80" height="43" data-scroll-target="0" class="ftr__logo-img">
          <a href="<?php echo $address_link ?>" target="_blank" class="ftr__address"><?php echo $address ?></a>
          <div class="ftr__contacts">
            <a href="tel:<?php echo $tel_clean ?>" class="ftr__tel"><?php echo $tel ?></a>
            <a href="mailto:<?php echo $email ?>" class="ftr__email"><?php echo $email ?></a>
          </div>
          <p class="ftr__copyright">&copy;&nbsp;Bits&nbsp;Digital</p>
          <div class="ftr__dev">
            <span class="ftr__dev-text">Development&nbsp;&mdash;&nbsp;</span>
            <a href="https://media-bay.ru" target="_blank" class="ftr__dev-link lazy"></a>
          </div>
        </div>
      </footer>
      <div class="page-loader loader loader-green">
        <div class="loader__circle"></div>
      </div>
      <div id="fake-scrollbar"></div> <?php
      wp_footer() ?>
    </div>
  </body>
</html>