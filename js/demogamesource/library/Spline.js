//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function Spline(primitive)
{
	this.primitive	=	primitive ;
	this.type		=	'spline',
	this._Init(primitive) ;
}


Spline.Create = function(primitive)
{
	return new Spline(primitive) ;
}

Spline.prototype = 
{
	constructor: Spline,

	_Init: function(primitive)
			{
				if (primitive.type == 'spline') {
					alert('NOT DEFINED!!!!! SEE A CODE DOCTOR!') ;	 
					this._InitSpline(primitive)
				}
				else
				{
					this._InitBezier(primitive)
				}
			},


	_InitBezier: function(primitive)
			{
				var totalLen 	=	0
				var sections 	= 	new Array() ;
				var lastNode	=	null
				var nodes		=	primitive.nodes 
				var closed		=	primitive.closed

				this.type		=	primitive.type
				this.closed		=	closed ;
				
	
				var cp1,cp2,cp3,cp4 ;
	
				for ( var bezIndex in nodes ) 
				{

					var bez = nodes[bezIndex] ;
					
					if (!lastNode) 
					{
						cp1	=	bez[0] ;
						cp2	=	bez[1] ;
						cp3	=	bez[2] ;
						cp4	=	bez[3] ;
					}
					else
					{
						cp1	=	lastNode ;
						cp2	=	bez[0]  ;
						cp3	=	bez[1] ;
						cp4	=	bez[2] ;
					}


					lastNode	=	cp4
		
		
					// Create bez,bz 
					var bz = Bezier.Create( 
								Vector2.Create(cp1.x,cp1.y),  
								Vector2.Create(cp2.x,cp2.y), 
								Vector2.Create(cp3.x,cp3.y), 
								Vector2.Create(cp4.x,cp4.y)) ;

		
					var len = bz.getLength()

					totalLen = totalLen + len

					sections.push(
						{ 	splineVector: bz, 
							length: len, 
							accumlen: totalLen, 
							cp1: 	{ x: cp1.x, 	y: cp1.y}, 
						    cp2: 	{ x: cp4.x, 	y: cp4.y}, 
							cp1a: 	{ x: cp2.x,		y: cp2.y},
		 					cp2a: 	{ x: cp3.x,		y: cp3.y}
						}) ;


			} // for loop
			

			if (closed) 
			{
				var bez		=	nodes[0] ;
				cp1			=	cp4
				cp2			=	cp3
				cp3			=	bez[1]
				cp4			=	bez[0]

				var bz = Bezier.Create( 
								Vector2.Create(cp1.x,cp1.y),  
								Vector2.Create(cp2.x,cp2.y), 
								Vector2.Create(cp3.x,cp3.y), 
								Vector2.Create(cp4.x,cp4.y)) ;
		
				var len = bz.getLength()

				totalLen = totalLen + len

				sections.push(
					{ 	splineVector: bz, 
						length: len, 
						accumlen: totalLen, 
						cp1: 	{x: cp1.x, 	y: cp1.y}, 
					    cp2: 	{x: cp4.x, 	y: cp4.y}, 
						cp1a: 	{x: cp2.x,	y: cp2.y},
	 					cp2a: 	{x: cp3.x,	y: cp3.y}
					}) ;
		
//				table.insert(sections,{splineVector = bz, length = len, accumlen = totalLen, 
//					cp1  = {x = cp1.x, 	y = cp1.y}, 
//					cp2 =  {x = cp4.x, 	y = cp4.y}, 
//					cp1a = {x = cp2.x,	y = cp2.y},
//		 			cp2a = {x = cp3.x,	y = cp3.y}
//					})
		
			}	// if closed
	
			this.sections 		=	sections  ;
			this.totalLength	=	totalLen ;
		},
		
		

	_InitSpline: function(primitive)
		{
			// TODO - 
			
		},


	IsClosed: function()
		{
			return this.closed ;
		},


	GetTotalLength: function()
		{
			return this.totalLength ;
		},


	Debug: function()
		{	
			var	sections	=	spline.sections 
			var tLen		=	spline.totalLength
			var isCls		=	spline.closed && 'closed' || 'not closed' ;

			//print("Spline.Debug",isCls," total Len",tLen,"Number of Sections = ",#sections)

		//	for secIdx,section in pairs(sections) do
		//		print("Section ",secIdx," Direction Vector ",section.splineVector:toString()," length = ",section.length, " Position Vector ",section.position:toString())
		//	end
		
		},


	//tValue from 0 to 1

	CalcPosition: function(vector,tValue,fromEnd)
	{
		var rtValue				=	fromEnd && (1-tValue) || tValue ;
		var lengthTravelled		=	rtValue*this.totalLength ;
		var sections			=	this.sections  ;

		for (var secIdx in this.sections) 
		{
			var section = this.sections[secIdx] ;

			if (lengthTravelled <= section.accumlen)  
			{
				//found section, now calculate how far 'in' we are on that section (0 = @start 1 = @end)
				var lt 		= 	1 - (section.accumlen - lengthTravelled)/section.length
				var bz		= 	section.splineVector
				var pos		=	bz.getPositionXY(lt)
				vector.SetXyzw(pos.x,pos.y,0,0)
				return
			}
		}
	},


	// Calculate Spline tValue from DAME segmentID and DAME t value

	FindPathTValue: function(segmentID,tValue)
	{
		var sections			=	spline.sections 
		var section				=	sections[segmentID + 1]		//segmentID is 0 based
		var lenTravelled 		=	section.accumlen + (tValue-1)*section.length
		return lenTravelled/spline.totalLength
	},

	_RenderDebug: function(rHelper)
		{

			for (var sectionidx in this.sections)
			{
				var section = this.sections[sectionidx] ;
				
				var cp1	=	section.cp1,cp2 = section.cp2,cp1a = section.cp1a,cp2a = section.cp2a ;

				rHelper.drawCircle(cp1.x,cp1.y,16,[255,255,255,255]) ;
				rHelper.drawCircle(cp1a.x,cp1a.y,32,[255,0,0,255]) ;
				rHelper.drawCircle(cp2a.x,cp2a.y,32,[0,0,255,255]) ;
				rHelper.drawCircle(cp2.x,cp2.y,16,[0,255,0,255]) ;

				var bz		=	section.splineVector ;
				var blen	= 	bz.getLength() ;

				rHelper.drawText("BEZIER LENGTH = "+blen,cp1.x,cp1.y) ;
	
				for (var t = 0 ; t <= 1 ; t+=0.01)
				{
					var pos = bz.getPositionXY(t)
					rHelper.drawCircle(pos.x,pos.y,1,[0,255,0,120]) ;
				}
		}
	
	},

	Render: function(rHelper)
		{
			if (this.debug) 
			{
				this._RenderDebug(rHelper) ;
			}
		},
		
	toString: function()
		{
			return "Spline" ;
		}

}

