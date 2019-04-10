//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function Vector2(vx,vy)
{
		
	var t  			=  vy ? {x:vx,y:vy} : (vx ?{x:vx.x,y:vx.y}:{x:0,y:0}) ;
	this.vt			=	t		;
	this.x			=	t.x		;
	this.y			=	t.y		;
	this.className	=	'Vector2' ;
		
}
Vector2.Create = function(vx,vy)
{
	return new Vector2(vx,vy) ;
}

Vector2.prototype = {
	constructor:	Vector2,
	SetXyzw: 		function(x,y,z,w)
					{
						this.x	=	x ;
						this.y	=	y ;
					},
	toString:		function()
					{
						return this.className + " VX = "+ this.x + " VY = "+this.y
					}
	
}
