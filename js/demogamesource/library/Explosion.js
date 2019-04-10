//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt
//var 	MAXEXPLOSIONS	=	20
function Explosion(info,play)
{
		this.x 			=	info.x ;
		this.y			=	info.y ;
		this.z			=	info.z || 0 ;
		this.scale		=	info.scale || 1 ;
		this.fps		=	info.fps || 13 ;
		this.frameshor	=	info.frameshor || 8 ;
		this.framesvert	=	info.framesvert || 1 ;
		this.texture	=	info.texture || "explosionuv64.png" ;
		this.loop		=	info.loop
		this.time		=	0 ;
		this.anim		=	RenderHelper.CreateTextureAnimation(this.frameshor,this.framesvert,this.texture,this.fps) ;
		this.className	=	Explosion.className ;
		if (play) 
		{
			this.anim.Play(false,false) ;
		}
}
	

Explosion.className		=	"Explosion"
Explosion.STATE_MOVE	=	0
Explosion.STATE_DEAD	=	1
Explosion.prototype 	=
{
	constructor:	Explosion,
	
	GetState:		function()
					{
	   					return this.state ;
					},
	Update:			function(dt)
					{
						this.time	=	this.time	+ dt ;
						this.anim.Update(dt) ;
						
		
					},

	HasFinished:	function()
					{
						return !this.anim.isPlaying() ;
						
					},
	Render:			function(rHelper)
					{
						//	drawSpriteSheet: function(spritesheet,x,y,frame,rot,sx,sy)
						if (this.anim.render)
						{
							this.anim.render(rHelper,this.x,this.y,this.scale)	;
						} else
						{
							alert("Not Yet Defined!")
							//var texinfo =	this.anim.GetRenderTexture() ;
							//rHelper.drawSheet(texinfo.sheet,this.x,this.y,texinfo.frame,0,this.scale,this.scale) ;
						}	
					}
}

ExplosionManager		=	{}	;

ExplosionManager.Init	=	function() 
{
	
}

ExplosionManager.AddExplosion	=	function(animationinfo,overlay)
{
	AnimationManager.Add(new Animation(animationinfo,true), overlay) ;
}

ExplosionManager.Update	=	function(dt)
{
	
}

ExplosionManager.Render	=	function(rHelper)
{
	
}



		
