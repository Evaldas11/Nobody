$(function() {
	var $nav = $('header nav ul');
	var $hamb = $('header nav .hamburger');
	var $overlay = $('.overlay');
	var $read_more1 = $('.carousel .text .readmore');
	var $btn_more1 = $('.carousel .text p a');
	var $btn_more2 = $('.section .blocks .align a');
	var $end_form = $('.section .blocks.column4 .end-forma');
	var $toggler = $('.toggler');
	var $top_bar = $('.topbar');
	var $p_hide = $('.section .blocks .hide');
	var $pop_up = $('.popup');
	var $popup_text = $('.grid .right .column');
	var $contact_us = $('.lorem p a');
	

	// hamburgerio funkcija
	$hamb.on('click', function(){
		$nav.toggleClass('hamb');
		$(this).toggleClass('hamb');
		$overlay.toggle();
	});
	$overlay.on('click', function(){
		$(this).toggle();
		$nav.removeClass('hamb');
		$hamb.removeClass('hamb');
	});	
	// read more mygtuko isskleidimas (photo slicer)
	$btn_more1.on('click', function(e){
		e.preventDefault();
		// console.log($(this).html());
		$read_more1.toggle();
		if ($(this).html() == 'READ MORE&gt;&gt;') {
			$(this).html('CLOSE >>');
		} else {
			$(this).html('READ MORE&gt;&gt;');
		}
	});
	// Apatines formos tikrinimas
	$end_form.on('submit', function(e){
		e.preventDefault();
		var $empty_fields = false;
		var $form_fields = $(this).find('.fields');
		$(this).find('h6').remove();

		$form_fields.each(function(){
			if ($(this).val() == '') {
				$empty_fields = true;
				$(this).after("<h6>Empty fields, please fill in</h6>");
				}
			});	
			

			function validateEmail(email) {
			var re = /\S+@\S+\.\S+/;
			return re.test(String(email).toLowerCase());
			}

			var $email_field = $end_form.find('.fields.email');
			console.log($email_field);
			if (!validateEmail($email_field.val())) {
			$empty_fields = true;
			$email_field.after("<h6>Incorrect email address.</h6>");
				}
			

		if ($empty_fields) {
			console.log('Empty fields');
		} else {
			// console.log($form_fields.val());
			}
	});

	// toggler funkcija
	$toggler.on('click', function(){
		if ($(this).html() == '<p>-</p>') {	
			$top_bar.slideToggle(500);
			$toggler.html('<p>+</p>');
		}
		else {
			$top_bar.slideToggle(500);
			$toggler.html('<p>-</p>');
		}
	});

	// read more back section
	$btn_more2.on('click', function(e){
		e.preventDefault();
		$(this).parent().parent().find('.hide').toggle();
		if ($(this).html() == 'Read More &gt;&gt;') {
			$(this).html('Close >>');
		} else {
			$(this).html('Read More &gt;&gt;');
		}
	});

	// pop up
	$popup_text.on('click', function(e){
		e.preventDefault();
		var $objects = $(this).find('img, p');
		console.log($objects);
		$overlay.toggle();
		$objects.clone().appendTo($pop_up);
		$pop_up.toggle();
	});
	$overlay.on('click', function(){
		$pop_up.toggle();
		$pop_up.empty();
	});

	//conatct us numetimas i konaktus apacioje
	$contact_us.on('click', function(e) {
		e.preventDefault();
		var $info = $('.section .column4');
		$('html,body').animate({
			scrollTop: $info.offset().top}, 'slow');
	});

	//carousel
	var $dots = $('.carousel .dots .dot');
	var width = 1000;
	var animationSpeed = 1000;
	var pause = 3000;
	var currentSlide = 1;
	var $slider = $('.carousel');
	var $slides = $slider.find('.slides');
	var $slide = $slides.find('.slide');
	var margin_left = 0;
	var interval;

	$dots.on('click', function(){
		currentSlide = parseInt($(this).data('dot'));
		margin_left = currentSlide*width-width;
		$(this).addClass('active').siblings().removeClass('active');
		$slides.animate({'margin-left': -margin_left}, animationSpeed);
	});

	function startSlider(){
		interval = setInterval(function() {
			currentSlide++;
			if(currentSlide == 6) {
				$dots.eq(0).addClass('active').siblings().removeClass('active');

			} 
			else {
				$dots.eq(currentSlide-1).addClass('active').siblings().removeClass('active');
			}
			$slides.animate({'margin-left': '-='+ width}, animationSpeed, function(){
				// currentSlide++;
				if(currentSlide === $slide.length) {
					currentSlide = 1;
					$slides.css('margin-left', 0);
					// $dots.eq(0).addClass('active').siblings().removeClass('active');
				}
			// 	else {
			// 		$dots.eq(currentSlide-1).addClass('active').siblings().removeClass('active');
			// }
			});
		}, pause);
	}

	function stopSlider() {
		clearInterval(interval);
	}
	$slider.on('mouseover', stopSlider).on('mouseleave', startSlider);
	startSlider();

	// carousel responsive 
		// nustatom funkcija, kad patikrintu ir suskaiciuotu naujus plocius ir margin
		// jeigu window yra mazesnis nei 1000px
	function checkScreenSize() {
		if ($(window).width() <= 1000) {
			width = $(window).width() + 17;
			$slides.css('width', width*$slides.find('.slide').length);
			$slides.find('.slide').css('width', width);
		}
	}
	$(window).on('resize', function(){
		// console.log($(window).width());
		checkScreenSize();
		margin_left = currentSlide*width-width;
		$slides.css('margin-left', -margin_left);
		if ($(window).width() >= 1000) {
			width = 1000;
			$slides.css('width', width*$slides.find('.slide').length);
			$slides.find('.slide').css('width', width);
		}
	});
	checkScreenSize();
	// console.log($dots.length);
	// console.log($slide.length);
});