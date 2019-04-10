//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt



var	STATE_HMISSILE_TRACKING					=	1 ;
var	STATE_HMISSILE_FALLING					=	2 ;
var	STATE_HMISSILE_SLEEPING					=	3 ;


var	kHMISSILES_MAX							= 	8 ;
var	kHMISSILE_MAXTURNANGLE					=	90.0 ;
var	kHMISSILE_SPEED							=	400.0 ;
var	kHMISSILE_LIFESPAN						=	15.0 ;
var	kHMISSILE_ANGULAR_ACCELERATION			=	180.0 ;


var	ANIM_ENEMYMISSILE_FRAME1				=	"enemy_missile__1" ;
var	ANIM_ENEMYMISSILE_FRAME2				=	"enemy_missile__2" ;
var	ANIM_ENEMYMISSILE_FRAME3				=	"enemy_missile__3" ;

var	Tempv0									=	Vector4.Create() ;
var	Tempv1									=	Vector4.Create() ;
var	Tempv2									=	Vector4.Create() ;
var	Tempv3									=	Vector4.Create() ;

function rad(deg)
{
	return deg*Math.PI/180 ;
}
function deg(rad)
{
	return rad*180/Math.PI ;
}

function HomingMissile( owner, startpos,  rot,  follow,  damage, lifespan)
{

		this.owner					=	owner ;
		this.following				=	follow ;
		this.vPos					=	Vector4.Create(startpos) ; 
		this.vDir					=	Vector4.Create(0,0) ;
        this.rot					=	rot || 0.0 ;
        this.Lifespan				=	lifespan || kHMISSILE_LIFESPAN ;
        this.time					=	0 ;
		this.strength				=	255 ;
        this.nState					=	STATE_HMISSILE_TRACKING ;
        this.damage					=	damage || 0 ;
        this.bInvincible			=	false ;
		this.bMarkedForDeath		=	false ;
		this.isPlayer 				=	(follow.className != 'Player') ;
		this.colline 				=	Line2D.Create(Vector4.Create(0,0),Vector4.Create(0,0)) ;
        this.currentAngularDir		=	Vector4.Create();
        this.currentAngularSpeed	=	Vector4.Create() ;
        this.tMissile 				=	null ;
		this.className				=	HomingMissile.className ;

		this.vPos.Add(this.vPos,Vector4.Create(4*Math.random(),4*Math.random())) ;

		this.animation 				= new TextureAnim() ;
		this.animation.addFrame(ANIM_ENEMYMISSILE_FRAME1) ;
		this.animation.addFrame(ANIM_ENEMYMISSILE_FRAME2) ;
		this.animation.addFrame(ANIM_ENEMYMISSILE_FRAME3) ;
		this.animation.play(true, true) ;

}

HomingMissile.className					=	"HomingMissile" ;

HomingMissile.Create			=	function( owner, startpos,  rot,  follow,  damage, lifespan)
{
	return new HomingMissile( owner, startpos,  rot,  follow,  damage, lifespan) ;
}

HomingMissile.prototype	=
{

	constructor:			HomingMissile,
	
	Follow:					function(who)
							{
								this.following = who ;
							},
	
	Update:					function(dt)
							{
						 		this.UpdateLive(dt) ;
							},
	
	UpdateLive:				function(dt)
							{
	
								this.time =	this.time +	dt ;

								if (this.animation) 
								{
							 		this.animation.update(dt) ;
								}
		
		
		
								var	diff_vec	=	Tempv0  ;
								var	state		=	this.nState ;
				
								if(state	!=	STATE_HMISSILE_FALLING && this.time > this.Lifespan) 
								{
									this.nState	=	STATE_HMISSILE_FALLING ;
									state		=	this.nState ;
								}
			   		
								if(state	==	STATE_HMISSILE_FALLING || !this.following.IsAlive()) 
								{
									
									diff_vec.SetXyzw(0,this.vPos.Y(),0,0) ;
									if (this.time > 1.25*this.Lifespan) 
									{
										this.nState		=	STATE_HMISSILE_SLEEPING ;
										this.MarkForDeath() ;
										this.time		=	0 ;
										return ;
									}
								}
								else if(state	==	STATE_HMISSILE_TRACKING) 
								{
									Vector4.Subtract(diff_vec,this.following.GetVectorPosition(), this.vPos) ;

								} else if(state	==	STATE_HMISSILE_SLEEPING) 
								{
									if (this.time > 4) 
									{
										//this.nState	=	STATE_HMISSILE_TRACKING ;
										this.time	=	0 ;
									}
									return ;
								}

								diff_vec.Normalise2() ;

								// Work out current angle
								var rot_tar =	Math.atan2(diff_vec.Y(), diff_vec.X()) ;
								rot_tar 	=	deg(rot_tar) ; 
								rot_tar 	=	(rot_tar + 360.0 ) % 360.0 ;


								var heading_vec= Tempv1 ;  	
		
								heading_vec.SetXyzw(this.vDir.X(),this.vDir.Y(),0,0) ;
								heading_vec.Normalise2() ;

								var perpheading_vec= Tempv2 ;

								perpheading_vec.SetXyzw(-heading_vec.Y(), heading_vec.X(), 0, 0) ;


								var perpCosineAngle = Vector4.Dot2(diff_vec, perpheading_vec) ;
		
								var newAngularDirection	=	(perpCosineAngle>0) && 1.0 || -1.0 ;
		
		
								if ( newAngularDirection != this.currentAngularDir ) 
								{
									this.currentAngularDir		=	newAngularDirection ;
									this.currentAngularSpeed	=	0.0 ;
								}

								this.currentAngularSpeed = this.currentAngularSpeed +(dt * kHMISSILE_ANGULAR_ACCELERATION) ;

								if ( this.currentAngularSpeed > kHMISSILE_MAXTURNANGLE ) 
								{
									this.currentAngularSpeed = kHMISSILE_MAXTURNANGLE ;
		
								}
		
								var maxTurnAngle = this.currentAngularSpeed * dt ;

								if(Math.abs(rot_tar-this.rot)>maxTurnAngle) 
								{
		
									var leftAngle  = ( this.rot + 360.0 - maxTurnAngle ) % 360.0 ;
									var rightAngle = ( this.rot + maxTurnAngle ) % 360.0 ;

									if(perpCosineAngle>0) {
										this.rot = rightAngle ;
									}
									else
									{
										this.rot = leftAngle ;			
									}
								}
								else
								{
									this.rot = rot_tar ;
		
								}

								// Work out new direction
								var rotrad	=	rad(this.rot) ;
		
								var vx = Math.cos(rotrad) ;
								var vy = Math.sin(rotrad) ;
		
								this.vDir.SetXyzw(vx * dt * kHMISSILE_SPEED,vy * dt * kHMISSILE_SPEED,0,0) ;
		
								Vector4.Add(this.vPos, this.vDir, this.vPos) ;

		
							},

	GetCollisionLine:		function(dt)
							{
							 	var	future = Vector4.Create( this.vDir) ;
								Vector4.Multiply(future,future,4) ;
								Vector4.Add(future,future,this.vPos) ;
		
								this.colline.SetPoints(this.vPos,future) ;
						//		this.colline.CalculateCentreAndRadius() 

								return this.colline ;
							},
		

	Render:					function(renderHelper)
							{
								if(this.nState	!=	STATE_HMISSILE_SLEEPING) 
								{
									renderHelper.drawRawImage(ImageResource.getResource(this.animation.getRenderTexture()),this.vPos.X(), this.vPos.Y(),90+this.rot,0.65,0.65) ;
									//this.RenderDebug(renderHelper)
								}
							},
	
	RenderDebug:			function(renderHelper)
							{
								var mpos 	= 	this.GetVectorPosition() ;
								renderHelper.drawCircle(mpos.X(), mpos.Y(),  4,[255,255,0]) ;
								
								renderHelper.drawText(this.toString(),mpos.X()+40, mpos.Y()) ;
								this.GetCollisionLine().Render(renderHelper) ;
	
							},
		
	toString:				function()
							{
								return "HomingMissile" ;
							},

	GetVectorPosition:		function()
							{
								return this.vPos ;
							},

	GetPosition:			function()
							{
								return {x: this.vPos.X(), y: this.vPos.Y(), z: this.vPos.Z()} ;
							},

	GetCoords:				function()
							{
								return this.GetPosition() ; 
							},
	
	
	SetPosition:			function(v)
							{
								this.vPos = Vector4.Create(v) ;
							},
	
	MarkForDeath:			function()
							{
								this.bMarkedForDeath = true ;
								var animationinfo = {texture:"bullethits",frameshor:4,framesvert:2,x:this.vPos.X(),y:this.vPos.Y(),loop:false,bounce:false,scale:4} ;
								ExplosionManager.AddExplosion(animationinfo,7) ;
							},
	
	IsMarkedForDeath:		function()
							{
								return this.bMarkedForDeath ;
	
							},
	
	ApplyDamage:			function(damage)
							{
								this.MarkForDeath()
	
							},
	
	GetDamage:				function()
							{
								return this.damage ;
							},
	

	IsAlive:				function()
							{
								return !this.IsMarkedForDeath() ;
							},
							
	Cleanup:				function()
							{
								this.vPos		=	null ;
								this.following	=	null ;
								this.tMissile	=	null ;
								this.vDir		=	null ;
								this.colline	=	null  ;
							},

}

MissileManager				=	{} 	;

MissileManager.follow		=	null ;
var hmissile				=	null ;

	
MissileManager.Init			=	function(follow)
								{
									hmissile	=	null ;
								}

MissileManager.CanFire		=	function()
								{
									return !hmissile ;
								}
								
MissileManager.AddMissile	=	function(owner, startpos,  rot,  follow,  damage, lifespan)
								{
									if (!hmissile) {
										hmissile			=	new HomingMissile(owner, startpos,  rot,  follow,  damage || 1, lifespan || 15) ;
									}
										
								}
								
MissileManager.Update		=	function(dt)
								{
									if (hmissile) {
										hmissile.Update(dt) ;	
										if (!hmissile.IsAlive()) 
										{
											hmissile	=	null ;
										}
									}

								}

MissileManager.Render		=	function(rHelper)
								{
									if (hmissile) {
										hmissile.Render(rHelper) ;	
									}
								}
								
