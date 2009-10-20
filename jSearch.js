/*
 * jSearch by MeltingIce and Jarques
 * jQuery page search & highlight plugin
 */

(function($){

$.fn.jSearch = function(action,query,customOptions){
	var options = $.extend({},$.fn.jSearch.defaultOptions,customOptions);
	if(action == 'search'){
		new jSearch($(this),query,options).doSearch(options.engine);
	}
	if(action == 'clear'){
		new jSearch($(this),null,options).clearResults();
	}
	if(action == 'autosearch'){
		return new jSearch($(this),null,options).autoReferSearch();
	}
	
	/* Simply returns the jSearch object */
	if(action == 'get'){
		return new jSearch($(this),null,options);
	}
}

$.fn.jSearch.defaultOptions = {
	'bgcolor':'#FEFF9F',
	'color':'#333333',
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
	this.clearResults();
	this.html = this.input.html();
	return this;
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
		
		var replace = "<span class=\"jsearch-result";
		if(options.addClass){ replace += " "+options.addClass; }
		replace += "\" style=\"background-color:"+options.bgcolor +";color:"+options.color+";\">$1</span>";
		return p1.replace(search2,replace);
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

jSearch.prototype.clearResults = function(){
	while($('.jsearch-result').length > 0){
		$.each(this.input.find('.jsearch-result'),function(){
			$(this).replaceWith($(this).html());
		});
	}
	
	return this;
}

jSearch.prototype.autoReferSearch = function(){
	var search = this.referralDetect();
	if(!search) return;
	this.query = search.query;
	
	this.doSearch('literal');
	
	return search;
}

jSearch.prototype.referralDetect = function(){
	if(!document.referrer || document.referrer == "") return;
	
	var results = document.referrer.match(/http:\/\/(?:[A-Za-z0-9]+\.)?(google|bing|yahoo|ask)\.(?:.+?)&?(?:q|p)=([^&]+)/);
	if(results){
		return {"engine":results[1], "query": results[2]};
	}
	else{
		return false;
	}
}

})(jQuery);