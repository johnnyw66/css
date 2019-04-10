//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

// Based on Damped Oscillator Maths Unit MST204/MST209 Open University

var k_strongly_damped 	= 	0
var k_weakly_damped		=	1
var k_critically_damped	=	2

function KDampedOscillator( m,  r,  k,  x,  v)
{
			this.x0_ 		= x ; 
			this.v0_		= v ;
			this.m_			= m ;
			this.r_			= r ;
			this.k_  		= k ;
			this.xe_		= 0 ;
			this.v_			= 0 ;
			this.w_			= 0 ;
		    this.alpha 		= 0 ;
			this.p_			= 0 ;
}


KDampedOscillator.Create				=	function( m,  r,  k,  x,  v)
											{
												return new KDampedOscillator( m,  r,  k,  x,  v) ;
											}

KDampedOscillator.prototype = 
{
	constructor: KDampedOscillator,


	reset: function( x0,  v0,  xe) 
	{
		
		this.x0_ = x0 - xe ;
		this.v0_ = v0 ;
		this.xe_ = xe ;

		// Calculate the natural angular frequency and damping ratio.

		this.w_ 	= Math.sqrt( this.k_ / this.m_ ) ;
		this.alpha_ = this.r_ / ( 2 * Math.sqrt( this.m_ * this.k_ ) ) ;

	 	// Calculate the solution type.

		if ( this.alpha_ > 1 ) {
			this.damping_type_ = k_strongly_damped ;
		} else if ( this.alpha_ < 1 ) {
			this.damping_type_ = k_weakly_damped ;
		} else {
			
			this.damping_type_ = k_critically_damped ;
		}
		var damping_type_ = this.damping_type_ ;

		switch(damping_type_)
		{
			case k_strongly_damped:
				var a = Math.sqrt( this.alpha_*this.alpha_ - 1.0) ;

				this.l1_ = this.w_*( -this.alpha_ + a ) ;
				this.l2_ = this.w_*( -this.alpha_ - a ) ;

			// Initial conditions.

				this.c_ = ( this.v0_ - this.l1_*this.x0_ ) / ( this.l2_ - this.l1_ ) ;
				this.b_ = this.x0_ - this.c_ ;
				
				break ;
				
			case k_weakly_damped:

				this.p_ = this.r_ / this.m_ * 0.5  ;
				this.v_ = Math.sqrt( 4.0*this.m_*this.k_ - this.r_*this.r_ ) / this.m_ * 0.5 ;
				this.a_ = Math.sqrt( this.x0_*this.x0_ + this.v0_*this.v0_ / (this.p_*this.p_)) ;

				if (this.a_ == 0.0) {
					this.phi_ =	0.0 ;
				} else
				{
					this.phi_ =	Math.acos( this.x0_ / this.a_ ) ;
				}
				
				break ;
			
			case k_critically_damped: 
				this.c_ = this.x0_ ;
				this.b_ = this.v0_ + this.x0_ * this.w_ ;
				
				break ;
			
			default:
				alert("defa")
			
				break ;
		}

	},

	// Reference MST204/MST209 Handbook
	// 
	// 	centre()	-	returns the centre position of the spring
	// 
	// 	The centre is the position when the spring is in equilibrium.
	// 
	// public void centre( float & x ) // const
	// {
	// 	x = xe_ 
	// }
	
	centre: function()
	{ 
		return this.xe_ ;
	},
	

	// 
	// 	equilibrium()	-	check if the oscillator is in static equilibrium
	// 
	// 	The oscillator is static if it is at the equilibrium position with zero velocity.
	// 
	// 	Parameters:
	// 
	// 		t		-	the time to evaluate the system at
	// 		epsilon	-	how near to true equilbrium to calculate to
	// 
	// 	Returns:
	// 
	// 		the position of the system at the time t
	// 

	equilibrium: function( t,  epsilon ) 
	{ 
		return Math.abs( this.evaluate( t ) - this.xe_ ) <= epsilon && Math.abs( this.velocity(t ) ) <= epsilon  ;
	},
	
	

	
	evaluate: function( t) 
	{

		var x = 0.0
		var damping_type_ = this.damping_type_ 
		switch(damping_type_)
		{
			case k_strongly_damped:
				x = this.b_*Math.exp( this.l1_*t ) + this.c_*Math.exp( this.l2_*t ) 
				break ;
			case k_weakly_damped:
				x = this.a_*Math.exp( -this.p_*t ) * Math.cos( this.v_*t + this.phi_ ) 
				break ;
			
			case k_critically_damped:
				x = (this.b_*t +this.c_)*Math.exp( -this.w_*t ) 
				break ;
				
			default:
				break ;
		}
			
		return this.xe_ + x
	},
	
	velocity: function( t) 
	{

		var v = 0.0
		var damping_type_ = this.damping_type_ ;

		switch(damping_type_ )
		{
			case k_strongly_damped:
				v = this.b_*this.l1_*Math.exp( this.l1_*t ) + this.c_*this.l2_*Math.exp( this.l2_*t ) ;
				break ;
				 
			case k_weakly_damped: 
				v = -this.a_*this.p_*Math.exp( -this.p_*t ) * Math.cos( this.v_*t + this.phi_ ) - this.v_ * this.a_*Math.exp( -this.p_*t ) * Math.sin( this.v_*t + this.phi_ ) ;
				break ;
				 
			case k_critically_damped:
				v = ( this.b_ - this.w_*(this.b_*t +this.c_ ) )*Math.exp( -this.w_*t ) ;

			default:
				break ;
		}	

		return v 
	},
	
	toString: function()
	{
		return "KDampedOscillator" ;
	}
}
