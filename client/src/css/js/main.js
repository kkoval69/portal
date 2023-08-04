import * as jQuery from "jquery";
import "../../../node_modules/jquery/dist/jquery.min.js";

const $ = require('jquery');


$(document).ready(function () {

    $('.nav-toggler').click(function (e) {
        $(this).next().slideToggle(500);
    });

});
(function ($) {
    'use strict';

    // ===== Main Menu
    function mainMenu() {
        const navbarToggler = $('.nav-toggler'),
            navMenu = $('.nav-menu'),
            mobilePanel = $('.mobile-menu-panel'),
            mobilePanelMenu = $('.mobile-menu-panel .panel-menu'),
            navClose = $('.panel-close');

        // Navbar toggler
        navbarToggler.on('click', function (e) {
            e.preventDefault();

            navbarToggler.toggleClass('panel-opened');
            mobilePanel.toggleClass('panel-opened');
        });

        // Close icon
        navClose.on('click', function (e) {
            e.preventDefault();

            mobilePanel.removeClass('panel-opened');
            navbarToggler.removeClass('panel-opened');
        });

        // Adds toggle button to li items that have children
        navMenu.find('li a').each(function () {
            if ($(this).next().length > 0) {
                $(this).append('<span class="dd-trigger"><i class="far fa-angle-down"></i></span>');
            }
        });

        mobilePanelMenu.find('li a').each(function () {
            if ($(this).next().length > 0) {
                $(this).append('<span class="dd-trigger"><i class="far fa-angle-down"></i></span>');
            }
        });

        // Expands the dropdown menu on each click
        mobilePanelMenu.find('.dd-trigger').on('click', function (e) {
            e.preventDefault();
            $(this).parent().parent('li').children('ul.submenu').stop(true, true).slideToggle(350);
            $(this).toggleClass('submenu-opened')
        });
    };

    // ===== Sticky Header
    function stickyHeader() {
        let scroll_top = $(window).scrollTop(),
            siteHeader = $('.site-header'),
            offsetTop = siteHeader.outerHeight(),
            offsetTopAnimation = offsetTop;

        if (siteHeader.hasClass('sticky-header')) {
            if (scroll_top > offsetTopAnimation) {
                siteHeader.addClass('sticky-on');
            } else {
                siteHeader.removeClass('sticky-on');
            }
        }
    }

    // ===== Header Breakpoint Resize
    function headerBreakpointResize() {
        // Breakpoint Check
        const windowWidth = $(window).innerWidth(),
            navContainer = $('.navbar-wrapper'),
            breakpoint = 992;

        if (windowWidth <= breakpoint) {
            navContainer.addClass('breakpoint-on');
        } else {
            navContainer.removeClass('breakpoint-on');
        }

        // Header Height
        const siteHeader = $('.site-header');
        if (!siteHeader.hasClass('transparent-header')) {
            let newHeight = 0;
            siteHeader.removeAttr('style');
            newHeight = siteHeader.outerHeight();
            siteHeader.height(newHeight);
        }
    }

    // ===== Counter Up
    function counterUp() {
        $('.counter-box').on('inview', function (event, isInView) {
            if (isInView) {
                $(this).find('.count').each(function () {
                    var $this = $(this);
                    $({
                        Counter: 0
                    }).animate({
                        Counter: $this.text()
                    }, {
                        duration: 3000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter));
                        },
                    });
                });
            }
        });
    }

    // ===== Project Progress Bar
    function projectProgressBar() {
        $('.project-item').on('inview', function (event, isInView) {
            if (isInView) {
                $.each($('.stats-bar'), function () {
                    var dataCount = $(this).attr('data-value'),
                        progress = $(this).find('.bar-line');

                    // progress css
                    progress.css('width', dataCount + '%');
                });
            }
        });
    }

    // ===== Project Slider One


    // ===== Active Tooltip

    // ===== Image Block slider


    // ==== Preloader
    function preloader() {
        if ($('#preloader').length) {
            $('#preloader').fadeOut('slow');
        }
    }

    /*---------------------
    === Document Ready  ===
    ----------------------*/
    $(document).ready(function () {
        mainMenu();
        headerBreakpointResize();
        counterUp();
        projectProgressBar();


    });

    /*--------------------
    === Window Resize  ===
    --------------------*/
    $(window).on('resize', function () {
        headerBreakpointResize();
    });

    /*--------------------
    === Window Scroll  ===
    ----------------------*/
    $(window).on('scroll', function () {
        stickyHeader();
    });


})(jQuery);