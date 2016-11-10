$(function () {

    $(document).ready(function () {
        $(".nav-tabs a").click(function () {
            $(this).tab('show');
        });

        $('a.menu1').click(function () {
            $('div.control div#firstController').removeClass('hide');
            $('div.control div#secondController').addClass('hide');
        });
        $('a.menu2').click(function () {
            $('div.control div#secondController').removeClass('hide');
            $('div.control div#firstController').addClass('hide');
        });

    });

    $('a[href*="#content-"]').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });
    $('.multi-item-carousel').carousel({
        interval: false
    });

    // for every slide in carousel, copy the next slide's item in the slide.
    // Do the same for the next, next item.
    $('.multi-item-carousel .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
        for (var i = 0; i < 2; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
    });

    $('li.sign-up>.trigger').popover({
        html: true,
        content: function () {
            return $(this).parent().find('.content').html();
        }
    });
    $('li.sign-in>.trigger').popover({
        html: true,
        content: function () {
            return $(this).parent().find('.content').html();
        }
    });

    $('li>a.trigger.allready-login').popover({
        html: true,
        content: function () {
            return $(this).parent().find('.content').html();
        }
    });

    $('li>a.trigger.allready-login').click(function () {
        $('.popover').addClass('login-popover');
    });

    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    $('input[type=text]').on('change invalid', function () {
        var txtField = $(this).get(0);

        txtField.setCustomValidity('');

        if (!txtField.validity.valid) {
            txtField.setCustomValidity('Wajib Diisi');
            $('.form-control[required]').css('border', '1px solid #e74c3c');
            $('.form-control[required]').addClass('not-valid');
        }
    });


    // Image popups
    $(".image-popups").magnificPopup({
        delegate: 'a',
        type: 'image',
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function () {
                // just a hack that adds mfp-anim class to markup 
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });



}); // END OF FUNCTION JQUERY

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img-thumb')
                .attr('src', e.target.result)
                .width(250)
                .css('object-fit', 'cover')
                .height(250);
        };

        reader.readAsDataURL(input.files[0]);
    }
}