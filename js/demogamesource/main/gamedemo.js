	/*

		Javascript demo using my own 2D Api JS library which
		supports multi-layer rendering, event, animation and hotspots.

	*/


	var executeGameDemo = function(KeyBoardHandler,viewTime) {

		var canvElement		=	document.getElementById('canvasBuffer1') ;
		var DISPLAYWIDTH 	=	canvElement.width ;
		var DISPLAYHEIGHT 	=	canvElement.height ;


		var dodecaAngle		=	0 ;

		if (typeof _3DCamera != 'undefined')
		{

			var _3dcam			=	new _3DCamera(Vector4.Create(DISPLAYWIDTH,DISPLAYHEIGHT)) ;
			var _3dscene		=	new _3DScene() ;
			var _3dviewer		=	new	_3DViewer(_3dcam,_3dscene,false) ;
			var camStart		=	Vector4.Create(49,0,0) ;
			var camEnd			=	Vector4.Create(15,0,0) ;
			var camDir			=	Vector4.Create() ;
			camDir.Subtract(camEnd,camStart) ;

			_3dcam.SetPosition(camStart) ;
			_3dcam.SetLookAt(Vector4.Create(0,0,0)) ;

			var midVector		=	Vector4.Create(0,0,0) ;
			var cube 			= _3DModel.CreateCuboidModel(1,22.5,32) ;
			var dodeca 			= _3DModel.CreateDoDeca(10) ;

			var cubeEntity		= _3DEntity.Create() ;
			var dodecaEntity	= _3DEntity.Create() ;
			var bigEntity		= _3DEntity.Create() ;

			bigEntity.SetModel(GetFanModel()) ;
			bigEntity.SetRotation(Vector4.Create(0,0,0)) ;
			bigEntity.SetPosition(Vector4.Create(0,0,0)) ;
			_3dscene.Add(bigEntity) ;
		//	_3dscene.Add(bigEntity.Clone().SetPosition(Vector4.Create(-40,0,0)).SetRotation(Vector4.Create(0,0,0))) ;



			cubeEntity.SetModel(cube) ;
			cubeEntity.SetRotation(Vector4.Create(0,40,0)) ;
			cubeEntity.SetPosition(Vector4.Create(40,0,-40)) ;

			dodecaEntity.SetModel(dodeca) ;
			dodecaEntity.SetRotation(Vector4.Create(0,dodecaAngle,0)) ;
			dodecaEntity.SetPosition(Vector4.Create(0,0,0)) ;

		//	_3dscene.Add(cubeEntity) ;
		//	_3dscene.Add(cubeEntity.Clone().SetPosition(Vector4.Create(-4,0,0))) ;
		//	_3dscene.Add(cubeEntity.Clone().SetPosition(Vector4.Create(4,0,0))) ;

		//	for (var idx = -6 ; idx < 6 ; idx++)
		//	{
		//		_3dscene.Add(cubeEntity.Clone().SetPosition(Vector4.Create(-4,-4*idx,0))) ;
		//	}

		//	_3dscene.Add(dodecaEntity.Clone().SetPosition(Vector4.Create(-40,0,0))) ;
		//	_3dscene.Add(dodecaEntity.Clone().SetPosition(Vector4.Create(-80,-10,0))) ;

		//	_3dscene.Add(dodecaEntity) ;

		}

		KeyBoardHandler.bindKey(68,"axisRight") ;
		KeyBoardHandler.bindKey(65,"axisLeft") ;
		KeyBoardHandler.bindKey(87,"axisUp") ;
		KeyBoardHandler.bindKey(88,"axisDown") ;


		KeyBoardHandler.bindKey(69,"axisDiagUpRight") ;
		KeyBoardHandler.bindKey(81,"axisDiagUpLeft") ;

		KeyBoardHandler.bindKey(67,"axisDiagDownRight") ;
		KeyBoardHandler.bindKey(90,"axisDiagDownLeft") ;

		KeyBoardHandler.bindKey(39,"right") ;
		KeyBoardHandler.bindKey(37,"left") ;
		KeyBoardHandler.bindKey(38,"up") ;
		KeyBoardHandler.bindKey(40,"down") ;


		var viewingTime		=	viewTime || 15 ;

		var	tmap			=	null, camera = null,player = null,cameraOrbitor = null, playerhelicopter = null;

		// Test Line2D class
		var	line2Da			=	new Line2D(Vector4.Create(10,10),Vector4.Create(800,600)) ;
		var	line2Db			=	new Line2D(Vector4.Create(10,400),Vector4.Create(1024,10)) ;
		var intersects		=	new Vector4.Create(0,0) ;
		var ip				=	Line2D.Intersects(line2Da,line2Db,intersects) ;


		var hotSpots						=	{
			QHOTSPOT_ROBE: 		QuadHotspot.Build2DPoly(700,200,100,45,"QHOTSPOT_ROBE"),
			QHOTSPOT_THUNDER: 	QuadHotspot.Build2DPoly(100,300,140,35,"QHOTSPOT_THUNDER"),
			QHOTSPOT_SHADOW: 	QuadHotspot.Build2DPoly(900,400,150,90,"QHOTSPOT_SHADOW"),
			QHOTSPOT_POTS: 		QuadHotspot.Build2DPoly(600,500,60,0,"QHOTSPOT_POTS"),
			QHOTSPOT_SCREAM: 	QuadHotspot.Build2DPoly(1000,600,40,60,"QHOTSPOT_SCREAM"),
		} ;

		var bezRelTable =
		[
			[{x: 0.205078, y: 0.495833},{x: 0.467773, y: 0.195833},{x: 0.752930, y: 0.498611},{x: 0.452148, y: 0.793056}],
			[{x: 0.203125, y: 0.493056},{x: 0.469727, y: 0.195833},{x: 0.753906, y: 0.494444}],
			[{x: 0.452148, y: 0.788889},{x: 0.203125, y: 0.495833},{x: 0.464844, y: 0.201389}],
			[{x: 0.752930, y: 0.493056},{x: 0.451172, y: 0.790278},{x: 0.205078, y: 0.498611}],
		] ;

		var	screenOrbitor	=	new Orbitor(bezRelTable,DISPLAYWIDTH,DISPLAYHEIGHT) ;

		var nearestToMouse	=	null ;
		var FPS				=	4 ;
		var now				=	new Date().getTime() ;
		var lastTime 		=	now ;
		var gameTime 		= 	0 ;
		var	lastgameTime	=	0 ;
		var	stp				=	new Vector2(0,0) ;
		var	cp1				=	new Vector2(DISPLAYWIDTH/2,DISPLAYHEIGHT/5) ;
		var	etp				=	new Vector2(DISPLAYWIDTH,DISPLAYHEIGHT) ;
		var	cp2				=	new Vector2(DISPLAYWIDTH-cp1.x,DISPLAYHEIGHT-cp1.y) ;

		var	bez				=	new Bezier(stp,cp1,cp2,etp) ;

		var totalTime		=	0 ;
		var	avDT			=	0 ;
		var dt				=	0 ;
		var	dtSamples		=	0 ;

		var freq 			= 	5 	;
		var radius			=	120 	;

		var bezSprite		=	new Sprite("cute.png") ;
		var nasty			=	new Sprite("cute.png") ;

		var sprSheet		=	new Spritesheet("explosionuv64.png",8,4) ;
		var personSheet		=	new Spritesheet("person.png",6,4) ;


		var eventmgr		=	new EventManager() ;

		var playNow			=	true ;
		var MAPOVERLAY		=	7 ;
		var HUDOVERLAY		=	15 ;
		var	mouseX			=	0, mouseY 	=	 0 ;

		var nasties			=	[
									{spr:nasty, x:800, y:600},
									{spr:nasty, x:1024, y:1024},
									{spr:nasty, x:2824, y:2024},
									{spr:nasty, x:2024, y:2424},
									{spr:nasty, x:3600, y:3180},

								] ;

		var 	messages	=	[

								Locale.GetLocaleText("Javascript demo"),
								"Programming: 2.5 Weeks work",
								"Based on orignal code I wrote in Lua",
								"Tilemap and level exported from DAME Editor",
								"Vector and Spline Paths",
								"2D Render API supports multi-layer rendering",
								"Animation, Hotspot, Trigger & Event Managers",
								Locale.GetLocaleText("email: John Wilson johnnyw66+gamer@gmail.com 07753432247"),

								] ;


		var	msgCounter		=	0 ;

		// EventManager event callback, set off another message in 10 seconds
		//
		var cbF				=	function(p)
								{
									var nextTime	=	10 ;

									var msgYpos	=	DISPLAYHEIGHT*0.5 ;
									msgYpos		=	DISPLAYHEIGHT - 100 ;
									var startX	=	-100, endX	=	DISPLAYWIDTH*0.5 ;

									AddMessage( DisplayableTextWithImage.Create(
													messages[msgCounter % messages.length],
													{x:startX,y:msgYpos}),
													startX,msgYpos,endX,false)
									msgCounter++ ;
									eventmgr.addSingleShotEvent(cbF,"Event Size = "+eventmgr._getSize(),nextTime) ;
								}


		// Calculate mouse coordinates - relative to our Canvas
		// x,y = (0,0) is the top left hand corner.

		function calcMousePosition(e)
		{
			var x;
			var y;
			if (e.pageX || e.pageY) {
			  x = e.pageX;
			  y = e.pageY;
			}
			else {
			  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			x -= canvElement.offsetLeft;
			y -= canvElement.offsetTop;

			mouseX	=	x	;
			mouseY 	=	y	;
		}

		document.body.onmousemove = function(evt) {
			calcMousePosition(evt)
		} ;

		// Callback for mouse down clicks
		// swap camera to follow either our 'player'
		// or one of our other 'nasties'

		document.body.onmousedown = function(evt) {
				calcMousePosition(evt) ;
				var mX	=	mouseX, mY = mouseY  ;

				if (camera)
				{
					// if we are following our 'player' - swap over to
					// the nearest player (within 120 pixels)
					// or our last enemy.

					if (camera.IsFollowing(player))
					{
						var camerapos	=	 camera.GetTopLeft() || {x:0,y:0};
						var	xpos		=	camerapos.x + mX ;
						var ypos		=	camerapos.y + mY ;
						var nearest		=	EnemyManager.GetNearest(xpos,ypos,120*120) ;
						camera.Follow(nearest || EnemyManager.GetEnemy(EnemyManager.GetSize() - 1)) ;

					} else
					{

						// Add simple animation to prompt user to use cursor keys.

						var effectDur			=	3  ;

						AnimationManager.Add(
								new Animation(
											{
													texture:	"arrow",
													frameshor:	1,
													framesvert:	1,
													x:			DISPLAYWIDTH-40,
													y:			DISPLAYHEIGHT*0.5,
													loop:		true,
													bounce:		false,
													scale:		1,
													timeout:	effectDur,
													angle:		0,
													effect:		function(time) { return {tx:10*Math.sin(time*6*0.5),ty:0, scale:0.5+0.5*Math.abs(Math.sin(time*6*0.5))} ; }
											},true)
											,HUDOVERLAY) ;


						AnimationManager.Add(new Animation({texture:"arrow",frameshor:1,framesvert:1,x:40,y:DISPLAYHEIGHT*0.5,loop:true,bounce:false,scale:1,timeout:effectDur,angle:180,
							effect:function(time) {return {tx:-10*Math.sin(time*6*0.5), ty:0, scale:Math.abs(Math.sin(time*6*0.5))} ;}
						},true),HUDOVERLAY) ;

						AnimationManager.Add(new Animation({texture:"arrow",frameshor:1,framesvert:1,x:DISPLAYWIDTH*0.5,y:40,loop:true,bounce:false,scale:1,timeout:effectDur,angle:-90,
						effect:function(time) {return {ty:-10*Math.sin(time*6*0.5), tx:0, scale:Math.abs(Math.sin(time*6*0.5))} ; }
						},true),HUDOVERLAY) ;

						AnimationManager.Add(new Animation({texture:"arrow",frameshor:1,framesvert:1,x:DISPLAYWIDTH*0.5,y:DISPLAYHEIGHT-40,loop:true,bounce:false,scale:1,timeout:effectDur,angle:90,
						effect:function(time) {return {ty:10*Math.sin(time*6*0.5), tx:0, scale:Math.abs(Math.sin(time*6*0.5))} ; }
						},true),HUDOVERLAY) ;

						// Set our camera to follow the 'player'

						player.SetPosition(camera.GetPosition()) ;
						camera.Follow(player) ;
					}
				}
			};

		var tileSetImgRes		=	new ImageResource("tileset1.png") ;

		document.body.onkeyup 	= 	KeyBoardHandler.handler;
		document.body.onkeydown = 	KeyBoardHandler.handler;

		tmap					=	TileMap.Create(ExampleLevelData.mapdata,tileSetImgRes,{width:DISPLAYWIDTH,height:DISPLAYHEIGHT},{width:64,height:64}) ;


		playerhelicopter		=	new PlayerHelicopter(tmap.GetDimensions()) ;

		// Simple 'Player' object - allows us move around the tilemap
		//

		player					=	{
									regionHelper: EnemyManager,
									className:	'PlayerClass',
									vPos:	Vector4.Create(),
									VX:	640,
									VY:	640,
									vx:	0,
									vy:	0,
									_x: 1024,
									_y: 1024,
									_z: 0,
									dim: tmap.GetDimensions(),
									_boundx: 	tmap.GetDimensions().X(),
									_boundy: 	tmap.GetDimensions().Y(),
									SetPosition: function(pos)
												{
													this._x	=	pos._x ;
													this._y	=	pos._y ;
													this._z	=	pos._z ;
												},
									GetRegion:	function()
												{
													return this.regionHelper.GetRegion(this._x, this._y)  ;
												},
									IsAlive:	function()
												{
													return true ;
												},
									GetVectorPosition:	function()
														{
																this.vPos.SetXyzw(this._x, this._y, this._z) ;
																return this.vPos ;
														},
									GetPosition: function()
												{
													return {_x: this._x, _y:this._y, _z: this._z}
												},
									update: function(dt)
											{
												this._x	=	this._x + this.vx*dt ;
												this._y	=	this._y + this.vy*dt ;
												this.bound() ;

												this.vx	=	this.vx*0.90 ;
												this.vy	=	this.vy*0.90 ;


											},
									render:	function(rHelper)
											{
												this.renderdebug(rHelper) ;

											},
									renderdebug:
											function(rHelper)
											{
												var region = this.GetRegion() ;
												rHelper.drawText("player: region:"+region+" pos: "+Math.floor(this._x)+","+Math.floor(this._y),this._x+10,this._y,[255,255,255],{vertical:"bottom",horizontal:"left"}) ;
												rHelper.drawCircle(this._x, this._y,10,[255,255,0]) ;
												rHelper.drawCircle(this._x, this._y,4,[255,0,0]) ;

											},
									bound:	function()
											{
												var lx	=	this._boundx, ly = this._boundy ;
												this._x		=	Math.max(0, Math.min(this._x,lx)) ;
												this._y		=	Math.max(0, Math.min(this._y,ly)) ;
											},
									moveup:	function()
											{
												this.move(0,-this.VY) ;
											},
									movedown:
											function()
											{
												this.move(0,this.VY) ;
											},
									moveleft:
											function()
											{
												this.move(-this.VX,0) ;
											},
									moveright:
											function()
											{
												this.move(this.VX,0) ;
											},

									move: 	function(dx,dy)
											{
													this.vx	=	dx && dx*this.VX || this.vx ;
													this.vy	=	dy && dy*this.VY || this.vy ;
											},
								}
		// Camera 'Orbitor' object which orbits around our tilemap - created from a Bezier curve array 'bezRelTable'
		cameraOrbitor		=	new Orbitor(bezRelTable,tmap.GetDimensions().X(),tmap.GetDimensions().Y())

		player				=	playerhelicopter ;


		//enemyarray,player,screendim,mapdim,callback

		var screenDim		=	{ X: function() { return DISPLAYWIDTH ; }, Y: function() { return DISPLAYHEIGHT ; }, className:'Dimensions' } ;
		camera				=	Camera.Create(screenDim,tmap.GetDimensions()) ;
		var aimAt			=	camera ;

		PathManager.Init(ExampleLevelData.paths) ;
		EnemyManager.Init(ExampleLevelData.enemies,aimAt,camera,screenDim,tmap.GetDimensions()) ;

		// follow  player,cameraOrbitor or one of the enemies

		// here - we select the last enemy in our list - we have delibrately ordered our enemy data
		// so that the last nasty is a flying object.

		var lastEnemy	=	EnemyManager.GetEnemy(EnemyManager.GetSize() - 1) ;
		var	followlist	=	[lastEnemy, cameraOrbitor, player, playerhelicopter] ;

		follow = followlist[0] ;

		camera.Follow(follow ,true) ;

		MissileManager.Init(follow) ;
		BulletManager.Init() ;
		AnimationManager.Init() ;
		ExplosionManager.Init() ;

		AnimationManager.Add(new Animation({texture:"smoke_loop.png",x:2024,y:2424,loop:true,bounce:false,scale:4,timeout:65},playNow),MAPOVERLAY) ;

		//AnimationManager.Add(new Animation({x:400,y:700,loop:true,bounce:true},playNow),MAPOVERLAY) ;
		//AnimationManager.Add(new Animation({x:500,y:700,loop:true,bounce:true,scale:3,timeout:10},playNow),MAPOVERLAY) ;
		//AnimationManager.Add(new Animation({x:600,y:700,loop:true,bounce:true},playNow),MAPOVERLAY) ;
		//AnimationManager.Add(new Animation({x:700,y:700,loop:true,bounce:true,scale:4},playNow),MAPOVERLAY) ;
		//AnimationManager.Add(new Animation({x:3600,y:3180,loop:true,bounce:true,scale:4},playNow),MAPOVERLAY) ;
		//AnimationManager.Add(new Animation({x:64,y:64,loop:true,bounce:true,scale:1},playNow),HUDOVERLAY) ;

		// start off our banner messages  - 4 seconds from now

		eventmgr.addSingleShotEvent(cbF,"",4)


		var ctx 		=	document.getElementById("canvasBuffer1").getContext("2d") ;
		var rHelper 	= 	new RenderHelper(ctx,ctx,DISPLAYWIDTH,DISPLAYHEIGHT) ;

		eventmgr.addSingleShotEvent(function(music) {
										if (music) {
											music.play() ;
										}
									},document.getElementById('mainmusic'),4) ;


		MessageManager.Init() ;

		InitHotspots() ;


		document.getElementById("c1").onmousedown = function( e )
			{
			//	console.log( e ) ;
			}

		window.addEventListener('keydown',doKeyDown,true);

		requestAnimFrame(update) ;


		// End of Main Code



		// Optional Hotspot Trigger condition - return true if trigger condition met.
		function CheckIt()
		{
			_debugPrint("THUNDER CHECK IT!")
			return true
		}

		// Hotspot Events

		function TriggerThunderEvent()
		{
			alert("TriggerThunderEvent")
		}

		function TriggerRobeEvent()
		{
			alert("TriggerRobeEvent")
		}

		function TriggerShadowEvent()
		{
			alert("TriggerShadowEvent")
		}

		function TriggerPotsEvent()
		{
			alert("TriggerPotsEvent")
		}

		function TriggerScreamEvent()
		{
			alert("TriggerScreamEvent")
		}


		// Initialise 2D hotspots and attach trigger conditions

		function InitHotspots()
		{
			var	HOTSPOT_ROBE			=	hotSpots.QHOTSPOT_ROBE
			var	DURATION_TRG_ROBE		=	5
			var	PCHANCE_ROBE			=	10

			var	HOTSPOT_THUNDER			=	hotSpots.QHOTSPOT_THUNDER
			var	DURATION_TRG_THUNDER	=	5
			var	PCHANCE_THUNDER			=	40

			var	HOTSPOT_SHADOW			=	hotSpots.QHOTSPOT_SHADOW
			var	DURATION_TRG_SHADOW		=	7
			var	PCHANCE_SHADOW			=	100

			var	HOTSPOT_POTS			=	hotSpots.QHOTSPOT_POTS
			var	DURATION_TRG_POTS		=	8
			var	PCHANCE_POTS			=	10

			var	HOTSPOT_SCREAM			=	hotSpots.QHOTSPOT_SCREAM
			var	DURATION_TRG_SCREAM		=	10
			var	PCHANCE_SCREAM			=	90

			TriggerManager.Init()
			TriggerManager.Add(Trigger.Create(HOTSPOT_THUNDER,[ObserverEvent.Create(DURATION_TRG_ROBE,PCHANCE_ROBE,TriggerThunderEvent,CheckIt)]))
			TriggerManager.Add(Trigger.Create(HOTSPOT_ROBE,[ObserverEvent.Create(DURATION_TRG_THUNDER,PCHANCE_THUNDER,TriggerRobeEvent)]))
			TriggerManager.Add(Trigger.Create(HOTSPOT_SHADOW,[ObserverEvent.Create(DURATION_TRG_SHADOW,PCHANCE_SHADOW,TriggerShadowEvent)]))
			TriggerManager.Add(Trigger.Create(HOTSPOT_POTS,[ObserverEvent.Create(DURATION_TRG_POTS,PCHANCE_POTS,TriggerPotsEvent)]))
			TriggerManager.Add(Trigger.Create(HOTSPOT_SCREAM,[ObserverEvent.Create(DURATION_TRG_SCREAM,PCHANCE_SCREAM,TriggerScreamEvent)]))

		}


		function AddMessage(message,xstart,ypos,xend,pool)
		{
			var sb		=	SpringBox.Create(xend,ypos,xstart,1,12,100,5)
			MessageManager.Add(Message.Create(message,sb,5),pool)
		}

		function doKeyDown(evt){
			var charCode = evt.which;
			var charStr = String.fromCharCode(charCode);
			//console.log( charStr ) ;
		}


		// Main update loop - update game objects and then
		// go own to render

		function update()
		{
			now				=	new Date().getTime() ;
			var timeDiff 	= 	Math.min(80,now - lastTime) ;
			lastTime		=	now ;
			totalTime		=	totalTime + timeDiff ;		// total time in milliseconds

			dtSamples++ ;
			avDT			=	(totalTime / dtSamples)/1000 ;

			updateGame(avDT) ;
			drawDoubleBuffer() ;

			requestAnimFrame(update) ;

		}

		var mouseObject	=
		{
				pos: Vector4.Create(),
				GetVectorPosition: function()
				{
					this.pos.SetXyzw(mousex,0,mousey) ;
					return this.pos ;
				}
		}

		function updateGame(dt)
		{
			gameTime		=	gameTime + dt ;

			WorldClock.Update(dt) ;

			MessageManager.Update(dt)

			TriggerManager.Update(dt,mouseObject) ;		// Update Trigger Manager - use mouseObject to check if our mouse
			 											// is within any defined hotspots

			eventmgr.Update(dt) ;						// update event manager - (used for banner display messages)

			AnimationManager.Update(dt) ;				// Animations

			EnemyManager.Update(dt) ;					// Move nasties
			BulletManager.Update(dt) ;					// Move Bullets
			MissileManager.Update(dt) ;					// Move Missiles

			ExplosionManager.Update(dt) ;				// Update Explosions (Wrapper to Animation Manager)

			// Update Player if being followed

			if (camera.IsFollowing(player))
			{

				var dx	=	0, 	dy	=	0 ;
				var ax	=	0, 	ay	=	0 ;

				if (KeyBoardHandler.isPressed("right"))
				{
					dx	=	1 ;
				}
				else
				if (KeyBoardHandler.isPressed("left"))
				{
					dx	=	-1 ;
				}
				if (KeyBoardHandler.isPressed("up"))
				{
					dy	=	-1 ;
				} else
				if (KeyBoardHandler.isPressed("down"))
				{
					dy	=	1 ;
				}

				if (KeyBoardHandler.isPressed("axisRight"))
				{
					ax	=	0.6 ;
				}
				else
				if (KeyBoardHandler.isPressed("axisLeft"))
				{
					ax	=	-0.6 ;
				}
				else
				if (KeyBoardHandler.isPressed("axisUp"))
				{
					ay	=	-0.6 ;
				}
				else
				if (KeyBoardHandler.isPressed("axisDown"))
				{
					ay	=	0.6 ;
				}
				if (KeyBoardHandler.isPressed("axisDiagUpRight"))
				{
					ax	=	0.6 ;
					ay	=	-0.6 ;

				}
				else
				if (KeyBoardHandler.isPressed("axisDiagUpLeft"))
				{
					ax	=	-0.6 ;
					ay	=	-0.6 ;
				}
				else
				if (KeyBoardHandler.isPressed("axisDiagDownLeft"))
				{
					ax	=	-0.6 ;
					ay	=	0.6 ;
				}
				else
				if (KeyBoardHandler.isPressed("axisDiagDownRight"))
				{
					ax	=	0.6 ;
					ay	=	0.6 ;
				}

				player.AxisMove(dx,dy)
		        player.AngleMove(ax,ay) ;
				player.update(dt) ;
			}


			camera.Update(dt) ;

			var camerapos	=	 camera.GetTopLeft() || {x:0,y:0};
			nearestToMouse	=	EnemyManager.GetNearest(camerapos.x + mouseX ,camerapos.y + mouseY ,120*120) ;

		}


		function drawDoubleBuffer()
		{
			// Double Buffer  -
			rHelper.flipBuffer() ;
			draw() ;
		}


		function draw()
		{

			var camerapos	=	 camera && camera.GetTopLeft() || {x:0,y:0};
			var	xpos		=	camerapos.x ;
			var ypos		=	camerapos.y ;

			// Render our tilemap relative from camera position
			rHelper.setOverlay(0) ;
			tmap.Render(rHelper,xpos,ypos)

			// Draw These Sprites relative to current tilemap position

			rHelper.setOverlay(MAPOVERLAY) ;
			rHelper.camera2dSetPostition(xpos,ypos) ;


			//PathManager.Render(rHelper) ;
			//cameraOrbitor.Render(rHelper) ;

			EnemyManager.Render(rHelper) ;
			BulletManager.Render(rHelper) ;
			ExplosionManager.Render(rHelper) ;
			MissileManager.Render(rHelper) ;

			// Render Circle around nearest Enemy object.
			if (nearestToMouse)
			{
				var pos 	=	nearestToMouse.GetPosition() ;
				rHelper.drawCircle(pos._x,pos._y,120,[255,0,0]) ;

			}

			// If Camera is following our 'player' - render that.

			if (camera.IsFollowing(player))
			{
				player.render(rHelper) ;
			}

			// Debug - render camera object
			camera.Render(rHelper) ;

			// Render INFO text on top section of screen

			rHelper.setOverlay(1) ;

			//rHelper.drawText("tx,ty = "+xpos+", "+ypos,DISPLAYWIDTH*0.5,20,[0,90,0]) ;
			var textAlpha		=	0.5 ;
			var cAlpha			=	0.65 + 0.35*Math.sin(gameTime*6*0.25) ;

			if (!camera.IsFollowing(player))
			{
				rHelper.drawText("CLICK ON MAP TO USE ARROW KEYS TO SCROLL",DISPLAYWIDTH*0.5,60,[255,255,255],{horizontal:"center",vertical:"top"},"italic 20pt Calibri",textAlpha) ;
			} else {
				var ty		=	6*Math.sin(gameTime*6*5) ;
				rHelper.drawText("USE ARROW KEYS,Q,W,E,A,D,Z,X & C - OR CLICK ON OBJECT TO FOLLOW.",DISPLAYWIDTH*0.5,60+ty,[255,255,255],{horizontal:"center",vertical:"top"},"italic 20pt Calibri",cAlpha) ;
			}
			rHelper.drawText("RETRO GAME DEMO - (C) JOHN WILSON 2012",DISPLAYWIDTH*0.5,10,[255,255,0],{horizontal:"center",vertical:"top"},"italic 30pt Calibri",cAlpha) ;
			rHelper.drawText("DEMO PURPOSES ONLY. GRAPHICS ARE COPYRIGHT SEGA",DISPLAYWIDTH*0.5,100,[0,0,0],{horizontal:"center",vertical:"top"},"italic 16pt Calibri",textAlpha) ;

			rHelper.drawText(hCodeRH+":jwilson:"+"2019",10,560,[255,255,255],{horizontal:"left",vertical:"top"},"italic 8pt Calibri",cAlpha) ;


			render3Ddemo() ;


			rHelper.setOverlay(MAPOVERLAY-1) ;

			//drawTextAlignmentTest(rHelper)
			// Draw Hotspots
			//for (var hsIdx in hotSpots)
			//{
			//	var hs 	=	hotSpots[hsIdx] ;
			//	hs.Render(rHelper)
			//}


			MessageManager.Render(rHelper)
			AnimationManager.Render(rHelper) ;

			if (viewingTime > 0 && gameTime > viewingTime) {
				rHelper.clearRect([255,0,0],0.8) ;
				rHelper.drawText("HI THERE- I WOULD LOVE TO KNOW WHO LOOKS AT MY DEMOS!",DISPLAYWIDTH/2,DISPLAYHEIGHT/2,[255,255,255],{vertical:"middle",horizontal:"center"},"italic 16pt Calibri",1);
				rHelper.drawText("DROP ME AN EMAIL @ johnnyw66@gmail.com for a hashkey to remove this red canvas. TNX - John",DISPLAYWIDTH/2,40+DISPLAYHEIGHT/2,[255,255,255],{vertical:"middle",horizontal:"center"},"italic 16pt Calibri",1);
			}

		}

		function render3Ddemo()
		{

			if (_3dviewer)
			{
				dodecaAngle		=	0 ; //180*Math.sin(gameTime*6*0.125) ;
				var	tCam		=	Math.abs(Math.sin(gameTime*6*0.125)) ;

				//var camPos	=	Vector4.Create() ;
				//camPos.Multiply(camDir,tCam) ;
				//camPos.Add(camPos,camStart) ;
				//_3dcam.SetPosition(camPos) ;
				//_3dcam.MoveForward(Math.sin(gameTime*6*0.125)) ;
				//dodecaEntity.SetRotation(Vector4.Create(0,dodecaAngle,0)) ;

				var gt	=	gameTime	;
				var rad	=	40 ;
				cubeEntity.SetPosition(Vector4.Create(rad*Math.sin(gt),0,-rad*Math.cos(gt))) ;
				cubeEntity.SetRotation(Vector4.Create(0,-gt*180/Math.PI,0)) ;
				bigEntity.SetRotation(Vector4.Create(gt*180/Math.PI,-gt*180/Math.PI,0)) ;


				//cubeEntity.RenderDebug(rHelper,100,100) ;
				_3dviewer.Render(rHelper) ;

			}

		}

		function drawTextAlignmentTest(rHelper)
		{

			var	testColour	=	"#00FF00" ;
			rHelper.drawText("HELLO BOTTOM RIGHT JUSTIFY",DISPLAYWIDTH,DISPLAYHEIGHT,testColour,{vertical:"bottom",horizontal:"right"});
			rHelper.drawText("HELLO TOP LEFT JUSTIFY",0,0,testColour,{vertical:"top",horizontal:"left"});
			rHelper.drawText("HELLO MIDDLE,CENTRE(CENTER) JUSTIFY",DISPLAYWIDTH/2,DISPLAYHEIGHT/2,testColour,{vertical:"middle",horizontal:"center"});
		}

	} ;
