import ScrollMagic from 'scrollmagic';


var scrollController = new ScrollMagic.Controller({
	container: 'body',
  	loglevel: 2,
  	refreshInterval: 16	
});

export function SC_addScene (props) {
	    var scene = new ScrollMagic.Scene(props);
	    scrollController.addScene(scene);
	    return scene
	}
