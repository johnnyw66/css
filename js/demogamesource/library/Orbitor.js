// Needs Spline.js library
// Used to move round a fixed Spline Path 

function Orbitor(bezRelTable,dwidth,dheight,angle)
{
	
	var rangle	=	(angle || 0)*Math.PI/180 ;
	
	var dBez = {	type:			'bezier', 
					nodes:			new Array(), 
					primitiveType:	'path', 
					closed:			false 
				} ;
						
	var k1 = 1.0,k2 = 1.0 ;
						
	var mapWidth = dwidth*k1,mapHeight	=	dheight*k2 ;
	var cos		=	Math.cos(rangle) ;
	var sin		=	Math.sin(rangle) ;
	

	for (var bzIndex in bezRelTable) 
	{
		var bez	=	bezRelTable[bzIndex] ;
		var bz	=	[] ;
				
		for (var ptIndex in bez) 
		{
			var rtPoint =	bez[ptIndex] ;
			var rx		=	rtPoint.x*mapWidth-mapWidth*0.5, ry = rtPoint.y*mapHeight-mapHeight*0.5 ;
			var	tx		=	rx*cos - ry*sin + mapWidth*0.5
			var	ty		=	rx*sin + ry*cos + mapHeight*0.5
			
			bz.push({x:tx, y:ty}) ;
		}
		dBez.nodes.push(bz) ;
	}
				
	this.path				=	Spline.Create(dBez) ;
	this.totalPathLength	=	this.path.GetTotalLength() ;
	this.tValue				=	0	;
	this.back				=	false ;
	this.tSpeed 			=	256	;
	this.speedConst			=	this.path && this.totalPathLength || 1 ;
	this.speedFact			=	this.tSpeed/this.speedConst ;	
	this.time				=	0 ;
	this.x					=	0 ;
	this.y					=	0 ;
	this.vpos				=	new Vector2() ;
	
}

Orbitor.prototype	=		
{
		GetPosition:	function()
						{
								return {_x: this.x, _y:this.y, _z:0}
						},
		Update:			function(dt)
						{
							this.time = this.time + dt 

							this.tValue	=	this.tValue + dt*this.speedFact	

							if (this.tValue > 1) 
							{
								this.tValue = 0
								if (!this.path.IsClosed()) 
								{
									this.back	 = !this.back
								}
							}
							this.path.CalcPosition(this.vpos,this.tValue,this.back)

							this.x		=	this.vpos.x
							this.y		=	this.vpos.y

						},
						
		CameraUpdate:	function(dt)
						{
							this.Update(dt) ;
						},

		Render:			function(rHelper)
						{
							var oldval		=	this.path.debug ;
							this.path.debug =	true ;
							this.path.Render(rHelper) ;
							this.path.debug = 	oldval ;
							
						}
						
}


