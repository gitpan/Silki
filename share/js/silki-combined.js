/* Generated at 2010-05-31 16:38:02.0 America/Chicago */

var JSAN = { "use": function () {} };


/* /usr/local/share/silki/js-source/DOM/Ready.js */

if(typeof DOM=="undefined"){DOM={};}
DOM.Ready={};DOM.Ready.VERSION="0.16";DOM.Ready.finalTimeout=15;DOM.Ready.timerInterval=50;DOM.Ready._checkDOMReady=function(){if(DOM.Ready._isReady){return DOM.Ready._isReady;}
if(typeof document.getElementsByTagName!="undefined"&&typeof document.getElementById!="undefined"&&(document.getElementsByTagName("body")[0]!==null||document.body!==null)){DOM.Ready._isReady=1;}
return DOM.Ready._isReady;};DOM.Ready._checkDOMDone=function(){if(DOM.Ready._isDone){return DOM.Ready._isDone;}
/*@cc_on
       /*@if (@_win32)
    try {
        document.documentElement.doScroll("left");
        DOM.Ready._isDone = 1;
    } catch (e) {}
          @else @*/
if(document.readyState&&(/interactive|complete|loaded/.test(document.readyState))){DOM.Ready._isDone=1;}
/*@end
    @*/
return DOM.Ready._isDone;};if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){DOM.Ready._isDone=1;},false);}
DOM.Ready.onDOMReady=function(callback){if(DOM.Ready._checkDOMReady()){callback();}
else{DOM.Ready._onDOMReadyCallbacks.push(callback);}};DOM.Ready.onDOMDone=function(callback){if(DOM.Ready._checkDOMDone()){callback();}
else{DOM.Ready._onDOMDoneCallbacks.push(callback);}};DOM.Ready.onIdReady=function(id,callback){if(DOM.Ready._checkDOMReady()){var elt=document.getElementById(id);if(elt){callback(elt);return;}}
var callback_array=DOM.Ready._onIdReadyCallbacks[id];if(!callback_array){callback_array=[];}
callback_array.push(callback);DOM.Ready._onIdReadyCallbacks[id]=callback_array;};DOM.Ready._runDOMReadyCallbacks=function(){for(var i=0;i<DOM.Ready._onDOMReadyCallbacks.length;i++){DOM.Ready._onDOMReadyCallbacks[i]();}
DOM.Ready._onDOMReadyCallbacks=[];};DOM.Ready._runDOMDoneCallbacks=function(){for(var i=0;i<DOM.Ready._onDOMDoneCallbacks.length;i++){DOM.Ready._onDOMDoneCallbacks[i]();}
DOM.Ready._onDOMDoneCallbacks=[];};DOM.Ready._runIdCallbacks=function(){for(var id in DOM.Ready._onIdReadyCallbacks){if(!DOM.Ready._onIdReadyCallbacks.hasOwnProperty(id)){continue;}
var elt=document.getElementById(id);if(elt){for(var i=0;i<DOM.Ready._onIdReadyCallbacks[id].length;i++){DOM.Ready._onIdReadyCallbacks[id][i](elt);}
delete DOM.Ready._onIdReadyCallbacks[id];}}};DOM.Ready._runReadyCallbacks=function(){if(DOM.Ready._inRunReadyCallbacks){return;}
DOM.Ready._inRunReadyCallbacks=1;if(DOM.Ready._checkDOMReady()){DOM.Ready._runDOMReadyCallbacks();DOM.Ready._runIdCallbacks();}
if(DOM.Ready._checkDOMDone()){DOM.Ready._runDOMDoneCallbacks();}
DOM.Ready._timePassed+=DOM.Ready._lastTimerInterval;if((DOM.Ready._timePassed/1000)>=DOM.Ready.finalTimeout){DOM.Ready._stopTimer();}
DOM.Ready._inRunReadyCallbacks=0;};DOM.Ready._startTimer=function(){DOM.Ready._lastTimerInterval=DOM.Ready.timerInterval;DOM.Ready._intervalId=setInterval(DOM.Ready._runReadyCallbacks,DOM.Ready.timerInterval);};DOM.Ready._stopTimer=function(){clearInterval(DOM.Ready._intervalId);DOM.Ready._intervalId=null;};DOM.Ready._resetClass=function(){DOM.Ready._stopTimer();DOM.Ready._timePassed=0;DOM.Ready._isReady=0;DOM.Ready._isDone=0;DOM.Ready._onDOMReadyCallbacks=[];DOM.Ready._onDOMDoneCallbacks=[];DOM.Ready._onIdReadyCallbacks={};DOM.Ready._startTimer();};DOM.Ready._resetClass();DOM.Ready.runCallbacks=function(){DOM.Ready._runReadyCallbacks();};/*

=head1 NAME

DOM.Ready - set up callbacks to run when the DOM is ready instead of using onLoad

=head1 SYNOPSIS

  DOM.Ready.onDOMReady( myFunction );
  DOM.Ready.onIdReady( "an_id", myOtherFunction );

=head1 DESCRIPTION

It's a very common case to want to run one or more functions when the
document loads.  The simplest option is to use the window.onLoad to
trigger these functions.

This has several problems.  First, window.onLoad may not happen until
well after the document is mostly loaded, due to delays in fetching
images or other dependencies.  Second, there is no built-in API for
stacking multiple onLoad callbacks.

This module provides several simple functions to register callbacks
that should be run, either when the DOM/document is ready or when a
specific element (found by id) is ready.  This is done through the use
of a recurring interval that checks to see if the callbacks should be
run.

=head1 PROPERTIES

The DOM.Ready class has the following settable properties:

=over 4

=item * DOM.Ready.timerInterval = milliseconds

The number of milliseconds to wait between each readiness check.
Defaults to 50.

=item * DOM.Ready.finalTimeout = seconds

The number of seconds before the recurring readiness checks stop
running.  Defaults to 15 seconds.

=back

=head1 METHODS

DOM.Ready provides the following functions.  None of these are
exportable.

=over 4

=item * onDOMReady( callback )

Provide a callback function to be called once the DOM is ready.  If
the DOM is ready when C<onDOMReady()> is called, then the callback
will be called immediately.

The DOM is considered ready as soon as the DOM API is available and
the opening C<< <body> >> tag has been processed. This does not mean
that any other elements in the DOM will be available.

Use this to replace the use of an "onload" attribute in the body tag,
but do not assume that any specific element will be available.

=item * onDOMDone( callback )

Provide a callback function to be called once the DOM is complete.  If
the DOM is done when C<onDOMDone()> is called, then the callback
will be called immediately.

The DOM is done when all the elements in the DOM have been processed,
but this does not wait for external images to load.

=item * onIdReady( id, callback )

Provide a callback to be called when the given id is found (using
document.getElementById).  The callback will be called with the
element object as its only argument.  If the element is available when
C<onIdReady()> is called, then the callback will be called immediately.

Note that an element might be ready but it's children may not yet have
been inserted. This can lead to intermittent problems where your
callback is called and the element's children do not yet exist. If
this is a problem, use C<onDOMDone()> instead.

=item * runCallbacks()

Explicitly run all callbacks that can be run.  This can be used to run
all the callbacks at a known time, for example just before the close
of a document's C<< </body> >> tag.

=back

=head1 KNOWN ISSUES

If C<onIdReady()> is called after the final timeout has passed and the
specified element is not ready, then the callback will never be
called.

This code has not seen a lot of production use, so be wary of bugs.

=head1 AUTHOR

Dave Rolsky, <autarch@urth.org>.

=head1 CREDITS

This library was inspired by Brother Cake's domFunction, though it
is entirely new code.

=head1 COPYRIGHT

Copyright (c) 2005-2006 Dave Rolsky.  All rights reserved.

This module is free software; you can redistribute it and/or modify it
under the same terms as the Perl programming language (your choice of
GPL or the Perl Artistic license).

=cut

*/

/* /usr/local/share/silki/js-source/DOM/Utils.js */

if(typeof(DOM)=='undefined'){DOM={};}
DOM.Utils={EXPORT:['$'],'$':function(){var elements=new Array();for(var i=0;i<arguments.length;i++){var element=arguments[i];if(typeof element=='string')
element=document.getElementById(element)||document.getElementsByName(element)[0]||undefined;if(arguments.length==1)
return element;elements.push(element);}
return elements;}};window["$"]=DOM.Utils["$"];$=window["$"];document.getElementsByClass=function(className){var children=document.getElementsByTagName('*')||document.all;var elements=new Array();for(var i=0;i<children.length;i++){var child=children[i];var classNames=child.className.split(' ');for(var j=0;j<classNames.length;j++){if(classNames[j]==className){elements.push(child);break;}}}
return elements;};document.getElementsByClassName=document.getElementsByClass;

/* /usr/local/share/silki/js-source/Silki/FileView.js */

JSAN.use('DOM.Utils');if(typeof Silki=="undefined"){Silki={};}
if(typeof Silki.FileView=="undefined"){Silki.FileView={};}
Silki.FileView=function(){var iframe=$("file-view-iframe");if(!iframe){return;}
iframe.height=window.innerHeight*0.7;};

/* /usr/local/share/silki/js-source/DOM/Events.js */

(function(){if(typeof DOM=="undefined")DOM={};DOM.Events={};DOM.Events.VERSION="0.02";DOM.Events.EXPORT=[];DOM.Events.EXPORT_OK=["addListener","removeListener"];DOM.Events.EXPORT_TAGS={":common":DOM.Events.EXPORT,":all":[].concat(DOM.Events.EXPORT,DOM.Events.EXPORT_OK)};var listenerList=[null];DOM.Events.addListener=function(elt,ev,func,makeCompatible){var usedFunc=func;var id=listenerList.length;if(makeCompatible==true||makeCompatible==undefined){usedFunc=makeCompatibilityWrapper(elt,ev,func);}
if(elt.addEventListener){elt.addEventListener(ev,usedFunc,false);listenerList[id]=[elt,ev,usedFunc];return id;}
else if(elt.attachEvent){elt.attachEvent("on"+ev,usedFunc);listenerList[id]=[elt,ev,usedFunc];return id;}
else return false;};DOM.Events.removeListener=function(){var elt,ev,func;if(arguments.length==1&&listenerList[arguments[0]]){elt=listenerList[arguments[0]][0];ev=listenerList[arguments[0]][1];func=listenerList[arguments[0]][2];delete listenerList[arguments[0]];}
else if(arguments.length==3){elt=arguments[0];ev=arguments[1];func=arguments[2];}
else return;if(elt.removeEventListener){elt.removeEventListener(ev,func,false);}
else if(elt.detachEvent){elt.detachEvent("on"+ev,func);}};var rval;function makeCompatibilityWrapper(elt,ev,func){return function(e){rval=true;if(e==undefined&&window.event!=undefined)
e=window.event;if(e.target==undefined&&e.srcElement!=undefined)
e.target=e.srcElement;if(e.currentTarget==undefined)
e.currentTarget=elt;if(e.relatedTarget==undefined){if(ev=="mouseover"&&e.fromElement!=undefined)
e.relatedTarget=e.fromElement;else if(ev=="mouseout"&&e.toElement!=undefined)
e.relatedTarget=e.toElement;}
if(e.pageX==undefined){if(document.body.scrollTop!=undefined){e.pageX=e.clientX+document.body.scrollLeft;e.pageY=e.clientY+document.body.scrollTop;}
if(document.documentElement!=undefined&&document.documentElement.scrollTop!=undefined){if(document.documentElement.scrollTop>0||document.documentElement.scrollLeft>0){e.pageX=e.clientX+document.documentElement.scrollLeft;e.pageY=e.clientY+document.documentElement.scrollTop;}}}
if(e.stopPropagation==undefined)
e.stopPropagation=IEStopPropagation;if(e.preventDefault==undefined)
e.preventDefault=IEPreventDefault;if(e.cancelable==undefined)e.cancelable=true;func(e);return rval;};}
function IEStopPropagation(){if(window.event)window.event.cancelBubble=true;}
function IEPreventDefault(){rval=false;}
function cleanUpIE(){for(var i=0;i<listenerList.length;i++){var listener=listenerList[i];if(listener){var elt=listener[0];var ev=listener[1];var func=listener[2];elt.detachEvent("on"+ev,func);}}
listenerList=null;}
if(!window.addEventListener&&window.attachEvent){window.attachEvent("onunload",cleanUpIE);}})();/**

=head1 SEE ALSO

DOM Level 2 Events Specification,
L<http://www.w3.org/TR/DOM-Level-2-Events/>

Understanding and Solving Internet Explorer Leak Patterns,
L<http://msdn.microsoft.com/library/default.asp?url=/library/en-us/IETechCol/dnwebgen/ie_leak_patterns.asp>

=head1 AUTHOR

Justin Constantino, <F<goflyapig@gmail.com>>.

=head1 COPYRIGHT

  Copyright (c) 2005 Justin Constantino.  All rights reserved.
  This module is free software; you can redistribute it and/or modify it
  under the terms of the GNU Lesser General Public Licence.

=cut

*/

/* /usr/local/share/silki/js-source/DOM/Find.js */

if(typeof DOM=="undefined")DOM={};DOM.Find={VERSION:1.00,EXPORT:['checkAttributes','getElementsByAttributes','geba'],checkAttributes:function(hash,el){if(el===undefined||el===null)
throw("Second argument to checkAttributes should be a DOM node or the ID of a DOM Node");if(el.constructor===String)
el=document.getElementById(el);if(el===null||!el.nodeType)
throw("Second argument to checkAttributes should be a DOM node or the ID of a DOM Node");if(!(hash instanceof Object))
throw("First argument to checkAttributes should be an Object of attribute/test pairs. See the documentation for more information.");for(key in hash){var pointer=el
var last=null;var pieces=key.split('.');for(var i=0;i<pieces.length;i++){if(!pointer[pieces[i]])return false;last=pointer;pointer=pointer[pieces[i]];}
if(pointer instanceof Function)
try{pointer=pointer.apply(last);}catch(error){throw("First agrument to checkAttributes included a Function Refrence which caused an ERROR: "+error);}
if(hash[key]instanceof RegExp){if(!hash[key].test(pointer))
return false;}else if(hash[key]instanceof Function){if(!hash[key](pointer))
return false;}else if(hash[key]!=pointer){return false;}}
return true;},getElementsByAttributes:function(searchAttributes,startAt,resultsLimit,depthLimit){if(depthLimit!==undefined&&depthLimit<=0)return[];if(startAt===undefined){startAt=document;}else if(typeof startAt=='string'){startAt=document.getElementById(startAt);}
var results=DOM.Find.checkAttributes(searchAttributes,startAt)?[startAt]:[];if(resultsLimit==1&&results.length>0)return results;if(startAt.childNodes)
for(var i=0;i<startAt.childNodes.length;i++){results=results.concat(DOM.Find.getElementsByAttributes(searchAttributes,startAt.childNodes[i],(resultsLimit)?resultsLimit-results.length:undefined,(depthLimit)?depthLimit-1:undefined))
if(resultsLimit!==undefined&&results.length>=resultsLimit)break;}
return results;}}
/*

=head1 AUTHOR

Daniel, Aquino <mr.danielaquino@gmail.com>.

=head1 COPYRIGHT

  Copyright (c) 2007 Daniel Aquino.
  Released under the Perl Licence:
  http://dev.perl.org/licenses/

=cut

Creation Date Roughly: 07/10/06
Last Update:           1/06/07

*/

/* /usr/local/share/silki/js-source/HTTP/Request.js */

if(typeof(Method)=="undefined"){Method={};}
if(typeof(Method["bind"])=="undefined"){Method.bind=function(method,object){return function(){method.apply(object,arguments);}};}
if(typeof(HTTP)=="undefined"){HTTP={};}
if(typeof(HTTP.Request)=="undefined"){HTTP.Request=function(options){if(!options)options={};this.options={};for(var i in options){this.setOption(i,options[i]);}
if(this.getOption("method")==undefined){this.setOption("method","post");}
if(this.getOption("asynchronous")==undefined){this.setOption("asynchronous",true);}
if(this.getOption("parameters")==undefined){this.setOption("parameters","");}
if(this.getOption("transport")==undefined){this.setOption("transport",HTTP.Request.Transport);}
if(this.getOption("uri"))
this.request();};HTTP.Request.EventNames=["uninitialized","loading","loaded","interactive","complete"];HTTP.Request.prototype.getOption=function(name){if(typeof(name)!="string"){return;}
return this.options[name.toLowerCase()];};HTTP.Request.prototype.setOption=function(name,value){if(typeof(name)!="string"){return;}
name=name.toLowerCase();this.options[name]=value;if(name=="transport"){if(typeof(value)!="function"){this.options.transport=HTTP.Request.Transport;}}};HTTP.Request.prototype.request=function(uri){if(!uri)uri=this.getOption("uri");if(!uri)return;var parameters=this.getOption("parameters");var method=this.getOption("method");if(method=="get"){uri+="?"+parameters;}
this.transport=new(this.getOption("transport"))();var async=this.getOption("asynchronous");this.transport.open(method,uri,async);if(async){this.transport.onreadystatechange=Method.bind(this.onStateChange,this);setTimeout(Method.bind(function(){this.respondToReadyState(1)},this),10);}
this.setRequestHeaders();if(method=="post"){var body=this.getOption("postbody");if(!body)body=parameters;this.transport.send(body);}
else{this.transport.send(null);}};HTTP.Request.prototype.setRequestHeaders=function(){this.transport.setRequestHeader("X-Requested-With","HTTP.Request");this.transport.setRequestHeader("X-HTTP-Request-Version",HTTP.Request.VERSION);if(this.getOption("method")=="post"){this.transport.setRequestHeader("Content-type","application/x-www-form-urlencoded");if(this.transport.overrideMimeType){this.transport.setRequestHeader("Connection","close");}}};HTTP.Request.prototype.isSuccess=function(){return this.transport.status==undefined||this.transport.status==0||(this.transport.status>=200&&this.transport.status<300);};HTTP.Request.prototype.onStateChange=function(){var readyState=this.transport.readyState;if(readyState!=1){this.respondToReadyState(this.transport.readyState);}};HTTP.Request.prototype.respondToReadyState=function(readyState){var event=HTTP.Request.EventNames[readyState];if(event=="complete"){var func=this.getOption("on"+this.transport.status);if(!func){if(this.isSuccess()){func=this.getOption("onsuccess");}
else{func=this.getOption("onfailure");}}
if(func){(func)(this.transport);}}
if(this.getOption("on"+event))
(this.getOption("on"+event))(this.transport);if(event=="complete"){this.transport.onreadystatechange=function(){};}};HTTP.Request.VERSION=0.03;}
if(typeof(HTTP.Request.Transport)=="undefined"){if(window.XMLHttpRequest){HTTP.Request.Transport=window.XMLHttpRequest;}
else if(window.ActiveXObject&&window.clipboardData){var msxmls=new Array("Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP");for(var i=0;i<msxmls.length;i++){try{new ActiveXObject(msxmls[i]);HTTP.Request.Transport=function(){return new ActiveXObject(msxmls[i]);};break;}
catch(e){}}}
if(typeof(HTTP.Request.Transport)=="undefined"){}
if(typeof(HTTP.Request.Transport)=="undefined"){throw new Error("Unable to locate XMLHttpRequest or other HTTP transport mechanism");}}

/* /usr/local/share/silki/js-source/Silki/PageTags.js */

JSAN.use('DOM.Events');JSAN.use('DOM.Find');JSAN.use('HTTP.Request');if(typeof Silki=="undefined"){Silki={};}
Silki.PageTags=function(){var form=$("tags-form");if(!form){return;}
this._form=form;this._instrumentForm();this._instrumentDeleteURIs();};Silki.PageTags.prototype._instrumentForm=function(){var self=this;DOM.Events.addListener(this._form,"submit",function(e){e.preventDefault();e.stopPropagation();self._submitForm();});};Silki.PageTags.prototype._submitForm=function(){var tags=this._form.tags.value;if(!tags&&tags.length){return;}
var self=this;var on_success=function(trans){self._form.tags.value="";self._updateTagList(trans);};new HTTP.Request({"uri":this._form.action,"parameters":"tags="+encodeURIComponent(tags),"onSuccess":on_success});};Silki.PageTags.prototype._parameters=function(){return"tags="+encodeURIComponent(this.text.value);}
Silki.PageTags.prototype._updateTagList=function(trans){var resp=eval("("+trans.responseText+")");var list=$("tags-list");list.parentNode.innerHTML=resp.tag_list_html;this._instrumentDeleteURIs();return;};Silki.PageTags.prototype._instrumentDeleteURIs=function(){var anchors=DOM.Find.getElementsByAttributes({tagName:"A",className:/\bdelete-tag\b/},$("tags-list"));if(!anchors.length){return;}
var self=this;for(var i=0;i<anchors.length;i++){var func=this._makeDeleteTagFunction();DOM.Events.addListener(anchors[i],"click",func);}};Silki.PageTags.prototype._makeDeleteTagFunction=function(anchor){var self=this;var func=function(e){e.preventDefault();e.stopPropagation();var on_success=function(trans){self._updateTagList(trans);};new HTTP.Request({"uri":e.currentTarget.href,"method":"DELETE","onSuccess":on_success});};return func;};

/* /usr/local/share/silki/js-source/DOM/Element.js */

try{JSAN.use('DOM.Utils');}catch(e){throw"DOM.Element requires JSAN to be loaded";}
if(typeof(DOM)=='undefined'){DOM={};}
DOM.Element={hide:function(){for(var i=0;i<arguments.length;i++){var element=$(arguments[i]);if(element&&element.nodeType==1){element.style.display='none';}}},show:function(){for(var i=0;i<arguments.length;i++){var element=$(arguments[i]);if(element&&element.nodeType==1){element.style.display='';}}},toggle:function(){for(var i=0;i<arguments.length;i++){var element=$(arguments[i]);if(element&&element.nodeType==1)
element.style.display=(element.style.display=='none'?'':'none');}},remove:function(){for(var i=0;i<arguments.length;i++){element=$(arguments[i]);if(element)
element.parentNode.removeChild(element);}},getHeight:function(element){element=$(element);if(!element)return;return element.offsetHeight;},hasClassName:function(element,className){element=$(element);if(!element||element.nodeType!=1)return;var a=element.className.split(' ');for(var i=0;i<a.length;i++){if(a[i]==className)
return true;}
return false;},addClassName:function(element,className){element=$(element);if(!element||element.nodeType!=1)return;DOM.Element.removeClassName(element,className);element.className+=' '+className;},removeClassName:function(element,className){element=$(element);if(!element||element.nodeType!=1)return;var newClassnames=new Array();var a=element.className.split(' ');for(var i=0;i<a.length;i++){if(a[i]!=className){newClassnames.push(a[i]);}}
element.className=newClassnames.join(' ');},cleanWhitespace:function(){var element=$(element);if(!element)return;for(var i=0;i<element.childNodes.length;i++){var node=element.childNodes[i];if(node.nodeType==3&&!/\S/.test(node.nodeValue))
DOM.Element.remove(node);}}};

/* /usr/local/share/silki/js-source/Silki/SystemLogs.js */

JSAN.use('DOM.Element');JSAN.use('DOM.Events');JSAN.use('DOM.Find');if(typeof Silki=="undefined"){Silki={};}
Silki.SystemLogs=function(){var table=$("system-logs");if(!table){return;}
var toggles=DOM.Find.getElementsByAttributes({"tagName":"A","className":"toggle-more"},table);for(var i=0;i<toggles.length;i++){var matches=toggles[i].id.match(/toggle-more-(\d+)/);if(!matches&&matches[1]){continue;}
var pre=$("more-"+matches[1]);if(!pre){continue;}
DOM.Events.addListener(toggles[i],"click",this._makeToggleFunction(pre));}};Silki.SystemLogs.prototype._makeToggleFunction=function(pre){var p=pre;var func=function(e){e.preventDefault();e.stopPropagation();DOM.Element.toggle(p);};return func;};

/* /usr/local/share/silki/js-source/HTTP/Cookies.js */

if(!HTTP)var HTTP={};HTTP.Cookies=function(){this._reset();}
HTTP.Cookies.Date=function(){this._init();}
HTTP.Cookies.VERSION='1.11';HTTP.Cookies.ERRORLEVEL=1;HTTP.Cookies.Date.FORMAT={'s':1,'m':60,'h':60*60,'d':60*60*24,'M':60*60*24*30,'y':60*60*24*365};HTTP.Cookies.prototype._reset=function(){this['JAR']='';this['CHANGED']=0;}
HTTP.Cookies.prototype.read=function(name){if(!name)return this._fatal('read','Cookie name is missing');if(this.CHANGED)this._reset();var value='';this._parse();for(var cookie in this.JAR){if(cookie==name){value=this.JAR[cookie];break;}}
return value?value:'';}
HTTP.Cookies.prototype.write=function(name,value,expires,path,domain,secure){if(!name)return this._fatal('write','Cookie name is missing');if(typeof value=='undefined')value='';if(!expires)expires='';if(expires=='_epoch'){expires=new Date(0);}
else if(expires!=-1){var cdate=new HTTP.Cookies.Date;var Now=new Date;Now.setTime(Now.getTime()+cdate.parse(expires));expires=Now.toGMTString();}
var extra='';if(expires)extra+='; expires='+expires;if(path)extra+='; path='+path;if(domain)extra+='; domain='+domain;if(secure)extra+='; secure='+secure;var new_cookie=escape(name)+'='+escape(value)+extra;document.cookie=new_cookie;this.CHANGED=1;}
HTTP.Cookies.prototype.remove=function(name,path,domain,secure){if(!name)return this._fatal('remove','Cookie name is missing');this.write(name,'','_epoch',path,domain,secure);}
HTTP.Cookies.prototype.obliterate=function(){var names=this.names();for(var i=0;i<names.length;i++){if(!names[i])continue;this.remove(names[i]);}}
HTTP.Cookies.prototype.names=function(){this._parse();var names=[];for(var cookie in this.JAR){if(!cookie)continue;names.push(cookie);}
return names;}
HTTP.Cookies.prototype._parse=function(){if(this.JAR)return;this.JAR={};var NAME=0;var VALUE=1;var array=document.cookie.split(';');for(var element=0;element<array.length;element++){var pair=array[element].split('=');pair[NAME]=pair[NAME].replace(/^\s+/,'');pair[NAME]=pair[NAME].replace(/\s+$/,'');this.JAR[unescape(pair[NAME])]=unescape(pair[VALUE]);}}
HTTP.Cookies.prototype._fatal=function(caller,error){var title='HTTP.Cookies fatal error';switch(HTTP.Cookies.ERRORLEVEL){case 1:alert(title+"\n\n"+caller+': '+error);break;default:break;}}
HTTP.Cookies.Date.prototype._fatal=function(caller,error){var title="HTTP.Cookies.Date fatal error";switch(HTTP.Cookies.ERRORLEVEL){case 1:alert(title+"\n\n"+caller+': '+error);break;default:break;}}
HTTP.Cookies.Date.prototype._init=function(){this.FORMAT=HTTP.Cookies.Date.FORMAT;}
HTTP.Cookies.Date.prototype.parse=function(x){if(!x||x=='now')return 0;var NUMBER=1;var LETTER=2;var date=x.match(/^(.+?)(\w)$/i);if(!date){return this._fatal('parse','expires parameter ('+x+') is not valid');}
var is_num=this.is_num(date[NUMBER]);var of=this.is_date(date[NUMBER],date[LETTER]);return(is_num&&of)?of:0;}
HTTP.Cookies.Date.prototype.is_date=function(num,x){if(!x||x.length!=1)return 0;var ar=[];return(ar=x.match(/^(s|m|h|d|w|M|y)$/))?num*1000*this.FORMAT[ar[0]]:0;}
HTTP.Cookies.Date.prototype.is_num=function(x){if(x.length==0)return;var ok=1;for(var i=0;i<x.length;i++){if("0123456789.-+".indexOf(x.charAt(i))==-1){ok--;break;}}
return ok;}

/* /usr/local/share/silki/js-source/Silki/User.js */

JSAN.use('HTTP.Cookies');JSAN.use('HTTP.Request');if(typeof Silki=="undefined"){Silki={};}
Silki.User=function(user_id){if(typeof user_id=="undefined"){var cookies=new HTTP.Cookies;var user_cookie=cookies.read("Silki-user");var match=user_cookie.match(/user_id\&(\d+)/);if(match&&match[1]){user_id=match[1];}
else{user_id="guest";}}
this._userId=user_id;};Silki.User.prototype.getWikis=function(){if(typeof this._wikis!="undefined"){return this._wikis;}
var req=new HTTP.Request({"method":"get","uri":this._uri("wikis"),"asynchronous":0});if(req.isSuccess()){var results=eval("("+req.transport.responseText+")");this._wikis=results;}
else{this._wikis=[];}
return this._wikis;};Silki.User.prototype._uri=function(view){var uri="/user/"+this._userId;if(typeof view!="undefined"){uri=uri+"/"+view;}
return uri;};Silki.User.prototype._handleSuccess=function(trans){var results=eval("("+trans.responseText+")");this._wikis=results;};Silki.User.prototype._handleFailure=function(trans){this._wikis=[];};

/* /usr/local/share/silki/js-source/Silki.js */

JSAN.use('DOM.Ready');JSAN.use('Silki.FileView');JSAN.use('Silki.PageTags');JSAN.use('Silki.SystemLogs');JSAN.use('Silki.User');if(typeof Silki=="undefined"){Silki={};}
Silki.instrumentAll=function(){new Silki.FileView();new Silki.PageTags();new Silki.SystemLogs();};DOM.Ready.onDOMDone(Silki.instrumentAll);