<?php the_content(); ?>


	<?php $loop = new WP_Query( array( 'post_type' => 'sub-section', 
									   'posts_per_page' => 100,
									   'orderby' => 'menu_order title',
									   'order'   => 'ASC', ) ); ?>
	<div class='row stackable-section' id="section1">
		<?php get_template_part('templates/Section1/subsection-a'); ?>
		<?php get_template_part('templates/Section1/subsection-b'); ?>
   	    <?php get_template_part('templates/Section1/subsection-c'); ?>
	</div>
	<div class='row stackable-section' id="section2">
		<?php get_template_part('templates/Section2/subsection-a'); ?>
	</div>
	<div class='row stackable-section' id="section3">
		<?php get_template_part('templates/Section3/subsection-a'); ?>
	</div>
	<div class='row stackable-section invert' id="section4a">
		<?php get_template_part('templates/Section4a/subsection-a'); ?>
	</div>
	<div class='row stackable-section slide_right' id="section4b">
		<?php get_template_part('templates/Section4b/subsection-a'); ?>
	</div>
	<div class='row stackable-section' id="section4c">
		<?php get_template_part('templates/Section4c/subsection-a'); ?>
	</div>
	<div class='row stackable-section' id="section4e">
		<?php get_template_part('templates/Section4e/subsection-a'); ?>
	</div>
	<div class='row stackable-section' id="section5">
		<?php get_template_part('templates/Section5/subsection-a'); ?>
		<?php get_template_part('templates/Section5/subsection-b'); ?>
	</div>

<?php wp_link_pages(array('before' => '<nav class="pagination">', 'after' => '</nav>')); ?>