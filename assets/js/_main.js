(function($) {

Modernizr.load();
  var isCrossfading = false;

  var oldIE = false;
  if ($('html').is('.ie6, .ie7, .ie8, .ie9')) {
      oldIE = true;
  }

  $("#menu-primary-navigation li:nth-child(1)").addClass("active");

  $("#menu-primary-navigation li").each(function(){
    $(this).find("a").removeAttr("href");
  });

  var resizeCompare = function() {
    $('#image-compare').height($(".fp-section").height());

    var offset = ($(window).width()/2) - 1100 * ($(window).height()/1100);
    $('#image-compare').css({"margin-left" : offset + "px"});
  };

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

    var fullscreenHeight = $(".fp-section").height() - 105;
    $(".covervid-wrapper").height(fullscreenHeight);
        
    $('.covervid-video').each(function(){
      $(this).coverVid(2200, 1100);
    });
  };

  var staticSections = function(index, nextIndex, direction, elem) {

    if(nextIndex >= 25 && nextIndex < 28)
    {
      $("#section-5a-content").fadeIn();

      var step = nextIndex - 25;

      if (step === 0)
      {
        setTimeout(function(){
          $("#section-5a-content img:nth-child(1)").animate({"opacity":1});
        },1000);
      }
      else if (step === 1)
      {
        $("#section-5a-content img:nth-child(3)").animate({"opacity":1});
      }

      animateElements();
    }
    else
    {
      $("#section-5a-content").fadeOut("fast");
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
    willScroll: function(index, nextIndex, direction){
      console.log("will scroll");
    },
    afterLoad: function(anchorLink, index){
      animateElements();
    },
    afterRender: function(){

      setTimeout(function(){
        animateElements();
        $(".loader").fadeOut();
        $("#image-compare").twentytwenty();  
       }, 2000);

      resizeCompare();
      resizeVideos();
    },
    afterResize: function(){
      resizeVideos();
      resizeCompare();
    },
    afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
       sectionSlide(anchorLink, index, slideIndex, $(this));
    },
  });

  $("#scroll-down").click(function(){
    $.fn.fullpage.moveSectionDown();
  }); 

  $('[data-toggle="popover"]').popover({
    trigger: 'click',
    html: true,
    placement: 'top',
    template: '<div class="popover" role="tooltip"><div class="popover-content" onclick="$(&quot;.popover&quot;).popover(&quot;hide&quot;);"><a class="close-button"></a></div></div>',
  });

  var lastVideo = $("#video0");
  var manageVideos = function(index, nextIndex, direction, elem){

    var videos = $(".covervid-video:not(.playing)");
    var thisVideo;

    if(nextIndex < 3) {
      thisVideo = $("#video0");
    }
    else if(nextIndex >= 3 && nextIndex < 6) {
      thisVideo = $("#video1");
    }
    else if(nextIndex >= 6 && nextIndex < 10) {
      thisVideo = $("#video2");
    }
    else if(nextIndex === 15) {
      thisVideo = $("#video3");
      if (oldIE === false)
      {
        thisVideo[0].play();
        thisVideo[0].currentTime = 0.0; 
      }
    }
    else if(nextIndex >= 18 && nextIndex < 21) {
      thisVideo = $("#video4");
    }
    else if(nextIndex >= 24 && nextIndex < 28) {
      thisVideo = $("#video2");
    }
    else if(nextIndex >= 28){
      thisVideo = $("#video5");
    }

    if (thisVideo !== undefined && thisVideo.is(lastVideo) === false)
    {
      if (lastVideo)
      {
        if (oldIE === false)
        {
          lastVideo[0].pause();
        }
        lastVideo.fadeOut();
      }

      lastVideo = thisVideo;

      if (thisVideo)
      {
        if (oldIE === false)
        {
          thisVideo[0].play();
          thisVideo[0].currentTime = 0.0;
        } 
        thisVideo.fadeIn();
      }
    }
    else if (thisVideo === undefined && lastVideo)
    {
      if (oldIE === false)
      {
        lastVideo[0].pause();
      } 
      lastVideo.fadeOut();
      lastVideo = thisVideo;
    }
  };

})(jQuery);
