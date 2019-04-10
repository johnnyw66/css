//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function TileMap(mapdata,tilemapResource,screenDim,tileDim)
{
	this._posmatrix		=	Matrix44.Create() ;
	
	this._mapdata 		=	mapdata ;
	this._resource		=	tilemapResource ;
	this._screenDim		=	screenDim || {width:1024,height:720};
	this._screenDimX	=	this._screenDim.width ;
	this._screenDimY	=	this._screenDim.height ;
		
	this._tileWidth		=	(tileDim && tileDim.width) || 64;
	this._tileHeight	=	(tileDim && tileDim.height) || this._tileWidth ;
	
	this._mapHeight		=	 this._mapdata.length ;
	this._mapWidth		=	 this._mapdata[0].length ;
	
	this._pixelWidth	=	this._mapWidth * this._tileWidth ;
	this._pixelHeight	=	this._mapHeight * this._tileHeight ;
	
	
	this._zeroPosTable = new Array() ;

	// calculate tiles needed to be rendered - round up to nearest tile.
	var tilesDisplayWidth 			= 	Math.ceil(this._screenDimX/this._tileWidth) ; 
	var tilesDisplayHeight 			= 	Math.ceil(this._screenDimY/this._tileHeight) ;

	this.tilesDisplayWidth			=	tilesDisplayWidth ;
	this.tilesDisplayHeight			=	tilesDisplayHeight ;
	
	// calculate screen buffer position table
	var tileWidth	=	this._tileWidth ;
	var tileHeight	=	this._tileHeight ;

 	for (var xc = 0 ; xc <= tilesDisplayWidth  ; xc++)
	{
		var 	xstart	=	xc*tileWidth ;
		var 	xend 	=	xstart + tileWidth ;
		for (var yc = 0; yc <= tilesDisplayHeight ; yc++)
		{
			var 	ystart	=	yc*tileHeight ;
			var 	yend 	=	ystart + tileHeight ;
			this._zeroPosTable.push({xstart: xstart, xend: xend, ystart: ystart, yend: yend}) ;
		}
	}
	
	this._posData		=	this._zeroPosTable ;
	
	// Image must be loaded!!!!
//	alert(this._resource.isLoaded()) ;
	
	
 	// Calculate UV offsets for each mapcell frame
	this._tilesAcross	=	Math.floor(this._resource.getWidth()/this._tileWidth) ;
	this._tilesDown		=	Math.floor(this._resource.getHeight()/this._tileHeight) ;

	var tilesAcross		=	this._tilesAcross ;
	var tilesDown		=	this._tilesDown ;
	
	var qw				=	(1/tilesAcross) ;
	var qh				=	(1/tilesDown) ;
	var numFrames		=	tilesAcross*tilesDown ;
		
	var uvblocks			=	new Array() ;
	
	for (var frame = 0 ; frame < numFrames ; frame++)
	{
		var x			=	(frame % tilesAcross)
		var y			=	Math.floor(frame / tilesAcross)
		
//		var px				=	consoleFix and 1/(64) or 0
//		var zeroOff 		=	px
//		var oneOff 			=	1 - px

		var lx				=	(x+0)*qw
		var rx				=	(x+1)*qw
		var ty				=	(y+0)*qh
		var by				=	(y+1)*qh
		
		uvblocks[frame]		=	{	
									x:  	x*tileWidth,
									y:  	y*tileHeight,
									width: 	tileWidth,
									height: tileHeight, 
									pt1: 	{x:lx, y:ty},
									pt2:	{x:rx, y:ty}, 
									pt3:	{x:rx, y:by}, 
									pt4:	{x:lx, y:by}, 
								}
		
	}
	
	this._quadTable		=	uvblocks ;
	
}

TileMap.Create	=	function(mapdata,tilemapResource,screenDim,tileWidth,tileHeight)
					{
						return new TileMap(mapdata,tilemapResource,screenDim,tileWidth,tileHeight)
					}


TileMap.prototype	=
{
	
	constructor:	TileMap,

	GetMapIndex:		function(x,y)
						{
//							return this._mapdata[y][x] ;
							return this._mapdata[y] && this._mapdata[y][x] || 0;
						},
						
	GetDimensions:		function()
	 					{
							var pixelWidth	=	this._pixelWidth ;
							var pixelHeight	=	this._pixelHeight ;
							return {X: function() {return pixelWidth}, Y: function() {return pixelHeight}}
						},
						
	updateUVTables:		function (mx,my)
						{
							var	uvTable		=	new Array();
							var quadTable	=	this._quadTable ;
							var GetMapIndex	=	this.GetMapIndex ;
							
							var tilesDisplayWidth	=	this.tilesDisplayWidth ;
							var tilesDisplayHeight	=	this.tilesDisplayHeight ;
							
							
							for (var x = 0 ; x <= tilesDisplayWidth ; x++)
							{
								var xpos = x + mx ;
		    					for (var y = 0 ; y <= tilesDisplayHeight ; y++) 
								{
									var ypos = y + my ;
		      						var uvEntry =  quadTable[this.GetMapIndex(xpos,ypos)] ;
								
									uvTable.push(uvEntry) ;
										
		    					}
							}
							
							this._uvData	=	uvTable ;


						},


	Render:			function(rHelper,tx,ty)
	 				{
						var newMapX					=	Math.floor(tx / this._tileWidth) ;
						var newMapY					=	Math.floor(ty / this._tileHeight) ;
						var fineX					=	tx % this._tileWidth ;
						var fineY					=	ty % this._tileHeight ;

						this.updateUVTables(newMapX,newMapY) ;	

						this._posmatrix.SetTranslation(-fineX,-fineY,0,MATRIX_REPLACE) ;
						this._posmatrix.SetScale(1,1,1,1) ;
						rHelper.drawQuads2d(this._resource.getImage(),this._posmatrix,this._posData,this._uvData,fineX,fineY) ;
					},
					
	toString:		function()
					{
						return "TileMap" ;	
					}
	
	
}




