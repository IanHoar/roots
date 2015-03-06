(function($) {

    var pageTopMargin = 105;
    $("html, body").animate({ scrollTop: pageTopMargin }, 0);

//scroll down button
    $("#scroll-down").click(function(){
        $("html, body").animate({ scrollTop: $('#scroll-down-target').offset().top }, 1000);
    }); 

    $("#section4b").mousewheel(function(event, delta) {

      console.log("mousewheel");
      var eTop = $(this).offset().top; //get the offset top of the element
      var eBottom = eTop + 1000; //get the offset top of the element
      var eWidth = $(this).width();
      var scrollWidth = $(this).find(".sub-section").width();

      var bottomIsAboveWindowBottom = eBottom - ($(window).scrollTop() + $(window).height()) > 0 && delta > 0;
      var topIsAboveWindowTop = eTop - $(window).scrollTop() < 0 && delta < 0;

      if (bottomIsAboveWindowBottom || topIsAboveWindowTop)
      {
        if (this.scrollLeft - delta > 0)
        {
          if (this.scrollLeft + eWidth < scrollWidth )
          {
            this.scrollLeft -= (delta);
            event.preventDefault();
          }
        }
      }
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

//Background: cover for video
      $('.covervid-video').each(function(){
        $(this).coverVid(2200, 1100);
      });

//Scrollspy for menu highlighting
      $('body').scrollspy({ target: '.navbar-collapse' });

//stack the subsections

        var subsections =  $('.stackable-section .sub-section');
        $.each(subsections, function( index, element ){
          var zIndex = -index;
          $(element).css( "zIndex", zIndex );
        });

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
            var numberOfChildren = $(this).find(".content-a").length + 0.5; //add 1 for buffer on last section
            var step = Math.max(Math.floor(percentageScrolled * numberOfChildren), 0);

            console.log(step, numberOfChildren);

            if ($(this).hasClass("step-"+step) === false && step < numberOfChildren - 0.5)
            {
              $(this).removeClass();
              $(this).addClass("sub-section step-" + step);

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
              var newMarginTop = -(window_height - pageTopMargin) * step;

              firstElement.delay().animate({ marginTop:  newMarginTop}, animTime, function(){
                     
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

              enteringElement.addClass('active');

              if (shouldCrossfade)
              {
                  var exitingMarginTopBeforeCrossfade = exitingElement.css("marginTop");
                  var enteringMarginTopBeforeCrossfade = enteringElement.css("marginTop");

                  if(enteringElement.index() > exitingElement.index()) 
                  {
                    //scrolling down
                    exitingElement.css({marginTop: exitingElement.index() === 0 ? 0 :  window_height - pageTopMargin, position: "absolute"});
                    enteringElement.css({marginTop: exitingElement.index() === 0 ? 0 :  window_height - pageTopMargin, opacity: 0, zIndex: 99});
                  }
                  else
                  {
                    //scrolling up
                    exitingElement.css({marginTop: -(window_height - pageTopMargin), position: "absolute"});
                    enteringElement.css({opacity: 0, zIndex: 99});
                  }

                  enteringElement.animate({opacity: 1, zIndex: 0}, 500, function() {
                    exitingElement.css('position', 'relative');
                    exitingElement.css('marginTop', exitingMarginTopBeforeCrossfade);
                    exitingElement.css('opacity', 1);
                    exitingElement.css('zIndex', 0);

                    enteringElement.css('position', 'relative');
                    enteringElement.css('opacity', 1);
                    enteringElement.css('zIndex', 0);
                    enteringElement.css('marginTop', enteringMarginTopBeforeCrossfade);

                    firstElement.css('marginTop', newMarginTop);
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
      
      sticky_section();
      
      $(window).scroll(function() {
         sticky_section();
      });

})(jQuery); // Fully reference jQuery after this point.
