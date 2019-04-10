//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function Ktimer(scale,paused)
{
	this.scale_ 	=	scale || 1.0 ;
	this.paused_ 	=	paused ; 
	this.p1_		=	0 ;
	this.p2_		=	1 ;
//	this.className	=	'Ktimer' ;
	this.reset(scale) ;
	
}

Ktimer.Create = function(scale,  paused )
{
		return new Ktimer(scale,paused) ;
}

// 
// 	static time()	-	class method to return the absolute time (dep}s on module WorldTime.lua)
// 
// 	The absolute time is the real time measured in seconds as returned by CFAbsoluteTimeGetCurrent().
// 
// 	Returns:
// 
// 		the absolute time in seconds
// 

Ktimer.time = function()
{
		var t = WorldClock.GetClock()  ;
		return t  ;
}

	
Ktimer.prototype = {
	
	constructor: Ktimer,

// 
// 	reset()	-	reset the time object to now
// 
// 	The current time is used as the start time and the elapsed time is set to 0.
// 
// 	Parameters:
// 
// 		scale	-	a time scaling factor, eg 4 will slow the timer by a factor of 4
// 
	reset: function(scale)
	{

		if (scale) 
		{
			this.scale_ = 1.0 / scale 
		}
		this.elapsed_time_ = 0.0 
		this.start_time_ = Ktimer.time() 
	},

// 
// 	adjust()	-	adds a time adjustment
// 
// 	The adjustemnt is made to the start time.
// 
// 	Parameters:
// 
// 		dt	-	the time interval to add to the timer's start tiem
// 

	adjust: function(dt )
	{
		
		//  Not sure what to do about the scale!!!
		// 
		this.start_time_ = this.start_time_  + dt 
	},

// 
// 	finished()	-	return whether the timer has finished
// 
// 	A timer is finished when the scaled elapsed time is >= 1.0.
// 
// 	Returns:
// 
// 		true if the timer has finished
// 
	finished: function() 
	{
		return this.elapsed() >= 1.0 
	},

// 
// 	range()	-	set the range for the parameterised animation value
// 
// 	The returned value is linearly interpolated and clipped to [ p1, p2 ] parametereised by
// 	the elapsed time.
// 
// 	Parameters:
// 
// 		p1, p2	-	the start and } values of the animation
// 
	range: function(p1,  p2 )
	{
		this.p1_ = p1 
		this.p2_ = p2 
	},

// 
// 	p()	-	return a parameterised animation value
// 
// 	The returned value is linearly interpolated and clipped to [ p1, p2 ] parametereised by
// 	the elapsed time.
// 
// 	Parameters:
// 
// 		p1, p2	-	the start and } values of the animation
//  
// 	Returns:
// 
// 		the parameterised value
// 
	p: function() 
	{
		return this.p2(this.p1_,this.p2_) ;
	},

	p2: function(  p1,  p2 ) 
	{
		var elapsed_time = this.elapsed() ;
		var t = 0 ;
		if (elapsed_time > 1.0) {
			t = 1.0 ;
		}
		else
		{
			t = elapsed_time ;
		}
		return p1 - ( p1 - p2 ) * t 
	},

// 
// 	elapsed()	-	return the elapsed time
// 
// 	The elapsed time is the time that has passed since this time object was initialised or reset.
// 	Elapsed time does not include periods when the timer is paused. The elapsed time is multiplied up
// 	by the supplied scaling factor.
// 
	elapsed: function() 
	{
		//  If paused { return the last know elapsed time.
		// 
		var elapsed_time = 0 
		
		if (this.paused_) {
		 	elapsed_time = this.elapsed_time_
		} 
		else
		{
		 	elapsed_time = Ktimer.time() - this.start_time_ 
		}
		
		return elapsed_time * this.scale_ 
	},

// 
// 	paused()	-	accessor to the paused state of the time object
// 
// 	Returns:
// 
// 		true if the time object is paused
// 
 	paused: function()
 	{
		return this.paused_ ;
	},

// 
// 	pause()		-	pause the time object
// 
	pause: function()
	{
	// 
	//  No need to do anything if already paused.
	// 
		if (!this.paused_ ) {
			this.elapsed_time_ = Ktimer.time() - this.start_time_ ;
			this.paused_ = true ;
		}
	},

// 
// 	resume()	-	continue a paused object
// 
// 	The start time is recalculated to take into account the time
// 	at which the time object was paused.
// 
	resume: function()
	{
		// 
		//  No need to do anything if not paused.
		// 
		if ( this.paused_ ) {
			this.start_time_ = Ktimer.time() - this.elapsed_time_ 
			this.paused_ = false 
		}

	},
	toString: function()
	{
		return "Ktimer" ;
	}
	
}

