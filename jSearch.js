/*
 * jSearch by MeltingIce and Jarques
 * jQuery page search & highlight plugin
 */

(function($){

$.fn.jSearch = function(action,query,customOptions){
	if(action == 'search'){
		var options = $.extend({},$.fn.jSearch.defaultOptions,customOptions);
		new jSearch($(this),query,options);
	}
}

$.fn.jSearch.defaultOptions = {
	'bgcolor':'yellow',
	'color':'black',
	'engine':'literal',
	'addClass':false,
	'caseSensitive':false
}

function jSearch(input,query,options){
	this.input = input;
	this.query = query;
	this.options = options;
	
	this.init();
}

jSearch.prototype.init = function(){
	this.html = this.input.html();
	
	this.doSearch(this.options.engine);
}

jSearch.prototype.doSearch = function(type){
	var options = this.options;
	var query = this.query;
	var attr = this.getFlags();
	var search = new RegExp("([^><]+?)(?=<|$)","g");
	var result = this.html.replace(search,function(str, p1, offset, s){
		if(type=='literal'){
			var search2 = new RegExp("("+query+")",attr);
		}
		else if(type=='regex'){
			var search2 = new RegExp(query,attr);
		}
		return p1.replace(search2,"<span style=\"background-color:"+options.bgcolor +";color:"+options.color+";\">$1</span>")
	});
	this.input.html(result);
}

jSearch.prototype.getFlags = function(){
	if(this.options.caseSensitive){
		return "g";
	}
	else{
		return "gi";
	}
}

})(jQuery);