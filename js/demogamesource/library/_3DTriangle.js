//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function _3DTriangle(startpoint,midpoint,endpoint,normal)  
{
	this.startpoint		=	Vector4.Create(startpoint) ;
	this.midpoint		=	Vector4.Create(midpoint) ; 
	this.endpoint		=	Vector4.Create(endpoint) ; 

	this.normal			=	Vector4.Create(normal) ;
	this.vector			=	Vector4.Create() ;
	this.className		=	_3DTriangle.className  ;
	this.Init() ;
}

_3DTriangle.className 	=	"_3DTriangle" ;

_3DTriangle.Create	=	function(startpoint,midpoint,endpoint)
{
	return new _3DTriangle(startpoint,midpoint,endpoint)  ;
}


_3DTriangle.prototype	=
{
	constructor:		_3DTriangle,
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
							var	newtri	=	_3DTriangle.Create(this.startpoint,this.endpoint) ;
							newtri.SetNormal(this.normal)
							return newtri ;
						},

	PointBehindEdge:	function(point)
						{
							// TODO Work out mid surface point of triangle, and use this.
							var v =	Vector4.Create(point) ;
							v.Subtract(this.startpoint) ;   
							return Vector4.Dot(v,this.normal) ;
						}
						
}
	
	
