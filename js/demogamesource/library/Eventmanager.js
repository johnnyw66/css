//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt
	
function EventManager()
{
	this._currentTime 	=	0 ;
	this._eventTable	=	new Array() ;
	this.className		=	"EventManager" ;
}

EventManager.prototype =
{
	constructor: EventManager,
	
	addImmediateEvent:	function(subevent,duration)
	{
		var triggerTime =   this._currentTime  ;
		this._addNewEvent(new Event(triggerTime,triggerTime+(duration || 0),subevent)) ;
        return (duration || 0) ;
	},


	addEventAfterTime:	function(subevent,after,duration)
	{
      	var triggerTime =   this._currentTime + after ;
		this._addNewEvent(new Event(triggerTime,triggerTime+(duration || 0),subevent)) ;
  		return after+(duration || 0) ;
	},

	addSingleShotEvent:	function(callback,param,timefromnow)
	{
  		return this.addEventAfterTime(new SingleShotEvent(callback,param),timefromnow) ;
	},


	_addNewEvent:	function(evt)
	{
		this._eventTable.push(evt) ;
	},

	_removeEvent:	function(evtIndex)
	{
		delete this._eventTable[evtIndex]  ; 
	},

	
	ClearEvents:	function(warning)
	{
		if (warning) {
			for (var evtIndex in  this._eventTable)
			{
				var evt	= this._eventTable[evtIndex] ;	
				if (evt) {
					evt.EndEvent() ;
				}
			}
		}
		this._eventTable = new Array() ;
	},

	_getSize:	function()
	{
		return this._eventTable.length ;
	},
	
	cleanArray: function(actual)
	{
		var newArray = new Array() ;
		for(var i = 0; i < actual.length; i++)
		{
	    	if (actual[i])
			{
	        	newArray.push(actual[i]) ;
	    	}
	  	}
	  	return newArray;
	},

	Update:	function(dt)
	{
		this._currentTime = this._currentTime + dt ; 
		for (var evtIndex in  this._eventTable)
		{
			var evt	= this._eventTable[evtIndex] ;	
			if (evt) {
				evt.Update(this._currentTime,dt) ;
				if (evt.IsFinished()) {
					this._removeEvent(evtIndex) ;
				}
			}	 
		}
		// todo - linked list?
		this._eventTable = this.cleanArray(this._eventTable) ;
	}

}



