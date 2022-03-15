<?php
$cases_numberposts = 4;
$cases = get_posts( [
  'post_type' => 'case',
  'numberposts' => $cases_numberposts,
  'order' => 'ASC'
] );
$cases_count = wp_count_posts( 'case' )->publish;
if ( $cases ) : ?>
  <section class="index-cases container sect sect-underline"<?php echo $section_id ?>>
    <div class="sect-inner">
      <h2 class="index-cases__title sect-h2"> <?php
        echo $section['title'] ?>
        <svg viewBox="0 0 112 35" xmlns="http://www.w3.org/2000/svg" class="ellipses-svg lazyanimation">
          <circle cx="26.9629" cy="17.284" r="16.784" class="ellipses-svg__circle" />
          <circle cx="17.284" cy="17.284" r="16.784" class="ellipses-svg__circle" />
          <circle cx="36.6419" cy="17.284" r="16.784" class="ellipses-svg__circle" />
          <circle cx="46.3211" cy="17.284" r="16.784" class="ellipses-svg__circle" />
          <circle cx="56" cy="17.284" r="16.784" class="ellipses-svg__circle" />
          <circle cx="65.679" cy="17.284" r="16.784" class="ellipses-svg__circle" />
          <circle cx="75.3579" cy="17.284" r="16.784" class="ellipses-svg__circle" />
          <circle cx="85.0371" cy="17.284" r="16.784" class="ellipses-svg__circle" />
          <circle cx="94.7161" cy="17.284" r="16.784" class="ellipses-svg__circle" />
        </svg>
      </h2>
      <ul class="index-cases__cases cases" data-total-cases="<?php echo $cases_count ?>" data-cases-numberposts="<?php echo $cases_numberposts ?>"> <?php
        foreach ( $cases as $case ) {
          create_case_card( $case );
        } ?>
      </ul> <?php
      if ( $cases_count > $cases_numberposts ) : ?>
        <button type="button" class="index-cases__loadmore btn btn-ol btn-green">See more</button> <?php
      endif ?>
    </div>
  </section> <?php
endif ?>