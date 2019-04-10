//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function RenderHelper(context1,context2,width,height)
{
			this._context1		=	context1 ;
			this._context2		=	context2 ;
			
			this._width			=	width ;
			this._height		=	height ;
			this._ccontext		=	this._context2 ;
			this._inkcolour		=	"#000000" ;
			this._papercolour	=	"#FFFFFF" ;
			this._defaultfont	=	"12px sans-seri" ;
			this._currentfont	=	this._defaultfont ;
			this._overlays		=	[
										{x:0,y:0,name:"overlay0"},
										{x:0,y:0,name:"overlay1"},
										{x:0,y:0,name:"overlay2"},
										{x:0,y:0,name:"overlay3"},
										{x:0,y:0,name:"overlay4"},
										{x:0,y:0,name:"overlay5"},
										{x:0,y:0,name:"overlay6"},
										{x:0,y:0,name:"overlay7"},
										{x:0,y:0,name:"overlay8"},
										{x:0,y:0,name:"overlay9"},
										{x:0,y:0,name:"overlay10"},
										{x:0,y:0,name:"overlay11"},
										{x:0,y:0,name:"overlay12"},
										{x:0,y:0,name:"overlay13"},
										{x:0,y:0,name:"overlay14"},
										{x:0,y:0,name:"overlay15"},
									] ;
			this._overlayindex	=	0 ;
			this.setOverlay(0) ;
			this.className		=	"RenderHelper" ;
			this.copyright			=	"Javascript code (c) John Wilson 2012" ;
			
}
// Some 'Static Methods'

RenderHelper.CreateTextureAnimation	=	function(frameshor,framesvert,texture,fps,timeout)
										{
											var textureN			=	texture ;
											var animation			=	TextureAnim.Create(fps,timeout) ;
											var sprsheet			=	Spritesheet.Create(texture,frameshor,framesvert)	;
											
											animation.render		=	function(rHelper,x,y,scalex,scaley,rot)
																		{
																			if (this.isPlaying())
																			{
																				var texinfo =	this.getRenderTexture() ;
																				rHelper.drawSpriteSheet(texinfo.sheet,x,y,texinfo.frame,(rot || 0),scalex,scaley) ;
																			} 
																		}
											
											for (var frame = 0 ; frame < frameshor*framesvert ; frame++)
											{
												animation.addFrame({frame:frame,sheet:sprsheet}) ;	
											}
											return animation ;
										}
										
RenderHelper.TextureFind			=	function(textureName)
										{
											var		res	= 	new ImageResource(textureName) ;
											return 	res.getImage() ;
										}
RenderHelper.prototype =
{			
			constructor: RenderHelper,
			
			setOverlay: 			function(overlay)
									{
										var oldoverlay	=	this._overlays[this._overlayindex] ;

									//	this._context1.translate(-oldoverlay.x,-oldoverlay.y) ;
									//	this._context2.translate(-oldoverlay.x,-oldoverlay.y) ;


										this._overlayindex		=	overlay % this._overlays.length ;
										this._currentoverlay	=	this._overlays[this._overlayindex] ;

									//	this._context1.translate(this._currentoverlay.x,this._currentoverlay.y) ;
									//	this._context2.translate(this._currentoverlay.x,this._currentoverlay.y) ;
									},
									
			getOverlay: 			function(overlay)
									{
										return 	this._overlayindex ;
									},

			camera2dSetPostition: 	function(x,y)
									{
										this._currentoverlay.x	=	x ;
										this._currentoverlay.y	=	y ;
									},

			convertRGB:	function(col,debug)
						{
							var red = 0, green = 0, blue = 0, alpha = 255 ;
							
							if (col instanceof Array) 
							{
								
								red		=	Math.min(255,(col[0] || red)).toString(16) ;
								green	=	Math.min(255,(col[1] || green)).toString(16) ;
								blue	= 	Math.min(255,(col[2] || blue)).toString(16) ;
								alpha	= 	Math.min(255,(col[3] || alpha)).toString(16) ;
								
							} else if (typeof col == "string" ) 
							{
								
								return col ;
							} else {
								red 	=	(col.r || col.red || red).toString(16) ;
								green	=	(col.g || col.green || green).toString(16) ;
								blue	=	(col.b || col.blue || blue).toString(16) ;
								alpha	=	(col.a || col.alpha || alpha).toString(16) ;
							}
							var fstr = "#"+(red.length > 1 ? red : ("0"+red))+(green.length > 1 ? green : ("0"+green)) + (blue.length > 1 ? blue : ("0"+blue)) ;
							if (fstr.length != 7) 
							{
								alert("BAD COLOUR "+fstr+","+red.length+","+green.length+","+blue.length) ;
							}
							return fstr ;	
							
							
						},
			getColour: function(colour,debug)
							{
								return (colour == undefined) ? this._inkcolour : this.convertRGB(colour,debug) ;
							},
							
			setColour: function(colour)
								{
									this._colour = colour ;
								},


		
			drawRawImage: function(image,x,y,rot,sx,sy)
							{
								var imgW	=	image.width ;
								var imgH	=	image.height ;
								var  xt		=	this._currentoverlay.x, yt = this._currentoverlay.y ;
								if (imgW) 
								{
									var context	=	this._ccontext ;
									context.save();             
									context.translate(x-xt,y-yt) ;
									context.scale(sx,sy) ;
									context.rotate(rot*(Math.PI / 180));  
									context.drawImage(image,0,0,imgW,imgH,-imgW/2,-imgH/2,imgW,imgH) ;
									context.restore() ;
								}
									
							},


			drawSprite: function(sprite,x,y,rot,sx,sy)
							{
								var  xt		=	this._currentoverlay.x, yt = this._currentoverlay.y ;
								sprite.setRotation(rot || sprite.getRotation())
								sprite.setScale(sx || sprite.getScaleX(),sy || sprite.getScaleY())
								sprite.setPosition((x || sprite.getX())-xt,(y || sprite.getY())-yt)	;
								sprite.draw(this._ccontext) ;
							},
			
			drawSpriteSheet: function(spritesheet,x,y,frame,rot,sx,sy)
										{
											var  xt		=	this._currentoverlay.x, yt = this._currentoverlay.y ;
											spritesheet.draw(this._ccontext,frame,x-xt,y-yt,rot,sx,sy) ;
												
										},

			drawLine: function(xs,ys,xe,ye,colour)
							{
								var  xt		=	this._currentoverlay.x, yt = this._currentoverlay.y ;
								var ctx	=	this._ccontext ;
								ctx.beginPath() ;
								ctx.strokeStyle= this.getColour(colour);
								ctx.moveTo(xs-xt, ys-yt) ;
								ctx.lineTo(xe-xt, ye-yt) ;
								ctx.stroke() ;
								
							},
							
							

			drawBox: function(x,y,wid,hgt,colour)
								{

								   this.drawLine(x,y,x+wid,y,colour)
								   this.drawLine(x+wid,y,x+wid,y+hgt,colour)
								   this.drawLine(x+wid,y+hgt,x,y+hgt,colour)
								   this.drawLine(x,y+hgt,x,y,colour)
								},
								
			drawCircle: function(x,y,radius,colour)
								{
									var  xt		=	this._currentoverlay.x, yt = this._currentoverlay.y ;
									
									var ctx	=	this._ccontext ;
									ctx.beginPath() ;
									ctx.strokeStyle = this.getColour(colour);
									ctx.arc(x-xt,y-yt,radius,0,Math.PI*2,true);	
									ctx.stroke() ;
									
								},

			drawPoly: function(vertices,colour)
								{
									var ctx	=	this._ccontext ;
									ctx.beginPath() ;
									
									for (var index = 0; index < vertices.length; index+=2) 
									{
										var x1 = vertices[index]
										var y1 = vertices[index+1]
										var x2 = vertices[index+2] || vertices[0]
										var y2 = vertices[index+3] || vertices[1]
										this.drawLine(x1,y1,x2,y2,colour)
									}
									ctx.stroke() ;
								},

			clearRect: 		function(colour,alpa)
							{
								var ctx			=	this._ccontext ;
								var alpha		=	alpa || 1 ;
								
								if (colour) {
									var scol		=	ctx.fillStyle ;
									var salpha		=	ctx.globalAlpha ;
									var col			=	this.getColour(colour);
									ctx.fillStyle	=	col ;	
									ctx.globalAlpha = 	alpha ;
									ctx.fillRect(0, 0, this._width, this._height);
									ctx.fillStyle	=	scol ;	
									ctx.globalAlpha	=	salpha ;	
								} else {
									ctx.clearRect(0, 0, this._width, this._height);
								}
							},
							

			drawTriangle: 	function(x1,y1,x2,y2,x3,y3,colour,alpa)
							{
									var ctx			=	this._ccontext ;
									var  xt			=	this._currentoverlay.x, yt = this._currentoverlay.y ;

									var col			=	this.getColour(colour);
									var alpha		=	alpa || 1 ;
									
									
									var scol		=	ctx.fillStyle ;
									var salpha		=	ctx.globalAlpha ;

									ctx.globalAlpha	=	alpha ;	
									ctx.fillStyle	=	col ;
									ctx.beginPath();
									ctx.moveTo(x1-xt,y1-yt) ;
									ctx.lineTo(x2-xt,y2-yt) ;
									ctx.lineTo(x3-xt,y3-yt) ;
									ctx.closePath() ;
									ctx.fill() ;

									ctx.fillStyle	=	scol ;	
									ctx.globalAlpha	=	salpha ;	
									
							},

			fillRect: 		function(colour)
							{
								var col			=	this.getColour(colour);
								var ctx			=	this._ccontext ;
								ctx.fillStyle	=	col ;	
								ctx.fillRect(0, 0, this._width, this._height);
							},

			drawText: function(str,x,y,colour,align,font,alpha)
							{
								var  xt		=	this._currentoverlay.x, yt = this._currentoverlay.y ;
								var ctx	=	this._ccontext ;
//								ctx.save() ;
	
								var aln			=	ctx.textAlign ;
								var ftn			=	ctx.font
								var bline		=	ctx.textBaseline ;
								var salpha			=	ctx.globalAlpha	;	
								ctx.globalAlpha		=	alpha  ;	
								ctx.fillStyle		=	this.getColour(colour);
								var bNo				=	this.getBuffer() ;
								ctx.textAlign 		=	(align && align.horizontal) || "left";
								ctx.font 			=	font || this._currentfont ;
								ctx.textBaseline	=	(align && align.vertical) || "top" ;
								 
								var txt				=	str || "B"+bNo+str	;
							  	var dim				=	ctx.measureText(txt) ;
								ctx.fillText(txt,x-xt,y-yt);

//								ctx.restore() ;

								ctx.textAlign		=	aln ;
								ctx.font			=	ftn ;
								ctx.textBaseline	=	bline ;
								ctx.globalAlpha		=	salpha ;
								
								
							},
								
			drawQuads2d:	function(tilemapTexture,posmatrix,posData,uvData)
							{

								var  xt	=	this._currentoverlay.x, yt = this._currentoverlay.y ;

								var ctx	=	this._ccontext ;
								var sx	=	1, sy	=	1
								var tr	=	posmatrix.GetRow(4) ;
								var tx	=	tr.X(), ty = tr.Y() ;
								
								ctx.save() ;             
								ctx.rotate(0) ;  
								ctx.scale(sx || 1, sy || 1) ;
								
								for (var idx = 0 ; idx < posData.length ; idx++)
								{
									

									var pos	=	posData[idx] ;
									var uv	=	uvData[idx] ;
									//if (!uv) {
									//	break ;
										//alert("drawQuads2d: NO UV AT IDX = "+idx)
									//}	
									var	x 	=	pos.xstart + tx, y =	pos.ystart + ty;
									var fx	=	uv.x, fy	= uv.y, imgW	= uv.width	, imgH	=	uv.height;	
									
									ctx.translate(x-xt,y-yt) ;
//									ctx.drawImage(tilemapTexture,fx,fy,imgW,imgH,-imgW/2,-imgH/2,imgW,imgH) ;
									ctx.drawImage(tilemapTexture,fx,fy,imgW,imgH,0,0,imgW,imgH) ;

									ctx.translate(-x,-y) ;
									
								}
								
								ctx.restore();             

								
							},
							
			// Hmmmm... not exactly a 'primitive' render function!
							
			drawArrowHead:		function(direction,baseVector,stemLength,tipAngle,colour)
								{
									var rad = function(deg) { return deg * Math.PI/180 ; }
										

									var xbase	=	baseVector.X(), ybase = baseVector.Y() ;
									
									var tipLength		=	stemLength*0.20 ;

									var ly = ybase + stemLength*Math.sin(rad(direction - 90)) ;
									var lx = xbase + stemLength*Math.cos(rad(direction - 90)) ;

									var t1y = tipLength*Math.sin(rad(direction - 90 + tipAngle)) ;
									var t1x = tipLength*Math.cos(rad(direction - 90 + tipAngle)) ;

									var t2y = tipLength*Math.sin(rad(direction - 90 - tipAngle)) ;
									var t2x = tipLength*Math.cos(rad(direction - 90 - tipAngle)) ;


									this.drawLine(xbase, ybase, lx,ly,colour) ;
									this.drawLine(lx, ly, lx-t1x, ly-t1y,colour) ;
									this.drawLine(lx, ly, lx-t2x, ly-t2y,colour) ;
								},

							
			flipBuffer: 	function()
							{
								if (this._ccontext == this._context1)
								{
									this._ccontext	=	this._context2;
								} else
								{
									this._ccontext	=	this._context1;
								}
								
							},
							
			getBuffer: function()
							{
							//	console.log( "hello" )
								return (this._ccontext == this._context1 ? 0 : 1) ;
							}
							
							
}
		
	
