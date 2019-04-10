//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

// An ObserverEvent object is responsible for deciding if an event is triggered.
// tiPoint is duration in seconds the moveable object has to be in the hotspot for.
// eventCh is the % (0-100) chance of the event actually being triggered
// tFunction is the callback function in the event that the event is triggered.
// optCond is optional boolean callback function which needs to return true if event attempts to trigger.
// limit [optional] is the number of times the event can happen
// backoff is the duration in seconds that a next possible event will be held back for
// before testing again.
// rGen is an optional random number generator.
// Johnny - June 2012

function ObserverEventRandom(start,end)
{
	return start+Math.random()*(end-start) ;
}

function ObserverEvent(tiPoint,eventCh,tFunction,optCond,limit,backoff,rGen)
{

	this.triggerPoint	=	tiPoint ;
	this.eventChance	=	eventCh ;
	this.makeitso		=	tFunction ;
	this.triggered		=	false ;
	this.count			=	0 ;
	this.limit			=	limit ;
	this.backoff		=	backoff ;
	this.rGen			=	rGen || ObserverEventRandom ;
	this.optCondition	=	optCond ;
	this.className		=	"ObserverEvent" ;

}

ObserverEvent.Create = function(tiPoint,eventCh,tFunction,optCond,limit,backoff,rGen)
{
	return new ObserverEvent(tiPoint,eventCh,tFunction,optCond,limit,backoff,rGen) ;
}

function _debugPrint(s)
{

}


ObserverEvent.prototype	=	{
			constructor:	ObserverEvent,

			ObjectOutside:		function()
								{
									_debugPrint("RESET STATE "+this.className)
									this.triggered	=	false
								},
								
								
			Inform:			function(obj,isinside,ctime,timein,timeout)
							{
							
									if (timein > this.triggerPoint && !this.triggered && (!this.optCondition || this.optCondition()) 
											&& (!this.limit || this.count < this.limit) 
											&& (!this.backoff || (!this.lasttime || ctime - this.lasttime > this.backoff))) 
									{
											this.triggered	=	true
											_debugPrint("Throwing Dice")
											if (this.rGen(0,100) < this.eventChance) 
											{
											
												if (this.makeitso)
												{
													this.makeitso(obj)
													this.count 		=	this.count + 1
													this.lasttime	=	ctime
												}
											}		
											else
											{
												_debugPrint("Dice - says no!")
											}
									}
							},

			toString:		function()
							{
								return "ObserverEvent" ;
							}

}

