<header class="banner navbar navbar-default navbar-static-top" role="banner">
  <div class="container-fluid">
    <div class="navbar-header col-sm-3">
      <a class="navbar-brand" href="http://royalbcmuseum.bc.ca/gold/"><?php bloginfo('name'); ?></a>
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
      <a href="#" class="btn-default">Buy Tickets</a>
      <a href="#" class="btn-default">Events and Programs</a>
      <span class="music">Music<div></div></span>
    </div>
    <div class="col-sm-1" id="rbcm-logo">
        <a href="http://royalbcmuseum.bc.ca"></a>
    </div>
  </div>
</header>
