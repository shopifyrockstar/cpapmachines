(function($){
// 	if ( $(".template-page").length ) {
// 		$("h4").each(function(){
// 			$(this).nextUntil("h4,h1").wrapAll("<div class='toggle-container'></div>");
// 		}).click(function(e) {
// 			$(this).toggleClass('active');
// 		});
// 	}
  
  $("#customer_logout_link").on('click',function(e){
    $.ajax({
      type: "POST",
      url: '/cart/clear.js',
      dataType: 'json'
    });
  });
});

// window.addEventListener("load", function(event) {
//   $('#content #q').attr('name', '');
//   setTimeout(disableSearchMouseDown, 1000);
// });

// function disableSearchMouseDown() {
//   $('#content #q').attr('name', 'q');
//   if(window.innerWidth <= 767 && $('#content #q')) {
//     $('#content #q').off("mousedown");
//     $('#content #q').off("touchstart");
//   }
// }

$(function() {
//   (function($) {
//     var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

//     $.fn.attrchange = function(callback) {
//       if (MutationObserver) {
//         var options = {
//           subtree: false,
//           attributes: true
//         };

//         var observer = new MutationObserver(function(mutations) {
//           mutations.forEach(function(e) {
//             callback.call(e.target, e.attributeName);
//           });
//         });

//         return this.each(function() {
//           observer.observe(this, options);
//         });

//       }
//     }
//   });
  
//   if (window.innerWidth <= 767 && $('#content #q')) {
//     $('#content #q').attrchange(function (attrName) {
//       if (attrName == 'class') {
//         setTimeout(function() {
//           $('#content #q').off("mousedown");
//           $('#content #q').off("touchstart");
//         }, 300);
//       }
//     });
//   }
});


$(document).ready(function(){
	console.log($(window).width());
})