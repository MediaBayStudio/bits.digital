<?php
$team_numberposts = 1;
$team = get_posts( [
  'post_type' => 'teammate',
  'numberposts' => $team_numberposts,
  'order' => 'ASC'
] );
$team_count = wp_count_posts( 'teammate' )->publish;
if ( $team ) : ?>
  <section class="index-team container sect sect-underline"<?php echo $section_id ?>>
    <div class="sect-inner">
      <h2 class="index-team__title sect-h2"><?php echo $section['title'] ?></h2>
      <ul class="index-team__team team" data-total-team="<?php echo $team_count ?>" data-team-numberposts="<?php echo $team_numberposts ?>"> <?php
        foreach ( $team as $teammate ) {
          create_teammate_card( $teammate );
        } ?>
      </ul> <?php
      if ( $team_count > $team_numberposts ) : ?>
        <button type="button" class="index-team__loadmore btn btn-ol btn-green">See more</button> <?php
      endif ?>
    </div>
  </section> <?php
endif ?>