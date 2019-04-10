//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function assert(b,str)
{
	if (!b)
	{
		return alert("ASSERT: "+str)
	}
}

function Vector4(x,y,z,w)
{
	this._x = x || 0 ;
	this._y = y || 0 ;
	this._z = z || 0 ;
	this._w = w || 0 ;
	this.className	=	Vector4.className ;
	
}

Vector4.className	=	'Vector4' ;

Vector4.Create = function(x,y,z,w)
{
	if (x != undefined && y == undefined) {
		return Vector4._CreateVector(x) ;
	} else {
		return Vector4._CreateScalar(x,y,z,w) ;
	}
}

Vector4.CreateBroadcast=function(number)
{
	var v = new Vector4()
	v.SetBroadcast(number)
	return v ;
}

Vector4._CreateVector=function(v)
{

	var x = (v && v.X()) || 0 ;
	var	y = (v && v.Y()) || 0 ;
	var	z = (v && v.Z()) || 0 ;
	var	w = (v && v.W()) || 0 ;
	
	return new Vector4(x,y,z,w) ;
}

Vector4._CreateScalar=function(x,y,z,w)
{
	return new Vector4(x,y,z,w) ;
}

Vector4.Multiply	=	function(dst,src,scale)
{
	return dst.Multiply(src,scale) ;
}

Vector4.Dot3	=	function(v1,v2)
{
	return v1.Dot3(v2) ;
}

Vector4.Dot2	=	function(v1,v2)
{
	return v1.Dot2(v2) ;
}

Vector4.Normal2	=	function(v)
{
	return v.Normal2() ;
}

Vector4.Normalise3	=	function(v)
{
	v.Normalise3() ;
}

Vector4.Normalize3	=	function(v)
{
	v.Normalise3() ;
}

Vector4.Normalise2	=	function(v)
{
	v.Normalise2() ;
}

Vector4.Normalize2	=	function(v)
{
	v.Normalise2() ;
}


Vector4.Cross	=	function(dst,v1,v2)
{
	dst.Cross(v1,v2) ;
	
}

Vector4.Length4	=	function(v1)
{
	return v1.Length4(v1) ;
	
}

Vector4.Length3	=	function(v1)
{
	return v1.Length3(v1) ;
	
}

Vector4.Length2	=	function(v1)
{
	return v1.Length2(v1) ;
	
}

Vector4.Add	=	function(dst,v1,v2)
{
	dst.Add(v1,v2) ;
	
}

Vector4.Subtract	=	function(dst,v1,v2)
{
	dst.Subtract(v1,v2) ;
	
}

Vector4.Subtract	=	function(dst,v1,v2)
{
	dst.Subtract(v1,v2) ;
	
}

Vector4.X			=	function(v)
{
	return v.X() ;
}			

Vector4.Y			=	function(v)
{
	return v.Y() ;
}			

Vector4.Z			=	function(v)
{
	return v.Z() ;
}			

Vector4.W			=	function(v)
{
	return v.W() ;
}			

Vector4.TransformPoint	=	function(dest,matrix,source)
{
		dest.TransformPoint(matrix,source) ;
}
							

Vector4.Calculate2dLineIntersection	=	function( intersectionPoint,  p0,  p1,  q0,  q1,  infiniteLine )
{
	return intersectionPoint.Calculate2dLineIntersection( intersectionPoint,  p0,  p1,  q0,  q1,  infiniteLine ) ;
}

Vector4.Test	=	function()
{
	var tmp = Vector4.Create()
	
	Vector4.Add(tmp,Vector4.Create(1,2,3),Vector4.Create(6,7,8)) 
	alert("Result1 = "+tmp)
	Vector4.Normalise3(tmp)
	alert("Result2 = "+tmp)
	alert("Unit Result3  = "+Vector4.Length3(tmp))
	Vector4.Subtract(tmp,Vector4.Create(7,9,11),Vector4.Create(6,7,8)) 
	alert("Result4 = "+tmp)
	
	
}

Vector4.prototype = {

	
	constructor:	Vector4,
	
	SetBroadcast:	function(val)
	{
		this.SetXyzw(val,val,val,val)
	},
	
	X:	function()
	{
		return this._x
	},
	
	Y:	function()
	{
		return this._y
	},
	
	Z:	function()
	{
		return this._z
	},
	
	W:	function()
	{
		return this._w
	},
	
	SetX:	function(val)
	{
		this._x = val
	},
	
	
	SetY:	function(val)
	{
		this._y = val
	},
	
	SetZ:	function(val)
	{
		this._z = val
	},
	
	SetW:	function(val)
	{
		this._w = val
	},
	
	SetXyzw:	function(x,y,z,w)
	{
		this.SetX(x || 0)
		this.SetY(y || 0)
		this.SetZ(z || 0)
		this.SetW(w || 0)
	},
	
	Copy:	function(source)
	{
		this._x	= 	source._x 
		this._y	= 	source._y
		this._z	=	source._z
		this._w	=	source._w
	},

	Subtract:	function(v1,v2)
	{
		this._x 	=	v1._x - v2._x
		this._y		=	v1._y - v2._y
		this._z		=	v1._z - v2._z
		this._w		=	v1._w - v2._w
	},
	
	Add:	function(v1,v2)
	{

		this._x 	=	v1._x + v2._x
		this._y		=	v1._y + v2._y
		this._z		=	v1._z + v2._z
		this._w		=	v1._w + v2._w
	},
	
	Divide:	function(dst,src1,src2)
	{
		assert(false,"Vector4.Divide: NOT YET IMPLEMENTED")
	},
	
	Cross:	function(src1,src2)
	{
		this._x = ( src1._y * src2._z ) - ( src1._z * src2._y ) 
		this._y = ( src1._z * src2._x ) - ( src1._x * src2._z ) 
		this._z = ( src1._x * src2._y ) - ( src1._y * src2._x )
	},
	
	Multiply:	function(src,scale)
	{
		// TODO VARIATIONS
		this._x	=	src._x * scale
		this._y	=	src._y * scale
		this._z	=	src._z * scale
	},

	ScaleXXX:	function(scale)
	{
		this._x	=	this._x * scale
		this._y	=	this._y * scale
		this._z	=	this._z * scale
	},

	Length4:	function()
	{
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
	},

	Length3:	function()
	{
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z)
	},
	
	Length2:	function()
	{
		return Math.sqrt(this._x * this._x + this._y * this._y)
	},
	
	mag:	function()
	{
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
	},
	
	Normal2:	function()
	{
		var v = Vector4.Create(this)
		v._z = 0
		v._w = 0
		v.Normalise2()
		return v
	},
	
	Normal3:	function()
	{
		var v = Vector4.Create(this)
		v._w	 = 0
		v.Normalise3()
		return v
	},
	
	Normal4:	function()
	{
		var v = Vector4.Create(this)
		v.Normalise4()
		return v
	},
	
	Normalise2:	function()
	{
		var len  = this.Length2() ;
		//assert(len != 0,'Normalise2 - Attemp to Normalise with Zero Length Vector:'+this._toString())
		this.SetXyzw(this._x / len, this._y / len, this._z,this._w) ;
	},
	
	Normalize3:	function()
	{
		this.Normalise3()
	},
	
	Normalise3:	function()
	{
		var len  = this.Length3()
		assert(len != 0,'Normalise3 - Attemp to Normalise with Zero Length Vector:'+this._toString())
		this.SetXyzw(this._x / len, this._y / len, this._z / len,this._w)
	},

	Normalise4:	function()
	{
		var len  = this.Length4()
		assert(len != 0,'Normalise4 - Attemp to Normalise with Zero Length Vector:'+this._toString())
		this.SetXyzw(this._x / len, this._y / len, this._z / len,this._w / len) ;
	},


	Dot2:	function(v2)
	{
		return (this._x*v2._x + this._y*v2._y) ;
	},

	Dot3:	function(v2)
	{
		return (this._x*v2._x + this._y*v2._y + this._z*v2._z) ;
	},

	Dot4:	function(v2)
	{
		return (this._x*v2._x + this._y*v2._y + this._z*v2._z + this._w*v2._w) ;
	},
	

    toString:	function()
	{
       	return "Vector4: "+this._x+","+this._y+","+this._z+","+this._w ;
    },

    _toString:	function()
	{
		return this.toString()
    },

// TODO - CONVERT Transformation stuff
	Transform:	function(dest,matrix,source)
	{
		this._Transform(dest,matrix,source) ;
	},

	TransformVector:	function(dest,matrix,source)
	{
		this._Transform(dest,matrix,source,0) ;
	},

	TransformPoint:	function(matrix,source)
	{
		this._Transform(matrix,source,1) ;
	},
	
//	_Transform:	function(dest,matrix,source,defaultW)
//	{
//	},




	_Transform:	function(matrix,source,defaultW)
	{
		var dest	=	this ;
		
//		assert(matrix && matrix.className == Matrix44.className,'Vector4.TransformPoint - invalid matrix')	
		
		if (source && source.className && source.className == Vector4.className) 
		{
			//assert(dest && source,'Vector4.TransformPoint - invalid source/dest')
			tmpV.Copy(source)
			
			if (defaultW)  
			{
				tmpV.SetW(defaultW)
			}
			matrix._MultiplyVector(tmpV,dest)
		} else {
			//assert(dest && source && type(dest) == 'table' && type(source)=='table' and (#dest >= #source),'Vector4.TransformPoint - source/dest Invalid Tables')
			
			for (var idx = 0 ; idx < source.length ; source++)
			{
				var sourceV	=	source[idx] ;
				var destV	=	dest[idx] ;
				tmpV.Copy(sourceV)
				if (defaultW)  
				{
					tmpV.SetW(defaultW) ;
				}
				matrix._MultiplyVector(tmpV,destV) ;
			}
		}
		
	},

	// Gen Equation of 3D Line going through points P0 and P1
	// P0 + u(P1 - P0) (u is some constant)
	// Likewise for second line intersecting points Q0 and Q1
	// Q0 + z(Q1 - Q0) z is some constant
	// @ common intersect  P0+u(P1-P0) = Q0 + z(Q1-Q0)
	// u(P1-P0) - z(Q1-Q0) = Q0 - P0
	// In matrix form
	// Solve (u,v,1,1) =
	// |px  -qx 0  0|^-1		| qpx |		
  	// |py  -qy 0  0|		* 	| qpy |	
    // |pz  -qz 1 -1|			| qpz |		
    // |0    0  0  1|			| 1   |	
	// px,py,pz = Vector(P1-P0)
	// qx,qy,qz = Vector(Q1-Q0)
	// qpx,qpy,qpz = Vector(Q0-P0)

	// Ok, Ok!.. above eqn I formulated is slightly bollocked - seems to work in 2D only
	
	Calculate2dLineIntersection:	function( intersectionPoint,  p0,  p1,  q0,  q1,  infiniteLine )
	{
//		assert(intersectionPoint && intersectionPoint.className == Vector4.className,'Vector4.Calculate2dLineIntersection: Invalid Parameter intersectionPoint')
//		assert(p0 && p0.className == Vector4.className,'Vector4.Calculate2dLineIntersection: Invalid Parameter p0')
//		assert(p1 && p1.className == Vector4.className,'Vector4.Calculate2dLineIntersection: Invalid Parameter p1')
//		assert(q0 && q0.className == Vector4.className,'Vector4.Calculate2dLineIntersection: Invalid Parameter q0')
//		assert(q1 && q1.className == Vector4.className,'Vector4.Calculate2dLineIntersection: Invalid Parameter q1')
		
		var dirP = Vector4.Create(p1) ;
		dirP.Subtract(dirP,p0) ;
		var lenP = dirP.Length3() ;
		var ndirP = Vector4.Create(dirP) ;
		ndirP.Normalise3() ;
	
		var dirQ = Vector4.Create(q1) ;
		dirQ.Subtract(dirQ,q0) ;
		var ndirQ = Vector4.Create(dirQ) ;
		ndirQ.Normalise3() ;

		dirQ.Multiply(dirQ,-1) ;
		var lenQ = dirQ.Length3() ;
		

		// TODO Quick Check for Parallel lines - Cheaper than Det()

		var pDp = Vector4.Dot3(ndirQ,ndirP) ;

			
		var PQ	=	Vector4.Create(q0) ;
		PQ.Subtract(PQ,p0) ;
		
		var matrix = Matrix44.Create(dirP,dirQ,Vector4.Create(0,0,1,0),Vector4.Create(0,0,-1,1))
		matrix.Transpose() ;

		var det = matrix._Det() ;

		if (det == 0)  {
			// No Inverse matrix - no solution - ie. Par lines
			return {collide:false,u:-1,v:-1,z:-1,w:-1} ;
		}
		
		matrix.Invert(matrix) ;


		var u = Vector4.Dot3(matrix.GetRow(1),PQ) ;
		var v = Vector4.Dot3(matrix.GetRow(2),PQ) ;
		var z = Vector4.Dot3(matrix.GetRow(3),PQ) ;
		var w = Vector4.Dot3(matrix.GetRow(3),PQ) ;
		
		if ((z != 0) || (w != 0))  { return {collide:false,u:u,v:v,z:z,w:w} ; }

		intersectionPoint.Copy(dirP) ;
		intersectionPoint.Normalise3() ;
		intersectionPoint.Multiply(intersectionPoint,u*lenP) ; 
		intersectionPoint.Add(intersectionPoint,p0) ;
		
		if (!infiniteLine)  
		{
			return {collide:(u >=0 && u <=1 && v >= 0 && v <= 1),u:u,v:v,z:z,w:w} ;
		} else 
		{
			return {collide:true,u:u,v:v,z:z,w:w} ;
		}
		
	}
	
}
