!function ($) {

    "use strict";
    
    var ResizeImg = function(element) {
        this.$element = $(element);
    };
    ResizeImg.prototype.resize = function() {
        var $img = this.$element.children('img').eq(0),
            elW = this.$element.innerWidth(),
            elH = this.$element.innerHeight(),
            elScale = elW/elH;
        this.$element.css({
            'position': 'relative',
            'overflow': 'hidden',
        });
        $img.load(function() {
            doResize();
        });
        var doResize = function() {
            var imgW = $img.width(),
                imgH = $img.height(),
                imgScale = imgW/imgH,
                portrait = {
                    'position': 'absolute',
                    'height': '100%',
                    'width': 'auto',
                    'left': '50%',
                    'top': 0,
                    'margin-left': imgW*(elH/imgH)/-2
                },
                landscape = {
                    'position': 'absolute',
                    'height': 'auto',
                    'width': '100%',
                    'left': 0,
                    'top': '50%',
                    'margin-top': imgH*(elW/imgW)/-2
                },
                center = {
                    'position': 'absolute',
                    'height': '100%',
                    'width': '100%',
                    'top': 0,
                    'left': 0
                };
            if(imgH > imgW) {
                if(elH > elW) {
                    if(elScale > imgScale) {
                        $img.css(landscape);
                    } else {
                        $img.css(portrait);
                    };
                } else {
                   $img.css(landscape); 
                };
            };

            if(imgW > imgH) {
                if(elH > elW) {
                    $img.css(portrait);
                } else {
                    if(elScale > imgScale) {
                        $img.css(landscape);
                    } else {
                        $img.css(portrait);
                    };
                };
            };

            if(imgW == imgH) {
                if(elH > elW) {
                    $img.css(portrait);
                } else if(elH < elW) {
                    $img.css(landscape);
                } else {
                    $img.css(center);
                };
            };
            $img.fadeTo(500, 1);
            }
        };

    $.fn.rsImg = function () {
        this.children("img").fadeTo(0,0);
        return this.each(function () {
            new ResizeImg(this).resize();
        });
    };

    $(function() {
        $('.resizeimg').rsImg();
    });
}(window.jQuery);