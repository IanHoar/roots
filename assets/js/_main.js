(function($) {

  var isCrossfading = false;

  $("#menu-primary-navigation li:nth-child(1)").addClass("active");

  $("#menu-primary-navigation li").each(function(){
    $(this).find("a").removeAttr("href");
  });


  var resizeCompare = function() {
    $('#image-compare').height($(".fp-section").height());
  };

  resizeCompare();

  $(".music").click(function(){

    if ($(this).hasClass("paused"))
    {
      $('audio').each(function(){
          this.play(); // Stop playing
      });
      $(this).removeClass("paused");
    }
    else
    {
      $('audio').each(function(){
          this.pause(); // Stop playing
      });
      $(this).addClass("paused");
    }

  });

  $("#menu-primary-navigation li").click(function(){
    var index = $(this).index();

    $("#menu-primary-navigation li.active").removeClass("active");
    $(this).addClass("active");

    $("#section-4f-content").fadeOut("fast");
    $("#section-5a-content").fadeOut("fast");

    if (index === 0){$.fn.fullpage.moveTo(1);}
    else if (index === 1){$.fn.fullpage.moveTo(10);}
    else if (index === 2){$.fn.fullpage.moveTo(14);}
    else if (index === 3){$.fn.fullpage.moveTo(25);}
  });

  var animateElements = function() {
    $(".active .os-animation").each(function(){
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
  };

  var resizeVideos = function() {
    $(".covervid-video").each(function(){
      
      var fullscreenHeight = $(".fp-section").height();
      var paddingTop = 105;
      
      $(this).height(fullscreenHeight);
      
      $('.covervid-video').each(function(){
        $(this).coverVid(2200, 1100);
        $(this).get(0).play();
      });
    });
  };

  var staticSections = function(index, nextIndex, direction, elem) {

    if(nextIndex === 25 && direction === 'down'){
      $("#section-5a-content").fadeIn();
    }
    else if(nextIndex === 24 && direction === 'up'){
      $("#section-5a-content").fadeOut("fast");
    }
    else if(nextIndex === 28 && direction === 'down'){
      $("#section-5a-content").fadeOut("fast");
    }
    else if(nextIndex === 27 && direction === 'up'){
      $("#section-5a-content").fadeIn();
    }

    var footerHeight = $("footer").height();
    if(nextIndex === 29 && direction === 'down'){
      $("footer").animate({
        bottom : 0,
      }, 500);
      $("#video5wrapper").animate({
        "marginTop": -footerHeight + "px",
      }, 500);
    }
    else if(nextIndex < 29 && direction === 'up'){
      $("footer").animate({
        bottom : -footerHeight + "px",
      }, 500);
      $("#video5wrapper").animate({
        "marginTop": 0,
      }, 500);
    }
  };

  var manageNav = function(index, nextIndex, direction, elem){
    if (nextIndex > 0 && nextIndex < 10){
      $("#menu-primary-navigation li.active").removeClass("active");
      $("#menu-primary-navigation li:nth-child(1)").addClass("active");
    }
    else if (nextIndex >= 10 && nextIndex < 13){
      $("#menu-primary-navigation li.active").removeClass("active");
      $("#menu-primary-navigation li:nth-child(2)").addClass("active");
    }
    else if (nextIndex >= 14 && nextIndex < 25){
      $("#menu-primary-navigation li.active").removeClass("active");
      $("#menu-primary-navigation li:nth-child(3)").addClass("active");
    }
    else if (nextIndex >= 25){
      $("#menu-primary-navigation li.active").removeClass("active");
      $("#menu-primary-navigation li:nth-child(4)").addClass("active");
    }
  };

  var manageSlide = function(index, nextIndex, direction, elem){

        if (nextIndex === 21) 
        {
          $.fn.fullpage.setAllowScrolling(false);
        }
        else if (nextIndex === 23)
        {
          $.fn.fullpage.setAllowScrolling(false);
        }
        else 
        {
          $.fn.fullpage.setAllowScrolling(true);
        }
  };

  var sectionSlide = function(anchorLink, index, slideIndex, element) {
      if (index === 21 && slideIndex < 4) {
        if (slideIndex === 0 || slideIndex === 3) {
          $.fn.fullpage.setAllowScrolling(true);
        }
        else {
          $.fn.fullpage.setAllowScrolling(false);
        }
      }
      else if (index === 23 && slideIndex < 5) {
        if (slideIndex === 0 || slideIndex === 4) {
          $.fn.fullpage.setAllowScrolling(true);
        }
        else {
          $.fn.fullpage.setAllowScrolling(false);
        }
      }
      else {
        $.fn.fullpage.setAllowScrolling(true);
      }
  };

  var sectionCrossfade = function(index, nextIndex, direction, elem) {

    var nextElem = $(".fp-section:nth-child("+nextIndex+")");
    if (elem.hasClass("crossfade") && nextElem.hasClass("crossfade") && isCrossfading === false)
    {
      isCrossfading = true;
      var exitingElement = elem;
      var clonedExitingElement = exitingElement.clone(true);

      clonedExitingElement.css({
        "position" : "absolute",
        "z-index" : 2,
        "marginTop" : -$(".fp-section").height(),
      });

      $("body").after(clonedExitingElement);

      setTimeout(function(){

        clonedExitingElement.stop().animate({opacity: 0}, 500, function(){

          clonedExitingElement.remove();
          isCrossfading = false;
        });
      }, 750);
    }
  };

  var managePause = function(index, nextIndex, direction, elem) {
      if (index === 14) {
        $.fn.fullpage.setAllowScrolling(false);
        setTimeout(function(){
          $.fn.fullpage.setAllowScrolling(true);
        }, 5000);
      }

  };

  $('#fullpage').fullpage({
    //Scrolling
    scrollOverflow: false,
    touchSensitivity: 1500,

    //Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: false,
    loopHorizontal: false,

    //Design
    controlArrows: false,
    verticalCentered: true,
    resize : true,
    fixedElements: '.navbar-static-top, .content-info',
    responsive: 767,

    //events
    onLeave: function(index, nextIndex, direction){
      $.fn.fullpage.setAllowScrolling(true);
      manageVideos(index, nextIndex, direction, $(this));
      staticSections(index, nextIndex, direction, $(this));
      manageNav(index, nextIndex, direction, $(this));
      manageSlide(index, nextIndex, direction, $(this));
      sectionCrossfade(index, nextIndex, direction, $(this));
      managePause(index, nextIndex, direction, $(this));
    },
    afterLoad: function(anchorLink, index){
      animateElements();
    },
    afterRender: function(){

      setTimeout(function(){
        animateElements();
        resizeVideos();

        $(".loader").fadeOut();

        $(".horizontal").css({
          'background-position-x': '0%',
        });

        $("#image-compare").twentytwenty();  
      }, 2000);
     
    },
    afterResize: function(){
      resizeVideos();
      resizeCompare();
    },
    afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
       sectionSlide(anchorLink, index, slideIndex, $(this));
    },
    onSlideLeave: function(anchorLink, index, slideIndex, direction){}
  });

  $("#scroll-down").click(function(){
    $.fn.fullpage.moveSectionUp();
  }); 

  $('[data-toggle="popover"]').popover({
    trigger: 'click',
    html: true,
    placement: 'top',
    template: '<div class="popover" role="tooltip"><div class="popover-content" onclick="$(&quot;.popover&quot;).popover(&quot;hide&quot;);"><a class="close-button"></a></div></div>',
  });

  var manageVideos = function(index, nextIndex, direction, elem){

    var videos = $(".covervid-video");

    if(nextIndex < 3 && $("#video0").hasClass("playing") === false){
      $('.playing').removeClass("playing");

      videos.each(function(){
          $(this).get(0).pause();
          $(this).fadeOut();
      });

      videos[0].play();
      videos[0].currentTime = 0.0; 
      $("#video0").fadeIn();
      $("#video0").addClass("playing");
    }
    else if(nextIndex >= 3 && nextIndex < 6 && $("#video1").hasClass("playing") === false){
      $('.playing').removeClass("playing");

      videos.each(function(){
          $(this).get(0).pause();
          $(this).fadeOut();
      });

      videos[1].play();
      videos[1].currentTime = 0.0; 
      $("#video1").fadeIn();
      $("#video1").addClass("playing");
    }
    else if(nextIndex >= 6 && nextIndex < 10 && $("#video2").hasClass("playing") === false){
      $('.playing').removeClass("playing");

      videos.each(function(){
          $(this).get(0).pause();
          $(this).fadeOut();
      });

      videos[2].play();
      videos[2].currentTime = 0.0; 
      $("#video2").fadeIn();
      $("#video2").addClass("playing");
    }
    else if(nextIndex === 14 && $("#video3").hasClass("playing") === false){
      $('.playing').removeClass("playing");

      videos.each(function(){
          $(this).get(0).pause();
          $(this).fadeOut();
      });

      videos[3].play();
      videos[3].currentTime = 0.0; 
      $("#video3").fadeIn();
      $("#video3").addClass("playing");
    }
    else if(nextIndex >= 18 && nextIndex < 20 && $("#video4").hasClass("playing") === false){
      $('.playing').removeClass("playing");

      videos.each(function(){
          $(this).get(0).pause();
          $(this).fadeOut();
      });

      videos[4].play();
      videos[4].currentTime = 0.0; 
      $("#video4").fadeIn();
      $("#video4").addClass("playing");
    }
    else if(nextIndex >= 24 && nextIndex < 28 && $("#video2").hasClass("playing") === false){
      $('.playing').removeClass("playing");

      videos.each(function(){
          $(this).get(0).pause();
          $(this).fadeOut();
      });

      videos[2].play();
      videos[2].currentTime = 0.0; 
      $("#video2").fadeIn();
      $("#video2").addClass("playing");
    }
    else if(nextIndex >= 28 && $("#video5").hasClass("playing") === false){
      $('.playing').removeClass("playing");

      videos.each(function(){
          $(this).get(0).pause();
          $(this).fadeOut();
      });

      videos[5].play();
      videos[5].currentTime = 0.0; 
      $("#video5").fadeIn();      
      $("#video5").addClass("playing");
    }
    
  };

})(jQuery); // Fully reference jQuery after this point.
