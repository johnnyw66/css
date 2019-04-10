function EnemyData() {}
var DEFAULTPOLY	=
{
		p1x:	0.25,	p1y: 	-0.25,
		p2x:	0.25,	p2y:	-0.25,
		p3x:	0.25,	p3y:	0.25,
		p4x:	-0.25,	p4y:	0.25,
}

function PixelsToInternal(pixel,maxvalue)
{
		return ((pixel/maxvalue)-0.5) ;
}

EnemyData.FiringOffsetData = 
{
	enemyheli:		function(fired) { return (fired % 2) ? {x:14, y:-8, z:0} : {x:-14, y:-8, z:0}; },
	playerheli:		function(fired) { return (fired % 2) ? {x:14, y:-8, z:0} : {x:-14, y:-8, z:0}; },
	largejeep:		function(fired) { return (fired % 2) ? {x:10, y:-16, z:0} : {x:-14, y:-16, z:0}; },
	smalljeep:		function(fired) { return  {x:0, y:-20, z:0} ; },
	tank:			function(fired) { return {x:0, y:-52, z:0} ; }
}

EnemyData.FrameData = 
{

	helipad:	[
					{frames: ["radarbase2"], weaponcollide:false},
				],

	radar:		[
					{frames: ["radarbase2"], weaponcollide:false},
					{frames: ["radar6"], offset:{x:0, y:0},ctype:'rotate'},
				],

	house:		[
					{frames: ["house3"], offset:{x:0, y:0}},
				],
			
	outhouse:	[
					{frames: ["outhouse4"], offset:{x:0, y:0}},
				],
	
	hut:		[
					{frames: ["hut5"], offset:{x:0, y:0}},
					
				],

	tank:		[
					{frames: ["tankbottom6"]},
					{frames: ["tanktop6"],ctype:'turret',offset:{x:0,y:0}},
				],

	smalljeep:	[
					{frames: ["smalljeep6"]},
					{frames: ["smalljeepgun6"],ctype:'turret',offset:{x:0,y:0}},
	
				],
							
	largejeep:	[
					{frames: ["largejeep2"]},
					{frames: ["largejeeptop2"],ctype:'turret',offset:{x:0,y:0}},
				],
												
				
	playerheli:	[
								{	frames: 		["enemy_helishadow"], offset: {x: -16, y: 16}, weaponcollide:false},

								{	frames: 		["enemy_helibody"],
									collidepoly: 	{
														p1x: 	PixelsToInternal(16,64),	p1y: PixelsToInternal(20,128),
														p2x: 	PixelsToInternal(45,64),	p2y: PixelsToInternal(20,128),
														p3x: 	PixelsToInternal(51,64),	p3y: PixelsToInternal(124,128),
														p4x: 	PixelsToInternal(12,64),	p4y: PixelsToInternal(124,128),
													},
									explosions: 	[
														{x: 0, y: 0,scale: 2},
														{x: 0, y: 32, delay: 0.4},
														{x: 0, y: -32, delay: 0.2},
														{x: -32, y: 0, delay: 0.3},
													],
								},
								{	frames:			["enemy_heliblades"],ctype:'rotate',weaponcollide:false},
				],	

	enemyheli:	[
					{	frames: 		["enemy_helishadow"], offset: {x: -16, y: 16}, weaponcollide:false},
					
					{	frames: 		["enemy_helibody"],
						collidepoly: 	{
											p1x: 	PixelsToInternal(16,64),	p1y: PixelsToInternal(20,128),
											p2x: 	PixelsToInternal(45,64),	p2y: PixelsToInternal(20,128),
											p3x: 	PixelsToInternal(51,64),	p3y: PixelsToInternal(124,128),
											p4x: 	PixelsToInternal(12,64),	p4y: PixelsToInternal(124,128),
										},
						explosions: 	[
											{x: 0, y: 0,scale: 2},
											{x: 0, y: 32, delay: 0.4},
											{x: 0, y: -32, delay: 0.2},
											{x: -32, y: 0, delay: 0.3},
										],
					},
					{	frames:			["enemy_heliblades"],ctype:'rotate',weaponcollide:false},
				],	

	playerveh1:	[
	
				],

	playerveh2:	[

				],
}

EnemyData.Error			=	function(msg)
{
	alert("Frames or Animation Table not Defined")
	
}

EnemyData.CreateData	=	function(enemy,id)
{
	var	name			=	enemy.name ;
	
	
	var frameData			=	EnemyData.FrameData[name] || [{frames:["outhouse4"]}];
	enemy.fireFunction		=	EnemyData.FiringOffsetData[name] || function(fired) { return {x:0, y:0, z:0 } ; }
	 

	if (!frameData) {
		alert("Can not Find Frame Data For "+name+" id = "+id) ;
	}

	var parts			=	new Array() ;
	
	var numParts		=	frameData ? frameData.length : 0 ;
	for (var partIndex = 0 ; partIndex < numParts ; partIndex++)
	{
		
		var	part			=	frameData[partIndex] ;
		var	frames			=	part.frames ;
		var fps				=	part.fps || 10 ;
		var cpoly			=	part.collidepoly || DEFAULTPOLY ;
		var scale			=	part.collidescale || 1 ;
		var ctype			=	part.ctype || 'benign' ;
		var indes			=	part.indestruct ;
		var weaponcollide	= 	part.weaponcollide ;
		var	offset			=	part.offset || {x:0, y:0}
		var explosions		=	part.explosions || [{x: 0, y: 0}]
		
		var width			=	0, height		=	0 ;
		var	tanim			=	null, sprite 	=	null ;	 	
		var poly			=	null ;
		
		var radius			=	10 ;
		
		if (part.frames)
		{
			tanim  = TextureAnim.Create(frames.length,fps)
			for(var idx = 0 ; idx < frames.length ; idx++)
			{
				var frameName	=	frames[idx] ;
				tanim.addFrame(frameName)
			}

			var res			=	ImageResource.getResource(frames[0]);
			if (!res) 
			{
				alert("Can not find ImageResource:"+frames[0]) ;
			} else
			{
				width			=	res.width ;
				height			=	res.height;
			}
		} else
		{
			
		}
		
		var ePart = EnemyPart.Create(enemy,width,height,ctype,tanim,offset,poly,radius,indes,weaponcollide,explosions)
		parts.push(ePart) ;
	}
	return parts ;
}

	
	