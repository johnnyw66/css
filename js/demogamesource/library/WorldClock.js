//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

WorldClock 				=	{}	;
WorldClock.time 		=	0 ;
WorldClock.observers	=	new Array()	;
WorldClock.pause		=	false ;

WorldClock.AddObserver = function(func)
{
	WorldClock.observers.push(func)	;
}
	
WorldClock.Restart = function()
{
		WorldClock.Resume()
		WorldClock.Reset()
}
	
WorldClock.Reset = function()
{
	WorldClock.time = 0
	WorldClock.InformObservers()
	
}

WorldClock.Pause = function()
{
	WorldClock.pause = true 
	
}

WorldClock.Resume	=	function()
{
	WorldClock.pause = false
	
}


//Inform Watchers of 'major' changes in time
WorldClock.InformObservers = function()
{
		for (var oidx in WorldClock.observers) 
		{
			var f = 	WorldClock.observers[oidx] ;
			if (f) {
				f(WorldClock.time)	;
			}
		}
}
	
WorldClock.GetClock = function()
{
	return WorldClock.time ;
	
}

WorldClock.Update = function(dtime)
{
	if (!WorldClock.pause) {
		WorldClock.time = WorldClock.time + dtime
	}
}


