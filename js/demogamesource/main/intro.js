var executeIntro =

		function(keyboardhandler,intros)
		{
			var eventmgr		=	new EventManager() ;
			var numSprites		=	320 ;
			var DISPLAYWIDTH 	=	document.getElementById('canvasBuffer1').width ;
			var DISPLAYHEIGHT 	=	document.getElementById('canvasBuffer1').height ;
			var sprImage		=	new ImageResource("cute.png").getImage() ;
			var sprSheetAnim	=	RenderHelper.CreateTextureAnimation(8,4,"explosionuv64.png",22) ;

			var radius			=	200 ;
			var totalTime		=	0 ;
			var gTime			=	0 ;
			var now,dtSamples	=	0 ;
			var lastTime		=	new Date().getTime()  ;
			var	ctx				=	document.getElementById("canvasBuffer1").getContext("2d") ;
			var llist			=	new LinkedList() ;
			var rHelper 		= 	new RenderHelper(ctx,ctx,DISPLAYWIDTH,DISPLAYHEIGHT) ;

			var defaultInfo = [
				"* Basic 2D API - (my first attempt with HTML 5, Javascript)",
				"* 16 Render Layers, each with own Camera Rendering Properties",
				"* Hotspot, Animation, Event and TileMap Managers",
				"* TileMap produced using DAME editor",
				"* Spline and Vector Paths",
				"* Sprite Animation - Sprite 'Sheets' or individual frames",
				" ",
				" ",
				"email: johnnyw66@gmail.com, ph: 01273 555934"
			] ;

			var info = (typeof intros == 'undefined' ? defaultInfo : intros) ;

			document.getElementById("canvasBuffer1").style.display = "" ;
//			document.getElementById("canvasBuffer2").style.display = "none" ;

			eventmgr.addSingleShotEvent(function() {
				window.location.reload() ;
			},null,8)

		//	Vector4.Test() ;
			update() ;
			sprSheetAnim.play(true,false) ;

			function update()
			{
				now				=	new Date().getTime() ;
				var timeDiff 	= 	now - lastTime ;
				lastTime		=	now ;
				totalTime		=	totalTime + timeDiff ;		// total time in milliseconds

				dtSamples++ ;
				var avDT			=	(totalTime / dtSamples)/1000 ;

				gTime				=	gTime + (avDT) ;

				var freq			=	6*0.5 ;

				rHelper.clearRect([255,255,255]) ;


				eventmgr.Update(avDT) ;

				rHelper.drawText("PLEASE WAIT..ABOUT TO RELOAD RETRO DEMO PAGE",DISPLAYWIDTH*0.5,DISPLAYHEIGHT*0.5-80,[0,0,0],{horizontal:"center",vertical:"top"},"italic 20pt Calibri") ;

				sprSheetAnim.update(avDT) ;
				sprSheetAnim.render(rHelper,512,100,2,2) ;



				for (var idx in info)
				{
					rHelper.drawText(info[idx],100,DISPLAYHEIGHT*0.5+idx*20,[0,0,0],{horizontal:"left",vertical:"top"},"italic 12pt Calibri" ) ;
				}


				requestAnimFrame(update) ;

			}



} ;
