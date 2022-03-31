$(document).ready(function () {

	;(function ($, window, document, undefined) {
		"use strict";
		var pluginName = 'simpleAccordion',
		defaults = {
			multiple: false,
			speedOpen: 300,
			speedClose: 150,
			easingOpen: null,
			easingClose: null,
			headClass: 'accordion-header',
			bodyClass: 'accordion-body',
			openClass: 'open',
			defaultOpenClass: 'default-open',
			cbClose: null, //function (e, $this) {},
			cbOpen: null //function (e, $this) {}
		};
		function Accordion(element, options) {
			this.$el = $(element);
			this.options = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;
			if (typeof this.$el.data('multiple') !== 'undefined') {
				this.options.multiple = this.$el.data('multiple');
				} else {
				this.options.multiple = this._defaults.multiple;
			}
			this.init();
		}
		Accordion.prototype = {
			init: function () {
				var o = this.options,
				$headings = this.$el.children('.' + o.headClass);
				$headings.on('click', {_t:this}, this.headingClick);
				$headings.filter('.' + o.defaultOpenClass).first().click();
			},
			headingClick: function (e) {
				var $this = $(this),
				_t = e.data._t,
				o = _t.options,
				$headings = _t.$el.children('.' + o.headClass),
				$currentOpen = $headings.filter('.' + o.openClass);
				if (!$this.hasClass(o.openClass)) {
					if ($currentOpen.length && o.multiple === false) {
						$currentOpen.removeClass(o.openClass).next('.' + o.bodyClass).slideUp(o.speedClose, o.easingClose, function () {
							if ($.isFunction(o.cbClose)) {
								o.cbClose(e, $currentOpen);
							}
							$this.addClass(o.openClass).next('.' + o.bodyClass).slideDown(o.speedOpen, o.easingOpen, function () {
								if ($.isFunction(o.cbOpen)) {
									o.cbOpen(e, $this);
								}
							});
						});
						} else {
						$this.addClass(o.openClass).next('.' + o.bodyClass).slideDown(o.speedOpen, o.easingOpen, function () {
							$this.removeClass(o.defaultOpenClass);
							if ($.isFunction(o.cbOpen)) {
								o.cbOpen(e, $this);
							}
						});
					}
					} else {
					$this.removeClass(o.openClass).next('.' + o.bodyClass).slideUp(o.speedClose, o.easingClose, function () {
						if ($.isFunction(o.cbClose)) {
							o.cbClose(e, $this);
						}
					});
				}
			}
		};
		$.fn[pluginName] = function (options) {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName,
					new Accordion(this, options));
				}
			});
		};
	}(jQuery, window, document));


	// $("a[href^='#']").click(function () {
	// 	var _href = $(this).attr("href");
	// 	$("html, body").animate({ scrollTop: $(_href).offset().top - 100 },);
	// 	return false;
	// });

	$('.doctors__slider>.slick-list>.slick-track>.slick-slide').removeClass('dop-right');

	const swiper = new Swiper('.doctors__slider', {
		// spaceBetween: 30,
		slidesPerView: 1,
		spaceBetween: 100,
		// effect: "flip",
        // grabCursor: true,
		breakpoints: {
			1120: {
			  slidesPerView: 2,
			  spaceBetween: 52
			}
		  },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

	  const swiper2 = new Swiper('.clients__slider', {
		// spaceBetween: 30,
		slidesPerView: 1,
		spaceBetween: 100,

		breakpoints: {

			769: {
			  slidesPerView: 2,
			  spaceBetween: 51
			},
			1500: {
				slidesPerView: 4,
				spaceBetween: 25
			  }
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
      });

	  $(".cases__wrapper .cases__item").click(function(e) {
		e.preventDefault();
		$(".cases__wrapper .cases__item").removeClass('cases__item--line');
		$(this).addClass('cases__item--line');
	  })


	  

	  



function slickify() {
	if ($('.fight__slider').hasClass('slick-initialized')) {
		$('.fight__slider').slick('destroy');
	}

}
slickify();
$(window).resize(function () {
	var $windowWidth = $(window).width();
	if ($windowWidth < 1330) {
		slickify();
	}
});
});

function resizeBlock() {
	//  if(window.matchMedia("screen and (max-width: 1210px)").matches) {
	//     $('.autor').append($('.autor-mob'));
	//   }
	if (window.matchMedia("screen and (min-width: 990px)").matches) {
	  $('.weapon__items').appendTo($('#web'));
	//   $('.weapon__weeks').appendTo($('#web'));
	}
	else if(window.matchMedia("screen and (max-width: 990px)").matches) {

		$('.weapon__items').appendTo($('#mob'));
		// $('.weapon__weeks').appendTo($('#mob'));
	}
	if (window.matchMedia("screen and (min-width: 1220px)").matches) {
	    $('.weapon__weeks').appendTo($('#web'));
	  }
	  else if(window.matchMedia("screen and (max-width: 990px)").matches) {

		$('.weapon__weeks').appendTo($('#mob'));
	}
  }

  $(window).resize(function () {
	resizeBlock();
  });

  $(document).ready(function () {
	resizeBlock();
  });

//   ФОРМА
(function ($) {
    $('.order__form').each(function() {    
        var $frm = $(this);
        var input = $(this).find('.validate-input-at .input-at');
        var butsend = $(this).find('.form-at-btn');
        butsend.on('click',function(){
            var check = true;
            for(var i=0; i<input.length; i++) {
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check=false;
                }
            }
            // Отправка формы        
            if (check == true) {
                $.post("/send.php", $frm.find(".form-at select, .form-at input, .form-at textarea").serialize(),
                    function(data){
                        if(data.frm_check == 'error'){ 
                            $frm.find(".result-at").html("<div class='error-at'>Ошибка: " + data.msg + "</div>");                    
                            } else {
                            $frm.find(".result-at").html("<div class='success-at'>Ваше сообщение отправлено!</div>"); 
                            $frm.find(".form-at").fadeOut(500);
                            $frm.find(".input-at").val("");            
                        }
                    }, "json");
                    return false;
            }
        });
        $('.form-at .input-at').each(function(){
            $(this).focus(function(){
                hideValidate(this);
            });
        });
        
    });    
    function validate(input) {
        /* Если нужно проверять валидность почты, раскомментируйте строчки ниже */
        /*
            if($(input).attr('type') == 'email' || $(input).attr('name') == 'email-at') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
            }
            }
        */
        if($(input).val().trim() == ''){
            return false;
        }
    }
    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }
    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }
})(jQuery);



