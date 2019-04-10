//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt
var	BULLET_EXPLODE_OFFSETX	=	0 ;
var	BULLET_EXPLODE_OFFSETY	=	0 ;
var	BULLET_EXPLODE_OFFSETZ	=	0 ;
var	BULLET_DEFAULT_STRENGTH	=	100 ;
var BULLET_DEFAULT_DAMAGE	=	10 ;
var BULLET_DEFAULT_RADIUS	=	4 ;
var BULLET_EXPLODEOFFSETX	=	0 ;
var BULLET_EXPLODEOFFSETY	=	0 ;
var BULLET_EXPLODEOFFSETZ	=	0 ;

function rad(deg)
{
	return deg*Math.PI/180 ;
}


function MakeDirectionVectorPair(angle,xpos,ypos,size)
{
	var rsize = size || 1 ;
	var ny= -rsize*Math.sin(rad(angle + 90)) ;
	var nx= -rsize*Math.cos(rad(angle + 90)) ;
	return {x:xpos+nx, y:ypos+ny, z: 0} ;
}

function Bullet(owner,damage,vel,angle,duration,animation,scale,radius)
{
	
	var	cos			=	Math.cos(angle*Math.PI/180) ;
	var sin			=	Math.sin(angle*Math.PI/180) ;
	
	var owneroffset	=	owner && owner.GetFiringOffset ? owner.GetFiringOffset() : {x:0, y:0, z:0} ;
	var ownerpos	=	owner.GetPosition() ;
	var x			=	ownerpos._x, y = ownerpos._y, z = ownerpos._z ;
	var ox			=	owneroffset.x, oy = owneroffset.y, oz = owneroffset.z ;
	
	this._owner		=	owner ;
	
	this._damage	=	damage || BULLET_DEFAULT_DAMAGE ;
	this._initVel	=	vel ;
	this._angle		=	angle ;
	this._duration	=	duration ;
	this._animation	=	animation ;
	this._scale		=	scale || 1 ;
	this._radius	=	radius || BULLET_DEFAULT_RADIUS ;

	var	tox			=	ox*cos - oy*sin ;
	var	toy			=	ox*sin + oy*cos ;
		
	
	this._x			=	x +  tox;
	this._y			=	y +  toy ;
	this._z			=	z +  oz  ;
	
	
	this._yvel		=	-vel * cos ;
    this._xvel		=	vel * sin ;
    
	this._time		=	0 ;
	this._strength	=	BULLET_DEFAULT_STRENGTH ;
	this.className	=	Bullet.className ;
	this._animation.play(true,true) ;
}

Bullet.className		=	'Bullet' ;

Bullet.Create = function()
{
	return	new Bullet() ;
}

Bullet.prototype = {
		constructor:	Bullet,
		
		Update:			function(dt,player)
						{
							var	dx		=	dt*this._xvel, dy = dt*this._yvel ;

							this._time	=	this._time + dt ;
							this._x 	=	this._x + dx ;
							this._y		= 	this._y + dy ;
							
							if (this._animation)
							{
								this._animation.update(dt) ;
							}

							var bx			=	this._x, by	=	this._y ;

							if (this._owner.className == 'Player')
							{
								var enemy	=	EnemyManager.IsColliding(bx,by,0) ;
								if (enemy)
								{
									enemy.ApplyDamage(this._damage) ;
									this.ApplyDamage(300) ;
								}
								
							} else 
							{
								if (player && player.IsColliding(bx,by))
								{
									player.ApplyDamage(this._damage) ;
									this.ApplyDamage(300) ;
								}
							}
								
						},
	
		Render: 		function(rHelper)
						{
							
							this._animation.render(rHelper,this._x,this._y,1,1,this._angle) ;
							//rHelper.drawCircle(this._x,this._y,2,[255,255,255]) ;
						},
		

		GetExplodeOffset: 	
						function()
						{
							return {x:BULLET_EXPLODEOFFSETX, y:BULLET_EXPLODEOFFSETY, z:BULLET_EXPLODEOFFSETZ,className:"ExplodeOffset"} ;
						},
						
		ApplyDamage: 	function(damage)
						{
					        this._strength = this._strength - (damage || 0) ;
					        if (!damage || this._strength < 0) 
							{
					         	this.Explode() ;
					        }
					
						},
						
		Explode: 		function()
						{
							var expo		=	this.GetExplodeOffset() ;
							var xpos		=	this._x+expo.x, ypos	=	this._y + expo.y, zpos = this.z + expo.z ;
					    	ExplosionManager.AddExplosion({x: xpos, y: ypos , z: zpos, texture:"bullethits", framesvert:2,frameshor:4,loop:false,bounce:false,scale:1},7) ;
						},
		
		GetCollisionObject: 	
						function()
						{
							return {x:this._x, y:this._y, z:this._z, radius:this._radius, className:"BulletCollisionObject"} ;	
						},
						
		GetPosition: 	function()
						{
							return {x:_this.x, y:this._y, z:this._z} ;
						},
						
		GetType: 	function()
						{
							return this.owner ? this.owner.className  : 'UNKNOWN' ;
						},

		IsFree:		function()
						{
							return this._time < this._duration ;
						},
						
		IsAlive:		function()
		 				{
							return !this.IsFree() ;
						},
		
		toString:		function()
						{
							return "Bullet" ;
						}

}

BulletManager					=	{} ;

BulletManager.clist				=	new LinkedList()  ;

BulletManager.Init				=	function()
									{
										BulletManager.clist				=	new LinkedList()  ;
										
									}
BulletManager.Add				=	function(bullet)
									{
										var list 	=	BulletManager.clist	 ;
										list.Add(bullet) ;
										return bullet ;
									}

BulletManager.Update			=	function(dt)
									{
										var removeList	=	new LinkedList() ; 

										var list 		=	BulletManager.clist	;
										for (var it = list.Iterator() ; it.HasElements() ; it.Next())
										{
											var bulletEl = it.GetCurrent() ;
											
											var bullet	= bulletEl.GetData() ;
											if (!bullet.IsAlive())
											{
												bullet.Update(dt) ;
											} else
											{
												removeList.Add({list:list,element:bulletEl}) ;
											}	
											
										}
										
										// finished updating - now remove those that have finished.
										for (var it = removeList.Iterator(true) ; it.HasElements() ; it.Next())
										{
											var removeInfo = it.GetCurrent() ;
											removeInfo.list.Remove(removeInfo.element) ;
											removeInfo.element.GetData().ApplyDamage() ;
										}
										
									}

BulletManager.Render			=	function(rHelper)
									{
										var list 	=	BulletManager.clist	 ;
										for (var it = list.Iterator(true) ; it.HasElements() ; it.Next())
										{
											var bullet = it.GetCurrent() ;
											bullet.Render(rHelper)
										}
									}
									
BulletManager.Size				=	function()
									{
										var size = BulletManager.clist.Size() ;
										return size ;
									}
									
BulletManager.Fire				=	function(owner,damage,vel,angle,duration,animation,scale,radius)
									{
											return BulletManager.Add(new Bullet(owner,damage,vel,angle,duration,animation,scale,radius)) ;
									}
									
