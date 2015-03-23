(function($) {

  var isCrossfading = false;

  $("#menu-primary-navigation li:nth-child(1)").addClass("active");

  $("#menu-primary-navigation li").each(function(){
    $(this).find("a").removeAttr("href");
  });

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
    else if (index === 3){$.fn.fullpage.moveTo(19);}
    else if (index === 4){$.fn.fullpage.moveTo(27);}
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

    if(nextIndex === 27 && direction === 'down'){
      $("#section-5a-content").fadeIn();
    }
    else if(nextIndex === 26 && direction === 'up'){
      $("#section-5a-content").fadeOut("fast");
    }
    else if(nextIndex === 31 && direction === 'down'){
      $("#section-5a-content").fadeOut("fast");
    }
    else if(nextIndex === 30 && direction === 'up'){
      $("#section-5a-content").fadeIn();
    }

    var footerHeight = $("footer").height();
    if(nextIndex === 32 && direction === 'down'){
      $("footer").animate({
        bottom : 0,
      }, 500);
      $("#video5wrapper").animate({
        "marginTop": -footerHeight + "px",
      }, 500);
    }
    else if(nextIndex < 32 && direction === 'up'){
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
    else if (nextIndex >= 10 && nextIndex < 14){
      $("#menu-primary-navigation li.active").removeClass("active");
      $("#menu-primary-navigation li:nth-child(2)").addClass("active");
    }
    else if (nextIndex >= 14 && nextIndex < 19){
      $("#menu-primary-navigation li.active").removeClass("active");
      $("#menu-primary-navigation li:nth-child(3)").addClass("active");
    }
    else if (nextIndex >= 19 && nextIndex < 27){
      $("#menu-primary-navigation li.active").removeClass("active");
      $("#menu-primary-navigation li:nth-child(4)").addClass("active");
    }
    else if (nextIndex >= 27){
      $("#menu-primary-navigation li.active").removeClass("active");
      $("#menu-primary-navigation li:nth-child(5)").addClass("active");
    }
  };

  var manageSlide = function(index, nextIndex, direction, elem){

        if (nextIndex === 23) {
          $.fn.fullpage.setAllowScrolling(false);
        }
        else if (nextIndex === 25)
        {
          $.fn.fullpage.setAllowScrolling(false);
        }
        else {
          $.fn.fullpage.setAllowScrolling(true);
        }
  };

  var sectionSlide = function(anchorLink, index, slideIndex, element) {
      if (index === 23 && slideIndex < 6) {
        if (slideIndex === 0 || slideIndex === 5) {
          $.fn.fullpage.setAllowScrolling(true);
        }
        else {
          $.fn.fullpage.setAllowScrolling(false);
        }
      }
      else if (index === 25 && slideIndex < 5) {
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

  $('#fullpage').fullpage({
    //Scrolling
    scrollOverflow: false,
    touchSensitivity: 30,
    normalScrollElementTouchThreshold: 3,

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
    responsive: 0,

    //events
    onLeave: function(index, nextIndex, direction){
      manageVideos(index, nextIndex, direction, $(this));
      staticSections(index, nextIndex, direction, $(this));
      manageNav(index, nextIndex, direction, $(this));
      manageSlide(index, nextIndex, direction, $(this));
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
    else if(nextIndex === 15 && $("#video3").hasClass("playing") === false){
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
    else if(nextIndex >= 17 && nextIndex < 22 && $("#video4").hasClass("playing") === false){
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
    else if(nextIndex >= 26 && nextIndex < 31 && $("#video2").hasClass("playing") === false){
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
    else if(nextIndex >= 31 && $("#video5").hasClass("playing") === false){
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
