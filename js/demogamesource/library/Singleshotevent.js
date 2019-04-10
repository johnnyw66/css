//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function SingleShotEvent(callback,param)
{
	this._callback		=	callback ;
	this._param			=	param ;
	this.className		=	'SingleShotEvent' ;

}

SingleShotEvent.prototype = {
			
	constructor: SingleShotEvent,

	StartEvent: function()
	{
		if (this._callback) 
		{
        	this._callback(this._param) ;
		}
	},
	
	Running: function(nTime)
	{
		//	Logger.warning("SingleShotEvent:Running - This should not be called!!! - See a code doctor ref: them to Event class")
	},
	

	EndEvent: function()
	{
		//		Logger.warning("SingleShotEvent:EndEvent - This should not be called!!! - See a code doctor ref: them to Event class")
	}


}


