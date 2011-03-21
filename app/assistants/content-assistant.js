function ContentAssistant(title) {
	this.title = title;
	scene_helpers.addCommonSceneMethods(this);
}

ContentAssistant.prototype.setup = function(){
	this.initViewMenu(this.title);
	this.setupCommon();
	if(this.title === "Basics Guide"){
		this.controller.get("guide").show();
	}
	else if(this.title === "Tips and Tricks"){
		this.controller.get("tips").show();
	}else if(this.title === "FAQs"){
		this.controller.get("faqs").show();
	}
	
	this.launchJustType = function(){
		g.ServiceRequest.request("palm://com.palm.applicationManager", 
			{
				method: 'open',
				parameters: {
					id:"com.palm.app.searchpreferences",
					params: {
					//	launch:</b> "addMoreSearch" does web search engines.
					}
				}
			}
		); 
	}.bind(this)
	
	this.controller.listen("justtype", Mojo.Event.tap, this.launchJustType);
	this.controller.listen("justtype_", Mojo.Event.tap, this.launchJustType);

	
	this.controller.listen("cache", Mojo.Event.tap, function(){
		m.setupCacheDashboard();
	}.bind(this));
};

ContentAssistant.prototype.activate = function(event) {};

ContentAssistant.prototype.deactivate = function(event) {};

ContentAssistant.prototype.cleanup = function(event) {};