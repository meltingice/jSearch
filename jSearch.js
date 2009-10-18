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
	'recursive':false
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
}

jSearch.prototype.literalSearch = function(){
	
}

})(jQuery);