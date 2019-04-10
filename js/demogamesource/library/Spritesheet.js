//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function Spritesheet(imageName,spritesacross,spritesdown,spritewidth,spritehgt,xoff,yoff)
{
			this._imagename		=	imageName ;
			this._image			= 	ImageResource.getResource(imageName) ;
			
			this._numFrames		=	0 ;
			this._spritesacross	=	spritesacross ;
			this._spritesdown	=	spritesdown ;
			this._spritewidth	=	spritewidth ;
			this._spriteheight	=	spritehgt ;
			this._numFrames		=	this._spritesacross * this._spritesdown ;

			this._init() ;

			this._frame			=	0 ;
			this.className		=	'Spritesheet' ;
}

Spritesheet.Create	=	function(imageName,spritesacross,spritesdown,spritewidth,spritehgt,xoff,yoff)
{
	return new Spritesheet(imageName,spritesacross,spritesdown,spritewidth,spritehgt,xoff,yoff) ;
}

Spritesheet.prototype = {

		constructor: Spritesheet,

			_init:	function()
					{
						if (!this._spritewidth) 
						{
								this._width			=	this._image.width ;
								this._height		=	this._image.height ;
								this._spritewidth	=	this._width / this._spritesacross ;
								this._spriteheight	=	this._height / this._spritesdown ;
						}	
					},
							
			draw: 	function(context,frameNumber,x,y,rot,sx,sy)
					{
					
					
						var imgW	=	this._spritewidth;
						var imgH	=	this._spriteheight ;
						var fNumber	=	frameNumber % this._numFrames ;
						var fy		=	imgH*parseInt(fNumber / this._spritesacross) ; 
						var fx		=	imgW*(fNumber % this._spritesacross) ;
						var rangle	=	 (rot || 0)*(Math.PI / 180) ;
						this._frame	=	fNumber ;
	
						context.save();             
						context.translate(x,y) ;
						context.scale(sx || 1, sy || 1) ;
						context.rotate(rangle);  
						context.drawImage( this._image,fx,fy,imgW,imgH,-imgW/2,-imgH/2,imgW,imgH) ;
						context.restore() ;
					},
				
			toString:	function()
						{
							
							var imgW	=	this._spritewidth;
							var imgH	=	this._spriteheight ;
							var fNumber	=	this._frame % this._numFrames ;
							var fy		=	imgH*parseInt(fNumber / this._spritesacross) ; 
							var fx		=	imgW*(fNumber % this._spritesacross) ;
							return this.className+' '+this._imagename+" "+fNumber+":"+fx+","+fy ;
						}
							
}
		
	
