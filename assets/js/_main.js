(function($) {

    var isMobile = false;

    var checkIfMobile = function() {

        isMobile = $(window).width() < 768;
    };

    checkIfMobile();
    $(window).resize(checkIfMobile);

    var pageTopMargin = 100;
    $("html, body").animate({ scrollTop: pageTopMargin }, 0);

//scroll down button
    $("#scroll-down").click(function(){
        $("html, body").animate({ scrollTop: $('#scroll-down-target').offset().top }, 1000);
    }); 

// Popover click
      $('[data-toggle="popover"]').popover({
           trigger: 'click',
           html: true,
           placement: 'top',
           template: '<div class="popover" role="tooltip"><div class="popover-content" onclick="$(&quot;.popover&quot;).popover(&quot;hide&quot;);"><a class="close-button"></a></div></div>',
        });
//Adjust each section to be the full viewport size
      function fullscreenFix(){
          var h = $('body').height()+1000;
          // set .fullscreen height
          $(".content-b").each(function(i){
              if($(this).innerHeight() <= h){
                  $(this).closest(".fullscreen").addClass("not-overflow");
              }
          });
      }
      $(window).resize(fullscreenFix);

      fullscreenFix();

      /* resize background images */
      function backgroundResize(){
          var windowH = $(window).height();
          
          $(".sticky_section").each(function(){
            $(this).height(windowH -pageTopMargin);
          });

          $(".background").each(function(i){
              var path = $(this);
              // variables
              var contW = path.width();
              var contH = path.height();
              var imgW = path.attr("data-img-width");
              var imgH = path.attr("data-img-height");
              var ratio = imgW / imgH;
              // overflowing difference
              var diff = parseFloat(path.attr("data-diff"));
              diff = diff ? diff : 0;
              // remaining height to have fullscreen image only on parallax
              var remainingH = 0;
              if(path.hasClass("parallax") && !$("html").hasClass("touch")){
                  var maxH = contH > windowH ? contH : windowH;
                  remainingH = windowH - contH;
              }
              // set img values depending on cont
              imgH = contH + remainingH + diff;
              imgW = imgH * ratio;
              // fix when too large
              if(contW > imgW){
                  imgW = contW;
                  imgH = imgW / ratio;
              }
              //
              path.data("resized-imgW", imgW);
              path.data("resized-imgH", imgH);
              // path.css("background-size", imgW + "px " + imgH + "px");
          });
      }
      $(window).resize(backgroundResize);
      $(window).focus(backgroundResize);
      backgroundResize();

      /* set parallax background-position */
      function parallaxPosition(e){
          var heightWindow = $(window).height();
          var topWindow = $(window).scrollTop();
          var bottomWindow = topWindow + heightWindow;
          var currentWindow = (topWindow + bottomWindow) / 2;
          $(".parallax").each(function(i){
              var path = $(this);
              var height = path.height();
              var top = path.offset().top;
              var bottom = top + height;
              // only when in range
              if(bottomWindow > top && topWindow < bottom){
                  var imgW = path.data("resized-imgW");
                  var imgH = path.data("resized-imgH");
                  // min when image touch top of window
                  var min = 0;
                  // max when image touch bottom of window
                  var max = - imgH + heightWindow;
                  // overflow changes parallax
                  var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
                  top = top - overflowH;
                  bottom = bottom + overflowH;
                  // value with linear interpolation
                  var value = min + (max - min) * (currentWindow - top) / (bottom - top);
                  // set background-position
                  var orizontalPosition = path.attr("data-oriz-pos");
                  orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
                  $(this).css("background-position", orizontalPosition + " " + value + "px");
              }
          });
      }
      if(!$("html").hasClass("touch")){
          $(window).resize(parallaxPosition);
          //$(window).focus(parallaxPosition);
          $(window).scroll(parallaxPosition);
          parallaxPosition();
      }


//Background: cover for video
      if (isMobile === false)
      {
        $('.covervid-video').each(function(){
          $(this).coverVid(2200, 1100);
        });
      }

//Scrollspy for menu highlighting
      $('body').scrollspy({ 
        target: '.navbar-collapse', 
        offset: pageTopMargin,
      });

//fix the current container
      var sticky_section_offset_top = $('.sticky_section').offset().top;
      var topMargin = parseInt($(".wrap").css("paddingTop"));
      var isCrossfading = false;
      
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
            var numberOfChildren = $(this).find(".content-a").length;
            var step = Math.max(Math.floor(percentageScrolled * numberOfChildren), 0);

            if ($(this).hasClass("step-"+step) === false && step < numberOfChildren + 0.5 && isCrossfading === false)
            {
              $(this).removeClass();
              $(this).addClass("sub-section step-" + step);
              $(".active_section").removeClass('active_section');
              $(".active_subsection").removeClass('active_subsection');
              $(this).parent().addClass("active_section");
              $(this).addClass("active_subsection");

              // add active class to fade in entering elements
              var exitingElement = $(this).find(".active");
              exitingElement.removeClass("active");

              var activeElementIndex = step + 1;
              var enteringElement = $(this).find(".fullscreen:nth-child("+activeElementIndex+")");

              var shouldNotAnimate = enteringElement.hasClass("no-animation") && exitingElement.hasClass("no-animation");
              var shouldCrossfade = enteringElement.hasClass("crossfade") && exitingElement.hasClass("crossfade");
              var shouldDelay = enteringElement.hasClass("delay") && exitingElement.hasClass("delay");
              var firstElement = $(this).find(".fullscreen:nth-child(1)");

              var delay = (shouldDelay ? 750 : 0);
              var animTime = (shouldNotAnimate || shouldCrossfade ? 0 : 1000);
              var shouldInvert = $(this).parent().hasClass("invert");
              var shouldScrollBg = $(this).parent().hasClass("slide_right");
              var pageSize = (window_height - pageTopMargin);
              var newMarginTop = (shouldInvert) ? - pageSize * (numberOfChildren - 1 - step) : -pageSize * step;
              var propertyToAnimate = shouldScrollBg ? "marginLeft" : "marginTop";

              if (shouldScrollBg === false)
              {
                firstElement.delay(delay).stop().animate({ marginTop:  newMarginTop}, animTime, function(){  
                   // animate elements on incoming active section
                    var animatableElements = enteringElement.find(".os-animation");

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

                    if (exitingElement.hasClass("resettable"))
                    {
                      var resetableElements = exitingElement.find(".os-animation");

                      resetableElements.each(function(){
                        var osElement        = $(this);
                        var osAnimationClass = osElement.attr('data-os-animation');
                          
                        osElement.removeClass('animated').removeClass(osAnimationClass);
                      });
                    }
                });
              }
              else
              {
                var bgContainer = $(this).find(".sticky_section");
                var percentageToMove = (100/numberOfChildren-1) * step;
                bgContainer.animate({
                  'background-position-x': percentageToMove + '%',
                }, 2000);

                var content = bgContainer.find(".animate_content");
                var animate_offset = content.attr("data-img-width");
                var window_width = $(window).width();
                var page_size = (animate_offset/3);
                percentageToMove = step * 50;

                console.log(page_size / (page_size - window_width /2));

                if (percentageToMove === 0)
                {
                  percentageToMove += (animate_offset/2) / ((page_size - window_width) /2);
                } 
                else if (percentageToMove === 100)
                {
                  percentageToMove -= (animate_offset/2) / ((page_size - window_width) /2);
                }

                console.log(animate_offset);
                content.animate({
                  'background-position-x': percentageToMove + '%',
                }, 2000);

              }

              enteringElement.addClass('active');

              if (shouldCrossfade && isCrossfading === false)
              {
                isCrossfading = true;
                var clonedExitingElement = exitingElement.clone(true);

                clonedExitingElement.css({
                  "position" : "absolute",
                  "z-index" : 2,
                  "marginTop" : -window_height + pageTopMargin,
                });

                enteringElement.after(clonedExitingElement);

                clonedExitingElement.stop().animate({opacity: 0}, 500, function(){

                  clonedExitingElement.remove();
                  isCrossfading = false;
                });
              }

               // play videos in incoming element
              var playingVids = $(this).find(".playing");

              playingVids.each(function(){

                $(this).removeClass("playing");
                $(this).addClass("paused");
                $(this).get(0).pause();
              });

              var pausedVids = enteringElement.find('.paused');

              pausedVids.each(function(){

                $(this).removeClass("paused");
                $(this).addClass("playing");
                $(this).get(0).play();
                $(this).get(0).currentTime = 0.0; 
              });
            }
          }
        });
      };

      var footer_check = function(){
        var height = $(window).height();
        var scrollTop = $(window).scrollTop();
        var obj = $("footer");
        var pos = obj.position();
        
        if (height + scrollTop > pos.top) {

          var margin = (pos.top - (height + scrollTop));
           $("#section5b .covervid-wrapper").css({
            "marginTop": margin + pageTopMargin,
           });
          $("#section5b img").css({
            "marginTop": margin,
           });

        }
        else {
          $("#section5b .covervid-wrapper").css({
            "marginTop": pageTopMargin,
           });
           $("#section5b img").css({
            "marginTop": 0,
           });
        }
      };
      
      if (isMobile === false)
      {
        sticky_section();
        footer_check();
      }
      
      $(window).scroll(function() {
        if (isMobile === false)
        {
          sticky_section();
          footer_check();
        }
      });

})(jQuery); // Fully reference jQuery after this point.
