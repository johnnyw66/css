//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt
var TURRETFULLSWING_DURATION	=	72 ;

function EnemyPart(enemy,width,height,ctype,tanim,offset,poly,radius,indes,weaponcollide,explosions)
{
	this.offset		=	offset ;
	this.anim		=	tanim ;
	this.enemy		=	enemy ;
	this.tx			=	offset.x ;
	this.ty			=	offset.y ;
	this.ctype		=	ctype ;
	this.direction	=	enemy.direction ;
	this.tangle		=	0 ;					// turret angle
	this.tphase		=	Math.random()*2*Math.PI ;
	this.time		=	0 ;
	var	 degaim		=	this.enemy.realpath ? 16 : 90
	this.aim		=	rad(degaim) ;

	var	turretFreq		=	(180/(degaim*TURRETFULLSWING_DURATION)) ;
	this.turretFreqCnst	=	2*Math.PI*turretFreq ;		// == 2*pi*freq
	
		
	var texFrames	=	tanim.getFrames() ;
	
//	alert("CTYPE "+this.ctype) ;
	
	this.frames		=	{} ;

	for (var idx = 0 ; idx < texFrames.length ; idx++)
	{
		this.frames[texFrames[idx]] = ImageResource.getResource(texFrames[idx]) ;
	}

}


EnemyPart.Create=function(enemy,width,height,ctype,tanim,offset,poly,radius,indes,weaponcollide,explosions)
{
	return new EnemyPart(enemy,width,height,ctype,tanim,offset,poly,radius,indes,weaponcollide,explosions) ;
}

function rad(deg)	{	return deg*Math.PI/180 ;	}
function deg(rad)	{	return rad*180/Math.PI ;	}

EnemyPart.prototype =
{
	constructor:		EnemyPart,

	Update:				function(dt)
						{
							this.time	=	this.time + dt ;
							
							if (this.anim)
							{
								this.anim.update(dt) ;
								
								
							}
							if (this.ctype && this.ctype == 'rotate') 
							{
								var ROTATESPEED	=	360 ;

								this.direction 	= 	this.direction + dt*ROTATESPEED ;
							}	

							if (this.ctype && this.ctype == 'turret') 
							{
								this.tangle 	= 	deg(this.aim*Math.sin(this.turretFreqCnst*this.time + this.tphase)) ;
							}	
							
						},
						
	GetFiringDirection:	function()
						{
							return (this.ctype && this.ctype == 'turret')  ? this.enemy.direction + this.tangle : this.direction ;
						},
	
 	Render:				function(rHelper)
						{
							if (this.anim)
							{
								var DEFAULTSCL	=	0.5 ;

								var scale		=	this.enemy.scale || DEFAULTSCL;
								var pos 		=	this.enemy.GetPosition() ;
								var direction	=	this.enemy.GetDirection() + this.direction ;
								
								var x 			=	pos._x, y = pos._y ;
								var img 		=	this.frames[this.anim.getRenderTexture()];
								var toffset		=	this.ctype == 'turret' ?  this.tangle : 0	
								rHelper.drawRawImage(img,x,y,direction+toffset,scale,scale) ;
							}
						},

	RenderDebug:		function(rHelper)
						{
						},

}


