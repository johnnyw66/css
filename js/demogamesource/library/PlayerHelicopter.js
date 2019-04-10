//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt


var kENEMY_MAXTURNANGLE			=	180.0 ;
var kENEMY_ANGULAR_ACCELERATION	=	180.0 ;
var scalearound					=	0.95 ;



function PlayerHelicopter(mapDim, regionHelper)
{
	
	this._time					=	0 ;
	this._velx					=	0 ;
	this._vely					=	0 ;
	this._freeze_effect			=	1 ;
	this._currentAngularDir		=	true ;
	this._currentAngularSpeed	=	0.0 ;
	this._direction				=	0 ;
	this._targetbearing			=	0 ;
	
	this._rightangdist			=	0 ;
	this._leftangdist			=	0 ;
	
	this._x						=	1024 ;
	this._y						=	1024 ;
	this._z						=	0 ;
	this._hoverFreq				=	0.25 ;
		
	this._boundx				=	mapDim.X() ;
	this._boundy				=	mapDim.Y() ;
	this._regionHelper			=	regionHelper || EnemyManager ;	
	this._vPos					=	Vector4.Create() ;
	this._bladesprite			=	new Sprite("heliblades") ;
	this._shadowsprite			=	new Sprite("helishadow") ;
	this._sprite				=	new Sprite("helibody") ;
	this._blade					=	0 ;
	this._fired					=	0 ;
	this._fireperiod			=	0.125 ;
	this._phase					=	0 ;
	this._canfire				=	true ;
	this._lastfired				=	0 ;
	this._fireFunction			=	function(fired) {  return (fired % 2) ? {x:14, y:-8, z:0} : {x:-14, y:-8, z:0}; } ;
	this.firingpos				=	Vector4.Create() ;
	this.className				=	PlayerHelicopter.className ;
	
	
}

PlayerHelicopter.className		=	"PlayerHelicopter" ;
PlayerHelicopter.STEPX			=	8 ;
PlayerHelicopter.STEPY			=	8 ;
PlayerHelicopter.STATE_ALIVE	=	0 ;
PlayerHelicopter.canfire		=	true ;

function deg(rad)	{	return rad*180/Math.PI ;	}

PlayerHelicopter.prototype = 
{

	SetPosition: 				function(pos)
								{
									this._x	=	pos._x ;
									this._y	=	pos._y ;
									this._z	=	pos._z ;
								},

	GetRegion:					function()
								{
									return this._regionHelper.GetRegion(this._x, this._y)  ;
								},
								
	IsAlive:					function()
								{
									return true ;
								},
				
	GetVectorPosition:			function()
								{
									this._vPos.SetXyzw(this._x, this._y, this._z) ;
									return this._vPos ;
								},
	GetPosition: 				function()
								{
									return {_x: this._x, _y:this._y, _z: this._z}
								},


	GetFiringDirection:			function()
								{
									return this._direction ;
								},

	HasMoved:					function()
								{
									return (this._lastx != this._x || this._lasty != this._y) ;
								},
	
	// Brakes On - used for end of game sequence..

	BrakesOn:					function()
								{
									this._velx			=	0 ;
									this._vely			=	0 ;
									this._freeze_effect	=	0 ;
								},

	
	Update:						function(dt)
								{
								
									var isMoving	=	true ;
									this._time 		=	this._time + dt   ;
									this._blade		=	this._blade + dt*(isMoving && 520 || 360)

									this._scale		=	scalearound + (1-scalearound)*Math.sin(6*this._hoverFreq*this._time)
									
									this.Accelerate(dt) ;
									this.Bound() ;
									this.Turn(dt) ;
									this.AttemptFire(dt) ;

								},

	

	Bound:						function()
								{
									var lx	=	this._boundx, ly = this._boundy ;
									this._x		=	Math.max(0, Math.min(this._x,lx)) ;
									this._y		=	Math.max(0, Math.min(this._y,ly)) ;
								},
	
	PlayerUp:					function()
								{
									this._analvert	=	-1 ;
								},
	
	PlayerDown:					function()
								{
									this._analvert	=	1 ;
								},
	
	PlayerLeft:					function()
								{
									this._analhor	=	-1 ;
								},

	PlayerRight:				function()
								{
	
									this._analhor	=	1 ;
								},
	
	PlayerSelect:				function()
								{
								},

	Turn:						function(dt)
								{
									
									var direction		=	this._direction	;
									var targetbearing	=	this._targetbearing ;
									this._angdistance 	=	((targetbearing - (direction % 360))) ;

									this._leftangdist 	= 	((360-targetbearing)	+ (direction % 360)) % 360 ;
									this._rightangdist 	=	((targetbearing + (360-(direction % 360)))) % 360 ;
		

									var	clockwiseDirection	=	(this._rightangdist < this._leftangdist) ;
		
		
									if ( clockwiseDirection != this._currentAngularDir ) 
									{
										this._currentAngularDir	=	clockwiseDirection ;
										this._currentAngularSpeed	=	0.0 ;
									}

									this._currentAngularSpeed = this._currentAngularSpeed +(dt * kENEMY_ANGULAR_ACCELERATION) ;

									if ( this._currentAngularSpeed > kENEMY_MAXTURNANGLE ) 
									{
										this._currentAngularSpeed	=	kENEMY_MAXTURNANGLE ;
									}
		
									var maxTurnAngle = this._currentAngularSpeed * dt ;
									
									this._maxTurnAngle	=	maxTurnAngle ;
									
									if(Math.min(this._rightangdist,this._leftangdist) > maxTurnAngle) 
									{
		
										if (clockwiseDirection) 
										{
											this._direction = (direction + maxTurnAngle) % 360 ;
										}	
										else
										{
											//go anti clockwise
											this._direction = (direction - maxTurnAngle) % 360 ;
										}
									}	
									else
									{
										this._direction	=	targetbearing ;
									}
								},
	
	
	
	


	Accelerate:					function(dt)
								{

									var PlyAcceleration	=	2800 ;
									var PlyDampValue	=	8 ;

									var joyx 			= 	this.GetJoystickXAxis() ;
									var joyy 			= 	this.GetJoystickYAxis() ;

									var vx	=	0, vy	=	0 ;
		
									var freeze_effect 	=	this._freeze_effect || 1 ;
		
									vx	=	freeze_effect*(this._velx + PlyAcceleration*(joyx || 0)*dt) ;
									vy	=	freeze_effect*(this._vely + PlyAcceleration*(joyy || 0)*dt) ;
		
									this._x	=	this._x + dt*vx ;
									this._y	=	this._y + dt*vy ;
		    
									var damp	=   Math.max(0,(1-PlyDampValue*dt)) ;
									this._velx	=	vx*damp ;
									this._vely	=	vy*damp ;

								},
	

	GetFiringOffset:			function(fired)
								{
									return this._fireFunction && this._fireFunction(typeof fired  == 'undefined' ? this._fired : fired ) ||  {x:0, y:0, z:0} ;
								},

	GetFiringPosition:			function(fired,angle)
								{
									var ra	=	angle || 0 ;
									var	cos	=	Math.cos(ra*Math.PI/180) ;
									var sin	=	Math.sin(ra*Math.PI/180) ;

									var x	=	this._x, y	=	this._y, z	=	this._z ;
									var fo	=	this.GetFiringOffset(fired) ;
									var ox	=	fo.x, oy	= fo.y ;
									var	tox	=	ox*cos - oy*sin ;
									var	toy	=	ox*sin + oy*cos ;

									this.firingpos.SetXyzw(x + tox, y + toy, z, 0) ;
									return this.firingpos ;
								},

								
	AttemptFire:				function(dt,viewdist)
								{


									// Attempt to fire bullets
									if (PlayerHelicopter.canfire && this._canfire && this._time - (this._lastfired || 0) > this._fireperiod)
									//&& Math.sin(6*this._time/8+this._phase) > 0 && Math.sin(6*this._time/4+this._phase) > 0) 
									{

											//BulletManager.Fire				=	function(owner,damage,vel,angle,duration,animation,scale,radius)
										var kDAMAGE		=	10 ;
										var kDURATION	=	0.75 ;
										var kVELOCITY	=	600 ;

										var animation 	=	RenderHelper.CreateTextureAnimation(2,1,"bullets",10) ;

										BulletManager.Fire(this,kDAMAGE,kVELOCITY,this.GetFiringDirection(),kDURATION,animation,1,10) ;
										
										this._fired++ ;
										this._lastfired	=	this._time
									}
								},



    AngleMove:					function(analx,analy)
								{
									var angle		=	deg(Math.atan2(analy,analx)) ;
									var d			=	Math.sqrt(analx*analx + analy*analy) ;
									var angspeed	=	40 ;

									if (d > 0.5) 
									{
										this._targetbearing	=	angle + 90 ;
										//this.BulletSelect() ;
									}
								//	Logger.lprint("D = ",d," angle = ",angle)  ;
		
							   	},
  	
	AxisMove:					function(analx,analy)
								{
									this._analhor    =	analx || 0 ;
									this._analvert	=	analy || 0 ;
							   	},


  	
	GetJoystickXAxis:			function()
								{
									var hor 		=	this._analhor ;
									this._analhor	=	0 ;
									return hor ;
								},


	GetJoystickYAxis:			function()
								{
									var vert 		=	this._analvert ;
									this._analvert	=	0 ;
									return vert ;
								},
	
								
	Render:						function(rHelper)
								{
									var	ang		=	this._direction, scale = this._scale , sscale = (1 + scalearound - this._scale)*0.85  ;
									var	xpos	=	this._x, ypos	 =  this._y ;
										
									rHelper.drawSprite(this._shadowsprite,xpos-16,ypos+16,ang,sscale,sscale) ;
									rHelper.drawSprite(this._sprite,xpos,ypos,ang,scale,scale) ;
									rHelper.drawSprite(this._bladesprite,xpos,ypos,this._blade,scale,scale) ;
									
									//this.RenderDebug(rHelper) ;
								},

	RenderDebug:				function(rHelper)
								{
									var region = this.GetRegion() ;
									rHelper.drawText("player: region:"+region+" pos: "+Math.floor(this._x)+","+Math.floor(this._y),this._x+10,this._y,[255,255,255],{vertical:"bottom",horizontal:"left"}) ;
									rHelper.drawText("player: bearing:"+this._targetbearing+" maxTurnAngle="+(this._maxTurnAngle || 0),this._x+10,this._y+20,[255,255,255],{vertical:"bottom",horizontal:"left"}) ;

									rHelper.drawCircle(this._x, this._y,10,[255,255,0]) ;
									rHelper.drawCircle(this._x, this._y,4,[255,0,0]) ;
								},


	// Temp functions
								
	update:	function(dt)
			{
				this.Update(dt) ;
			},
	render:	function(rHelper)
			{
				this.Render(rHelper) ;
			},

	moveup:	function()
			{
				this.PlayerUp() ;
			},
	movedown:
			function()
			{
				this.PlayerDown() ;
			},
	moveleft:
			function()
			{
				this.PlayerLeft() ;
			},

	moveright:
			function()
			{
				this.PlayerRight() ;
			},

	move:	function(dx,dy)
			{
				if (dx) {
					if (dx > 0) {
						this.moveright() ;
					} else
					{
						this.moveleft() ;
					}
				} 
				if (dy)
				{
					if (dy > 0) {
						this.movedown() ;
					} else
					{
						this.moveup() ;
					}

					
				}
			},
}
	
//function PlayerHelicopter.RenderShadow(player,renderHelper,x,y)
//		local xpos,ypos	=	player.x,player.y
//		local extra		=	scalearound - player.scale
//		local shadowoffx,shadowoffy	=	PlayerHelicopter._MakeDirectionVectorPair(180+player.direction+sunangle,xpos,ypos,40)
//		RenderHelper.DrawSprite(renderHelper,player.shadowSprite,shadowoffx,shadowoffy,0.85*(1 + extra),-(player.direction or 0))
//end


	
