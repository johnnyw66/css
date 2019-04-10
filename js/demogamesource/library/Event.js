//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

var STATE_WAITING	=	0 ;
var	STATE_RUNNING	=	1 ;
var	STATE_FINISHED	=	2 ;


function Event(startTime,endTime,eventObj,eventParam)
{
	this._state			=	STATE_WAITING ;
	this._runtime 		= 	0 ;
	this._starttime		=	startTime ;
	this._duration		=	endTime-startTime ;
	this._eventObj		=	eventObj ;
	this._eventParam	= 	eventParam ;
	this.className		=	'Event' ;
}


Event.prototype = {
			
	constructor: Event,


	StartEvent: function()
	{
		this._eventObj.StartEvent() ;
	},	


	Running: function()
	{
		var nTime = this._runtime/this._duration ;
		this._eventObj.Running(nTime) ; 
	},
	
	EndEvent: function()
	{
		this._eventObj.EndEvent() ;
		
	},

	IsFinished: function()
	{
		return (this._state == STATE_FINISHED)  ;
	},

	toString: function()
	{
		return "Event Debug() "+this._starttime+","+this._duration+","+this._runtime+","+this._state ;
	}, 



	Update: function(ctime,dt)
	{
			var sstate = this._state 
			if (sstate == STATE_WAITING) 
			{
				if (ctime >= this._starttime) 
				{
					this._runtime = 0.0  ;
					this.StartEvent() ;
					if (this._duration == 0) {
						this._state = STATE_FINISHED ;
					}
					else 
					{
						this._state = STATE_RUNNING ;
					}
				}
			}
			else if (sstate == STATE_RUNNING) 
			{
				this._runtime = this._runtime + dt ;
				if (this._runtime <= this._duration) 
				{
					this.Running() ;
				}
				else 
				{
					this.EndEvent() ;
					this._state = STATE_FINISHED ;
				}
			}
			
	}
	
}

