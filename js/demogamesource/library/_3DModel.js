//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

var s2d						=	Vector4.Create(), m2d= Vector4.Create(), e2d = Vector4.Create() ;
var	filledInTriangles		=	true ;
var normalLightSource		=	Vector4.Create(1,0,1).Normal3() ;
var lightColour				=	Vector4.Create(1,0,0) ;
var LIGHTCOLOURRED			=	parseInt(lightColour.X()*255) ;
var LIGHTCOLOURGREEN		=	parseInt(lightColour.Y()*255) ;
var LIGHTCOLOURBLUE			=	parseInt(lightColour.Z()*255) ;

function _3DModel(arrayOf3DPolys,radius)
{

		this.polys				=	arrayOf3DPolys ;
		this.CullBackPlane		=	false ;
		this.ShowNormals		=	false ;
		this.className			=	_3DModel.className	;
		this.Init() ;
}

_3DModel.CullBackPlane	=	false ;
_3DModel.ShowNormals	=	false ;
_3DModel.className		=	"_3DModel" ;

_3DModel.Create			=	function(arrayOf3DPolys,radius)
							{
								return new _3DModel(arrayOf3DPolys,radius) ;
							} ;
								
_3DModel.CreateFloor	=	function(width,length,unitsize,yoffset,xoffset,zoffset)
							{
								var wd2		= 	unitsize/2 ;
								var ld2		=	unitsize/2 ;
								var yoff	=	yoffset || 0 ;
								var polys 	=	[] ;
								var radius	=	unitsize*Math.sqrt(2) ;

								for (var xcell = 1 ; xcell <= width ; xcell++)
								{
									for (var zcell = 1 ; zcell <= length ; zcell++)
									{

										var x		=	unitsize * (xcell - (width/2)) + (xoffset || 0) ;
										var z		=	unitsize * (zcell - (length/2)) + (zoffset || 0) ;
										var edges 	=	[] ;
	
										var unitFloorFace = 
										[
									 			[-wd2+x,yoff,-ld2+z],[wd2+x,yoff,-ld2+z],[wd2+x,yoff,ld2+z],[-wd2+x,yoff,ld2+z],

										]

											for (var idx = 0 ; idx < unitFloorFace.length ; idx++)
											{
												var starttuple	= unitFloorFace[idx] ;
												var endtuple	= unitFloorFace[idx+1] || unitFloorFace[0] ;
												var st 			= Vector4.Create(starttuple[0],starttuple[1],starttuple[2],0) ;
												var et 			= Vector4.Create(endtuple[0],endtuple[1],endtuple[2],0) ;
												var edge 		= _3DEdge.Create(st,et) ;

												edges.push(edge) ;
											}
											var poly = _3DPolygon.Create(edges,radius)
											polys.push(poly) ;
		
									}
								}

								return _3DModel.Create(polys,math.sqrt(width*width + length*length))

							} ;

	
_3DModel.CreateCuboidModel	=	function(width,height,length)
								{
										var wd2		= width/2 ;
										var hd2		= height/2 ;
										var ld2		= length/2 ;
			
										var radius	= Math.sqrt(wd2*wd2 + hd2*hd2 + ld2*ld2) ;
	
										var frontFace = 
										[
										 	[-wd2,hd2,ld2],[wd2,hd2,ld2],[wd2,-hd2,ld2],[-wd2,-hd2,ld2],
										] ;

										var backFace = [
											[wd2,hd2,-ld2],[-wd2,hd2,-ld2],[-wd2,-hd2,-ld2],[wd2,-hd2,-ld2],
										] ;
	
										var rightFace = 
										[
											[wd2,-hd2,-ld2],[wd2,-hd2,ld2],[wd2,hd2,ld2],[wd2,hd2,-ld2]
										] ;
		
										var leftFace = 
										[
											[-wd2,hd2,-ld2],[-wd2,hd2,ld2],[-wd2,-hd2,ld2],[-wd2,-hd2,-ld2]
										] ;



										var topFace = 
										[
											[-wd2,hd2,-ld2],[wd2,hd2,-ld2],[wd2,hd2,ld2],[-wd2,hd2,ld2]
										] ;

										var bottomFace = [
											[wd2,-hd2,-ld2],[-wd2,-hd2,-ld2],[-wd2,-hd2,ld2],[wd2,-hd2,ld2]
										] ;
		
	
										var facedefs =		
										[
														frontFace,
														backFace,
														rightFace,
														leftFace,
														topFace,
														bottomFace	
										]	;	


										var polys = [] ;

										for (var fidx = 0 ; fidx < facedefs.length ; fidx++) 
										{
											var facedef		=	facedefs[fidx] ;
											var firsttuple	=	facedef[0]
											var edges 		=	[]

											for (var idx = 0 ; idx < facedef.length ; idx++)
											{
												var starttuple	=	facedef[idx] ;
												var endtuple 	=	facedef[idx+1] || facedef[0] ;
												var st 			=	Vector4.Create(starttuple[0],starttuple[1],starttuple[2],0) ;
												var et 			=	Vector4.Create(endtuple[0],endtuple[1],endtuple[2],0) ;
												var edge 		=	_3DEdge.Create(st,et) ;
												edges.push(edge) ;
											}
			
											var poly = _3DPolygon.Create(edges,10)	//TODO Place Correct Polygon Radius
											polys.push(poly) ;
								 		}
										return _3DModel.Create(polys,radius) ;
								} ;


_3DModel.CreateDoDeca		=	function(radius)
								{
								 	var gr	=	( 1.0 + Math.sqrt(5.0) ) / 2.0 ;
								 	var h	=	radius / Math.sqrt( 1.0 + gr * gr ) ;

								 	var v = 
								 	[

								   			[ 0,-h,h*gr ], [ 0,-h,-h*gr ], [ 0,h,-h*gr ], [ 0,h,h*gr ],
								   			[ h,-h*gr,0 ], [ h,h*gr,0 ], [ -h,h*gr,0 ], [ -h,-h*gr,0 ],
								   			[ -h*gr,0,h ], [ -h*gr,0,-h ], [ h*gr,0,-h ], [ h*gr,0,h ]
								   	] ; 



									var polys = new Array() ;

									_drawTriangle(polys, v[0], v[7],v[4]) ;
									_drawTriangle(polys, v[0], v[4], v[11]) ; 
									_drawTriangle(polys, v[0], v[11], v[3]) ;
									_drawTriangle(polys, v[0], v[3], v[8]) ;
									_drawTriangle(polys, v[0], v[8], v[7]) ;

									_drawTriangle(polys, v[1], v[4], v[7]) ;
									_drawTriangle(polys, v[1], v[10], v[4]) ;
									_drawTriangle(polys, v[10], v[11], v[4]) ;
									_drawTriangle(polys, v[11], v[5], v[10]) ;
									_drawTriangle(polys, v[5], v[3], v[11]) ;

									_drawTriangle(polys, v[3], v[6], v[5]) ;
									_drawTriangle(polys, v[6], v[8], v[3]) ;
									_drawTriangle(polys, v[8], v[9], v[6]) ;
									_drawTriangle(polys, v[9], v[7], v[8]) ;
									_drawTriangle(polys, v[7], v[1], v[9]) ;

									_drawTriangle(polys, v[2], v[1], v[9]) ;
									_drawTriangle(polys, v[2], v[10], v[1]) ;
									_drawTriangle(polys, v[2], v[5], v[10]) ;
									_drawTriangle(polys, v[2], v[6], v[5]) ;
									_drawTriangle(polys, v[2], v[9], v[6]) ;

									return _3DModel.Create(polys,radius);
								} ;


_3DModel.CreateFromStl		=	function(data)
{
	
	var polys = new Array() ;
	for (idx in data)
	{
		v	=	data[idx] ;
		_drawTriangle(polys, [v[0].x, v[0].y, v[0].z],[v[1].x, v[1].y, v[1].z],[v[2].x, v[2].y, v[2].z] ) ;
	}
	return _3DModel.Create(polys,100);
	
} ;

function _drawTriangle(polys,v1,v2,v3)
{
	
	var edges	=	[] ;
	
	var sp 		=	Vector4.Create(v1[0],v1[1],v1[2],0) ;
	var mp 		=	Vector4.Create(v2[0],v2[1],v2[2],0) ;
	var ep 		=	Vector4.Create(v3[0],v3[1],v3[2],0) ;

	edges.push(_3DEdge.Create(sp,mp)) ;
	edges.push(_3DEdge.Create(mp,ep)) ;
	edges.push(_3DEdge.Create(ep,sp)) ;

	var	poly	=	_3DPolygon.Create(edges,10)		//TODO Place Correct Polygon Radius

	polys.push(poly) ;

}

var makeLightComp	=	function(v)
{
	return Math.max(0,parseInt(v)) ;
}
	
_3DModel.prototype 	=
{
	constructor:	_3DModel,
		
	Init:			function()
					{
	
					},

	Render:			function(renderHelper,camera,transMatrix)
					{
						
						var polys		=	this.polys ;
						var translate	=	transMatrix.GetRow(4) ;
						for (var polyidx in polys)
						{
							var poly			=	polys[polyidx] ;
							var polynormal		= 	Vector4.Create(poly.normal) ;
							Vector4.TransformPoint(polynormal,transMatrix,polynormal) ;

							var polymidpoint	=	Vector4.Create(poly.midpoint) ;
							
							Vector4.TransformPoint(polymidpoint,transMatrix,polymidpoint) ;
							Vector4.Add(polymidpoint,translate,polymidpoint) ;

							var cpos 			=	Vector4.Create(polymidpoint) ;

							Vector4.Subtract(cpos,cpos,camera.GetPosition()) ;
							cpos.Normalise3() ;

							var dp				=	Vector4.Dot3(cpos,polynormal) ;
						
							if ((false && (dp <= 0))|| (_3DModel.ShowNormals && (dp <= 0))) 
							{
								var ptip2d	=	Vector4.Create() ;
								var pmp2d	=	Vector4.Create() ;	
								var scf 	= 	1 ;

								camera._3DPointto2D(pmp2d,polymidpoint) ;
								renderHelper.drawCircle(pmp2d.X(),pmp2d.Y(),2) ;
								Vector4.Multiply(polynormal,polynormal,1.5*scf) ;
								Vector4.Add(polynormal,polynormal,polymidpoint) ;
								camera._3DPointto2D(ptip2d,polynormal) ;
								renderHelper.drawLine(pmp2d.X(),pmp2d.Y(),ptip2d.X(),ptip2d.Y())
							}
			
							var backCull	=	true ;
							if (!backCull || (dp <= 0))
							{
				
								if (filledInTriangles) 
								{
									var polytriangles = poly.GetTriangles() ;
									for (var triangleidx in polytriangles) 
									{
										var triangle	=	polytriangles[triangleidx] ;
									//	var triNorm		=	triangle.normal ;
										
										var sV = Vector4.Create(triangle.startpoint) ;
										var mV = Vector4.Create(triangle.midpoint) ;
										var eV = Vector4.Create(triangle.endpoint) ;
										//Transform entity
										Vector4.TransformPoint(sV,transMatrix,sV) ;
										Vector4.TransformPoint(mV,transMatrix,mV) ;
										Vector4.TransformPoint(eV,transMatrix,eV) ;

										Vector4.Add(sV,translate,sV) ;
										Vector4.Add(mV,translate,mV) ;
										Vector4.Add(eV,translate,eV) ;
										
										camera._3DPointto2D(s2d,sV) ;
										camera._3DPointto2D(m2d,mV) ;
										camera._3DPointto2D(e2d,eV) ;
									
										renderHelper.drawLine(s2d.X(),s2d.Y(),m2d.X(),m2d.Y()) ;
										renderHelper.drawLine(m2d.X(),m2d.Y(),e2d.X(),e2d.Y()) ;
										renderHelper.drawLine(e2d.X(),e2d.Y(),s2d.X(),s2d.Y()) ;
										
										var z =  Vector4.Dot3(polynormal,normalLightSource) ;
										// should be 3 normals here - average of normals from other shared vector points.
										
										renderHelper.drawTriangle(s2d.X(),s2d.Y(),m2d.X(),m2d.Y(),e2d.X(),e2d.Y(),[makeLightComp(z*LIGHTCOLOURRED),makeLightComp(z*LIGHTCOLOURGREEN),makeLightComp(z*LIGHTCOLOURBLUE)],1) ;
									}
											
									
								} else
								{
									var polyedges	=	poly.edges ;
									
									for (var edgeidx in polyedges) 
									{
										var edge	=	polyedges[edgeidx] ;
										//assert(edge.className == _3DEdge.className,'EDGE WRONG CLASS')
					
										var sV = Vector4.Create(edge.startpoint)
										var eV = Vector4.Create(edge.endpoint)
				
										//Transform entity
										Vector4.TransformPoint(sV,transMatrix,sV)
										Vector4.TransformPoint(eV,transMatrix,eV)

										Vector4.Add(sV,translate,sV)
										Vector4.Add(eV,translate,eV)

										camera._3DPointto2D(s2d,sV)
										camera._3DPointto2D(e2d,eV)
										renderHelper.drawLine(s2d.X(),s2d.Y(),e2d.X(),e2d.Y())
									}
								}
							}
			
						} // next poly 
					},

	toString:		function()
					{
						return "_3DModel.toString" ;
					}
	

	
}
		
