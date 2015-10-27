/*    INFO
//    ================================================
//      File:           bg-p-main.js
//      Auth:           Tim Perry (tim.perry.wagner@gmail.com)
//      Last updated:   10/27/2015
//      *Scope ID:      bgp 
//      Notes:          Will scroll and scale the background image of the header section in a file.  Uses several HTML5 data objects, jQuery (2.1.4).  
//                      Derived and extended from Mohiuddin Parrekh's tutorial at http://code.tutsplus.com/tutorials/a-simple-parallax-scrolling-technique--net-27641
//    ================================================   
//
//    * Used in naming global variables and functions to avoid cross-contamination with other files loaded in same project.
*/

var bgp_scopeId = "bgp";

bgp_isDebug = true;

 $(window).load(function() {    // Using $(window).load to ensure background image loads before processing
    bgp_doDebug("Window loaded");

    /* === Header bg paralax === */
    
    $('header[data-type="background"]').each(function(){
               
        var bgImage = new Image();
        bgImage.src = $(this).css("background-image").replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];

        var bgWidth = bgImage.width;
        var bgHeight = bgImage.height;
        
        var bgObj = $(this);
        
        var bgScaleThreshold = Number(bgObj.data("scale") / 100);       // max scale percentage modifier of bg image
        var bgScrollThreshold = Number(bgObj.data("scroll-stop"));      // max amount of scroll distance from top of page before header bg image scaling stops

        if($(window).scrollTop() > 0) {     // properly position header bg if page loaded partially scrolled
            doBgScale();
            doBgScroll();
        }

        $(window).scroll(function() {
            if($(window).scrollTop() <= bgScrollThreshold) {
                doBgScale();
            }

            doBgScroll();
        });

        /* ==== non-public functions for header bg manipulation === */
        
        function doBgScale () {
            var bgGuide = bgWidth * (1 - bgScaleThreshold);            
            var bgScale = bgWidth - (bgWidth * ($(window).scrollTop() / bgScrollThreshold) * bgScaleThreshold);

            bgp_doDebug("bgScale: " + bgScale + ", bgGuide: " + bgGuide);
            if(bgScale >= bgGuide) {
                bgObj.css("background-size", bgScale);
                /// bgObj.css("background-size", (100 - ($(window).scrollTop() / 5)) + "%" ); 
            } else {
                bgObj.css("background-size", bgGuide);
            }
        }

        function doBgScroll() {         
            bgObj.css("background-position-y", (($(window).scrollTop() / bgObj.data('speed')) +"px"));

            bgp_doDebug("bg pos: " + bgObj.css("background-position-y"));
        }
    }); 

 });

$(document).ready(function(){
    // Echo...echo...cho...cho...o...o...
});

function bgp_doDebug(bgpMsg) {
    if(bgp_isDebug == true){
        console.log(bgp_scopeId + " debug:: " + bgpMsg);
    }
}