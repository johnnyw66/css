// Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt


function _3DPolygon(arrayOf3DEdges,radius,colour)
{

	this.x				=	0 ;
	this.y				=	0 ;
	this.z				=	0 ;
	this.scale			=	1 ;
	this.radius			=	radius || 0 ;
	this.edges			=	arrayOf3DEdges ;
	this.normal			=	Vector4.Create() ;
	this.midpoint 		= 	Vector4.Create() ;
	this.colour			=	colour ||  [_3DPolygon.DEFAULTCOLOUR[0],_3DPolygon.DEFAULTCOLOUR[1],_3DPolygon.DEFAULTCOLOUR[2]] ;
	this.title			=	" " ;
	this.className		=	_3DPolygon.className ;

	this.Init() ;
}
									
_3DPolygon.className				=	"_3DPolygon"
_3DPolygon.DEFAULTCOLOUR			=	[255,0,0] ;
_3DPolygon.RADIUSCOLOUR				=	[64,64,64] ;
_3DPolygon.COLLIDECOLOUR			=	[255,0,255] ;
_3DPolygon.NORMALCOLOUR				=	[255,255,0] ;
_3DPolygon.NORMALRENDERLENGTH		=	2

_3DPolygon.DEFAULTCOLLISIONRADIUS	=	20
	
_3DPolygon.Create 					= 	function(arrayOf3DEdges,radius,colour)
										{
											return new _3DPolygon(arrayOf3DEdges,radius,colour) ;
										} ;



_3DPolygon.prototype	=

{
constructor:		_3DPolygon,
	
Init:			function()
				{
					this.defaultcolour = this.GetColour() ;
				//	this.CalcEdgeNormals() ;
					this.CalcFaceNormal() ;
					this.CalcMidPoint() ;
				},

CalcFaceNormal:	function()
				{

					var edge1 = this.edges[0] ; 
					var edge2 = this.edges[1] ;
					Vector4.Cross(this.normal,edge2.vector,edge1.vector) ;
					this.normal.Normalise3() ;
				},

CalcMidPoint:	function()
				{
					this.midpoint.SetXyzw(0,0,0,0) ;
						
					for (var edgeidx  in this.edges) 
					{
						var edge = this.edges[edgeidx] ;
						this.midpoint.Add(this.midpoint,edge.startpoint) ;
					}
					this.midpoint.Multiply(this.midpoint,1/this.edges.length)
				},

GetTriangles:	function()
				{
					var edge1 = this.edges[0] ; 
					var edge2 = this.edges[1] ;
					var edge3 = this.edges[2] ;
					return [new _3DTriangle(edge1.startpoint,edge2.startpoint,edge3.startpoint,this.normal)] ;
				},
				
				// TODO Check if this Static?
GetFaceNormal:	function()
				{
					return this.normal ;
				},

SetTitle:		function(title)
				{
					this.title	=	title ;
				},

SetScale:		function(scale)
				{
					this.scale	=	scale || 1 ;
				},

				// Create new table - Don't do this with release code!
GetColour:		function()
				{
					var colour = this.colour  ;
					return [colour[0],colour[1],colour[2]] ;
				},

SetColour:		function(colour)
				{
					// Don't share 'em - Create a new colour table
					this.colour = [colour[0],colour[1],colour[2]] ;
				},

				// We want to use this for testing - (rotating _3dpolygon around a fixed point)
Clone:			function()
				{
					var edges = [] ;
					// clone points table
					for (var i in this.edges)
					{
						var edge	=	this.edges[i] ;
						edges.push(edge.Clone()) ;
					}

					var poly = _3DPolygon.Create(edges,this.radius,this.colour) ;
					poly.x	=	this.x ;
					poly.y	=	this.y ;
					poly.z	=	this.z ;
					return poly ;
				},

SetPosition:	function(x,y,z)
				{
					this.x	=	x ;
					this.y	=	y ;
					this.z	=	z || 0 ;
				},


Render:			function(renderHelper)
				{

				},


isColliding:	function(otherpoly)
				{
					return false ;
				},

unitTest:		function()
				{

				},
	
	
}
