jQuery(document).ready(function ($) {
  "use strict";

  $(window).load(function () {
    var $el, leftPos, newWidth,
      $mainNav = $(".top_nav .top_nav_wrapper > ul"),
      $otherNav = $("body.header_style_dark .top_nav .top_nav_wrapper > ul, body.header_style_dark .top_nav .main_menu_nav > ul, body.header_style_white .top_nav .top_nav_wrapper > ul, body.header_style_white .top_nav .main_menu_nav > ul");

    if ($mainNav.length > 0 && $otherNav.length == 0) {
      $mainNav.append("<li id='magic-line'></li>");
      var $magicLine = $("#magic-line");
      var $magicLineWidth = 0;
      var $magicLineLeft = 0;
      if ($mainNav.find(".current_page_item").length || $mainNav.find(".current-menu-parent").length) {
        $magicLineWidth = $(".current_page_item, .current-menu-parent").width();
        $magicLineLeft = $(".current_page_item, .current-menu-parent").position().left + 18;
      }
      $magicLine.width($magicLineWidth)
        .css("left", $magicLineLeft)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());

      $mainNav.find(' > li').hover(function () {
        $el = $(this);
        leftPos = $el.position().left + 18;
        newWidth = $el.width();
        $magicLine.stop().animate({
          left: leftPos,
          width: newWidth
        }, 200);
      }, function () {
        $magicLine.stop().animate({
          left: $magicLine.data("origLeft"),
          width: $magicLine.data("origWidth")
        }, 200);
      });
    }
  });

  // $("select").select2({
  //   width: '100%'
  // });

  // $(":checkbox").uniform();

  if ($(".comment-form-rating #rating").length) {
    $(".comment-form-rating #rating").select2('destroy');
  }

  $('#header div.top_nav').affix({
    offset: {
      top: $("#header div.header_top").innerHeight()
    }
  });

  $('#menu_toggle').live('click', function () {
    $(this).toggleClass('open');
    $('.mobile_header .top_nav_mobile').slideToggle(300);
    return false;
  });

  $(".mobile_header .top_nav_mobile .main_menu_nav > li.menu-item-has-children > a").after('<span class="arrow"><i class="fa fa-chevron-down"></i></span>');

  $(".mobile_header .top_nav_mobile .main_menu_nav > li.menu-item-has-children .arrow").live('click', function () {
    $(this).toggleClass('active');
    $(this).closest('li').addClass('active');
    $(this).closest('li').find('> ul').slideToggle(300);
  });

  $(".mobile_header .top_nav_mobile .main_menu_nav > li.menu-item-has-children > a").live('click', function () {
    if ($(this).attr('href') == '#') {
      $(this).closest('li').find('ul').slideToggle(300);
      $(this).closest('li').find('.arrow').toggleClass('active');
    }
  });

  // Quantity actions
  $('.quantity_actions span').on('click', function () {
    var quantityContainer = $(this).closest('.quantity'),
      quantityInput = quantityContainer.find('.qty'),
      quantityVal = quantityInput.attr('value');

    if ($(this).hasClass('plus')) {
      quantityInput.attr('value', parseInt(quantityVal) + 1);
    } else if ($(this).hasClass('minus')) {
      if (quantityVal > 1) {
        quantityInput.attr('value', parseInt(quantityVal) - 1);
      }
    }
  });

  $(".top_bar_info_switcher a").live('click', function () {
    var id = $(this).attr('href');
    var title = $(this).text();
    $(".top_bar_info").hide();
    $(id).show();
    $(".top_bar_info_switcher .active").text(title);
    return false;
  });

  var page_height = $('html').height() / 4;

  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop() + $(window).height();
    if (page_height <= scroll && scroll != $(document).height()) {
      $(".make_an_appointment").addClass('active');
    }
    if (scroll == $(document).height()) {
      $(".make_an_appointment").removeClass('active');
    }
  });

  $('.js-anchor-link').on('click', function () {
    var el = $(this).attr('href');
    var elWrapper = $(el);

    scrollingTop(elWrapper, 100);

    return false;
  });

  function scrollingTop(elem, height) {
    var offset = elem.offset();
    var offsetTop = offset.top;
    var totalScroll = offsetTop - height;

    $('body,html').animate({
      scrollTop: totalScroll
    }, 1500);
  };

  $('.single-product .product-type-variable table.variations select').live("change", function () {
    $(this).parent().find('.select2-selection__rendered').text($(this).find('option[value="' + $(this).val() + '"]').text());
  });

});