//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt


var zeroVector			=	Vector4.Create(0,0,0,0) ;
var tmpVector			=	Vector4.Create(0,0,0,0) ;


function _3DCamera(screenDim)
{

	this.position		=	Vector4.Create() ;
	this.lookat			=	Vector4.Create() ;
	this.viewingangle	=	90 ;
	this.roll			=	_3DCamera.DEFAULTROLLANGLE ;
	this._3dto2d		=	Matrix44.Create() ;
	this.dimx			=	screenDim && screenDim.X() || 1024 ;
	this.dimy			=	screenDim && screenDim.Y() || 600 ;
	this.midx			=	0 ;
	this.midy			=	0 ;
	this.className		=	_3DCamera.className ;
	this.Init() ;
}

function _rad(deg)				{ return deg*Math.PI/180  ; } 
	
_3DCamera.className				=	"_3DCamera" ;
 
_3DCamera.DEFAULTVIEWINGANGLE	=	90 ;
_3DCamera.VIEWPOSX				=	0 ;
_3DCamera.VIEWPOSY				=	0 ;
_3DCamera.VIEWPOSZ				=	1/Math.tan(_rad(0.5*_3DCamera.DEFAULTVIEWINGANGLE))	 ;
_3DCamera.DEFAULTROLLANGLE		=	0 ;
_3DCamera.debug					=	false ;
	
_3DCamera.Create				=	function()
									{
										return new _3DCamera() ;
									} ;

_3DCamera.prototype	=
{
	
	constructor:		_3DCamera,
				
	Init:				function()
						{
							this.position.SetXyzw(0,0,0,0) ;
							this.lookat.SetXyzw(1,1,1) ;
							this.SetRollAngle(_3DCamera.DEFAULTROLLANGLE) ;
						},

	Set2DViewDimensions:function(dimx,dimy,midx,midy)
						{
							this.dimx	=	dimx ;
							this.dimy	=	dimy ;
							this.midx	=	midx ;
							this.midy	=	midy ;
						},
	

	GetPosition:		function()
						{
							return this.position ;
						},

	GetUpVector:		function()
						{
							return this.transMatrix.GetRow(2) ;
						},
						
	GetRightVector:		function()
						{
							return this.transMatrix.GetRow(1) ;
						},
						
	GetForwardVector:	function()
						{
							return this.transMatrix.GetRow(3) ;
						},
						
	MoveForward:		function(n)
						{
							
							var fVect 	= 	this.rotMatrix.GetRow(3) ;
							fVect.Multiply(fVect,n) ;		// scale up the 'out' vector
							
							// Would be quicker to add this to translation matrix!
							// .. What the hell..build the whole matrix again
							
							Vector4.Add(this.position,this.position,fVect) ;
							this._BuildCameraMatrix() ;
							
						},

	GetZVector:			function()
						{
							return this.transMatrix.GetRow(3) ;
						},
	
	SetPosition:		function(pos)
						{
							this.position.SetXyzw(pos.X(),pos.Y(),pos.Z(),0) ;
							this._BuildCameraMatrix() ;
						},

	SetLookAt:			function(lookat)
						{
							this.lookat.SetXyzw(lookat.X(),lookat.Y(),lookat.Z(),0)
							this._BuildCameraMatrix()
						},
	
	SetRollAngle:		function(rollangle)
						{
							this.roll		=	rollangle ;
							this.upvector	=	Vector4.Create(Math.sin(_rad(rollangle)),Math.cos(_rad(rollangle)),0,0) ;
							this._BuildCameraMatrix()
						},

	
	SetViewingAngle:	function(angle)
						{
							//assert(math.abs(angle) ~= 180,'_3DCamera.SetViewingAngle: Invalid viewing angle')
							this.viewingangle = angle 

							//var ez = 1/math.tan(_rad(0.5*angle))	
							//3dto2d:SetRow(4,Vector4.Create(0,0,1/ez,0))
						},
	
	GetViewingAngle:	function()
						{
							return 	this.viewingangle ;
						},
	
	_BuildCameraMatrix:	function()
						{
							//zc = line vector to where we are looking at ... i.e lookat - currentposition

							var	zc	=	Vector4.Create(this.lookat)

							zc.Subtract(zc,this.position)
							zc.Normalise3()
	
							// now create an othog axis to z in the general direction of the upvector

							var yc = Vector4.Create(this.upvector)
	
							var perpdist = -Vector4.Dot3(yc,zc)
							var across = Vector4.Create(zc)
							across.Multiply(across,perpdist)
							yc.Add(yc,across)
							yc.Normalise3()
	
							var xc = Vector4.Create()
							xc.Cross(zc,yc)
							xc.Normalise3() 				//SHOULD NOT BE NEEDED!
	
							var rotMatrix = Matrix44.Create()
	
							rotMatrix.SetRow(1,xc)
							rotMatrix.SetRow(2,yc)
							rotMatrix.SetRow(3,zc)

							this.rotMatrix = rotMatrix 
	
							//assert(false,rotMatrix:toString())
	
							var translateMatrix	=	Matrix44.Create()
							var pos				=	this.position

							translateMatrix.SetRow(1,Vector4.Create(1,0,0,-pos.X())) ;
							translateMatrix.SetRow(2,Vector4.Create(0,1,0,-pos.Y())) ;
							translateMatrix.SetRow(3,Vector4.Create(0,0,1,-pos.Z())) ;
							translateMatrix.SetRow(4,Vector4.Create(0,0,0,1)) ;

							this.tMatrix 		=	translateMatrix 
	
							var transMatrix 	= Matrix44.Create()
							transMatrix.Multiply(rotMatrix,translateMatrix)
	
							this.transMatrix	=	transMatrix
						},
	

	Transform:			function(dst,vct)
						{
							Vector4.TransformPoint(dst,this.transMatrix,vct)	
	
						},
	
	_3DPointto2D:		function(dst2d,srcpoint3d)
						{
							var dimx	=  this.dimx ;
							var dimy	=  this.dimy ;
							var dimxd2 	= 	dimx/2 ;
							var dest3d	=	Vector4.Create()  ;
		
							Vector4.TransformPoint(dest3d,this.transMatrix,srcpoint3d)	;

							var dz		=	0.5/Math.tan(_rad(0.5*this.viewingangle)) ;
							var pz		=	dest3d.Z() ;
							var sX		=	(1+dz*dest3d.X()/pz)*dimxd2 ;	
							var sY		=	(1 - dz*dest3d.Y()/pz)*dimxd2 - (dimx-dimy)/2 ;

							dst2d.SetXyzw(sX+this.midx,sY+this.midy,0,0) ;
						},
	
	_Set3Dto2DMatrix:	function(ex,ey,ez)
						{
							var _3dto2d = this._3dto2d ;
							_3dto2d.SetRow(1,Vector4.Create(1,0,0,-ex)) ;
							_3dto2d.SetRow(2,Vector4.Create(0,1,0,-ey)) ;
							_3dto2d.SetRow(3,Vector4.Create(0,0,1,0)) ;
							_3dto2d.SetRow(4,Vector4.Create(0,0,1/ez,0)) ;
						},
	
	Render:				function(renderHelper)
						{
	
							if (_3DCamera.debug) 
							{
								var x,y,z,w,tmp,str ;
								var textDim		=	renderHelper.GetTextSize(string.format("%.4f",-1666.12344))
								var fh 			= 	textDim.Y() 
								var maxwidth	=	1.25*textDim.X()
								var xstart		=	100 ;
								var ystart 		=	100 ;
								var col			=	[255,0,0] ;
			
								tmp = this.position ;
								x	= tmp.X(), y = tmp.Y(), z = tmp.Z() ,w = tmp.W() ;
			
								str = string.format("camx,camy,camz = %.4f,%.4f,%.4f : ROLL %f VIEW %f",x,y,z,this.roll,this.viewingangle)
								renderHelper.drawText(str,xstart,ystart,1,col,'left','top')

								tmp = this.lookat
								x	= tmp.X(), y = tmp.Y(), z = tmp.Z() ,w = tmp.W() ;
			
								str = string.format("lookx,look,lookz = %.4f,%.4f,%.4f",x,y,z)

								renderHelper.drawText(str,xstart,ystart+1*fh,1,col,'left','top')
								renderHelper.drawText("Transform :=",xstart,ystart+3*fh,1,col,'left','top')

								for (var row = 1 ; row <= 4 ; row++)
								{
									tmp = Matrix44.GetRow(this.rotMatrix,row)
									x	= tmp.X(), y = tmp.Y(), z = tmp.Z() ,w = tmp.W() ;

									renderHelper.drawText("|",xstart,ystart + (row + 3)*fh,1,col,'left','top')
									renderHelper.drawText(string.format("%.4f",x),xstart+maxwidth,ystart + (row + 3)*fh,1,col,'left','top')
									renderHelper.drawText(string.format("%.4f",y),xstart+maxwidth*2,ystart + (row + 3)*fh,1,col,'left','top')
									renderHelper.drawText(string.format("%.4f",z),xstart+maxwidth*3,ystart + (row + 3)*fh,1,col,'left','top')
									renderHelper.drawText(string.format("%.4f",w),xstart+maxwidth*4,ystart + (row + 3)*fh,1,col,'left','top')
									renderHelper.drawText("|",xstart+maxwidth*5,ystart + (row + 3)*fh,1,col,'left','top')
				
								}
			
							}
						}
	
}
