//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt


function _3DEntity(_3dmodel)
{
	this.model			=	_3dmodel  ;
	this.scale			=	1  ;
	this.position		=	Vector4.Create() ;
	this.rotation		=	Vector4.Create() ;
	this.transMatrix	=	Matrix44.Create() ;
	this.className		=	_3DEntity.className ;
	this.Init() ;
}

_3DEntity.className			=	"_3DEntity"
_3DEntity.Create			=	function(_3dmodel)
								{
									return new _3DEntity(_3dmodel) ;
								} ;
								
_3DEntity.prototype	=	
{
	_3DEntity:					constructor,

	Init:						function() 
								{
									this.BuildTransformationMatrix() ;
								},

	Clone:						function() 
								{
									var ent	=	new _3DEntity(this.model)
									ent.SetPosition(Vector4.Create(this.GetPosition())) ;
									ent.SetRotation(Vector4.Create(this.GetPosition())) ;
 									return ent ;
								},

	SetModel:					function(model)
								{
									this.model = model ;
								},
	
	GetPosition:				function()
								{
									return this.position ;
								},
	
	GetRotation:				function()
								{
									return this.rotation ;
								},

	SetPosition:				function(position)
								{
									this.position.SetXyzw(position.X(),position.Y(),position.Z(),0) ;
									this.BuildTransformationMatrix() ;
									return this ;
								},
	
	SetRotation:				function(rotation)
								{
									this.rotation.SetXyzw(rotation.X(),rotation.Y(),rotation.Z(),0) ;
									this.BuildTransformationMatrix() ;
									return this ;
								},
	
	BuildTransformationMatrix:	function()
								{
									var rotation 		=	this.rotation ;
									var position 		=	this.position ;
									var matrix			=	Matrix44.Create()

									this.transMatrix 	= 	matrix ;

									var rx = rotation.X(), ry = rotation.Y(), rz = rotation.Z() ;
									var px = position.X(), py = position.Y(), pz = position.Z() ;
									matrix.SetRotationXyz(rx,ry,rz,MATRIX_REPLACE) ;
									matrix.SetTranslation(pz,py,px,MATRIX_POSTMULTIPLY) ;
									
								},
	
	toString:					function()
								{
									return "_3DEntity.toString" ;
								},

	Render:						function(renderHelper,camera)
								{
									this.model.Render(renderHelper,camera,this.transMatrix,this.position,this.rotation) ;
								},

	RenderDebug:				function(renderHelper,x,y)
								{
									var r1	=	this.transMatrix.GetRow(1) ;
									var r2	=	this.transMatrix.GetRow(2) ;
									var r3	=	this.transMatrix.GetRow(3) ;
									var r4	=	this.transMatrix.GetRow(4) ;
									renderHelper.drawText("r1 "+r1,x,y) ;
									renderHelper.drawText("r2 "+r2,x,y+20) ;
									renderHelper.drawText("r3 "+r3,x,y+40) ;
									renderHelper.drawText("r4 "+r4,x,y+60) ;
								}

}
