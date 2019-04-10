//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt
// Used to render a scene with a given camera.
	
function _3DViewer(camera,scene,hide)
{
	this.camera	  	=	camera || _3DCamera.Create() ;
	this.scene	  	=	scene ;
	this.display	=	!hide ;
	this.className 	=	_3DViewer.className ;
	this.Init() ;
}

_3DViewer.className	=	"_3DViewer" ;

_3DViewer.Create	=	function(camera,scene,hide)
						{
							return new _3DViewer(camera,scene,hide) ;
						} ;
							

function _3DEntityBehindCamera(_3dentity,camera) 
{
			var pos		=	Vector4.Create(_3dentity.GetPosition()) ;
			var campos	=	camera.GetPosition() ;
			var zvector	=	camera.GetZVector()

			Vector4.Subtract(pos,pos,campos)
			return (Vector4.Dot3(pos,zvector) < 0) ;
}



_3DViewer.prototype =

{

	constructor:	_3DViewer,	
				
	Init:			function()
					{

					},

	SetScene:		function(scene)
					{
						this.scene	=	scene ;
					},

	Enable:			function()
					{
						this.display = true ;
					},

	Disable:		function()
					{
						this.display = false ;
					},

	IsEnabled:		function()
					{
						return this.display ;
					},


	SetCamera:		function(camera)
					{
						this.camera = camera ;
					},


	Render:			function(renderHelper)
					{
						var	scene 	=	this.scene ;
						var	display =	this.IsEnabled() ;
						var camera	=	this.camera ;
	
						if (scene && display) 
						{
							var _3dentities = scene.GetEntities() ;

							for (var idx in _3dentities) 
							{
									var _3dentity = _3dentities[idx] ;
									if (!_3DEntityBehindCamera(_3dentity,camera)) 
									{
										_3dentity.Render(renderHelper,this.camera) ;
									}
				
							}
						}

						if (camera) 
						{
							camera.Render(renderHelper) ;
						}
	
					},

	toString:		function()
					{
						return "_3DViewer.toString" ;
					},
	
}
