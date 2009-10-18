/*
 * jSearch by MeltingIce and Jarques
 * jQuery page search & highlight plugin
 */
 
$.fn.jSearch = function(query,customOptions){
	var options = $.extend({},$.fn.jSearch.defaultOptions,customOptions);
	
}

$.fn.jSearch.defaultOptions = {
	'bgcolor':'yellow',
	'color':'black',
	'engine':'literal',
	'recursive':false
}