<?php the_content(); ?>


	<?php $loop = new WP_Query( array( 'post_type' => 'sub-section', 
									   'posts_per_page' => 100,
									   'orderby' => 'menu_order title',
									   'order'   => 'ASC', ) ); ?>

	<div class='row' id="section1">
		<section class="sub-section">
		  <?php get_template_part('templates/video-section-1'); ?>
		  <?php get_template_part('templates/section-1a'); ?>
		</section>
		<section class="sub-section">
		  <?php get_template_part('templates/video-section-2'); ?>
		  <?php get_template_part('templates/section-1b'); ?>
		</section>
		<section class="sub-section">
		  <?php get_template_part('templates/video-section-3'); ?>
		  <?php get_template_part('templates/section-1c'); ?>
		</section>
	</div>
	<!-- <div class='row' id="section2">
		<section class="sub-section">
		  <?php //get_template_part('templates/video-section-1'); ?>
		  <?php get_template_part('templates/section-1a'); ?>
		</section>
		<section class="sub-section">
		  <?php //get_template_part('templates/video-section-2'); ?>
		  <?php get_template_part('templates/section-1b'); ?>
		</section>
		<section class="sub-section">
		  <?php get_template_part('templates/section-1c'); ?>
		</section>
	</div>
	<div class='row' id="section3">
		<section class="sub-section">
		  <?php //get_template_part('templates/video-section-1'); ?>
		  <?php get_template_part('templates/section-1a'); ?>
		</section>
		<section class="sub-section">
		  <?php //get_template_part('templates/video-section-2'); ?>
		  <?php get_template_part('templates/section-1b'); ?>
		</section>
		<section class="sub-section">
		  <?php get_template_part('templates/section-1c'); ?>
		</section>
	</div>
	<div class='row' id="section4">
		<section class="sub-section">
		  <?php //get_template_part('templates/video-section-1'); ?>
		  <?php get_template_part('templates/section-1a'); ?>
		</section>
		<section class="sub-section">
		  <?php //get_template_part('templates/video-section-2'); ?>
		  <?php get_template_part('templates/section-1b'); ?>
		</section>
		<section class="sub-section">
		  <?php get_template_part('templates/section-1c'); ?>
		</section>
	</div>
	<div class='row' id="section5">
		<section class="sub-section">
		  <?php //get_template_part('templates/video-section-1'); ?>
		  <?php get_template_part('templates/section-1a'); ?>
		</section>
		<section class="sub-section">
		  <?php //get_template_part('templates/video-section-2'); ?>
		  <?php get_template_part('templates/section-1b'); ?>
		</section>
		<section class="sub-section">
		  <?php get_template_part('templates/section-1c'); ?>
		</section>
	</div> -->

<?php wp_link_pages(array('before' => '<nav class="pagination">', 'after' => '</nav>')); ?>