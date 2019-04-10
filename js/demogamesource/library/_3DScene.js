//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function _3DScene(floor)
{
	this.floor		=	floor ;
	this.entities	=	new Array() ;
	this.className	=	_3DScene.className ;
	this.Init() ;
}

_3DScene.className			=	"_3DScene"

_3DScene.Create				=	function(floor)
								{
									return new _3DScene(floor) ;
								} ;

_3DScene.prototype	=
{


	constructor:	_3DScene,

	Init:			function()
					{
						this.entities	=	new Array() ;
						if (this.floor) 
						{
							this._AddFloor() ;
						}
					},

	_AddFloor:		function()
					{
						var floormodel	= _3DModel.CreateFloor(4,4,16,0,-8,-32)
						var entity		= _3DEntity.Create()
						entity.SetModel(floormodel)
						entity.SetPosition(Vector4.Create(0,0,0))
						this.Add(entity)
					},

	Add:			function(entity)
					{
						this.AddEntity(entity)
					},

	AddEntity:		function(entity)
					{
						this.entities.push(entity) ;
					},

	RemoveEntity:	function(entity)
					{
						for (var idx in this.entities) 
						{
							var ent =	this.entities[idx] ;
							if (!entity && ent == entity) 
							{
								this.entities[idx] = nil ;
								return ;
							}
		
						}
					},

	GetEntities:	function()
					{
						return this.entities ;
					},

	toString:		function()
					{
						return "_3DScene.toString" ;
					},

	
}
