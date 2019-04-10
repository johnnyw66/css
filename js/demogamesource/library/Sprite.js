//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function Sprite(imgName,x,y)
{
			this._x			=	x || 0 ;
			this._y			=	y || 0 ;
			this._cx		=	this._x ;
			this._cy		=	this._y ;
			this._time		=	0 ;
			this._img		= 	new ImageResource(imgName) ;
		//	this._img.src 	= 	imgName ;
			this._rangle	=	0 ;
			this._sx		=	1 ;
			this._sy		=	1 ;
			this.className	=	'Sprite' ;
}

Sprite.prototype = {
			
			constructor: Sprite,
			setTexture: function(textid)
						{
							// NOT YET IMPLEMENTED!
						}, 
			setPosition: function(xpos,ypos) {
								this._x = xpos ;
								this._y = ypos ;
							},
							
			draw: function(context)
							{
								var imgW	=	this._img.getWidth() ;
								var imgH	=	this._img.getHeight() ;

								context.save();             
								context.translate(this._x,this._y) ;
								context.scale(this._sx,this._sy) ;
								context.rotate(this._rangle);  
								context.drawImage( this._img.getImage(),0,0,imgW,imgH,-imgW/2,-imgH/2,imgW,imgH) ;
								context.restore() ;
							},
							

			getScaleX: function()
							{
								return this._sx
							},
							
			getScaleY: function()
							{
								return this._sy
							},
							
			setScale: function(sx,sy)
							{
								this._sx	=	sx || 1 ;	
								this._sy	=	sy || 1 ;	
							},

							
			setRotation: function(angle)
							{
								this._rangle	=	 angle*(Math.PI / 180) ;	
							},

			getRotation: function()
							{
								return this._rangle *180/Math.PI;
							},

			getX: function()
							{
								return this._x ;
							},

			getY: function()
							{
								return this._y ;
							},
							
			update: function(dt)
							{
								this._time = this._time + dt
							}
}
		
	
