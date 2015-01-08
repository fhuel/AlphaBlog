// Google Prettify
function styleCode() {
  if (typeof disableStyleCode != 'undefined') { return; }

  var a = false;

  $('code').each(function() {
    if (!$(this).hasClass('prettyprint')) {
      $(this).addClass('prettyprint');
      a = true;
    }
  });

  if (a) { prettyPrint(); }
}

$(function() {styleCode();});

// Viewport unit buggyfill
!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.viewportUnitsBuggyfill=b()}(this,function(){"use strict";function m(a,b){var c;return function(){var d=this,e=arguments,f=function(){a.apply(d,e)};clearTimeout(c),c=setTimeout(f,b)}}function n(){try{return window.self!==window.top}catch(a){return!0}}function o(c){a||(c===!0&&(c={force:!0}),b=c||{},b.isMobileSafari=k,b.isBadStockAndroid=l,(b.force||k||i||l||j||b.hacks&&b.hacks.required(b))&&(b.hacks&&b.hacks.initialize(b),a=!0,h=document.createElement("style"),h.id="patched-viewport",document.head.appendChild(h),x(function(){var a=m(q,b.refreshDebounceWait||100);window.addEventListener("orientationchange",a,!0),window.addEventListener("pageshow",a,!0),(b.force||i||n())&&(window.addEventListener("resize",a,!0),b._listeningToResize=!0),b.hacks&&b.hacks.initializeEvents(b,q,a),q()})))}function p(){h.textContent=t()}function q(){a&&(r(),setTimeout(function(){p()},1))}function r(){return g=[],e.call(document.styleSheets,function(a){"patched-viewport"!==a.ownerNode.id&&a.cssRules&&(a.media&&a.media.mediaText&&window.matchMedia&&!window.matchMedia(a.media.mediaText).matches||e.call(a.cssRules,s))}),g}function s(a){if(7===a.type){var c;try{c=a.cssText}catch(f){return}return d.lastIndex=0,d.test(c)&&(g.push([a,null,c]),b.hacks&&b.hacks.findDeclarations(g,a,null,c)),void 0}if(!a.style){if(!a.cssRules)return;return e.call(a.cssRules,function(a){s(a)}),void 0}e.call(a.style,function(c){var e=a.style.getPropertyValue(c);d.lastIndex=0,d.test(e)&&(g.push([a,c,e]),b.hacks&&b.hacks.findDeclarations(g,a,c,e))})}function t(){f=w();var c,d,a=[],b=[];return g.forEach(function(e){var f=u.apply(null,e),g=f.selector.length?f.selector.join(" {\n")+" {\n":"",h=new Array(f.selector.length+1).join("\n}");return g&&g===c?(g&&!c&&(c=g,d=h),b.push(f.content),void 0):(b.length&&(a.push(c+b.join("\n")+d),b.length=0),g?(c=g,d=h,b.push(f.content)):(a.push(f.content),c=null,d=null),void 0)}),b.length&&a.push(c+b.join("\n")+d),j&&a.push("* { content: normal !important; }"),a.join("\n\n")}function u(a,c,e){var f,g=[];f=e.replace(d,v),b.hacks&&(f=b.hacks.overwriteDeclaration(a,c,f)),c&&(g.push(a.selectorText),f=c+": "+f+";");for(var h=a.parentRule;h;)g.unshift("@media "+h.media.mediaText),h=h.parentRule;return{selector:g,content:f}}function v(a,b,c){var d=f[c],e=parseFloat(b)/100;return e*d+"px"}function w(){var a=window.innerHeight,b=window.innerWidth;return{vh:a,vw:b,vmax:Math.max(b,a),vmin:Math.min(b,a)}}function x(a){var b=0,c=function(){b--,b||a()};e.call(document.styleSheets,function(a){a.href&&y(a.href)!==y(location.href)&&(b++,z(a.ownerNode,c))}),b||a()}function y(a){return a.slice(0,a.indexOf("/",a.indexOf("://")+3))}function z(a,b){A(a.href,function(){var c=document.createElement("style");c.media=a.media,c.setAttribute("data-href",a.href),c.textContent=this.responseText,a.parentNode.replaceChild(c,a),b()},b)}function A(a,b,c){var d=new XMLHttpRequest;if("withCredentials"in d)d.open("GET",a,!0);else{if("undefined"==typeof XDomainRequest)throw new Error("cross-domain XHR not supported");d=new XDomainRequest,d.open("GET",a)}return d.onload=b,d.onerror=c,d.send(),d}var b,f,g,h,a=!1,c=window.navigator.userAgent,d=/([+-]?[0-9.]+)(vh|vw|vmin|vmax)/g,e=[].forEach,i=!1,j=c.indexOf("Opera Mini")>-1,k=/(iPhone|iPod|iPad).+AppleWebKit/i.test(c)&&function(){var a=/Version\/(\d+)/.exec(window.navigator.userAgent);return a.length>1&&parseInt(a[1])<8}(),l=function(){var a=c.indexOf(" Android ")>-1;if(!a)return!1;var b=c.indexOf("Version/")>-1;if(!b)return!1;var d=parseFloat((c.match("Android ([0-9.]+)")||[])[1]);return 4.4>=d}();return{version:"0.4.2",findProperties:r,getCss:t,init:o,refresh:q}});

// Enter/return to submit search form
$('#search-form input').keydown(function(e) {
  if (e.keyCode == 13) {
    $('#search-form').submit();
  }
});

// Determines which transition event this browser has. Useful for the header
// position fix.
function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

// Debounce function for resize listener
function debounce(delay, callback, accumulateData) {
    var timeout = null;
    var theData = [];
    return function () {
        // accumulate arguments in case caller is interested
        // in that data
        if (accumulateData) {
            var arr = [];
            for (var i = 0; i < arguments.length; ++i)
                arr.push(arguments[i]);
            theData.push(arr);
        }

        // if a timeout has been registered before then
        // cancel it so that we can setup a fresh timeout
        if (timeout) {
            clearTimeout(timeout);
        }
        var args = arguments;
        timeout = setTimeout(function () {
            callback.apply((accumulateData) ? { data: theData } : null, args);
            theData = []; // clear the data array
            timeout = null;
        }, delay);
    };
}

// The drawer's transform causes the fixed header in the medium layout to
// become fixed relative to the parent rather than the window. This switches
// that element to absolute positioning and positions based on the container's
// scroll position. The inline styles are removed when the drawer is closed.
var headerEl = document.querySelectorAll('header')[0];
var pusherEl = document.querySelectorAll('.pure-pusher')[0];
var drawerToggleEl = document.querySelectorAll('#pure-toggle-left')[0];

function attachHeader() {
  headerEl.style.position = 'absolute';
  headerEl.style.top = pusherEl.scrollTop + 'px';
}

drawerToggleEl.addEventListener('change', function toggleHeaderPosition(){
  if (drawerToggleEl.checked && window.innerWidth >= 850 && window.innerWidth <= 1499) {
    attachHeader();
  } else {
    pusherEl.addEventListener(whichTransitionEvent(), function unsetHeaderInlineStyles(e){
      headerEl.removeAttribute('style');
      e.target.removeEventListener(e.type, arguments.callee);
    });
  }
});

window.addEventListener('resize', debounce(100, function() {
  if (drawerToggleEl.checked && window.innerWidth >= 850 && window.innerWidth <= 1499) {
    attachHeader();
  } else {
    headerEl.removeAttribute('style');
  }
  if (drawerToggleEl.checked && window.innerWidth > 1499) {
    pusherEl.style.WebkitTransform = 'none';
    pusherEl.style.transform = 'none';
  } else {
    pusherEl.removeAttribute('style');
  }
}));
