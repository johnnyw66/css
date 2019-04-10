//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function Spring(startpos,endpos,m,r,k,time,pause)
{
    this.osc           	=   KDampedOscillator.Create( m || 1,  r || 12,  k || 100,0,0) ;
    this.osctimer		=	Ktimer.Create(1,pause) ;
	this.time			= 	0 ;
	this.startpos		=	startpos ;
	this.endpos			=	endpos ;
	this.finishby		=	time || 5 ;
	
	this.osc.reset( this.startpos,  0,  this.endpos) ;
	
}

Spring.Create = function(startpos,endpos,m,r,k,time,pause)
{
    return new Spring(startpos,endpos,m,r,k,time,pause) ;
}

Spring.ZEROVEL_EPS		=	0.01 ;

Spring.prototype = {

	constructor: Spring,
	
	Resume: function()
	{
		this.osctimer.resume() ;
	},

   	IsFinished: function()
	{
        return (this.finishby && this.time > this.finishby) ;
    },

	IsStationary: function()
	{
		 return this.osc.equilibrium(this.osctimer.elapsed(),Spring.ZEROVEL_EPS) ;
	},

   	Update: function(dt)
	{
		this.time	=	this.time + dt
//		if (Spring.IsFinished(spring)) {
//            spring.osc.reset(spring.endpos, 0, spring.endpos)
//        }
    },

  	GetPosition: function()
	{
		if (this.IsFinished()) 
		{
			return this.endpos ;
		}
		else
		{
			return this.osc.evaluate( this.osctimer.elapsed()) ;
		}
   },
	
	toString: function()
	{
		return "Spring" ;	
	}
	


}
