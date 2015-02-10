/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you 
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {

      /* fix vertical when not overflow
      call fullscreenFix() if .fullscreen content changes */
      function fullscreenFix(){
          var h = $('body').height();
          // set .fullscreen height
          $(".content-b").each(function(i){
              if($(this).innerHeight() <= h){
                  $(this).closest(".fullscreen").addClass("not-overflow");
              }
          });
      }
      $(window).resize(fullscreenFix);
      fullscreenFix();

//Scrollspy for menu highlighting
      $('body').scrollspy({ target: '.navbar-collapse' });

//Video play on scroll
      var videos = $(".sub-section.inView .video");

      (function loop() {

        videos = $(".sub-section.inView .video");

        $.each(videos, function(idx, video){
    
          video.currentTime = window.pageYOffset/800;
        });

        setTimeout(loop, 64); //recurse

      })();

      $(window).scroll(function(){
        $.each(videos, function(idx, video){
          video.pause();
        });
      });

//add class to inview elements
      $('.sub-section').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (isInView) 
        {
          $(this).addClass("inView");  
        } 
        else 
        {
          $(this).removeClass("inView");  
        }
      });

//scroll animation triggering.
      function onScrollInit( items, trigger ) {

        items.each( function() {
          var osElement = $(this),
              osAnimationClass = osElement.attr('data-os-animation'),
              osAnimationDelay = osElement.attr('data-os-animation-delay');
            
              osElement.css({
                '-webkit-animation-delay':  osAnimationDelay,
                '-moz-animation-delay':     osAnimationDelay,
                'animation-delay':          osAnimationDelay
              });

              var osTrigger = ( trigger ) ? trigger : osElement;
              
              osTrigger.waypoint(function() {
                osElement.addClass('animated').addClass(osAnimationClass);
                },{
                    triggerOnce: true,
                    offset: '90%'
              });
        });
      }

       onScrollInit( $('.os-animation') );
       onScrollInit( $('.staggered-animation'), $('.staggered-animation-container') );
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
