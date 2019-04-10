//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt
var	tempV						=	Vector4.Create() ;
var	zeroVector					=	Vector4.Create(0,0,0,0) ;

function Line2D( startpoint,  endpoint)
{
	this.startpoint		=	startpoint ;
	this.endpoint		=	endpoint ;
	this.direction		=	Vector4.Create() ;
	this.unit			=	Vector4.Create() ;
	this.className		=	Line2D.className ;
	this.CalculateCentreAndRadius() ;
} 

Line2D.className					=	"Line2D" ;


Line2D.Create		=	function(startpoint, endpoint)
{
	return new Line2D(startpoint, endpoint) ;
}

Line2D.Intersects	=	function(line1,line2,intPt)
{
	var	intersectionPoint = intPt || Vector4.Create() ;
	var res	= Vector4.Calculate2dLineIntersection(intersectionPoint,  line1.startpoint,  line1.endpoint,  line2.startpoint,  line2.endpoint,  false ) ;
	return (res.collide) ;
}

Line2D.prototype = 
{
	constructor:				Line2D,

	SetPoints:					function(startpoint,endpoint)
								{
									this.startpoint.SetXyzw(startpoint.X(),startpoint.Y(),0,0) ;
									this.endpoint.SetXyzw(endpoint.X(),endpoint.Y(),0,0) ;
									this.CalculateCentreAndRadius() ;
								},
	
	CalculateCentreAndRadius:	function()
								{
									Vector4.Subtract(this.direction,this.endpoint,this.startpoint)
									this.length 	=	Vector4.Length2(this.direction) ;
									this.radius		=	this.length / 2 ;
									this.unit		=	this.length === 0 ? zeroVector : Vector4.Normal2(this.direction) ;
									this.midpoint	=	Vector4.Create() ;
									Vector4.Multiply(this.midpoint,this.unit,this.radius) ;
									Vector4.Add(this.midpoint,this.midpoint,this.startpoint) ;
		
								},


	Normalise:					function(v,scale)
								{
									var vt		=	v || Vector4.Create() ;
									var sscale	=	 scale || 1 ;
									Vector4.Subtract(vt,this.endpoint,this.startpoint) ;
									Vector4.Normalise2(vt) ;
									vt.Multiply(vt,sscale) ;	
									return vt ;
								},
	Render:						function(renderHelper)
								{
									this.RenderDebug(renderHelper) ;
								},

	RenderDebug:				function(renderHelper)
								{
									renderHelper.drawCircle(this.startpoint.X(),this.startpoint.Y(),4,[255, 0, 0]) ;
									renderHelper.drawCircle(this.midpoint.X(),this.midpoint.Y(),4, [0, 255, 0]) ;
									renderHelper.drawCircle(this.endpoint.X(),this.endpoint.Y(),4, [0, 0, 255]) ;

									renderHelper.drawLine(
											this.startpoint.X(),this.startpoint.Y(),
											this.endpoint.X(),this.endpoint.Y()) ;
									
									
								},

	toString:					function()
								{
									return Line2D.className ;
								}
	
}
