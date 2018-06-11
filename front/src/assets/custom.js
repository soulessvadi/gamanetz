/*
Copyright (c) 2018 
------------------------------------------------------------------
[Master Javascript]

Project:	bitcoin  - Responsive HTML Template

-------------------------------------------------------------------*/
(function($) {
    "use strict";
    var bitcoin = {
        initialised: false,
        version: 1.0,
        mobile: false,
        init: function() {
            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }
            /*-------------- bitcoin Functions Calling ---------------------------------------------------
            ------------------------------------------------------------------------------------------------*/
            this.RTL();
            this.tagslide();
            this.nav();
            this.slider();
            this.slider4();
            this.currencies_all();
            this.nano_scroll();
            this.experts();
            this.logos();
            this.news();
            this.reviews();
            this.nws2();
            this.more_about_crypto();
            this.cc_slide();
            this.office_address();
            this.blogs_slide();
            this.Offer_date();
            this.helptab();
            this.Placeholdem();
            this.selectstl();
            this.popup();
            this.img_popup();
            this.bgscroll2();
            this.chart();
            this.img_scroll();
            this.prlx();
            this.why_choose();
            this.testimonial_slide();
            this.testimonial_slide2();
            this.testimonial_slide3();
        },
        /*-------------- bitcoin Functions definition ---------------------------------------------------
        ---------------------------------------------------------------------------------------------------*/
        RTL: function() {
            var rtl_attr = $("html").attr('dir');
            if (rtl_attr) {
                $('html').find('body').addClass("rtl");
            }
        },

        tagslide: function() {
        	if ($(".tagslide").length) {
        		$('.tagslide').owlCarousel({
				    loop:true,
				    margin:0,
				    dots : false,
				    autoplay: true,
			        autoplaySpeed: 2000,
			        fluidSpeed:3000,
			        dragEndSpeed:0,
			        autoplayHoverPause:true,
			        responsive:{
				    	0:{
				    	    items:1
				    	},
				        400:{
				            items:2
				        },
				        600:{
				            items:4
				        },
				        1000:{
				            items:6
				        },
				        1920 : {
				        	items: 9
				        }
				    }
				});
        	}
        },
        
        // Fixed Menu
        nav: function() {
            if ($(".nav-opener").length) {
            	$(".nav-opener").on("click", function(e) {
            		jQuery(this).toggleClass('active').find('i').toggleClass('fa-bars fa-times');
					jQuery('.main-nav').toggleClass('nav-active');
					e.preventDefault();
				});
            };

	       if ($(".s-btn, .home3 .search-form .s-btn").length) {
       		jQuery('.s-btn, .home3 .search-form .s-btn').on("click", function(e) {
			   $(this).parent().toggleClass('round fullw');
			   $(this).find('i').toggleClass('flaticon-magnifier-tool fa-times');
			   e.preventDefault();
			 });


            if ($("#sidenav").length) {
				$("#sidenav").on("click", function(e) {
					jQuery(this).toggleClass('active').find('i').toggleClass('fa-bars fa-times');
					jQuery('.side-nav').toggleClass('active');
					e.preventDefault();
					$('#wrapper').toggleClass("main-wrapper main-wrapper2");
				});

            };

            // close btn
       		jQuery('.side-nav .side-nav-menu .close').on("click", function(e) {
			   $('.side-nav').toggleClass('active');
			   $('.main-nav .nav-login #sidenav').find('i').toggleClass('fa-bars fa-times');
			   e.preventDefault();
			 });

            };

        },
		//Banner Slider2
        slider: function() {
        	if ($("#slider2").length) {
        		$('#slider2').owlCarousel({
					margin:0,
					loop:true,
					animateOut: 'fadeOut',
	    			animateIn: 'fadeIn',
					nav:true,
					center: true,
					dots: false,
					autoplay:false,
     				mouseDrag  : false,
					autoplayHoverPause:false,
					navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>' ],
					items:1
				});
        	}


        },
        //Banner Slider2
        slider4: function() {
        	if ($("#slider4").length) {
        		$('#slider4').owlCarousel({
					margin:0,
					loop:true,
					nav:true,
					center: true,
					dots: false,
					autoplay:false,
					autoplayHoverPause:false,
					navText: ['<span><i class="fa fa-arrow-left"></i>&nbsp; PREV</span>', '<span>NEXT &nbsp;<i class="fa fa-arrow-right"></i></span>' ],
					items:1
				});
        	}


        },
		//Banner Slider2
        currencies_all: function() {
        	if ($(".currencies-all").length) {
	           $('.currencies-all').owlCarousel({
					margin:30,
					loop:false,
					nav:true,
					dots: true,
					autoplay:false,
					stagePadding: 10,
					autoplayHoverPause:false,
					navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>' ],
					responsive:{
							0:{
								items:1
							},
							600:{
								items:2
							},
							1000:{
								items:3
							},
							1300:{
								items:3
							},
							1600:{
								items:4
							}
						}
				});
        	}
        },
        
		//nano_scroll
        nano_scroll: function() {
        	if ($(".nano").length) {
	           $(".nano").nanoScroller();
        	};
        },
        
         experts: function(){
         	if ($(".experts").length) {
				$('.experts').owlCarousel({
					margin:30,
					loop:true,
					nav:false,
					dots: true,
					autoplay:true,
					stagePadding: 20,
					autoplayTimeout:4000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>' ],
					responsive:{
							0:{
								items:1
							},
							600:{
								items:2
							},
							1000:{
								items:3
							},
							1300:{
								items:4
							}
						}
				});
         	}

        },
        

        logos: function(){
        	if ($(".p-logos").length) {
				$('.p-logos').owlCarousel({
					margin:30,
					loop:true,
					nav:false,
					dots: false,
					autoplay:true,
					autoplaySpeed: 3000,
					autoplayTimeout:4000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>' ],
					responsive:{
							0:{
								items:1
							},
							600:{
								items:2
							},
							1000:{
								items:3
							},
							1300:{
								items:4
							}
						}
				});
        	}

        },
        news: function(){
        	if ($(".news").length) {
				$('.news').owlCarousel({
					margin:30,
					loop:true,
					nav:false,
					dots: false,
					autoplay:true,
					autoplaySpeed: 2000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>' ],
					responsive:{
							0:{
								items:1,
								stagePadding: 15
							},
							600:{
								items:1,
								stagePadding: 120
							},
							800:{
								items:2,
								stagePadding: 120
							},
							1000:{
								items:2,
								stagePadding: 100
							},
							1300:{
								items:3,
								stagePadding: 120
							},
							1500:{
								items:3,
								stagePadding: 200
							},
							1700:{
								items:3,
								stagePadding: 300
							},
							1800:{
								items:3,
								stagePadding: 320
							}
						}
				});
        	}

        },
        reviews: function(){
        	if ($(".new-reviews").length) {
				$('.new-reviews').owlCarousel({
					margin:0,
					loop:true,
					nav:false,
					dots: false,
					autoplay:true,
					autoplaySpeed: 2000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>' ],
					responsive:{
							0:{
								items:1
							},
							600:{
								items:1
							},
							1000:{
								items:1
							},
							1300:{
								items:1
							}
						}
				});
        	}

        },
        nws2: function(){
        	if ($(".nws2").length) {
				$('.nws2').owlCarousel({
					margin:0,
					loop:true,
					nav:false,
					dots: false,
					autoplay:true,
					autoplaySpeed: 2000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>' ],
					responsive:{
							0:{
								items:1
							},
							600:{
								items:1
							},
							1000:{
								items:1
							},
							1300:{
								items:1
							}
						}
				});
        	}

        },
        more_about_crypto: function(){
        	if ($(".more-a-crypto").length) {
				$('.more-a-crypto').owlCarousel({
					margin:30,
					loop:true,
					nav:false,
					dots: false,
					autoplay:true,
					autoplaySpeed: 3000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>' ],
					responsive:{
							0:{
								items:1
							},
							600:{
								items:1,
								stagePadding: 100
							},
							700:{
								items:1,
								stagePadding: 160
							},
							1000:{
								items:2
							},
							1300:{
								items:3
							}
						}
				});
        	}

        },
        cc_slide: function(){
        	if ($(".cc-slide").length) {
        		$('.cc-slide').owlCarousel({
					margin:30,
					loop:true,
					nav:false,
					dots: false,
					autoplay:true,
					autoplaySpeed: 3000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>' ],
					responsive:{
							0:{
								items:1
							},
							480:{
								items:2
							},
							600:{
								items:3
							},
							768:{
								items:3
							},
							1000:{
								items:4
							},
							1200:{
								items:5
							},
							1700:{
								items:6
							},
							1850:{
								items:7
							}
						}
				});
        	}

        },
        office_address: function(){
        	if ($(".office-address").length) {
				$('.office-address').owlCarousel({
					margin:20,
					loop:true,
					nav:false,
					dots: true,
					autoplay:true,
					stagePadding:5,
					autoplaySpeed: 3000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>' ],
					responsive:{
							0:{
								items:1
							},
							767:{
								items:1
							},
							1000:{
								items:2
							},
							1200:{
								items:3
							}
						}
				});
        	}

        },
        blogs_slide: function(){
        	if ($(".blogs-slide").length) {
				$('.blogs-slide').owlCarousel({
					margin:0,
					loop:true,
					nav:true,
					dots: false,
					autoplay:true,
					autoplaySpeed: 3000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>' ],
					responsive:{
							0:{
								items:1
							}
						}
				});
        	}

        },
        
		Offer_date: function() {
			if ($("#tokenend").length) {
				var month =  new Date();
        		var nextMonth =  month.getMonth() +1 -1;
        		var Year =  month.getFullYear();
        		var month = new Array();
				month[0] = "January";
				month[1] = "February";
				month[2] = "March";
				month[3] = "April";
				month[4] = "May";
				month[5] = "June";
				month[6] = "July";
				month[7] = "August";
				month[8] = "September";
				month[9] = "October";
				month[10] = "November";
				month[11] = "December";
				var n = month[nextMonth];
        		//console.log(n);
	        	$('#tokenend').dsCountDown({
	        		endDate: new Date( n +"30,"+ Year +" 23:59:00")	
				});
			}
		},	
		
        helptab: function() {
        	if ($(".tabs-menu ul li a").length) {
            	// Inicia o jQuery
					jQuery(function($) {
					  // Captura o clique no link do menu das abas
					  	$(".tabs-menu ul li a").on("click", function() {
					    /** Variáveis **/
					    // Configura o link clicado
					    var a = $(this);
					    // A classe da aba ativa
					    var active_tab_class = 'active-tab-menu';
					    // Captura o atributo data-tab e gera uma classe
					    var the_tab = '.' + a.attr('data-tab');
					    // Remove a classe de aba ativa de todas as abas
					    $('.tabs-menu ul li a').removeClass(active_tab_class);
					    // Adiciona a classe de aba ativa apenas no link clicado
					    a.addClass(active_tab_class);
					    // Adiciona um CSS para ocultar todas as abas
					    $('.tabs-content .tabs').removeClass( "active" );
					    // Mostra apenas a aba que queremos
					    $(the_tab).addClass( "active" );
					    // Não deixa o navegador atualizar a página
					    return false;
					  });
					});
        	}

        	
		},
        //input placeholder 
        Placeholdem: function() {
        	if ($('input').length) {
            	Placeholdem( document.querySelectorAll( '[placeholder]' ) );
        	}
        },
        //Select Option
        selectstl: function() {
        	if ($('select').length) {
				   $('select').niceSelect();   
					var c_bgimg = $(".form-group.coins .nice-select ul.list li.option.selected").css('background-image');
			      	// alert(c_bgimg);
			      	$('.form-group.coins .nice-select').css('background-image', c_bgimg);   
			}
        },
        //Select Option
        
        
        // video popup
        popup: function() {
        	if ($('.video').length) {
				  $('.video').magnificPopup({
			          disableOn: 700,
			          type: 'iframe',
			          mainClass: 'mfp-fade',
			          removalDelay: 160,
			          preloader: false,

			          fixedContentPos: false
			        });
	        }

        	
        }, 
        img_popup: function() {
        	if ($('.magnific-youtube, .video, .magnific-vimeo').length) {
	            $('.img-popup').magnificPopup({
					type: 'image',
					closeOnContentClick: true,
					closeBtnInside: false,
					mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
					image: {
						verticalFit: true
					},
					zoom: {
						enabled: true,
						duration: 300 // don't foget to change the duration also in CSS
					}
				});
        	}
        },
        
	    bgscroll2: function() {
        	if ($('div.scroll2').length) {
	            // Background Scroll
				var scrollSpeed = 30;
	    
			    // set the default position
			    var current = 0;

			    // set the direction
			    var direction = 'h';

			    function bgscroll(){

			        // 1 pixel row at a time
			        current -= 1;
			   
			        // move the background with backgrond-position css properties
			        $('div.scroll2').css("backgroundPosition", (direction == 'h') ? current+"px 0" : "0 " + current+"px");
			   
			    }

			    //Calls the scrolling function repeatedly
			     setInterval(bgscroll, scrollSpeed);  
        	}
				
		 },
       
        
        //chart
        chart: function() {
            if ($('#line-chart').length) {
            	var data = [
					      { y: '1 April', a: 400, b: 1000},
					      { y: '2 April', a: 1500,  b: 2500},
					      { y: '3 April', a: 1400,  b: 3000},
					      { y: '4 April', a: 1300,  b: 2250},
					      { y: '5 April', a: 1700,  b: 2200}
					    ],
					    config = {
					      data: data,
					      xkey: 'y',
					      ykeys: ['a', 'b'],
					      labels: ['Total Income', 'Total Outcome'],
					      fillOpacity: 0.6,
					      hideHover: 'auto',
					      behaveLikeLine: true,
					      resize: true,
					      pointFillColors:['#cc99cc','#33cc99'],
					      pointStrokeColors: ['#cc99cc','#33cc99'],
					      lineColors:['#cc99cc','#33cc99']
					  };
					
					config.element = 'line-chart';
					Morris.Line(config);
            }
	    },
	     //chart
        img_scroll: function() {
            if ($('.screen').length) {
            $(window).on('load', function() {
		      	$( '.screen' ).scrollImage();   
		     });
            }
	    },
	     //chart
        prlx: function() {
            if ($('.jarallax').length) {
	            
					 objectFitImages();

			        /* init Jarallax */
			        jarallax(document.querySelectorAll('.jarallax'));

			        jarallax(document.querySelectorAll('.jarallax-keep-img'), {
			            keepImg: true,
			        });
				
            }
	    },
	    // why_choose
        why_choose: function() {
            if ($('.why-choose').length) {
	            	$('.why-choose').owlCarousel({
					margin:20,
					loop:true,
					nav:true,
					dots: false,
					rtl: true,
					autoplay:true,
					stagePadding:5,
					autoWidth:true,
					autoplaySpeed: 3000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>' ],
					responsive:{
							0:{
								items:1,
								stagePadding:15,
								autoWidth:false,
								rtl: false
							},
							540:{
								items:1,
								stagePadding:100,
								autoWidth:false,
								rtl: false
							},
							767:{
								items:1,
								stagePadding:150,
								autoWidth:false,
								rtl: false
							},
							991:{
								items:1,
								rtl: false
							},
							1000:{
								items:2
							},
							1200:{
								items:3
							}

						}
				});
				
            }
	    },
	    // Testimonial-slide
        testimonial_slide: function() {
            if ($('.testimonial-slide').length) {
	            	$('.testimonial-slide').owlCarousel({
					margin:30,
					loop:true,
					nav:false,
					dots: false,
					autoplay:true,
					stagePadding:5,
					autoplaySpeed: 4000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>' ],
					responsive:{
							0:{
								items:1
							},
							767:{
								items:1
							},
							1000:{
								items:2
							},
							1200:{
								items:2
							}

						}
				});
				
            }
	    },
	     // Testimonial-slide2
        testimonial_slide2: function() {
            if ($('.testimonial-slide2').length) {
	            	$('.testimonial-slide2').owlCarousel({
					margin:30,
					loop:true,
					nav:false,
					dots: false,
					autoplay:true,
					autoplaySpeed: 3000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>' ],
					responsive:{
							0:{
								items:1,
								stagePadding:15
							},
							540:{
								items:2,
								stagePadding:15
							},
							1000:{
								items:2,
								stagePadding:20
							},
							1200:{
								items:3,
								stagePadding:50
							},
							1400:{
								items:3,
								stagePadding:100
							},
							1700:{
								items:3,
								stagePadding:200
							},
							1800:{
								items:3,
								stagePadding:360
							}

						}
				});
				
            }
	    },
	     // Testimonial-slide3
        testimonial_slide3: function() {
            if ($('.testimonial-slide3').length) {
	            	$('.testimonial-slide3').owlCarousel({
					margin:30,
					loop:true,
					nav:false,
					dots: false,
					autoplay:true,
					autoplaySpeed: 3000,
					autoplayHoverPause: true,
					navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>' ],
					responsive:{
							0:{
								items:1
							},
							800:{
								items:2
							},
							1000:{
								items:2
							},
							1200:{
								items:3
							}

						}
				});
				
            }
	    },
	    
	    
    };
    $(document).ready(function() {
        bitcoin.init();
    });
    //On load
      $(window).on('load', function() {
         initPreLoader();
         var load;
         setTimeout(function() {
             $('body').addClass('load');
         }, 500);

     });
      // PreLoader init
	function initPreLoader() {
		$('.loader_wrapper').delay(1000).fadeOut();
	};

  	// Window Scroll
	$(window).on('scroll', function() {
    	//Go to top
        if ($(this).scrollTop() > 100) {
            $('#go_to_top').addClass('goto');
        } else {
            $('#go_to_top').removeClass('goto');
        }

    });

     $("#go_to_top").on("click", function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false
    });
	
})(jQuery);