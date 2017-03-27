function readURL(input) {
    if (input.files && input.files[0]) {
        var _thumb = $(input).parent().find('img');
        if (!_thumb.length) {
            _thumb = $(input).parent().prev().find('img.img-responsive');
        }
        if (_thumb.length) {
            var reader = new FileReader();
            var height = _thumb.attr('height') || _thumb.height();
            reader.onload = function(e) {
                _thumb
                    .attr('src', e.target.result)
                    .width(height)
                    .css('object-fit', 'cover')
                    .height(height);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
}

(function($) {
    $(document).ready(function() {

        // TENTANG JS

        $('.toggle-desc-wrapper').click(function(e) {
            e.preventDefault();
            var wrp = $(this).parents().eq(2).find('.profil-sinergi-desc-toggle');

            wrp.slideToggle('normal', function() {
                var btn = $(this).parent().find('.profil-sinergi-desc i');
                
                if (btn.find('.fa-angle-down') != null) {
                    btn.removeClass('fa-angle-down')
                    .addClass('fa-angle-up');
                } else {
                    btn.removeClass('fa-angle-up')
                    .addClass('fa-angle-down');
                }
                    
            });
        });

        /**
         * Default Thumb URL
         * {string}
         */
        var defaultImgThumb,
            imgPropertyUpload,
            videoPropertyUpload,
            mfpOptions = {
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            };

        if ($('.row[data-property=image-upload]')) {
            imgPropertyUpload = $('[data-property=image-upload]').clone();
            if (imgPropertyUpload.find('[type=file]')) {
                imgPropertyUpload.find('[type=file]').val('');
            }
        }

        if ($('.row[data-property=video-upload]')) {
            videoPropertyUpload = $('[data-property=video-upload]').clone();
            videoPropertyUpload.find('input').each(function() {
                $(this).val('');
            });
        }

        /**
         * ---------------------------------------------
         *                  INIT IMAGE
         * ---------------------------------------------
         */
        if ($('[id^=img-thumb]').length) {
            defaultImgThumb = $('[id^=img-thumb]').attr('src');
        }
        if ($('[type=file]').length) {
            $('[type=file]').trigger('change');
        }

        /**
         * ---------------------------------------------
         *                  VIDEO UPLOAD
         * ---------------------------------------------
         */
        /**
         * Callback
         */
        function changeVideoUpload() {
            var $this = $(this),
                split = [],
                valid = false,
                url = $(this).val();
            if (url) {
                if (url.match(/youtube\.com/ig)) {
                    url = url
                        .replace(/^\s*(?:https?:)\/\/(?:(?:m|www)\.+)?(?:youtube\.com(?:\/+))?/ig, '')
                        .replace(/^\s*/, '')
                        .replace(/\s*$/, '');
                    split = url.split('?');
                    if (split.length > 1) {
                        if (split[0].match(/watch/ig)) {
                            split.shift();
                            split = split.join('?');
                            split = split.split('&');
                            url = '';
                            for (var iKey in split) {
                                if (typeof split[iKey] == 'string' && split[iKey].match(/^v\=/)) {
                                    url = split[iKey].replace(/^v\=/, '').replace(/\&(.*)/gi, '');
                                    valid = true;
                                    break;
                                }
                            }
                        } else {
                            url = '';
                        }
                    } else {
                        url = '';
                    }
                } else {
                    url = url
                        .replace(/^\s*(?:https?:)\/\/(?:(?:m|www)\.+)?(?:youtu.be(?:\/+))?/ig, '')
                        .replace(/^\s*/, '')
                        .replace(/\s*$/, '');
                    if (url) {
                        split = url.split('?');
                        if (split.length && !split[0].match(/[^a-z0-9\_\-]/ig)) {
                            url = split[0];
                            valid = true;
                        } else {
                            url = '';
                        }
                    }
                }
            }
            if (valid && url.length < 4) {
                valid = false;
            }
            var $p = $this.parent().parent();
            var imgRes = $p.parent().siblings('div.col-md-3').find('img.img-responsive');
            if (valid) {
                if ($p.length) {
                    $p = $p.find('a.popup-youtube');
                    if ($p.length) {
                        $p.attr('href', 'https://youtube.com/watch?v=' + url);
                    }
                }

                if (imgRes.length) {
                    var img_url = 'https://i.ytimg.com/vi/' + url + '/hqdefault.jpg';
                    if (imgRes.attr('src') != img_url) {
                        imgRes.attr('src', img_url);
                    }
                }
            } else {
                if ($p.length) {
                    $p = $p.find('a.popup-youtube');
                    if ($p.length) {
                        $p.attr('href', '#');
                    }
                }
                if (imgRes.length) {
                    if (imgRes.attr('src') != defaultImgThumb) {
                        imgRes.attr('src', defaultImgThumb);
                    }
                }
            }
            $this.val(url);
        }
        var textVideoUpload = $('input[name^=video-upload]');
        textVideoUpload.on('change', changeVideoUpload);
        /* Triggering */
        textVideoUpload.change();
        var addColumnVideo = $('#add-column-video');
        var addColumnPhoto = $('#add-column-photo');
        if (videoPropertyUpload) {
            addColumnVideo.find('.btn').on('click', function(e) {
                var bodyColumnVideo = $('#upload-video-panel .panel-body');
                var lengthVid = bodyColumnVideo.find('[data-property=video-upload]').length;
                if (lengthVid < 4) {
                    addColumnVideo.before(videoPropertyUpload);
                    videoPropertyUpload.find('input[name^=video-upload]').unbind('change');
                    videoPropertyUpload.find('input[name^=video-upload]').on('change', changeVideoUpload);
                    videoPropertyUpload.find('.popup-youtube').magnificPopup(mfpOptions);
                    videoPropertyUpload = videoPropertyUpload.clone();
                    $('#upload-video-panel .panel-body')
                        .find('[data-property=video-upload]')
                        .each(function() {
                            var $this = $(this);
                            if (!$(this).find('span.img-close').length) {
                                var img_close = $('<span class="img-close">&times;</span>');
                                $(this).find('img.img-responsive').before(img_close);
                                img_close.on('click', function() {
                                    var th_ = $('#upload-video-panel .panel-body')
                                        .find('[data-property=video-upload]');
                                    if (th_.length == 2) {
                                        th_.each(function() {
                                            $(this).find('span.img-close').unbind();
                                            $(this).find('span.img-close').remove();
                                        })
                                    }
                                    var _parent = $this;
                                    _parent.find('*').unbind();
                                    _parent.remove();
                                    addColumnVideo.find('.btn').removeClass('hidden');
                                });
                            }
                        });
                    if (lengthVid === 3) {
                        $(this).addClass('hidden');
                    }
                } else {
                    $(this).addClass('hidden');
                }
            });
        } else {
            addColumnVideo.remove();
        }
        if (imgPropertyUpload) {
            addColumnPhoto.find('.btn').on('click', function(e) {
                var bodyColumnPhoto = $('#upload-photo-panel .panel-body');
                var lengthPhoto = bodyColumnPhoto.find('[data-property=image-upload]').length;
                if (lengthPhoto < 4) {
                    addColumnPhoto.before(imgPropertyUpload);
                    imgPropertyUpload = imgPropertyUpload.clone();
                    $('#upload-photo-panel .panel-body')
                        .find('[data-property=image-upload]')
                        .each(function() {
                            var $this = $(this);
                            if (!$(this).find('span.img-close').length) {
                                var img_close = $('<span class="img-close">&times;</span>');
                                $(this).find('img.img-responsive').before(img_close);
                                img_close.on('click', function() {
                                    var th_ = $('#upload-photo-panel .panel-body')
                                        .find('[data-property=image-upload]');
                                    if (th_.length == 2) {
                                        th_.each(function() {
                                            $(this).find('span.img-close').unbind();
                                            $(this).find('span.img-close').remove();
                                        })
                                    }
                                    var _parent = $this;
                                    _parent.find('*').unbind();
                                    _parent.remove();
                                    addColumnPhoto.find('.btn').removeClass('hidden');
                                });
                            }
                        });
                    if (lengthPhoto === 3) {
                        $(this).addClass('hidden');
                    }
                } else {
                    $(this).addClass('hidden');
                }
            });
        } else {
            addColumnPhoto.remove();
        }
        /**
         * ---------------------------------------------
         *                  MENU MENU
         * ---------------------------------------------
         */

        $(".nav-tabs a").click(function(e) {
            $(this).tab('show');
        });

        $('a.menu1').click(function(e) {
            e.preventDefault();
            $('div.control div#firstController').removeClass('hide');
            $('div.control div#secondController').addClass('hide');
        });
        $('a.menu2').click(function(e) {
            e.preventDefault();
            $('div.control div#secondController').removeClass('hide');
            $('div.control div#firstController').addClass('hide');
        });
        $('a[href*="#content-"]').click(function(e) {
            e.preventDefault();
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

        $('li.sign-up > .trigger').popover({
            html: true,
            content: function() {
                return $(this).parent().find('.content').html();
            }
        });
        $('li.sign-in > .trigger').popover({
            html: true,
            content: function() {
                return $(this).parent().find('.content').html();
            }
        });

        $('li > a.trigger.allready-login')
            .popover({
                html: true,
                content: function() {
                    return $(this).parent().find('.content').html();
                }
            })
            .click(function(e) {
                e.preventDefault();
                $('.popover').addClass('login-popover');
            });

        $('a[data-toggle="popover"]').on('click', function(e) {
            e.preventDefault();
        });

        /**
         * ---------------------------------------------
         *                  CAROUSEL
         * ---------------------------------------------
         */

        var firstArrow = $('.control');
        var firstArrowPrev = firstArrow.find('.mundur');
        var firstArrowNext = firstArrow.find('.maju');

        // Init for first slide
        var firstSlide = $('.komal-carousel').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            swipe: true,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 662,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1
                }
            }],
            arrows: false,
            appendArrow: firstArrow,
            autoPlay: true,
            autoplaySpeed: 2000
        });

        // controller for first slide
        firstArrowPrev.click(function(e) {
            e.preventDefault();
            var i = firstArrowPrev.index(this);
            firstSlide.eq(i).slick("slickPrev");
        });
        firstArrowNext.click(function(e) {
            e.preventDefault();
            var i = firstArrowNext.index(this);
            firstSlide.eq(i).slick("slickNext");
        });

        /**
         * ---------------------------------------------
         *                  POPUP
         * ---------------------------------------------
         */
        $('body').on('click', function(e) {
            $('[data-toggle="popover"]').each(function() {
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    $(this).popover('hide');
                }
            });
        });

        // Image popups
        $(".image-popups").magnificPopup({
            delegate: 'a',
            type: 'image',
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function() {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            closeOnContentClick: true,
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });

        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup(mfpOptions);

        /**
         * ---------------------------------------------
         *                  FIX TAG
         * ---------------------------------------------
         */
        $('input[type][required]:not([type=files])').on('change invalid', function() {
            var txtField = $(this)[0];
            txtField.setCustomValidity('');
            if (!txtField.validity.valid) {
                txtField.setCustomValidity($(this).attr('title') || 'Wajib Diisi');
                $(this).css('border', '1px solid #e74c3c');
                $(this).addClass('not-valid');
            } else {
                if ($(this).hasClass('not-valid')) {
                    $(this).removeClass('not-valid');
                    $(this).css('border', "");
                }
            }
        });

        /**
         * Form Register
         */
        $('[type=password] + #pass-toggle-view').on('click', function(e) {
            e.preventDefault();
            var pass = $(this).prev('input');
            var attr = pass.attr('type');
            var icon = $(this).find('.glyphicon');
            if (attr == 'password') {
                pass.attr('type', 'text');
                icon.removeClass('glyphicon-eye-open');
                icon.addClass('glyphicon-eye-close');
            } else {
                pass.attr('type', 'password');
                icon.removeClass('glyphicon-eye-close');
                icon.addClass('glyphicon-eye-open');
            }
        });

        if ($('#calendar').length && $.fn.fullCalendar) {
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                editable: true,
                eventLimit: true,
                events: {
                    url: '/testing'
                },
                eventDataTransform: function(event) {
                    if (event.allDay) {
                        event.end = moment(event.end).add(1, 'days')
                    }
                    return event;
                },
                eventRender: function(event, element) {
                    element.click(function() {
                        $("#startTime").html(moment(event.start).format('LL'));
                        $("#description").html(event.description);
                        $("#gambar").attr('src', event.image);
                        $("#detail").attr('href', '/festival-mbois/detail-event/' + event.id);
                    });
                }
            });
        }
    });

})(window.jQuery); // END OF FUNCTION JQUERY