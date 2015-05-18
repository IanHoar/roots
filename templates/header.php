<header class="banner navbar navbar-default navbar-static-top" role="banner">
  <div class="container-fluid">
    <div class="col-sm-1" id="rbcm-logo">
        <a href="http://royalbcmuseum.bc.ca"></a>
    </div>
    <div class="col-sm-5" id="section-nav">
      <nav class="collapse navbar-collapse" role="navigation">
        <?php
          if (has_nav_menu('primary_navigation')) :
            wp_nav_menu(array('theme_location' => 'primary_navigation', 'walker' => new Roots_Nav_Walker(), 'menu_class' => 'nav navbar-nav'));
          endif;
        ?>
      </nav>
    </div>
    <div class="col-sm-3 hidden-xs" id="dates">
      <a href="http://royalbcmuseum.bc.ca/gold-events/" class="btn-default btn-invert">Events</a>
      <a href="https://sales.royalbcmuseum.bc.ca/Default.aspx?tagid=4" class="btn-default">Buy Tickets</a>
      <span class="music"><div></div></span>
    </div>
    <div class="navbar-header col-sm-3">
      <a class="navbar-brand" href="https://royalbcmuseum.bc.ca/goldrush/"><?php bloginfo('name'); ?></a>
    </div>
  </div>
</header>
