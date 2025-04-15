/*
    Salient by TEMPLATE STOCK 
    https://templatestock.co  @templatestock
    Released for free under the Creative Commons Attribution 3.0 license.
*/

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-menu");
  let overlay;

  // Create overlay element
  function createOverlay() {
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);
  }
  createOverlay();

  // Toggle menu
  function toggleMenu() {
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // Event listeners
  hamburger.addEventListener("click", toggleMenu);

  // Close menu when clicking outside
  overlay.addEventListener("click", function (e) {
    if (navMenu.classList.contains("active")) {
      toggleMenu();
    }
  });

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const fixedHeader = document.querySelector(".fixed-header");
  const heroSection = document.querySelector("#hero-section");

  window.addEventListener("scroll", function () {
    if (heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

      if (window.pageYOffset > heroBottom - 100) {
        fixedHeader.classList.add("scrolled");
      } else {
        fixedHeader.classList.remove("scrolled");
      }
    }
  });
});

(function ($) {
  "use strict";

  $(document).ready(function () {
    /* ==============================================
           1. Full-height hero section
         ============================================== */

    var $heroSection = $("#hero-section");
    function setHeroHeight() {
      $heroSection.css("height", $(window).height());
    }
    setHeroHeight();
    $(window).on("resize", setHeroHeight);

    /* ==============================================
           2. Collapse navbar on smaller screens
         ============================================== */
    $(".navbar-collapse a:not(.dropdown-toggle)").on("click", function () {
      if ($(window).width() < 768) {
        $(".navbar-collapse").collapse("hide");
      }
    });

    /* ==============================================
           3. Scrollspy
         ============================================== */
    $("body").scrollspy({
      target: "#navigation-nav",
      offset: 140,
    });

    /* ==============================================
           4. Parallax with Stellar.js
         ============================================== */
    $.stellar({
      responsive: true,
      horizontalScrolling: false,
      verticalOffset: 0,
    });

    /* ==============================================
           5. Hero Slider (bxSlider)
         ============================================== */
    $(document).ready(function () {
      var slider = $(".caption-slides").bxSlider({
        pager: true,
        mode: "fade",
        adaptiveHeight: true,
        controls: false,
        auto: true,
        speed: 1000,
        pause: 5000,
        onSlideAfter: function () {
          slider.startAuto(); // Restart autoplay after interaction
        },
      });
    });

    /* ==============================================
           6. Smooth scrolling for anchor links
         ============================================== */
    $("a[href*=#]:not([href=#])").on("click", function (e) {
      var pathCheck =
        location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "");
      var hostCheck = location.hostname === this.hostname;
      if (pathCheck && hostCheck) {
        var $target = $(this.hash);
        $target = $target.length
          ? $target
          : $("[name=" + this.hash.slice(1) + "]");
        if ($target.length) {
          $("html, body").animate(
            {
              scrollTop: $target.offset().top - 66,
            },
            1000
          );
          e.preventDefault();
        }
      }
    });

    /* ==============================================
           7. Bootstrap Tooltip
         ============================================== */
    $('[data-toggle="tooltip"]').tooltip();

    /* ==============================================
           8. Counter Up
         ============================================== */
    function triggerCount() {
      $(".statistic-percent").each(function () {
        var percentage = $(this).data("perc");
        $(this).find(".percentfactor").delay(6000).countTo({
          from: 0,
          to: percentage,
          speed: 1000,
          refreshInterval: 10,
        });
      });
    }
    $(".statistic-percent").waypoint(
      function () {
        triggerCount();
      },
      {
        offset: "95%",
        triggerOnce: true,
      }
    );

    /* ==============================================
           9. Progress Bars
         ============================================== */
    $(".progress-bar").each(function () {
      $(this).appear(function () {
        var currentVal = $(this).attr("aria-valuenow");
        $(this).animate({ width: currentVal + "%" });
      });
    });

    /* ==============================================
           10. Placeholder for old browsers
         ============================================== */
    $("input, textarea").placeholder();

    /* ==============================================
           11. Animate on scroll (appear)
         ============================================== */
    $(".animated").appear(
      function () {
        var $thisElement = $(this);
        var animationClass = $thisElement.data("animation");
        var animationDelay = $thisElement.data("delay");
        if (animationDelay) {
          setTimeout(function () {
            $thisElement.addClass(animationClass + " in").removeClass("out");
          }, animationDelay);
        } else {
          $thisElement.addClass(animationClass + " in").removeClass("out");
        }
      },
      { accY: -150 }
    );

    /* ==============================================
           12. Mail subscription
         ============================================== */

    //MailChimp AJAX subscription
    $(".mailchimp").ajaxChimp({
      callback: mailchimpStatus,
      // Replace with your own MailChimp post URL
      url: "",
    });

    function mailchimpStatus(resp) {
      if (resp.result === "success") {
        $(".subscription-success")
          .html('<span class="icon-happy"></span><br/>' + resp.msg)
          .fadeIn(1000);
        $(".subscription-error").fadeOut(500);
      } else if (resp.result === "error") {
        $(".subscription-error")
          .html('<span class="icon-sad"></span><br/>' + resp.msg)
          .fadeIn(1000);
        $(".subscription-success").fadeOut(500);
      }
    }

    // MailerLite Subscription Form Handler
    $(document).ready(function () {
      $(".mailerlite-form").submit(function (e) {
        e.preventDefault();

        const email = $(this).find('input[name="EMAIL"]').val();
        const apiKey =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNTU0MjA3YzQ0YjNlM2MyNzM4ODIxZWRjYTFhODQ5OGMwZTJkZDliOTRiOGZkYTU1NDBjYmFmMzJlNjczYTJkOTU1Y2I5OTJjODhhYmMxZTgiLCJpYXQiOjE3Mzg2ODg2MzkuODk3MDc2LCJuYmYiOjE3Mzg2ODg2MzkuODk3MDgsImV4cCI6NDg5NDM2MjIzOS44OTIwOTIsInN1YiI6IjEzMjY2NDAiLCJzY29wZXMiOltdfQ.N8QNF6zPupPHwH86JZMc4ylvIKO1vx5Ch4LtGuOGlZBFSNS1NNJZGJhyx3HUxlh-fuwmCZX1CNYiPVwtea-a5oAiFVr3nErdWf-bqTlJ3h300fAlpKZ9Y-8VLALigY0-PVGss-tGPiuhUrjF8bXTPPrulx6abGR1ESJmFCx94eYpy8FNeeI5QhS0zK9TAFHIyeoVGmbhnwhRc8WN7meQ_Bqml_ypqsT0Jvw0msPTLPgF6ewTgFM286ry9hnLFIqirmMc3n6UwFh5iEXbCdH51gFKtaoQE1w0mnVaYUdEElcqnacU-NXIktHbWHFIy5Inbq39BnAKYd0AyiFT2DU9Ms1YcfnpQyTKWGWiITvO7RPN2td_rAZ61dAqqTBMU9WIOM1TLJ6TltnC8Vj0jHSnMscWdGDZ0Dy-trLsCqXFflNSs1_5GbtN-mQ7bDF8uQBLfG5N0NbvA-WHJif7XO4Gj98K-gIfmw8LIpuFhCgfinDLmKa26TXIOzrflUOSSfNDEFTl97kVQz46ZAOq9QNDa3PExA1MEy82arXgb_5tB9HmX68o36LiFHb4Xo83pbbG8MfF1AR5snsjrR55_K3EYBrOrIJDy7vuxrgPNBsF6HgB7FVKXj8FvDz9H6yiMfsIToLtHEdG5xymOI63smoNDtA0_SDcgKE65-0zL6Fa0B0";
        const groupId = "145425418667689859";

        $.ajax({
          url: "https://connect.mailerlite.com/api/subscribers",
          type: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          data: JSON.stringify({
            email: email,
            groups: [groupId],
          }),
          success: function (response) {
            $(".subscription-success")
              .html('<span class="icon-happy"></span><br/>¡Suscrito!')
              .fadeIn(1000);
            $(".subscription-error").fadeOut(500);
          },
          error: function (xhr, status, error) {
            let errorMessage =
              "Ha ocurrido un error. Por favor, inténtalo de nuevo.";
            if (xhr.responseJSON && xhr.responseJSON.message) {
              errorMessage = xhr.responseJSON.message;
            }

            $(".subscription-error")
              .html(`<span class="icon-sad"></span><br/>${errorMessage}`)
              .fadeIn(1000);
            $(".subscription-success").fadeOut(500);
          },
        });
      });
    });

    /* ==============================================
           13. Contact Form AJAX
         ============================================== */
    $("#contactform").on("submit", function () {
      var formAction = $(this).attr("action");
      document.cookie = "humans_21909=1; path=/";
      $("#alert").slideUp(750, function () {
        $("#alert").hide();
        $("#submit").attr("disabled", "disabled");

        $.post(
          formAction,
          {
            name: $("#name").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            message: $("#message").val(),
          },
          function (response) {
            $("#alert").html(response).slideDown("slow");
            $("#submit").removeAttr("disabled");
            if (response.match("success") !== null) {
              $("#name").val("");
              $("#email").val("");
              $("#message").val("");
            }
          }
        );
      });
      return false;
    });

    /* ==============================================
           14. Countdown (example usage)
         ============================================== */
    (function initCountdown() {
      var endDate = "June 26, 2026 20:39:00";
      $(".soon-countdown .row").countdown({
        date: endDate,
        render: function (data) {
          // Calculate total days from years + days
          var totalDays = parseInt(data.years * 365) + parseInt(data.days);
          $(this.el).html(
            "<div><div><span>" +
              totalDays +
              "</span><span>days</span></div><div><span>" +
              this.leadingZeros(data.hours, 2) +
              '</span><span>hours</span></div></div><div class="lj-countdown-ms"><div><span>' +
              this.leadingZeros(data.min, 2) +
              "</span><span>minutes</span></div><div><span>" +
              this.leadingZeros(data.sec, 2) +
              "</span><span>seconds</span></div></div>"
          );
        },
      });
    })();

    /* ==============================================
           15. Back-to-top button
         ============================================== */
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 500) {
        $(".back-to-top").fadeIn();
      } else {
        $(".back-to-top").fadeOut();
      }
    });
    $(".back-to-top").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 750);
      return false;
    });

    /* ==============================================
           16. Google Maps Integration
         ============================================== */
    var $gmapDiv = $("#map");
    if ($gmapDiv.length > 0) {
      var coordinates = new google.maps.LatLng(34.031428, -118.2071542, 17);
      var mapInstance = new GMaps({
        el: "#map",
        center: coordinates,
        zoom: 16,
        streetViewControl: true,
        overviewMapControl: true,
        mapTypeControl: true,
        zoomControl: true,
        panControl: true,
        scrollwheel: false,
        styles: [
          {
            featureType: "landscape",
            stylers: [
              { saturation: -100 },
              { lightness: 65 },
              { visibility: "on" },
            ],
          },
          {
            featureType: "poi",
            stylers: [
              { saturation: -100 },
              { lightness: 51 },
              { visibility: "simplified" },
            ],
          },
          {
            featureType: "road.highway",
            stylers: [{ saturation: -100 }, { visibility: "simplified" }],
          },
          {
            featureType: "road.arterial",
            stylers: [
              { saturation: -100 },
              { lightness: 30 },
              { visibility: "on" },
            ],
          },
          {
            featureType: "road.local",
            stylers: [
              { saturation: -100 },
              { lightness: 40 },
              { visibility: "on" },
            ],
          },
          {
            featureType: "transit",
            stylers: [{ saturation: -100 }, { visibility: "simplified" }],
          },
          {
            featureType: "administrative.province",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "water",
            elementType: "labels",
            stylers: [
              { visibility: "on" },
              { lightness: -25 },
              { saturation: -100 },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              { hue: "#ffff00" },
              { lightness: -25 },
              { saturation: -97 },
            ],
          },
        ],
      });
      var iconImage = new google.maps.MarkerImage("../images/map-icon.webp");
      mapInstance.addMarker({
        position: coordinates,
        icon: iconImage,
        title: "Visia",
        infoWindow: {
          content:
            "<p><strong>Visia</strong><br/>121 Somewhere Ave, Suite 123<br/>P: (123) 456-7890<br/>Australia</p>",
        },
      });
    }

    /* ==============================================
           17. BXSlider for projects & blog
         ============================================== */
    $(".project-slider").bxSlider({
      pager: false,
      controls: true,
      auto: true,
      speed: 500,
      pause: 5000,
      useCSS: false,
    });

    $(".blog-slider").bxSlider({
      pager: false,
      controls: true,
      auto: true,
      speed: 500,
      pause: 5000,
      useCSS: false,
    });

    /* ==============================================
           18. BXSlider for tweets
         ============================================== */
    $(".tweet-slider").bxSlider({
      adaptiveHeight: true,
      controls: false,
      auto: true,
    });

    /* ==============================================
           19. BXSlider for testimonials
         ============================================== */
    $(".testimonials-slider").bxSlider({
      nextSelector: ".tc-arrows .tc-arrow-right",
      prevSelector: ".tc-arrows .tc-arrow-left",
      nextText: "<i class='fa fa-angle-right'></i>",
      prevText: "<i class='fa fa-angle-left'></i>",
      pager: false,
      auto: true,
      pause: 5000,
      mode: "vertical",
      useCSS: false,
    });

    /* ==============================================
           20. OWL Carousel
         ============================================== */
    $(".owl-carousel").owlCarousel({
      autoPlay: 3000, // 3 seconds
      items: 4,
      itemsDesktop: [1199, 3],
      itemsDesktopSmall: [979, 3],
    });

    /* ==============================================
           21. Responsive video embeds
         ============================================== */
    $(".project-video, .video-creative, .video-post").fitVids();

    /* ==============================================
           22. MagnificPopup for images & videos
         ============================================== */
    // Images with gallery
    $(".zoom").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
    // Video pop-up
    $(".video-pop-up").magnificPopup({
      type: "iframe",
    });

    /* ==============================================
           23. OWL Carousel for screenshots
         ============================================== */
    $(".screenshots-carousel").owlCarousel({
      autoPlay: 3000,
      items: 5,
      itemsDesktop: [1199, 3],
      itemsDesktopSmall: [979, 3],
      loop: true,
      rewind: false,
    });
  });

  /* ==============================================
         24. Window load -> Isotope + Preloader
       ============================================== */
  $(window).on("load", function () {
    // Isotope filtering
    if ($("#filter").length > 0) {
      var $isoContainer = $("#filter");
      $isoContainer.isotope({
        itemSelector: ".gallery-item",
        transitionDuration: "0.8s",
      });

      $(".filter").on("click", function () {
        $(".filter.active").removeClass("active");
        $(this).addClass("active");
        var selectedFilter = $(this).data("filter");
        $isoContainer.isotope({
          filter: selectedFilter,
        });
        return false;
      });

      $(window)
        .on("resize", function () {
          setTimeout(function () {
            $isoContainer.isotope();
          }, 1000);
        })
        .trigger("resize");
    }

    // Masonry layout
    if ($("#type-masory").length) {
      var $masonryContainer = $("#type-masory");
      $masonryContainer.imagesLoaded(function () {
        $masonryContainer.fadeIn(1000).isotope({
          itemSelector: ".masonry-item",
        });
      });
    }

    // Preloader fade out
    $("#loading-animation").fadeOut();
    $("#preloader").delay(600).fadeOut("slow");
  });
})(jQuery);
