/*
 * jSearch by MeltingIce and Jarques
 * jQuery page search & highlight plugin
 */

(function($){

$.fn.jSearch = function(query,customOptions){
	var options = $.extend({},$.fn.jSearch.defaultOptions,customOptions);
	new jSearch($(this),query,options);
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
	
	if(this.options.engine == 'literal'){
		this.literalSearch();
	}
	else if(this.options.engine == 'regex'){
		this.regexSearch();
	}
}

jSearch.prototype.literalSearch = function(){
	if(this.options.caseSensitive){
		var attr = "g";
	}
	else{
		var attr = "gi";
	}
	
	var search = new RegExp("("+this.query+")",attr);
	var replace = "<span style=\"background-color:"+this.options.bgcolor +";color:"+this.options.color+";\">$1</span>";
	var result = this.html.replace(search,replace);
	this.input.html(result);
}

jSearch.prototype.regexSearch = function(){
	
}

})(jQuery);