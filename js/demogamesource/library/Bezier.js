//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function Bezier( cp0,  cp1, cp2, cp3)
{
		// Debug 
		this._cp0		=	cp0 ;
		this._cp1		=	cp1 ;
		this._cp2		=	cp2 ;
		this._cp3		=	cp3 ;
		//^^Debug
		
		this._vCP		=	new Vector2(cp0) ;
	    this._cx		=	3.0 * (cp1.x - cp0.x) ; 
	    this._bx		=	3.0 * (cp2.x - cp1.x) - this._cx ; 
	    this._ax		=	cp3.x - cp0.x - this._cx - this._bx ;
	    this._cy		=	3.0 * (cp1.y - cp0.y) ;
	    this._by		=	3.0 * (cp2.y - cp1.y) - this._cy ;
	    this._ay		=	cp3.y - cp0.y - this._cy - this._by ;
		this._length	=	this._CalcLength() ;	 
		this.className	=	'Bezier' ;

}

Bezier.Create = function(cp0, cp1, cp2, cp3)
{
	return new Bezier(cp0, cp1, cp2, cp3) ;
}

Bezier.prototype = {
		constructor: Bezier,

		
		getLength: function()
		{
			return this._length ;
		},
	
	
		getVectorPosition: function(t)
		{
			var pos =  this.getPositionXY(t) ;
	    	return new Vector2(pos.x,pos.y) ;
		},
	
		getPositionXY: function(t)
		{

	    	var tSquared	=	t * t ;
	    	var tCubed		=	tSquared * t ;
	        
	    	var resultx = (this._ax * tCubed) + (this._bx * tSquared) + (this._cx * t) + this._vCP.x ;
	    	var resulty = (this._ay * tCubed) + (this._by * tSquared) + (this._cy * t) + this._vCP.y ;
	        
	    	return {x:resultx,y:resulty} ;
		},

		// Calculate Srt(x'(t)^2 + y'(t)^2)
		//x'(t),y'(t) is d/dt of x(t), y(t) - (Bezier defn getPositionXY(t))
		GetPrimeT: function(tv)
		{

			var	t			=	tv || 1 ;
	    	var tSquared	=	t * t ;
			// work out dx/dt and dy/dt    

	   		var resultx = (3*this._ax * tSquared) + (2*this._bx * t) + (this._cx) ;
	  		var resulty = (3*this._ay * tSquared) + (2*this._by * t) + (this._cy) ;

	    	return Math.sqrt(resultx*resultx + resulty*resulty)	;
		},
		
		// Length of a Parametric curve x(t),y(t)
		// is Int(a,b) [Sqrt(x'(t)*x'(t) + y'(t)*y'(t))] 

		_CalcLength: function(fft)
		{
			var ft	=	fft	|| 1 ;

			//Integrate using Trapezium rule
			var N	 = 	100 ;
			var n	 =	parseInt(ft*N) ; //Math.floor(ft*N) ;
			var dt =	1/N //0.01 == one hundred bits ;
		
			var sum1 	=	(this.GetPrimeT(0) + this.GetPrimeT(ft))/(2*n) ;
			var sum		=	0 ;
//			for t = dt,ft - dt, dt do
//				sum	=	sum	+	 this.GetPrimeT(t)
//			end
			for (var t = dt; t <= ft - dt; t+=dt)
			{
				sum	=	sum	+	 this.GetPrimeT(t) ;
			}

			return sum/n + sum1 ;
		
		},
		
		render: function(rHelper)
		{
			rHelper.drawCircle(this._cp0.x,this._cp0.y,10) ;
			rHelper.drawCircle(this._cp1.x,this._cp1.y,10) ;
			rHelper.drawCircle(this._cp2.x,this._cp2.y,10) ;
			rHelper.drawCircle(this._cp3.x,this._cp3.y,10) ;
			
			for (var t = 0 ; t <= 1 ; t+=0.01)
			{
				var pos = this.getVectorPosition(t)
				rHelper.drawCircle(pos.x,pos.y,1) ;
			}
		},

		
		toString: function()
		{
				return this.className ;
		}



}

