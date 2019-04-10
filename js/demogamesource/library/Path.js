//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

var tmpV			=	Vector4.Create() ;

function dprint()
{
	
}

function Path(primitive)
{
	var nodes		=	primitive.nodes  ;
	var closed		=	primitive.closed ;
	var lastV		=	null ;
	var totalLen 	=	0 ;
	var sections	=	new Array() ;

	this.type		=	primitive.type
	this.className 	= 	Path.className ;
	this.closed		=	closed ;
	this.primitive	=	primitive ;		// TODO NOT NEEDED! REMOVE ON RELEASE!!!

	for (var nodeIndex = 0 ; nodes && nodeIndex < nodes.length ; nodeIndex++)
	{
		var node	=	nodes[nodeIndex] ;
		var v 		=	Vector4.Create(node.x,node.y) ;
		
		if (lastV) 
		{
			tmpV.Subtract(v,lastV) ;

			var len		=	Vector4.Length3(tmpV) ;
			
			totalLen	=	totalLen + len ;
			
			var dV		=	Vector4.Create(tmpV) ;
			dV.Normalise3() ;
			
			sections.push({pathVector:dV, length:len, position:lastV, accumlen:totalLen}) ;
		}

		lastV   = v ;
		
	}


	if (closed) 
	{
		var lv			=	nodes[nodes.length - 1]
		var fv			=	nodes[0]
		var position	=	Vector4.Create(lv.x,lv.y)

		tmpV.Subtract(Vector4.Create(fv.x,fv.y),position)

		var len			=	Vector4.Length3(tmpV)
		totalLen 		=	totalLen + len
		
		var dV			=	Vector4.Create(tmpV)

		dV.Normalise3()
		sections.push({pathVector:dV, length:len, position:position, accumlen:totalLen})
		
	}
	

	this.sections 		=	sections ;
	this.totalLength	=	totalLen ;
	
}

Path.className		=	"Path" ;
Path.debug			=	true ;

Path.Create			=	function(primitive)
						{
							return new Path(primitive) ;
						}


Path.prototype =
{
	constructor:		Path,
	
	IsClosed:			function()
						{
							return this.closed
						},

	GetTotalLength:		function()
						{
							return this.totalLength ;
						},


	Debug:				function()
						{
							var sections	=	this.sections ;
							var tLen		=	this.totalLength ;
							var isCls		=	this.closed ? 'closed' : 'not closed' ;
							dprint("Path.Debug",isCls,
								" total Len",tLen,
								"Number of Sections = ",sections.length) ;
	
							for (var secIdx = 0 ; secIdx < sections.length ; secIdx++)
							{
								var section	=	sections[secIdx] ;
								
								dprint("Section ",secIdx," Direction Vector ",section.pathVector.toString(),
										" length = ",section.length, 
										" Position Vector ",section.position.toString()) ;
							}
						},


							// tValue from 0 to 1

	CalcPosition:		function(vector,tValue,fromEnd)
						{
							var rtValue				=	(fromEnd ? (1-tValue) : tValue) ;
							var lengthTravelled		=	rtValue*this.totalLength ;
							var sections			=	this.sections ;
	
							for (var secIdx = 0 ; secIdx < sections.length ; secIdx++)
							{
								var section	=	sections[secIdx] ;

								if (lengthTravelled <= section.accumlen)  
								{
									// found section, now calculate how far 'in' we are on that section (0 = @start 1 = @})
									var lt = 1 - (section.accumlen - lengthTravelled)/section.length ;
				
									// new position =  section.position + lt*section.pathVector 
									vector.Multiply(section.pathVector,lt*section.length) ;
									vector.Add(vector,section.position) ;
									return ;
								}

							}
	
						},

						// Calculate Path tValue from DAME segmentID and DAME t value

	FindPathTValue:		function(segmentID,tValue)
						{
						//	assert(this.className == Path.className,'Path object Mismatch '+this.className)

							var sections			=	this.sections  ;
							var section				=	sections[segmentID]	;	// segmentID is 0 based
							var lenTravelled 		=	section.accumlen + (tValue-1)*section.length ;
							return lenTravelled/this.totalLength ;
						},

	_RenderDebug:		function(rHelper)
						{

							var sections = this.sections ;
							for (var secIdx = 0 ; secIdx < sections.length ; secIdx++)
							{
								var section	=	sections[secIdx] ;
								var pv		=	section.pathVector ;
								var plen	=	section.length ;
								tmpV.Multiply(section.pathVector,section.length) ;
								tmpV.Add(tmpV,section.position) ;
							//	alert("Section "+secIdx+"Draw From "+section.position+" to "+tmpV.X()+","+tmpV.Y()) ;
								
								rHelper.drawLine(section.position.X(),section.position.Y(),tmpV.X(),tmpV.Y(),[255,0,0,120]) ;

							}
						},


	Render:			function(rHelper)
					{
						if (Path.debug) 
						{
							this._RenderDebug(rHelper) ;
						}
					},

}


function PathManager() {}

PathManager.paths	=	new Array() ;

PathManager.Init		=	function(patharray)
							{
								PathManager.paths		=	new Array() ;
								if (patharray)
								{
									for (var idx = 0 ; idx < patharray.length ; idx++)
									{
										PathManager.Add(new Path(patharray[idx])) ;
									}
									
								}
							}

PathManager.Add		=	function(path)
						{
							var id		=	 PathManager.paths.length ;
							PathManager.paths.push(path) ;
							return id ;
						}

PathManager.GetPath	=	function(id)
						{
							return PathManager.paths[id] ;
						}

PathManager.Iterator	=	function()
							{
								var idx = 0 ;
														
								return {	HasElements:	function()	{ return (idx < PathManager.paths.length) ; },
											Reset: 			function() 	{ idx = 0 ; }, 
											Next: 			function()	{ idx++ ; }, 
											GetElement: 	function()	{return PathManager.paths[idx] ;} 
											
										} ;
							}

PathManager.Clear		=	function()
							{
								PathManager.paths	=	new Array() ;
							}

PathManager.Render		=	function(rHelper)
							{

								for (var idx = 0 ; idx < PathManager.paths.length ; idx++)
								{
									var path = PathManager.paths[idx] ;
									path.Render(rHelper) ;

								}
							}
							
PathManager.Test		=	function()
							{
								PathManager.Clear() ;
								PathManager.Add(new Path("Path1")) ;
								PathManager.Add(new Path("Path2")) ;
								PathManager.Add(new Path("Path3")) ;
								PathManager.Add(new Path("Path4")) ;
								for (var it = PathManager.Iterator(); it.HasElements() ; it.Next())
								{
									alert(it.GetElement().primitive) ;
								}
							}


