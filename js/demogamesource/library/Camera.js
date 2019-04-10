//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt
var hCode	=	"" ;
var hCodeRH = "" ;

function Camera(screenDim,mapDim,follow,interp)
{

	this._follow	=	follow ;
	this._x 		=	0 ;
	this._y			=	0 ;
	this._z			=	0 ;
	this._leftx		=	0 ;
	this._topy		=	0 ;
	this._time		=	0 ;
	this._mapwidth	=	mapDim.X() ;
	this._mapheight	=	mapDim.Y() ;
	this._centrex	=	screenDim.X()/2 ;
	this._centrey	=	screenDim.Y()/2 ;
	this._interp	=	interp || Camera.INTERPRATE ;
	this.className	=	Camera.className ;
	this.Init() ;
	hCodeRH 		=	HashCode.value(RenderHelper) ;
	hCode			=	HashCode.value(RenderHelper) ;

}

Camera.className	=	"Camera" ;
Camera.INTERPRATE	=	0.4 ;
Camera.debug		=	false ;


Camera.Create	=	function(screenDim, mapDim, follow, interp)
{
	return new Camera(screenDim,mapDim,follow,interp) ;
}
var floor 			=	function(val)
						{
							//return Math.ceil(val) ;
							return val ;
						}


Camera.prototype	=
{
	constructor:	Camera,
	regionHelper:	EnemyManager,
	SetRestriction: function(minx,maxx,miny,maxy)
					{
						this._minx	=	minx ;
						this._maxx	=	maxx ;
						this._miny	=	miny ;
						this._maxy	=	maxy ;
					},

	Init: 			function()
					{
						if (this._follow)
						{
							var pos =	this._follow.GetPosition() ;
							this._x =	floor(pos._x) ;
							this._y	=	floor(pos._y) ;
							this._z =	pos._z ;
						}

						this.SetRestriction(this._centrex,this._mapwidth-this._centrex,this._centrey,this._mapheight-this._centrey) ;
						this._vpos		=	Vector4.Create(this._x,this._y) ;
					},

	Follow: 		function(follow,snap)
					{

						this._follow		=	follow ;
						if (snap)
						{
							var pos	=	follow.GetPosition()  ;
							this._x	=	floor(pos._x) ;
							this._y	=	floor(pos._y) ;
//							this._z	=	pos._z ;
						}
					},

	Update: 		function(dt)
					{

						this._time = this._time + dt

						if (this._follow)
						{
							// allow Camera to update Orbitor - if a callback exists.
							if (this._follow.CameraUpdate)
							{
								this._follow.CameraUpdate(dt) ;
							}

							var pos = this._follow.GetPosition() ;

							var followx = floor(pos._x),followy = floor(pos._y), followz  = pos._z ;

							this._x = this._x + floor((followx	-	this._x)*dt/this._interp) ;
							this._y = this._y + floor((followy	-	this._y)*dt/this._interp) ;


							this._x = (this._x > this._maxx) ? this._maxx : this._x ;
							this._x = (this._x < this._minx) ? this._minx : this._x ;

							this._y = (this._y > this._maxy) ? this._maxy : this._y ;
							this._y = (this._y < this._miny) ? this._miny : this._y ;


							this._leftx		=	Math.floor(this._x - this._centrex) ;
							this._topy		=	Math.floor(this._y - this._centrey) ;

						}
					},
	IsAlive:		function()			// this function here allows us to fire Homing Missiles at Camera!
					{
						return true ;
					},
	IsFollowing:	function(who)
					{
						return this._follow == who ;

					},
	GetTopLeft: 	function()
					{
						return {x:this._leftx, y:this._topy} ;
					},
	GetPosition: 	function()
					{
						return {_x:this._x, _y:this._y, _z:this._z} ;
					},

	X: 				function()
					{
						return this._x ;
					},
	Y: 				function()
					{
						return this._y ;
					},
	Z: 				function()
					{
						return this._z ;
					},
	GetRegion:		function()
					{
						return this.regionHelper.GetRegion(this._x, this._y) ;
					},

	Render:			function(rHelper)
					{

					},

	RenderDebug:	function(rHelper)
					{
						var region 	= 	this.GetRegion() ;
						var rcnt 	=	EnemyManager.GetRegionCount() ;

						rHelper.drawText("region:"+region+"                                   regionCount "+rcnt+" pos: "+Math.floor(this._x)+","+Math.floor(this._y),this._x+10,this._y,[255,255,255],{vertical:"bottom",horizontal:"left"}) ;
						rHelper.drawCircle(this._x, this._y,10,[255,255,0]) ;
					},
	GetVectorPosition: 	function()
						{
							this._vpos.SetXyzw(this._x,this._y,this._z,0)
							return this._vpos
						},


}
