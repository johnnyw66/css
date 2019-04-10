//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

var DEFAULTMISSILERATE			=	0.00000001 ;
var DEFAULTMISSILEPERIOD		=	1/DEFAULTMISSILERATE ;
var DEFAULTMISSILERANGE			=	256 ;

var DEFAULTFIRERATE				=	0.5 ;
var DEFAULTFIREPERIOD			=	1/DEFAULTFIRERATE ;
var EnemyID						=	0 ;
var AIMTOL						=	20 ;

function Enemy(data,follow)
{
	
	this.x			=	data && data.x || 0;
	this.y			=	data && data.y || 0;
	this.cx			=	this.x ;
	this.cy			=	this.y ;
	
	this.fired		=	0 ;
	this.time		=	0 ;
	this.firingpos	=	Vector4.Create() ;
	
	this.follow	=	follow ;
	if (data)
	{
		var properties	=	data.properties ;
		var pathinfo	=	data.pathinfo ;
		this.name		=	data.name ;
		this.aclass		=	data.aclass ;
		this.scalex		=	data.scalex || 0.5 ;
		this.scale		=	(properties && properties.scale) || this.scalex ;
		this.link		=	data.link ;
		this.back		=	false ;
		this.pos		=	Vector4.Create(this.x,this.y) ;
		this.tSpeed		=	(properties && properties.speed) || 40 ;
		this.direction	=	0 ;
	
		this.centreamp		=	((properties && properties.centreamp) || 600) ;
		this.centreduration	=	((properties && properties.centreduration) || 60) ;
		
		this.phase		=	((properties && properties.phase) || Math.random())*6.28 ;
		this.pK			=	(properties && properties.pk)  || 0.125 ;
		this.pRadius	=	(properties && properties.pradius) || 256 ;

		this.canfire	=	(properties && properties.canfire) ;
		this.firerate	=	(properties && properties.firerate) ;
		this.fireperiod	=	this.firerate && 1/this.firerate || DEFAULTFIREPERIOD ;

		this.missilerate	=	(properties && properties.missilerate) ;
		this.missileperiod	=	this.missilerate && 1/this.missilerate || DEFAULTMISSILEPERIOD ;
		this.missilerange	=	(properties && properties.missilerange) || DEFAULTMISSILERANGE ;
		
		this.paratime	=	0 ;
		
		if (pathinfo)
		{
			this.realpath		=	PathManager.GetPath(pathinfo.path) ;
			this.pathsegment	=	pathinfo.segment ;	//NB: segment is 0 based!
			this.pathT			=	pathinfo.t ;

			if (this.realpath)
			{
				this.tValue				=	this.realpath.FindPathTValue(this.pathsegment,this.pathT) ;
				this.realpath.CalcPosition(this.pos,this.tValue) ;
				this.totalPathLength	=	this.realpath.GetTotalLength() ;
				
			}
			
			
		}
		
		// Set up Animation Data
		
		var spriteName	= 	this.aclass == 'flying' ? "helibody" : "jeep.png" ;
		this.sprite		=	new Sprite(spriteName) ;
		
	 	
		if (this.aclass == 'flying') 
		{
			this.bladesprite		=	new Sprite("heliblades") ;
			this.shadowsprite		=	new Sprite("helishadow") ;

			this.bladerot			=	0 ;
		//	alert("Speed = "+this.tSpeed+", phase = "+this.phase+", pk = "+this.pK+", pRadius ="+this.pRadius+", paratime ="+this.paratime) ;
		}
		
	} else
	{
		alert("WHAT THE HELL?"+EnemyID) ;
	}
	
	this.parts		=	EnemyData.CreateData(this,EnemyID++) ;
	this.region		=	EnemyManager.GetRegion(this.pos.X(),this.pos.Y()) ;
	
}

Enemy.canfire		=	true ;


Enemy.Create=function(data,follow)
{
	return new Enemy(data,follow) ;
}

function rad(deg)	{	return deg*Math.PI/180 ;	}
function deg(rad)	{	return rad*180/Math.PI ;	}

function MakeDirectionVectorPair(angle,xpos,ypos,size)
{
	var rsize = size || 1 ;
	var ny= -rsize*Math.sin(rad(angle + 90)) ;
	var nx= -rsize*Math.cos(rad(angle + 90)) ;
	return {x:xpos+nx, y:ypos+ny, z: 0} ;
}

function MakeDirectionVector(angle)
{
	var rsize = size || 1 ;
	var ny= -Math.sin(rad(angle + 90)) ;
	var nx= Math.cos(rad(angle + 90)) ;
	return Vector4.Create(nx,ny) ;
}


Enemy.prototype =
{
	constructor:		Enemy,

	MarkForMission:		function()
						{
							alert("Enemy.MarkForMission - Not implemented") ;
							
						},
						
	IsAlive:			function()
						{
							return true ;
						},

	IsKilled:			function()
						{
							return !this.IsAlive() ;
						},
						
	ApplyDamage:		function()
						{
							alert("Enemy.ApplyDamage - Not implemented") ;
						},
						
	Kill:				function()
						{
							alert("Enemy.Kill - Not implemented") ;
							
						},

	GetScore:			function()
						{
							alert("Enemy.GetScore - Not implemented") ;
							
						},
	GetTarget:			function()
						{
							alert("Enemy.GetTarget - Not implemented") ;
						},
	SetTarget:			function()
						{
							alert("Enemy.SetTarget - Not implemented") ;
							
						},
						
	SetPosition:		function(x,y)
						{
							this.pos.SetX(x) ;
							this.pos.SetY(y) ;
						},
						
	SetVectorPosition:	function()
						{
							alert("Enemy.SetVectorPosition - Not implemented") ;
						},
						
	GetDistanceSq:		function(x,y)
						{
							var _x	=	(this.pos.X() - x), _y = (this.pos.Y() - y) ;
							return (_x * _x) + (_y * _y);
						},

	GetDistance:		function(x,y)
						{
							return Math.sqrt(this.GetDistanceSq(x,y)) ;
						},

	GetPosition: 		function()
						{
							return {_x: this.pos.X(), _y:this.pos.Y(), _z: this.pos.Z()} ;
						},

	GetVectorPosition:	function()
						{
							return this.pos ;	
						},
	
	GetDirection:		function()
						{
							return this.direction ;
						},
	GetMissileDirection:	
						function()
						{
							alert("Enemy.GetMissileDirection - Not implemented") ;
						},

	GetFiringDirection:	function()
						{
							for (var idx in this.parts)
							{
								var part = this.parts[idx]
								if (part.ctype=='turret') 
								{
									return part.GetFiringDirection() ;
								}
							}
							return this.direction ;
								
						},
	GetFiringOffset:	function(fired)
						{
							return this.fireFunction && this.fireFunction(typeof fired  == 'undefined' ? this.fired : fired ) ||  {x:0, y:0, z:0} ;
						},

	GetFiringPosition:	function(fired,angle)
						{
							var rangle		=	angle || 0 ;
							var	cos			=	Math.cos(rangle*Math.PI/180) ;
							var sin			=	Math.sin(rangle*Math.PI/180) ;
						
							
							var x	=	this.pos.X(), y	=	this.pos.Y(), z	=	this.pos.Z() ;
							var fo	=	this.GetFiringOffset(fired) ;
							var ox	=	fo.x, oy	= fo.y ;
							
							var	tox	=	ox*cos - oy*sin ;
							var	toy	=	ox*sin + oy*cos ;
							
							this.firingpos.SetXyzw(x + tox, y + toy, z, 0) ;
							return this.firingpos ;
						},
	
	ObjectInside:		function(object,shape)
						{
							alert("Enemy.ObjectInside - Not implemented") ;
							
						},

	ObjectOutside:		function(object,shape)
						{
							alert("Enemy.ObjectOutside - Not implemented") ;
							
						},
	CalcTargetBearing:	function()
						{
							var	diff_vec	=	Tempv0 ; 
							Vector4.Subtract(diff_vec,this.follow.GetVectorPosition(), this.GetVectorPosition()) ;
							var length	=	diff_vec.Length2() ;	
							diff_vec.Normalise2() ;

							//Work out target bearing
							var rot_tar = Math.atan2(diff_vec.Y(), diff_vec.X())
							rot_tar = (deg(rot_tar)	+ 90)
							this.targetbearing	=	rot_tar % 360 ;
							this.targetlength	=	length ;
							this.aimtol			=	Math.abs(this.GetFiringDirection() - this.targetbearing) ;
							
						},
						
	AttemptFire:		function(dt,viewdist)
						{
							
							// Attempt to fire Homing Missile
							
							if (Enemy.canfire && MissileManager.CanFire() && this.missilerate && this.time - (this.lastmissile || 0) > this.missileperiod && this.targetlength < 600 && this.aimtol < AIMTOL)
							{
								var fDirection		=	this.GetFiringDirection() ;
								MissileManager.AddMissile( this, this.GetFiringPosition(this.fired,fDirection),fDirection - 90,this.follow,1,15) ; 

								this.lastmissile	=	this.time ;
								this.fired++ ;
							}

							// Attempt to fire bullets
							if (Enemy.canfire && this.canfire && this.time - (this.lastfired || 0) > this.fireperiod && Math.sin(6*this.time/8+this.phase) > 0 && Math.sin(6*this.time/4+this.phase) > 0) 
							{
								
									
									//BulletManager.Fire				=	function(owner,damage,vel,angle,duration,animation,scale,radius)
								var kDAMAGE		=	10 ;
								var kDURATION	=	0.75 ;
								var kVELOCITY	=	600 ;
									
									//var animation = RenderHelper.CreateTextureAnimation(4,2,"bullethits",10) ;
								var animation = RenderHelper.CreateTextureAnimation(2,1,"bullets",10) ;
								BulletManager.Fire(this,kDAMAGE,kVELOCITY,this.GetFiringDirection(),kDURATION,animation,1,10) ;

								this.fired++ ;
								this.lastfired	=	this.time
							}
						},
						



	_CalcDirection:		function()
						{
							
						 	// Look in the direction we are moving
							var xpos	=	this.pos.X(), ypos	 =  this.pos.Y() ;
							
							var dx 	= xpos - (this.lastx || 0)
							var dy 	= ypos - (this.lasty || 0)

							var th 			= 	Math.atan2(dy,dx)  

							this.direction	=	deg(th) + 90
					 		this.lastx		=	xpos
							this.lasty		=	ypos

						},
						
	_updateFlying:		function(dt) 
						{
							
							this._CalcDirection()

							this.aimdirection 		=	this.direction ;
							this.paratime 			= 	this.paratime + dt*(this.tSpeed) ;

							var radius				=	this.pRadius ;
							var k					=	this.pK ;
							var ptime				=	this.paratime*k + this.phase ;

							// OPTIMISE THIS UP
							var amp					=	this.centreamp ;
							var centreFreq			=	6/this.centreduration;

							var	cx					=	this.cx	+ amp*Math.cos(ptime*centreFreq) ;
							var	cy					=	this.cy	+ amp*Math.sin(ptime*centreFreq) ;
							// OPTIMISE THIS UP
								
							this.ccx				=	cx ;
							this.ccy				=	cy ;
							
							var ypos =	(cy + (radius+Math.cos(2*ptime))*Math.cos(3*ptime)) ;
							var xpos =	(cx + (radius+Math.cos(2*ptime))*Math.sin(5*ptime)) ;

							this.SetPosition((xpos),(ypos))
						},
						
	_updatePath:		function(dt)
						{
							var	speedConst	=	this.realpath ? (this.totalPathLength) : 1 ;
							
							this.tValue		=	this.tValue + dt*(this.tSpeed || 1)/speedConst
							
							if (this.tValue > 1) 
							{
								this.tValue = 0
								if (!this.realpath.IsClosed()) 
								{
									this.back	 = !this.back
								}
							}
							this.realpath.CalcPosition(this.pos,this.tValue,this.back)
							this._CalcDirection()
						},
						
	Update:				function(dt)
						{
							this.time	=	this.time + dt ;
							if (this.realpath) 
							{
								this._updatePath(dt) ;
							}
								
							if (this.aclass == 'hover')
							{
								var hoverFreq	=	0.25 ;
								var scalearound	=	0.95 ;
								this.scale		=	scalearound + (1-scalearound)*Math.sin(6*hoverFreq*this.time)
							}
							if (this.aclass	==	'flying') 
							{

								this.bladerot		=	this.bladerot + dt*550 ;
								this._updateFlying(dt) ;
								
							}
							
							for (var idx = 0 ; idx < this.parts.length ; idx++)
							{
								var part 	=	this.parts[idx] ;
								part.Update(dt) ;
							}
							
							// Update Region if we need to!	
							if (this.aclass	==	'flying' || this.realpath)
							{
								this.region		=	EnemyManager.GetRegion(this.pos.X(),this.pos.Y()) ;
							}
						
							this.CalcTargetBearing() ;
							this.AttemptFire(200*200) ;
							
						},
							
 	Render:				function(rHelper)
						{
							var	ang		=	this.direction
							var	xpos	=	this.pos.X(), ypos	 =  this.pos.Y() ;


							if (this.aclass == 'flying') 
							{
								rHelper.drawSprite(this.shadowsprite,xpos-16,ypos+16,ang,1,1) ;
								rHelper.drawSprite(this.sprite,xpos,ypos,ang,1,1) ;
								rHelper.drawSprite(this.bladesprite,xpos,ypos,this.bladerot,1,1) ;

								//rHelper.drawCircle(this.ccx,this.ccy,8,[255,255,0]) ;
								//rHelper.drawText("CX  ="+Math.floor(this.ccx || 0)+" CY = "+Math.floor(this.ccy || 0),xpos,ypos,[255,255,0],{vertical:"bottom",horizontal:"left"}) ;
								
							
							} else 
							{
								for (var idx = 0 ; idx < this.parts.length ; idx++)
								{
									var part 	=	this.parts[idx] ;
									part.Render(rHelper,ang) ;
								}
							}
							
							//this.RenderDebug(rHelper) ;	
						},

	RenderDebug:		function(rHelper)
						{
							var	xpos	=	this.pos.X(), ypos = this.pos.Y() ;
							rHelper.drawCircle(xpos,ypos,8,[0,255,0]) ;

							//	drawArrowHead(direction,baseVector,stemLength,tipAngle,colour)
							
							rHelper.drawArrowHead(this.GetFiringDirection(),this.pos,60,45,Math.floor(this.aimtol) < AIMTOL ? [255,0,0] :[0,255,0]) ;
							rHelper.drawArrowHead(this.targetbearing,this.pos,120,45,[255,255,0]) ;
							
							//this.targetlength,this.aimtol
							var region = this.region ; //EnemyManager.GetRegion(xpos, ypos) ;
							rHelper.drawText("region:"+region+" pos: "+Math.floor(xpos)+","+Math.floor(ypos),xpos+10,ypos,[255,255,255],{vertical:"bottom",horizontal:"left"}) ;
							rHelper.drawText("length ="+Math.floor(this.targetlength)+" aimtol="+Math.floor(this.aimtol),xpos+10,ypos+20,[255,255,255],{vertical:"bottom",horizontal:"left"}) ;
							rHelper.drawText("missilerate ="+this.missilerate,xpos+10,ypos+40,[255,255,255],{vertical:"bottom",horizontal:"left"}) ;	

							var ang	=		this.GetFiringDirection() ;

							rHelper.drawCircle(this.GetFiringPosition(0,ang).X(),this.GetFiringPosition(0,ang).Y(),4,[255,0,0]) ;
							rHelper.drawCircle(this.GetFiringPosition(1,ang).X(),this.GetFiringPosition(1,ang).Y(),4,[255,255,0]) ;
							
							//if (this.aclass == 'flying') {
							//	var ov = rHelper.getOverlay() ;
							//	rHelper.setOverlay(12) ;
							//	rHelper.drawText("class:"+this.aclass+" name "+this.name+" x,y = "+Math.floor(this.pos.X())+","+Math.floor(this.pos.Y())+" t="+this.paratime+" radius = "+this.pRadius,0,0,[255,255,255],{horizontal:"left",vertical:"top"},"italic 20pt Calibri") ;
							//	rHelper.setOverlay(ov) ;
							//}
							
						},

}



// Static Manager Class
// TODO Linked List ?
EnemyManager				=		{}	;
EnemyManager.localsize		=		0 ;
EnemyManager.enemies		=		new Array() ;
EnemyManager.regionHelper	=		null ;
EnemyManager.screenDim		=		null ;
EnemyManager.mapDim			=		null ;
EnemyManager.screenDim		=		null ;
EnemyManager.callback		=		null ;
EnemyManager.neighbourhoodTable	=	null ;
EnemyManager.updatecount	=	0 ;

var regionWidth,regionHeight,regionsAcross,regionsDown,mapWidth,mapWidth ;


EnemyManager.Init		=	function(enemyarray,player,regionHelper,screendim,mapdim,callback)
							{
								EnemyManager.regionHelper	=	regionHelper ;
										
								EnemyManager.enemies		=	new Array() ;
								EnemyManager.screenDim		=	screendim ;
								EnemyManager.mapDim			=	mapdim ;
								EnemyManager.callback		=	callback || function(ev,p) { } ;

								EnemyManager.CalcRegions() ;
									
								if (enemyarray)
								{
									for (var idx = 0 ; idx < enemyarray.length ; idx++)
									{
										EnemyManager.Add(new Enemy(enemyarray[idx],player)) ;
									}
								}

								//EnemyManager._BuildLocalList() ;
								EnemyManager.AllowFire() ;
							}
								
EnemyManager.AllowFire	=	function()
							{
								
							}
							
EnemyManager.SetRegionHelper	
							=	function(regionHelper)
							{
								EnemyManager.regionHelper			=	regionHelper ;
							}

EnemyManager.Add		=	function(enemy)
							{
								var id		=	 EnemyManager.enemies.length ;
								EnemyManager.enemies.push(enemy) ;
								return id ;
							}

EnemyManager.GetSize	=	function()
							{
								return EnemyManager.enemies.length ;
							}
							
EnemyManager.GetEnemy	=	function(id)
							{
								return EnemyManager.enemies[id] ;
							}

EnemyManager.Iterator	=	function()
							{
								var idx = 0 ;
								return {	HasElements:	function()	{ return (idx < EnemyManager.enemies.length) ; },
											Reset: 			function() 	{ idx = 0 ; }, 
											Next: 			function()	{ idx++ ; }, 
											GetElement: 	function()	{return EnemyManager.enemies[idx] ;} 

										} ;
							}

EnemyManager.Clear		=	function()
							{
									EnemyManager.enemies	=	new Array() ;
							}

EnemyManager.Update		=	function(dt)
							{
								
								EnemyManager.time	=	EnemyManager.time + dt ;
								var	neighbourTable	=	EnemyManager.neighbourhoodTable
								var	region			=	EnemyManager.regionHelper.GetRegion() ;
								var count			=	0 ;
								
								for (var it = EnemyManager.Iterator() ; it.HasElements() ; it.Next())
								{
									var enemy = it.GetElement() ;
									if (neighbourTable[region] && neighbourTable[region][enemy.region])
									{
										enemy.Update(dt) ;
										count++ ;
									}	
								}
								EnemyManager.updatecount	=	count ;
								
							}
EnemyManager.GetNearest		=	function(xpos,ypos,tol)
							{
								var ttol		=	tol || 99999999999 ;
								var nearest 	= 	null ;
								var bestdist	=	99999999999 ;
								for (var it = EnemyManager.Iterator() ; it.HasElements() ; it.Next())
								{
									var enemy	=	it.GetElement() ;
									var dist 	=	enemy.GetDistanceSq(xpos,ypos) ;
									if (dist < ttol && dist < bestdist) 
									{
										nearest	=	enemy ;
										bestdist = 	dist ;
									}
										
								}
								return nearest ;
							}
							
EnemyManager.Render		=	function(rHelper)
							{
									var	neighbourTable	=	EnemyManager.neighbourhoodTable
									var	region			=	EnemyManager.regionHelper.GetRegion() ;
								
									for (var it = EnemyManager.Iterator() ; it.HasElements() ; it.Next())
									{
										var enemy = it.GetElement() ;
										if (neighbourTable[region] && neighbourTable[region][enemy.region])
										{
											enemy.Render(rHelper) ;
										}
									}
							}


EnemyManager.RenderDebug	=	function(rHelper)
								{
									var cName			=	EnemyManager.regionHelper.className ;
									var	region			=	EnemyManager.regionHelper.GetRegion() ;
									var	lastEnemy		=	EnemyManager.GetEnemy(EnemyManager.GetSize() - 1) ;	
									
									var regionCount	=	"Region Count	=	"+EnemyManager.updatecount+ " in region "+region + " class("+cName+") total Objects = "+EnemyManager.GetSize();
									rHelper.drawText(regionCount,1024*0.5,300,[0,0,0],{horizontal:"center",vertical:"top"},"italic 16pt Calibri") ;
									rHelper.drawText("lastEnemyRegion "+lastEnemy.region,1024*0.5,320,[0,0,0],{horizontal:"center",vertical:"top"},"italic 16pt Calibri") ;
									
								}
								
// Debug routines to count neighbours and those in same region

EnemyManager.GetNeighbourCount		=	function(region)
									{
										var count = 0 ;
										
										return count ;
									}

EnemyManager.GetRegionCount		=	function(who)
									{
										
										var count = 0 ;
										var region	=	(who ? who.GetRegion() : EnemyManager.regionHelper.GetRegion()) ;
										
										for (var it = EnemyManager.Iterator() ; it.HasElements() ; it.Next())
										{
											var enemy = it.GetElement() ;
											if (enemy.region	==	region)
											{
												count++ ;
											}
										}
										return count ;
									}
									
EnemyManager._XXBuildLocalList	=	function()
							{
								
								var localEnemies		=	new Array() ;
								EnemyManager.localsize	=	0
								var regionHelper		=	EnemyManager.regionHelper.GetRegion()
								var	idx					=	0 ;
								for (var it = EnemyManager.Iterator() ; it.HasElements() ; it.Next())
								{
									var enemy	=	it.GetElement() ;
									if (true)
									//if (enemy.InNeighbouringRegion(regionHelper))
									{
										enemy.localobject		=	true ;
										enemy.idx				=	idx	 ;	//mark current idx in full enemy table
										localEnemies.push(enemy) ;
										EnemyManager.localsize	=	EnemyManager.localsize	+ 1 ;
									} else 
									{
										enemy.localobject		=	false
									}
									idx	=	idx + 1 ;
								}
							
								EnemyManager.localenemies	=	localEnemies

							}
							

EnemyManager.NeighbouringRegions	=	function(region1,region2)
										{
											return EnemyManager.neighbourhoodTable[region1][region2] ;
										}

EnemyManager.GetRegion		=	function(pixx,pixy)
								{
									var regionAcross	=	Math.floor(Math.max(0,Math.min(pixx,mapWidth))/regionWidth) ;
									var regionDown		=	Math.floor(Math.max(0,Math.min(pixy,mapHeight))/regionHeight) ;
//									if  (regionDown*regionsAcross + regionAcross < 0)
//									{
//										alert("Negative Region "+regionDown*regionsAcross + regionAcross ) ;
//									}
									return regionDown*regionsAcross + regionAcross	;
								}

EnemyManager.CalcRegions	=	function()
								{
									var	k			=	1.25 ;
									k				=	0.75 ;
									regionWidth		=	EnemyManager.screenDim.X()*k ;
									regionHeight	=	EnemyManager.screenDim.Y()*k ;

									mapWidth		=	EnemyManager.mapDim.X() ;
									mapHeight		=	EnemyManager.mapDim.Y() ;
										
									regionsAcross	=	1+Math.ceil(EnemyManager.mapDim.X()/regionWidth) ;
									regionsDown		=	1+Math.ceil(EnemyManager.mapDim.Y()/regionHeight) ;
									EnemyManager.neighbourhoodTable = EnemyManager.BuildNeighhoodTable(regionsAcross,regionsDown) ;
								}


EnemyManager.BuildNeighhoodTable	=	function(numberOfColumns,numberOfRows)
										{
											
											var neighbourTable = {}

												var _CA	=	function(col,row)
															{
																var screensPerRow	=	numberOfColumns ;
																var screenNumber	=	((row  - 1)* screensPerRow + (col -1))  ;
																return screenNumber	;	
															}
												for (var row = 0 ; row < numberOfRows ; row++)
												{
													
													for (var column = 0 ; column < numberOfColumns ; column++)
													{
														neighbours = [] ;
														if (row + 1 < numberOfRows)
														{
															neighbours.push(_CA(column, row + 1)) ;
															if (column + 1 < numberOfColumns)
															{
																neighbours.push(_CA(column + 1, row + 1)) ;
																
															}
															if (column - 1 >= 0)
															{
																neighbours.push(_CA(column - 1, row + 1)) ;
															}
														}
														
														if (row - 1 >= 0)
														{
															neighbours.push(_CA(column, row - 1)) ;
															
															if (column + 1 < numberOfColumns)
															{
																neighbours.push(_CA(column + 1, row - 1)) ;
																
															}
															if (column - 1 >= 0)
															{
																neighbours.push(_CA(column - 1, row - 1)) ;
															}
														}
														
														if (column + 1 < numberOfColumns) 
														{
															neighbours.push(_CA(column + 1, row)) ;
														}

														if (column - 1 >= 0) 
														{
															neighbours.push(_CA(column - 1, row)) ;
														}
														var ca = _CA(column,row)
														neighbourTable[ca]	=	[]
														neighbourTable[ca][ca] = true	
														for (var idx = 0 ; idx < neighbours.length ; idx++)
														{	
															var nghbr 	=	neighbours[idx] ;
															neighbourTable[ca][nghbr] = true	
														}
													}
												}
												
												return neighbourTable ;
										}

