<?php the_content(); ?>


	<?php $loop = new WP_Query( array( 'post_type' => 'sub-section', 
									   'posts_per_page' => 100,
									   'orderby' => 'menu_order title',
									   'order'   => 'ASC', ) ); ?>
	<?php $index = 0; ?>
	<?php echo "<div class='row'>"; ?>
		<div class="video-container">
			<video id="v0" tabindex="0" autobuffer="autobuffer" preload="preload">
			  <!-- <source type="video/webm;" codecs="vp8, vorbis" src="http://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.webm"></source> -->
			  <!-- <source type="video/ogg;" codecs="theora, vorbis" src="http://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.ogv"></source> -->
			  <!-- <source type="video/mp4;" codecs="avc1.42E01E, mp4a.40.2" src="http://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.mp4"> -->
			  <source type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' src="<?php  bloginfo('template_directory'); ?>/assets/video/panning-60fps-180.mp4"></source>
			  <p>Sorry, your browser does not support the &lt;video&gt; element.</p>
			</video>
		</div>
	<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

		<?php if($index % 3 == 0 && $index != 0): ?>
			<?php echo "</div><div class='row'>"; ?>
		<?php endif; ?>

		<div class="sub-section">
		  <?php the_content(); ?>
		</div>

	<?php $index++; ?>

	<?php endwhile; ?>
	<?php echo "</div>" ?>

<?php wp_link_pages(array('before' => '<nav class="pagination">', 'after' => '</nav>')); ?>