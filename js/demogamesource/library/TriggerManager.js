// Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

// Simple Trigger Manager - allowing us to trigger events on a 'moveable'object (eg. LocalPlayer)
// which enters or leaves a defined area within a 'shape' object.
// A shape object must have the boolean function IsPointInside()
// The parameter 'moveable' object used in Trigger.Update function must also
// have the function GetVectorPosition() defined.This should return an object
// compatible with the 'shape' object's expectations for the function IsPointInside()
// eg. Vector4
// Johnny - June 2012

var TRIGGER_STATE_NONE		=	0
var TRIGGER_STATE_INSIDE	=	1
var TRIGGER_STATE_OUTSIDE	=	2

function Trigger(shape,observerlist)
{
	this.state			=	TRIGGER_STATE_NONE ;
	this.shape			=	shape ;
	this.observers		=	observerlist ;
	this._Init()	;
}

Trigger.Create			=	function(shape,observerlist)
							{
								return new Trigger(shape,observerlist)
    						}
							
Trigger.debug			=	false

Trigger.prototype = 
{

	_Init: function(shape)
	{
		assert(this.observers,'NIL OBSERVERS')
		this.time			=	0
		this.timeinside		=	0
		this.timeoutside	=	0
		this.inside_count	=	0
		this.outside_count	=	0
	},
	

	ChangeState: function(newstate,object)
	{
	//	Logger.lprint(newstate)

		if (newstate != this.state) {
			//Logger.lprint("TRY AND INFORM... CHANGE OF STATE")
		
			for (var idx in this.observers) 
			{
					// Inform Observer
					var observer =	this.observers[idx] ;
					
					if (newstate == TRIGGER_STATE_INSIDE) {
						if (observer.ObjectInside) 
						{
							observer.ObjectInside(object,this.shape,this.timeoutside) ;
						}
						this.inside_count	=	this.inside_count + 1
						this.timeoutside	=	0 ;
					} else 
					{
						if (observer.ObjectOutside) 
						{
							observer.ObjectOutside(object,this.shape,this.timeinside) ;
						}
						this.outside_count	=	this.outside_count + 1
						this.timeinside		=	0
					}
			}
			this.state	=	newstate
		} else {

			// if they have an inform callback - just let them
			// know what is going on.
			
			for (var idx in this.observers) 
			{
				var observer 	=	this.observers[idx] ;
				if (observer.Inform) 
				{
					observer.Inform(object,(newstate == TRIGGER_STATE_INSIDE),this.time,this.timeinside,this.timeoutside)
				}
			}
		}
		
	},
	

	Update: function(dt,movableobject)
	{
		this.time			=	this.time	+	dt ;
		var objectPosition	=	movableobject.GetVectorPosition() ;

		if (this.shape.IsPointInside(objectPosition)) 
		{
				this.timeinside		=	this.timeinside	+ dt ;
				this.ChangeState(TRIGGER_STATE_INSIDE,movableobject)
		} else {
				this.timeoutside	=	this.timeoutside + dt ;
				this.ChangeState(TRIGGER_STATE_OUTSIDE,movableobject) ;
		}
		
	},

	
    Render: function(rHelper)
	{
		if (this.shape && this.shape.Render) 
		{
			this.shape.Render(rHelper)
		}
    },

    Render2D: function(rHelper)
	{
		if (this.shape) {
			this.shape.Render(rHelper)
			var cx,cy,cz = this.shape._GetCentre()
			rHelper.drawCircle(cx,cz,4)	//
		}
    },

	toString: function()
	{
		return "Trigger"
	}

}


TriggerManager					=	{} ;

TriggerManager.className		=	"TriggerManager" ;
TriggerManager.triggers        	=	{} ;
TriggerManager.time			 	=   0 ;
TriggerManager.debug			=  	true ;
TriggerManager.count			=	0 ;

	
    TriggerManager.Init = function()
	{
		TriggerManager.count			=	0	;
        TriggerManager.triggers        	=   new Array() ;
    }

	 TriggerManager.Clear = function()
	{
		TriggerManager.Init() ;
	}

     TriggerManager.Update = function(dt,moveableobject)
	{
		TriggerManager.time	=	TriggerManager.time + dt

		for (var index in TriggerManager.triggers) 
		{
			var trigger = TriggerManager.triggers[index] ;
      		trigger.Update(dt,moveableobject) ;
    	}
		
    }

     TriggerManager.Add = function(trigger)
	{
		TriggerManager.triggers.push(trigger) ;
		TriggerManager.count = TriggerManager.count + 1
    }


    TriggerManager.Remove = function(trigger)
	{
		for (var index in TriggerManager.triggers) 
		{
			var trg 	=	TriggerManager.triggers[index] ;
			if (trigger == trg) 
			{
				TriggerManager.count = TriggerManager.count - 1
				delete TriggerManager.triggers[index]
				return true;
			}
		}
		return false ;
    }

	TriggerManager.Render = function(rHelper)
	{
		if (TriggerManager.debug) 
		{
    		for (var index in TriggerManager.triggers) 
			{
				var trigger 	=	TriggerManager.triggers[index] ;
          		trigger.Render(rHelper) ;
        	}
		}
 	}
