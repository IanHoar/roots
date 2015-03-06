<header class="banner navbar navbar-default navbar-static-top" role="banner">
  <div class="container-fluid">
    <div class="navbar-header col-sm-3">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
    </div>

    <div class="col-sm-6" id="section-nav">
      <nav class="collapse navbar-collapse" role="navigation">
        <?php
          if (has_nav_menu('primary_navigation')) :
            wp_nav_menu(array('theme_location' => 'primary_navigation', 'walker' => new Roots_Nav_Walker(), 'menu_class' => 'nav navbar-nav'));
          endif;
        ?>
      </nav>
    </div>
    <div class="col-sm-2" id="dates">
      <ul>
        <li class="accent">Dates</li>
        <li>Open MAY 15, 2015</li>
        <li>Through OCT 31, 2015</li>
      </ul>
      <a href="#" class="btn-default">Buy Tickets</a>
    </div>
    <div class="col-sm-1" id="rbcm-logo">
        <a href="<?php echo esc_url(home_url('/')); ?>"></a>
    </div>
  </div>
</header>
