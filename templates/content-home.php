<?php the_content(); ?>


	<?php $loop = new WP_Query( array( 'post_type' => 'sub-section', 
									   'posts_per_page' => 100,
									   'orderby' => 'menu_order title',
									   'order'   => 'ASC', ) ); ?>

	<div class='row' id="section1">
		<?php get_template_part('templates/section-1a'); ?>
		<?php get_template_part('templates/section-1b'); ?>
   	    <?php get_template_part('templates/section-1c'); ?>
	</div>


<?php wp_link_pages(array('before' => '<nav class="pagination">', 'after' => '</nav>')); ?>