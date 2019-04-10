//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

var	QuadHotspotDEFAULTDEPTH		=	0.125
var	QuadHotspotclassName		=	"QuadHotspot"
	
function QuadHotspot(quads,depth,name,debug)
{
	this.quads		=	quads ;
	this.name		=	name || "NONAME" ;
	this.depth		=	depth || QuadHotspotDEFAULTDEPTH ;
	this.className	=	QuadHotspotclassName ;
	this.debug		=	debug ;
	this._Init()
}
	
function stringformat()
{
	return arguments ;
}

function _subtractv(v1,v2)
{
	var answ = Vector4.Create()
	answ.Subtract(v1,v2)
	return answ ;
}

function _Dot2(v1,v2) {
	// Dot2 takes x && z components of 2 Vector4's to produce 2D dot product
	return v1.X()*v2.X() + v1.Z()*v2.Z() ;
}


QuadHotspot.Create =	function(quads,depth,name,debug)
{
	return new QuadHotspot(quads,depth,name,debug) ;
}
	// Build Regular QHS 

QuadHotspot.Build2DPoly	=	function(tx,tz,radius,phase,name,debug) 
{

		
	var polypoints	=	new Array() ;
	var points 		= 	4 ;
	var angle		=	2*Math.PI/points ;
	var qrtpi	 	=	2*Math.PI/4 ;
	for (var i=1 ; i <= points ; i++)
	{
		var x = radius*Math.cos(angle*(i-1)-qrtpi+(phase || 0)) ;
		var z = radius*Math.sin(angle*(i-1)-qrtpi+(phase || 0)) ;
		polypoints.push(Vector4.Create(tx+x,0,tz+z)) ;
	}
	var qhs = QuadHotspot.Create(polypoints,0.5,name,debug)
//		qhs.cenx,qhs.cenz	=	tx,tz
	return qhs
}

QuadHotspot.prototype = 
{

	constructor: QuadHotspot,
	
	_Init: function() {
		// Find Equation of plane - Normal

		// Make sure we have our own copies of vectors.
		var	quads		=	this.quads
		var	nquads		=	[Vector4.Create(quads[0]), Vector4.Create(quads[1]), Vector4.Create(quads[2]), Vector4.Create(quads[3])]
		this.quads	=	nquads
			
		// Work out normal to plane
		this.normal		=	Vector4.Create()
		this.Enormal1	=	Vector4.Create()
		this.Enormal2	=	Vector4.Create()
		this.Enormal3	=	Vector4.Create()
		this.Enormal4	=	Vector4.Create()

//		this.normal2	=	Vector4.Create()
//		this.normal3	=	Vector4.Create()
//		this.normal4	=	Vector4.Create()

		Vector4.Cross(this.normal,_subtractv(nquads[2], nquads[0]),_subtractv(nquads[1] , nquads[0]))
		Vector4.Normalize3(this.normal)
		
		this.D		=	-Vector4.Dot3(this.normal,nquads[0])	
		
		// Now recalculate Y coord of 4th point
		// Make all our points are on the same plane!

		var		rY		=	-(this.D + this.normal.X()*nquads[3].X() + this.normal.Z()*nquads[3].Z())/this.normal.Y()
		nquads[3].SetY(rY)	
		var eps	=	0.001
		
		assert(Math.abs(Vector4.Dot3(this.normal,nquads[0]) + this.D) <= eps,"SHOULD BE 0")
		assert(Math.abs(Vector4.Dot3(this.normal,nquads[1]) + this.D) <= eps,"SHOULD BE 0")
		assert(Math.abs(Vector4.Dot3(this.normal,nquads[2]) + this.D) <= eps,"SHOULD BE 0")
		assert(Math.abs(Vector4.Dot3(this.normal,nquads[3]) + this.D) <= eps,"SHOULD BE 0")

		// Calculate Edge Normals
		
		Vector4.Cross(this.Enormal1,this.normal,_subtractv(nquads[1] , nquads[0]))
		Vector4.Cross(this.Enormal2,this.normal,_subtractv(nquads[2] , nquads[1]))
		Vector4.Cross(this.Enormal3,this.normal,_subtractv(nquads[3] , nquads[2]))
		Vector4.Cross(this.Enormal4,this.normal,_subtractv(nquads[0] , nquads[3]))

		Vector4.Normalize3(this.Enormal1)
		Vector4.Normalize3(this.Enormal2)
		Vector4.Normalize3(this.Enormal3)
		Vector4.Normalize3(this.Enormal4)
		
		this.centre		=	this._GetCentre()

		assert(this.IsPointInside(Vector4.Create(this.centre.x,this.centre.y,this.centre.z)),'CENTRE NOT IN HOTSPOT - SEE A CODE DOCTOR')
		
		
	},
	


	
	_GetCentre: function(quadhotspot) 
	{

		var	quads		=	this.quads ;
		var x			=	0,y = 0, z = 0 ;
		for (var idx in quads) 
		{
			var v = quads[idx] ;
			x 	=	x + v.X()
			y 	=	y + v.Y()
			z 	=	z + v.Z()
		}
		return {x:x/4,y:y/4,z:z/4} ;
	},
	
//	function Polygon.BuildPolyIreg(radius,angles,colour) {
//
//		var polypoints = {}
//		var points = #angles 
//		var rad	=	Math.rad
//		for i=1,points do
//			var angle = rad(angles[i]-90)
//			var x = radius*Math.cos(angle)
//			var y = radius*Math.sin(angle)
//			table.insert(polypoints,{x = x,y = y})
//		}
//
//		var poly = Polygon.Create(polypoints,radius)
//		poly.radius = radius 
//		poly.colour	= colour || Polygon.DEFAULTCOLOUR
//		return poly
//	},
	
	
	SetName: function(name) {
		this.name	=	name
	},

	GetRawQuads: function(quadhotspot) {
		return this.quads
	},

	GetName: function(name) {
		return this.name
	},
	
	
	
	
	IsPointInside: function(point,somedepth) {
//		Logger.lprint("QuadHotspot.IsPointInside"..point:X()..","..point:Y()..","..point:Z())
		var dpth	=	somedepth || this.depth
		var quads	=	this.quads
		// Ignore Y! - becareful now - watch GC!!
		var v1	=	_Dot2(this.Enormal1,_subtractv(point,quads[0]))
		var v2	=	_Dot2(this.Enormal2,_subtractv(point,quads[1]))
		var v3	=	_Dot2(this.Enormal3,_subtractv(point,quads[2]))
		var v4	=	_Dot2(this.Enormal4,_subtractv(point,quads[3]))

		this.debug	=	{v1: v1, v2: v2, v3: v3, v4: v4, pdist: this.DistanceFromPlane(point)}
		//if ( (v1 < 0) && (v2 < 0) && (v3 < 0) && (v4 < 0) && this.DistanceFromPlane(point) <= dpth)
		//{
		//	console.log("INSIDE "+this.name)
		//}
		return (v1 < 0) && (v2 < 0) && (v3 < 0) && (v4 < 0) && this.DistanceFromPlane(point) <= dpth
	},
		
	DistanceFromPlane: function(point) 
	{ 
		return Math.abs(Vector4.Dot3(point,this.normal) + this.D) ;
	},

	RenderDebug: function(renderHelper,point,x,y) 
	{
		var	defaultCol		=	[255,255,0,64]
		var	insideCol		=	[255,0,0,255]	

		if (point) {
			var inside = this.IsPointInside(point)
			if (this.debug) {

				var dbg 	=	this.debug
				var col	=	inside && insideCol || defaultCol
				renderHelper.drawText(
					stringformat(
							this.GetName(),
							dbg.v1,
							dbg.v2,
							dbg.v3,
							dbg.v4,
							dbg.pdist),x,y,col,{horizontal:"left",vertical:"top"})
			}
		} else 
		{
			renderHelper.drawText(stringformat(this.GetName()),x,y,col,{horizontal:"left",vertical:"top"}) ;
		}
		
		
	},
	
	Render: function(renderHelper,col) 
	{
			this.Render2D(renderHelper,col)
		//	this.Render3D(renderHelper,col)
	},
	
	Render3D: function(renderHelper,col) 
	{
		assert(this.className && this.className == QuadHotspotclassName,'NOT A QUADHOTSPOT!')
		var dcol	=	col || Vector4.Create( 1, 0, 1, 1 )
		var qquad	=	this.GetRawQuads()
	//	Debug.DrawQuad3d(qquad[1],qquad[2],qquad[3],qquad[4],dcol,true)
	},


	Render2D: function(renderHelper,col) 
	{
		var dcol	=	col || [255,255,0,255]
		var qquad	=	this.GetRawQuads()
		
		var x1		=	qquad[0].X(),y1 = 	qquad[0].Z() ;
		var x2		=	qquad[1].X(),y2 = 	qquad[1].Z() ;
		var x3		=	qquad[2].X(),y3	=	qquad[2].Z() ;
		var x4		=	qquad[3].X(),y4=	qquad[3].Z() ;

		renderHelper.drawLine(x1,y1,x2,y2,dcol) ;
		renderHelper.drawLine(x2,y2,x3,y3,dcol) ;
		renderHelper.drawLine(x3,y3,x4,y4,dcol) ;
		renderHelper.drawLine(x4,y4,x1,y1,dcol) ;
		renderHelper.drawText(this.name,this.centre.x,this.centre.z) ;
		

	},
	
	toString: function()
			{
				return "QuadHotspot" ;
			}
}
