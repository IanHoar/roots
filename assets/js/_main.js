(function($) {

//Adjust each section to be the full viewport size
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

//Background: cover for video
      $('.covervid-video').coverVid(2200, 1000);

//Scrollspy for menu highlighting
      $('body').scrollspy({ target: '.navbar-collapse' });

//fix the current container
      var sticky_section_offset_top = $('.sticky_section').offset().top;
      var topMargin = parseInt($(".wrap").css("paddingTop"));
      
      var sticky_section = function(){

        var scroll_top = $(window).scrollTop();
        var sub_sections = $(".sub-section");
        
        sub_sections.each(function(){

          var sub_section_top = $(this).offset().top;
          var sub_section_height = $(this).height();
          var window_height = $(window).height();

          var top_in = scroll_top + window_height > sub_section_top - topMargin;
          var bot_in = scroll_top < sub_section_top + sub_section_height;

          if (top_in && bot_in)
          {
            var percentageScrolled = (scroll_top - sub_section_top) / sub_section_height;
            var numberOfChildren = $(this).find(".content-a").length + 1; //add 1 for buffer on last section
            var step = Math.max(Math.floor(percentageScrolled * numberOfChildren), 0);

            if ($(this).hasClass("step-"+step) === false)
            {
              $(this).removeClass();
              $(this).addClass("sub-section step-" + step);
              var firstElement = $(this).find(".fullscreen:nth-child(1)");
              firstElement.css({"marginTop": -(window_height*step)});

              // add active class to fade in entering elements
              $(this).find(".active").removeClass("active");

              var activeElementIndex = step + 1;
              var enteringElement = $(this).find(".fullscreen:nth-child("+activeElementIndex+")");

              enteringElement.addClass('active');

              var animatableElements = $(this).find(".os-animation");

              animatableElements.each(function(){
                var osElement        = $(this);
                var osAnimationClass = osElement.attr('data-os-animation');
                var osAnimationDelay = osElement.attr('data-os-animation-delay');
              
                osElement.css({
                  '-webkit-animation-delay':  osAnimationDelay,
                  '-moz-animation-delay':     osAnimationDelay,
                  'animation-delay':          osAnimationDelay
                });
                  
                osElement.addClass('animated').addClass(osAnimationClass);
              });
            }
          }
        });
      };
      
      sticky_section();
      
      $(window).scroll(function() {
         sticky_section();
      });

})(jQuery); // Fully reference jQuery after this point.
