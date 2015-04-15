<?php get_template_part('templates/head'); ?>
<body <?php body_class(); ?> data-spy="scroll" data-target=".navbar-collapse">
    <div class="loader"></div>

  <!--[if lt IE 8]>
    <div class="alert alert-warning">
      <?php _e('You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'roots'); ?>
    </div>
  <![endif]-->

  <?php
    do_action('get_header');
    get_template_part('templates/header');
  ?>

  <div class="wrap container-fluid" role="document">
    <div class="content row">
      <main class="main" role="main">
        <?php include roots_template_path(); ?>
      </main><!-- /.main -->
    </div><!-- /.content -->
  </div><!-- /.wrap -->

  <?php get_template_part('templates/footer'); ?>

  <?php wp_footer(); ?>
  <div id="section-5a-content">
    <div style="bottom:50px;" class="absolute-outer">
        <img src="<?php  bloginfo('template_directory'); ?>/assets/img/5/5A-title.png" class="absolute-inner" style="opacity:0;">
        <br />
        <img src="<?php  bloginfo('template_directory'); ?>/assets/img/5/5A-copy.png" class="absolute-inner" style="opacity:0;">
    </div>
  </div>
</body>
</html>
