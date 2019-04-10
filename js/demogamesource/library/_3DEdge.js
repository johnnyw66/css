//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function _3DEdge(startpoint,endpoint)  
{
	this.startpoint		=	Vector4.Create(startpoint) ;
	this.endpoint		=	Vector4.Create(endpoint) ; 
	this.normal			=	Vector4.Create() ;
	this.vector			=	Vector4.Create() ;
	this.className		=	_3DEdge.className  ;
	this.Init() ;
}

_3DEdge.className 	=	"_3DEdge" ;

_3DEdge.Create	=	function(startpoint,endpoint)
{
	return new _3DEdge(startpoint,endpoint)  ;
}


_3DEdge.prototype	=
{
	constructor:		_3DEdge,
	Init:				function()
						{
							this.vector.Subtract(this.endpoint,this.startpoint) ;
						},
	
	SetNormal:			function(normal)
						{
							this.normal.SetXyzw(normal.X(),normal.Y(),normal.Z(),0)
						},
	
	Clone:				function()
						{
							var	newedge	=	_3DEdge.Create(this.startpoint,this.endpoint) ;
							newedge.SetNormal(this.normal)
							return newedge ;
						},

	PointBehindEdge:	function(point)
						{
							var v =	Vector4.Create(point) ;
							v.Subtract(this.startpoint) ;   
							return Vector4.Dot(v,this.normal) ;
						}
						
}
	
	
