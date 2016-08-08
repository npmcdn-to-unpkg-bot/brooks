import $ from 'jquery';
import {SC_addScene} from './scroll-controller';
import Parallax from './Parallax';
import TweenMax from 'gsap/src/uncompressed/TweenMax';
import ScrollMagic from 'scrollmagic';
import 'imports?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import * as ilObject from 'imports?define=>false&this=>window!imagesloaded/imagesloaded';
var
	$win      = $(window),
	winHeight = $win.height(),
	imagesloaded = ilObject.default,
	started = false;

 // parallax scenes

function main(){	

	var parallaxType = ['pages', 'wave', 'land'];
	imagesLoaded( document.querySelector('body'), function() { 
		
		// on load action here 

		if($win.width() >= 768 && !started){
			started = true;
			parallaxType.forEach(parallax);


			setTimeout(() =>$('.animated','.top__header').css('opacity', '1').addClass('slideInDown'), 0); 
			setTimeout(() => $('.top__header-sub','.top__section-in').css('opacity', '1').addClass('slideInLeft'), 500); 
			setTimeout(() => $('.top__header-button','.top__section-in').css('opacity', '1').addClass('fadeInUp'), 1000); 

			$('.js-animate').get().forEach(tileOccurence);
		}
	});

}


function tileOccurence(el ){
	SC_addScene({
	 	offset: 0,
	 	triggerElement: el,
	 	triggerHook: 'onEnter'
	})
	.on('start', (e) => {
	        $('.animated',el).css('opacity', '1').addClass('fadeInUp');
	    });
}

function parallax(slug) {

	$(`[data-parallax${slug}]`).each(function(index, el){

		var $el = $(el),
	      	parallaxInstance = new Parallax($el),
	      	slugUpper = 'move' + slug.charAt(0).toUpperCase() + slug.slice(1);

		var scene = SC_addScene({
	      duration: winHeight + $el.height(),
	      triggerHook: 'onEnter',
	      triggerElement: el
	    })
		.on('progress', function(e){
	        parallaxInstance[slugUpper](e.progress, e.scrollDirection);
		})
		parallaxInstance.setScene(scene);
	});
}

main();
$win.on('resize', main);

