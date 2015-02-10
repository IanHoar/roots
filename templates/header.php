<header class="banner navbar navbar-default navbar-static-top" role="banner">
  <div class="container">
    <div class="navbar-header col-md-8">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
    </div>

    <div class="col-md-2">
      <nav class="collapse navbar-collapse" role="navigation">
        <?php
          if (has_nav_menu('primary_navigation')) :
            wp_nav_menu(array('theme_location' => 'primary_navigation', 'walker' => new Roots_Nav_Walker(), 'menu_class' => 'nav navbar-nav'));
          endif;
        ?>
      </nav>
    </div>
    <div class="col-md-2 dates">
      <a href="<?php echo esc_url(home_url('/')); ?>">
        <img src="<?php  bloginfo('template_directory'); ?>/assets/img/menu/rbcm.png">
      </a>
      <ul>
        <li class="accent">Dates</li>
        <li>Open April 1, 2015</li>
        <li>Through Sept 20, 2015</li>
      </ul>
    </div>
  </div>
</header>
