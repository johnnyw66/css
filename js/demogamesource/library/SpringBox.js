//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function SpringBox(startx,y,x,m,r,k,time)
{
	var darg = function(val,defval) { return (typeof(val) === 'undefined' || typeof(val) !== typeof(defval) ? defval : val) ; }

 	this.osc          	=   KDampedOscillator.Create( darg(m,1),  darg(r,12),  darg(k,100),0,0) ;
	this.osctimer      	=	Ktimer.Create(1,true) ;
	this.endx			=	x ;
    this.y				=   y ;
	this.startx			=	startx ;
	this.time			= 	0 ;
	this.finishby		=	darg(time,5) ;
	this.started		=	false ;
	this.osc.reset( this.endx,  0,  this.startx) ;
	return this ;
}

SpringBox.className	    =	"SpringBox"
SpringBox.ZEROVEL_EPS	=	0.1

SpringBox.Create = function(startx,y,x,m,r,k,time)
{
	return new SpringBox(startx,y,x,m,r,k,time) ;
}

SpringBox.prototype = {

	constructor: SpringBox,

	Start: function()
	{
		this.started	=	true ;
		this.osctimer.resume() ;
	},
	
	GetDuration: function()
	{
		return this.finishby ;
	},
	
	
    IsFinished: function()
	{
        return (this.time > this.finishby)  ;
    },

	IsStationary: function()
	{
		 return this.osc.equilibrium(this.osctimer.elapsed(),SpringBox.ZEROVEL_EPS) ;
	},

    Update: function(dt)
	{
		if (!this.IsFinished() && this.started) 
		{
			this.time	=	this.time + dt ;
		}
    },
	

    GetPosition: function()
	{
    	var elapsed = this.osctimer.elapsed()
   		var cx = this.osc.evaluate(elapsed)
        return { x: (this.IsStationary() ? this.startx : parseInt(cx)), y: this.y } ;

    },
	
	toString: function()
	{
		return "SpringBox" ;
	}
	

}
