var TIMEOUT = 800;
var tm;

$(document).ready(function() {
	var logo = $('.logo');	
	var logoWhite = $('#logo-white');
	var logoColor = $('#logo-color');

	logo.hover(		
		function() {
			var dist = window.pageYOffset || document.documentElement.scrollTop;					
			if(dist > 100) {
				logoColor.attr('src', 'imagenes/menu_bar/logo_muvio_bar_hoverx2.png');
			} else {
				logoWhite.attr('src', 'imagenes/menu_bar/logo_muvio_bar_hoverx2.png');
			}						
		},
		function() {			
			var dist = window.pageYOffset || document.documentElement.scrollTop;								
			if(dist > 100) {
				logoColor.attr('src', 'imagenes/menu_bar/logo_muvio_bar_coloresx2.png');
			} else {				
				logoWhite.attr('src', 'imagenes/menu_bar/logo_muvio_barx2.png');
			}	
		}
	)

	/********** Navbar Solid ********/
	function changeSolidNavbar() {
		var distY = window.pageYOffset || document.documentElement.scrollTop;		
		var navbar = document.getElementById('cambio-nav');
		var logoWhite = document.getElementById('logo-white');
		var logoColor = document.getElementById('logo-color');
		var a = document.getElementsByClassName('link_seccion');

		if (distY > 100) {
			navbar.classList.add('navbar-color');			
			logoWhite.style.display = 'none';
			logoColor.style.display = 'inline';			
			Array.from(a).forEach(function(element) {				
				element.classList.add('color-black');
			});
		} else {
			navbar.classList.remove('navbar-color');
			logoColor.style.display = 'none';
			logoWhite.style.display = 'inline';
			Array.from(a).forEach(function(element) {				
				element.classList.remove('color-black');
			});
		}
	}
	
	window.addEventListener('scroll', changeSolidNavbar);
	
	/******* Funcionamiento de fullPage para responsive ********/
	if (window.innerWidth > 768) {			
		$('#seccion-responsive').remove();
		activateSlides();
	}	
});

$('#flecha').click(function(){
		$.fn.fullpage.moveSectionDown();
});

function activateSlides(){
	$('#fullpage').fullpage({
		// sectionsColor: ['#1bbc9b', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF'],
		sectionSelector: '.fullpage-section:visible',
		scrollBar: true,
		navigation: true,
		scrollingSpeed: TIMEOUT,
		onLeave: function(index, nextIndex, direction) {
			disableKeyNavigationForSomeTime(TIMEOUT);
			if(index==1){
				$('#menu_bar').fadeOut("slow");
			}

			if(nextIndex==1){
				$('#menu_bar').fadeOut("fast");
			}
		},
		afterLoad: function(section, index){
			/*Logica para prender link por seccion que se está viendo*/
			$('.link_seccion').removeClass('seccion_actual');
			var id_seccion = "#link_seccion" + index;
			$(id_seccion).addClass('seccion_actual');
			/*link_seccion3 se debe prender para las secciones 3,4,5 que son de Producto*/
			if(index==4 || index==5){
				var id_seccion = "#link_seccion" + 3;
				$(id_seccion).addClass('seccion_actual');
			}

			/*Logica para cambiar el estilo del menu de negro a blanco*/
			if(index>1){
				$('#menu_bar').fadeIn("slow");
				$('#menu_bar').addClass('menu_blanco');
				$('#img_muvio').fadeIn("slow");
			}
			else{
				$('#menu_bar').fadeIn("slow");
				$('#menu_bar').removeClass('menu_blanco');
			}
		},
		afterRender: function(){
			// play the video
			$('video').get(0).play();
		}
	});
}

function disableKeyNavigationForSomeTime(TIMEOUT){
	$.fn.fullpage.setKeyboardScrolling(false);
	clearTimeout(tm);
	setTimeout(function(){
		$.fn.fullpage.setKeyboardScrolling(true);
	}, TIMEOUT);
}

