//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

// Use sprite sheet!

function TextureParticle(initpackage)
{
		this.className		=	TextureParticle.className ;
		
		this._texid			=	initpackage.texid || "flare.png" ;
			
		this._time			=	0 ;
		this._sprite 		= 	new sprite(initpackage.texid) ;

		this._x				=	initpackage.x ;
		this._y				=	initpackage.y ;
		this._duration		=	initpackage.duration ;
		this._velx			=	initpackage.velx ;
		this._vely			=	initpackage.vely ;
		this._alpha			=	0 ;

		var anim 			=	new textureanim(1,initpackage.fps || 5)
		this._anim			=	anim
		anim.addFrame({frame:1,textureid:this._texid})
		anim.play(true) ;
		
}

TextureParticle.className	=	"TextureParticle" ;

TextureParticle.Create		=	function(initpackage)
								{
										return new TextureParticle(initpackage) ;
								}


TextureParticle.prototype = 
{

	constructor:	TextureParticle,
	
	Update:			function(dt)
					{
						this._anim.update(dt) ;

						this._time	=	this._time + dt ;
						this._alpha	=	1	-	Math.min((this._time/this._duration),1) ;
						this._x		=	this._x	+ this._velx*dt ;
						this._y		=	this._y	+ this._vely*dt ;
		
					},

	IsFree:			function()
					{
						return this._time > this._duration ;
					},

	Alive: 			function()
					{
						return !this._IsFree() ;
					},

	GetVectorPosition:	function()
						{
							// TODO OPTIMISE!
							return Vector4.Create(this._x,this._y,0) ;
						},
	
	
	Render:			function(renderHelper)
					{
						//var textureid		=	this._anim.getRenderTexture().textureid ;

						var rgba 			=	[255,255,255,255*this._alpha] ;

						//this._sprite.setTexture(RenderHelper.TextureFind(textureid))
						renderHelper.drawSprite(this._sprite,this._x,this._y,0.5,0,rgba) ;
						//RenderHelper.drawCircle(renderHelper, this._x, this._y, 8, rgba) ;
					},
	
	
}
