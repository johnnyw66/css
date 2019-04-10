//@header

function LinkedList()
{
	this._headr		=	null ;
	this._tail		=	null ;
	this._size		=	0 ;
	this.className	=	"LinkedList" ;

}

function LinkedObject(data)
{
	this._next		=	null	;
	this._prev		=	null	;
	this._data		=	data	;
	this.className	=	"LinkedObject" ;
}

LinkedObject.prototype	=
{

	constructor: LinkedObject,

	GetData:		function()
					{
						return this._data ;
					},
	GetNext:		function()
					{
						return this._next ;
					},
	GetPrevious:	function()
					{
						return this._previous ;
					}

}

LinkedList.prototype =
{

	constructor: LinkedList,

	Clear:			function()
					{
						this._headr	=	null ;
						this._tail	=	null ;
					},

	toArray:		function(rawdata)
					{
						var arr = new Array() ;

						for (var it 	=	this.Iterator() ; it.HasElements() ; it.Next())
						{
							var node	=	it.GetCurrent() ;
							arr.push(!rawdata ? node : node.GetData()) ;
						}
						return arr ;
					},
	Add:	 		function(data)
					{
						var obj 	=	new LinkedObject(data) ;
						var tail	=	this._tail ;
						var headr	=	this._headr;

						if (!tail)
						{
							this._headr =	obj ;
							this._tail 	=	obj ;
						} else
						{
							tail._next	=	obj ;
							obj._prev	=	this._tail ;
							this._tail	=	obj ;
						}
						this._size		=	this._size + 1 ;

						return obj ;
					},
	Size:			function()
					{
						return this._size ;
					},
	Iterator:		function(rawdata)
	 				{
						var raw			=	rawdata ;
						var header		=	this._headr ;
						var current		=	header ;

						return {


							Reset:			function()
											{
												current = header ;
											},

							Next:			function()
											{
												if (current)
												{
													current = current._next ;
												}
												return current ;
											},
							HasElements:	function()
											{
												return current ;
											},
							GetCurrent:     function()
											{
												return raw ? current.GetData() : current ;
											}
						}
					},

	Remove:			function(linkeddata)
					{

						//if (!linkeddata._prev && !linkeddata._next)
						//{
							//alert("OH NO! TRYING TO REMOVE A NON LINKED OBJECT! WHAT'S GOING ON? "+linkeddata.className+" size now "+this._size)
							//var obj = linkeddata._data ;
							//alert("l "+linkeddata._deleted) ;
						//}

						//assert(linkeddata instanceOf LinkedObject,'LinkedList.Remove - PARAMETER SHOULD BE A LinkedObject! SEE A CODE DOCTOR')
						var chead		=	this._headr ;
						var ctail		=	this._tail ;

						var prev		=	linkeddata._prev ;
						var next		=	linkeddata._next ;

						if (prev)
						{
							prev._next	=	next ;
						}

						if (next)
						{
							next._prev	=	prev ;
						}

						if (chead == linkeddata)
						{
							this._headr 	=	next ;
						}

						if (ctail == linkeddata)
						{
							this._tail		=	prev ;
						}

						this._size		=	this._size - 1 ;


						// make sure we can't remove it again!
						linkeddata._prev			=	null ;
						linkeddata._next			=	null ;
						linkeddata._deleted			=	"deleted" ;



					},

	AddArray:		function(arr)
					{
						for(var idx = 0 ; idx < arr.length ; idx ++)
						{
							var data = arr[idx] ;
							this.Add(data) ;
						}
					},

}

//@header

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
//@header

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
//@header

var MATRIX_REPLACE		=	1	;	//'MATRIX_REPLACE'
var MATRIX_POSTMULTIPLY	=	2	;	//'MATRIX_POSTMULTIPLY'
var MATRIX_PREMULTIPLY	=	3	;	//'MATRIX_PREMULTIPLY'

var defaultRow1	=	Vector4.Create(1,0,0,0)
var defaultRow2	=	Vector4.Create(0,1,0,0)
var defaultRow3	=	Vector4.Create(0,0,1,0)
var defaultRow4	=	Vector4.Create(0,0,0,1)

function Matrix44(scalex,scaley,scalez)
{
	this.m = [
				[1,0,0,0],
				[0,1,0,0],
				[0,0,1,0],
				[0,0,0,1],

			] ;

	this.scalex		=	scalex || 1 ;
	this.scaley		=	scaley || 1 ;
	this.scalez		=	scalez || 1 ;
	this.className	=	'Matrix44' ;

}

Matrix44.className	=	'Matrix44'


 	function NOT_YET_IMPLEMENTED(fName)
	{
		assert(false,("Matrix44 - FUNCTION Matrix44"+(fname || "")+" NOT YET IMPLEMENTED")) ;
	}


	Matrix44.Create =	function(v1,v2,v3,v4)
	{
		if (typeof v1 == 'object' )
		{
 			return Matrix44._CreateVectors(v1,v2,v3,v4) ;
		}
		else
		{
			return  Matrix44._CreateDefault(v1,v2,v3,v4) ;

		}
    }

	Matrix44._CreateDefault	=	function(scalex,scaley,scalez)
	{
		return new Matrix44(scalex,scaley,scalez) ;
	}



	Matrix44._CreateVectors	=	function(vx,vy,vz,vw)
	{
		var matrix = Matrix44._CreateDefault() ;
		Matrix44.SetRow(matrix,1,vx || defaultRow1)
		Matrix44.SetRow(matrix,2,vy || defaultRow2)
		Matrix44.SetRow(matrix,3,vz || defaultRow3)
		Matrix44.SetRow(matrix,4,vw || defaultRow4)
		return matrix
	}


	// Static methods

//	Matrix44.IsEqual		=	function(matrix1,matrix2,tolp)
	Matrix44.IsEqual		=	function(matrix1,matrix2,tolp)
	{
		var args	=	Array.prototype.slice.call(arguments);
		matrix		=	args.shift() ;
		matrix.IsEqual.apply(matrix,args) ;

	}

	Matrix44.IsIdentity		=	function(tolp)
	{
		var args	=	Array.prototype.slice.call(arguments);
		matrix		=	args.shift() ;
		matrix.IsIdentity.apply(matrix,args) ;

	}

	Matrix44.SetRow			=	function()
	{
		var args	=	Array.prototype.slice.call(arguments);
		matrix		=	args.shift() ;
		matrix.SetRow.apply(matrix,args) ;

	}

	Matrix44.GetRow			=	function()
	{
		var args	=	Array.prototype.slice.call(arguments);
		matrix		=	args.shift() ;
		matrix.GetRow.apply(matrix,args) ;
	}


	Matrix44.SetRotationXyz	=	function()
	{
		var args	=	Array.prototype.slice.call(arguments);
		matrix		=	args.shift() ;
		matrix.SetRotationXyz.apply(matrix,args) ;

	}

	Matrix44.GetRotationXyz	=	function()
	{
		var args	=	Array.prototype.slice.call(arguments);
		matrix		=	args.shift() ;
		matrix.GetRotationXyz.apply(matrix,args) ;
	}

	// Thanks to Andrew Tetlaw!
	// makeFunc function.
	// This function allows you to supply a function reference and any number of arguments for that function.
	// It will return an anonymous function that calls the function you specified, and supplies the preset arguments together with any new arguments
	// supplied when the anonymous function is called:
	// Example: -
	// function format(string) {
	//      var args = arguments;
	//      var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
	//      return String(string).replace(pattern, function(match, index) {
	//        return args[index];
	//      });
	//    };
	// var majorTom = makeFunc(format, "This is Major Tom to ground control. I'm %1.");
	// You can call the majorTom function repeatedly like this:
	// view plainprint?
	 //   majorTom("stepping through the door");
	 //  majorTom("floating in a most peculiar way");



	function makeFunc() {
	      var args = Array.prototype.slice.call(arguments);
	      var func = args.shift();
	      return function() {
	        return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
	      };
	    }


	Matrix44.SetTranslation	=	function()
	{
		var args	=	Array.prototype.slice.call(arguments);
		matrix		=	args.shift() ;
		matrix.SetTranslation.apply(matrix,args) ;
	}


	Matrix44.SetIdentity	=	function(dst)
	{
		dst.SetIdentity() ;

	}

	Matrix44.Transpose		=	function(dst,src)
	{
		dst.Transpose(src) ;

	}

	Matrix44.Invert			=	function(dst,src)
	{
		dst.Invert(src) ;

	}

	Matrix44.Copy			=	function(dst,src)
	{
		dst.Copy(src) ;
	}

	Matrix44.Multiply		=	function(dst,mat1,mat2)
	{
		dst.Multiply(mat1,mat2) ;
	}



	// End of static methods

	function _FormColumnVector(rawmatrix,col,vect)
	{
		var lvect = vect || Vector4.Create() ;

		lvect.SetXyzw(rawmatrix[0][col-1],
					  rawmatrix[1][col-1],
					  rawmatrix[2][col-1],
					  rawmatrix[3][col-1]) ;

		return lvect
	}

	function _BuildRotation(x,y,z,angle)
	{
		var _MathRad = function (degangle)
		{
			return Math.PI*degangle/180	;
		}

		var c		=	Math.cos(_MathRad(angle))
		var s		=	Math.sin(-_MathRad(angle))
		var t		=	1 - c

		var row1 = Vector4.Create(
						t*x*x + c,
						t*x*y - s*z,
						t*x*z + s*y,
						0)

		var row2 = Vector4.Create(
						t*x*y + s*z,
						t*y*y + c,
						t*y*z - s*x,
						0)

		var row3 = Vector4.Create(
						t*x*z - s*y,
						t*y*z + s*x,
						t*z*z + c,
						0)

		var row4 = Vector4.Create(0,0,0,1)

		var matrix = Matrix44.Create()

		matrix.SetRow(1,row1)
		matrix.SetRow(2,row2)
		matrix.SetRow(3,row3)
		matrix.SetRow(4,row4)
		return matrix
	}


	function _FormRowVector(rawmatrix,row,vect)
	{

		var lvect = vect || Vector4.Create()

		lvect.SetXyzw(rawmatrix[row-1][0],
					  rawmatrix[row-1][1],
					  rawmatrix[row-1][2],
					  rawmatrix[row-1][3])
		return lvect
	}

	function _SetRowWithVector(rawmatrix,row,v)
	{
		var rawrow	=	rawmatrix[row-1]
		rawrow[0]	=	Vector4.X(v)
		rawrow[1]	=	Vector4.Y(v)
		rawrow[2]	=	Vector4.Z(v)
		rawrow[3]	=	Vector4.W(v)
	}


	function _SetColWithVector(rawmatrix,col,v)
	{
		var cVector =	[Vector4.X(v),Vector4.Y(v),Vector4.Z(v),Vector4.W(v)]
		for (var row = 1 ; row <= 4 ; row++)
		{
			rawmatrix[row-1][col-1] = cVector[row-1]
		}
	}

	function _IsEqual(v1,v2,tol)
	{
		return (Math.abs(v1 - v2) <= tol)
	}


	function TestMatrix2()
	{
		var matrix = Matrix44.Create()
		DebugMatrix(matrix,'identity')
		Matrix44.SetRotationXyz(matrix,45,90,60,MATRIX_REPLACE)
		DebugMatrix(matrix,'rot=0,0,60')

		matrix = Matrix44.Create(Vector4.Create(8,-9,-2,-5),
								Vector4.Create(9,6,-6,9),
								Vector4.Create(-3,-9,4,-2),
								Vector4.Create(0,-7,8,8))

		DebugMatrix(matrix,'CREATE VECTORS')
		//Matrix44.SetTranslation(matrix,100,200,300,MATRIX_PREMULTIPLY)
		//DebugMatrix(matrix,'TRANSLATION')
		Logger.lprint(string.format("DET = %f",Matrix44._Det(matrix)))
		//var imatrix = Matrix44.Create()
		 Matrix44.Invert(matrix,matrix)
		DebugMatrix(matrix,'INVERTED')
		 Matrix44.Invert(matrix,matrix)
		DebugMatrix(matrix,'INVERTED -2 ')

	}


	function DebugMatrix(matrix,msg)
	{
	//		Logger.lprint(msg or "")
	//		Logger.lprint("\n")
	//		Logger.lprint(matrix:toString())
	}



	function TestMatrix()
	{

		var matrix = Matrix44.Create() ;
		Matrix44.SetTranslation(matrix,100,200,300,MATRIX_REPLACE)
//		alert(matrix.GetRow(4)) ;


	//	DebugMatrix(matrix,'identity')
//		Matrix44.SetRotationXyz(matrix,0,0,-45,MATRIX_REPLACE)
//		matrix.SetRotationXyz(0,0,-45,MATRIX_REPLACE)

	//	DebugMatrix(matrix,'rot=0,0,60')
//		Matrix44.SetTranslation(matrix,100,100,0,MATRIX_PREMULTIPLY)
//		matrix.SetTranslation(100,100,0,MATRIX_PREMULTIPLY)
//		Matrix44.SetTranslation(matrix,Vector4.Create(100,100,0),MATRIX_PREMULTIPLY)

	//	DebugMatrix(matrix,'TRANSLATE')
	}


Matrix44.prototype =
{
	constructor:	Matrix44,

	_Debug: function(logger)
	{
		var dprint = logger || print

		dprint("Matrix Debug ")

		var rawmatrix	=	this.m
		var scale		= 	this.scale

		dprint(string.format("SCALE %f",scale))

		for (var row = 1 ; row <= 4 ; row++)
		{
			var rm = rawmatrix[row]
			dprint(string.format("ROW %d %f %f %f %f\n",row,rm[1],rm[2],rm[3],rm[4]))
		}
	},


	Copy: function(srcmatrix)
	{
		for (var row = 1 ; row <= 4 ; row++)
		{
			var v = srcmatrix.GetRow(row)
			this.SetRow(row,v)
		}

		this.scalex	=	srcmatrix.scalex
		this.scaley	=	srcmatrix.scaley
		this.scalez	=	srcmatrix.scalez

	},


	GetRotationXyz: function(outvector)
	{
		NOT_YET_IMPLEMENTED('GetRotationXyz')

	},

	GetRow: function(rownumber,outvector)
	{
		var loutvector = outvector || Vector4.Create()
		var row 	= this.m[rownumber-1]
		loutvector.SetXyzw(row[0],row[1],row[2],row[3])
		return loutvector
	},


	_Det: function()
	{
		var m = this.m

		var a1 = m[0]
		var a2 = m[1]
		var a3 = m[2]
		var a4 = m[3]

		var a11	=	a1[0]
		var a12	=	a1[1]
		var a13	=	a1[2]
		var a14	=	a1[3]

		var a21	=	a2[0]
		var a22	=	a2[1]
		var a23	=	a2[2]
		var a24	=	a2[3]

		var a31	=	a3[0]
		var a32	=	a3[1]
		var a33	=	a3[2]
		var a34	=	a3[3]

		var a41	=	a4[0]
		var a42	=	a4[1]
		var a43	=	a4[2]
		var a44	=	a4[3]

		var det = a11*a22*a33*a44 + a11*a23*a34*a42 + a11*a24*a32*a43
			+ a12*a21*a34*a43 + a12*a23*a31*a44 + a12*a24*a33*a41
			+ a13*a21*a32*a44 + a13*a22*a34*a41 + a13*a24*a31*a42
			+ a14*a21*a33*a42 + a14*a22*a31*a43 + a14*a23*a32*a41
			- a11*a22*a34*a43 - a11*a23*a32*a44 - a11*a24*a33*a42
			- a12*a21*a33*a44 - a12*a23*a34*a41 - a12*a24*a31*a43
			- a13*a21*a34*a42 - a13*a22*a31*a44 - a13*a24*a32*a41
			- a14*a21*a32*a43 - a14*a22*a33*a41 - a14*a23*a31*a42 ;
		return det ;

	},



	Invert: function(srcmatrix)
	{
		var det = srcmatrix._Det()

		if (det != 0)
		{
			var m 	= srcmatrix.m
			var a1 	= m[0]
			var a2 	= m[1]
			var a3 	= m[2]
			var a4 	= m[3]

			var a11 	= a1[0], a12 = a1[1], a13 = a1[2], a14 = a1[3]
			var a21		= a2[0], a22 = a2[1], a23 = a2[2], a24 = a2[3]
			var a31		= a3[0], a32 = a3[1], a33 = a3[2], a34 = a3[3]
			var a41		= a4[0], a42 = a4[1], a43 = a4[2], a44 = a4[3]

			//a few repeated calculations here!

			var b11 = (a22*a33*a44 + a23*a34*a42 + a24*a32*a43 - a22*a34*a43 - a23*a32*a44 - a24*a33*a42)/det
			var b12 = (a12*a34*a43 + a13*a32*a44 + a14*a33*a42 - a12*a33*a44 - a13*a34*a42 - a14*a32*a43)/det
			var b13 = (a12*a23*a44 + a13*a24*a42 + a14*a22*a43 - a12*a24*a43 - a13*a22*a44 - a14*a23*a42)/det
			var b14 = (a12*a24*a33 + a13*a22*a34 + a14*a23*a32 - a12*a23*a34 - a13*a24*a32 - a14*a22*a33)/det

			var b21 = (a21*a34*a43 + a23*a31*a44 + a24*a33*a41 - a21*a33*a44 - a23*a34*a41 - a24*a31*a43)/det
			var b22 = (a11*a33*a44 + a13*a34*a41 + a14*a31*a43 - a11*a34*a43 - a13*a31*a44 - a14*a33*a41)/det
			var b23 = (a11*a24*a43 + a13*a21*a44 + a14*a23*a41 - a11*a23*a44 - a13*a24*a41 - a14*a21*a43)/det
			var b24 = (a11*a23*a34 + a13*a24*a31 + a14*a21*a33 - a11*a24*a33 - a13*a21*a34 - a14*a23*a31)/det

			var b31 = (a21*a32*a44 + a22*a34*a41 + a24*a31*a42 - a21*a34*a42 - a22*a31*a44 - a24*a32*a41)/det
			var b32 = (a11*a34*a42 + a12*a31*a44 + a14*a32*a41 - a11*a32*a44 - a12*a34*a41 - a14*a31*a42)/det
			var b33 = (a11*a22*a44 + a12*a24*a41 + a14*a21*a42 - a11*a24*a42 - a12*a21*a44 - a14*a22*a41)/det
			var b34 = (a11*a24*a32 + a12*a21*a34 + a14*a22*a31 - a11*a22*a34 - a12*a24*a31 - a14*a21*a32)/det

			var b41 =  (a21*a33*a42 + a22*a31*a43 + a23*a32*a41 - a21*a32*a43 - a22*a33*a41 - a23*a31*a42)/det
			var b42 =  (a11*a32*a43 + a12*a33*a41 + a13*a31*a42 - a11*a33*a42 - a12*a31*a43 - a13*a32*a41)/det
			var b43 =  (a11*a23*a42 + a12*a21*a43 + a13*a22*a41 - a11*a22*a43 - a12*a23*a41 - a13*a21*a42)/det
			var b44 =  (a11*a22*a33 + a12*a23*a31 + a13*a21*a32 - a11*a23*a32 - a12*a21*a33 - a13*a22*a31)/det

			this.SetRow(1,Vector4.Create(b11,b12,b13,b14))
			this.SetRow(2,Vector4.Create(b21,b22,b23,b24))
			this.SetRow(3,Vector4.Create(b31,b32,b33,b34))
			this.SetRow(4, Vector4.Create(b41,b42,b43,b44))

		}
	},



	IsEqual: function(matrix2,tolp)
	{
		var tol	=	tolp || 0
		var A 	=	this.m
		var B 	= 	matrix2.m

		for (var row = 1 ; row <= 4 ; row++)
		{
			for (var col = 1 ; col <= 4 ; col++)
			{
				var eq  = _IsEqual(A[row-1][col-1],B[row-1][col-1],tol)
				if (!eq)
				{
					return false
				}
			}
		}
		return true
	},



	IsIdentity: function(tolp)
	{
		var tol	=	tolp || 0
		var A 	=	this.m

		for (var row = 1 ; row <= 4 ; row++)
		{
			for (var col = 1 ; col <= 4 ; col++)
			{
				var checkvalue = (row == col) && 1 || 0
				if (!_IsEqual(A[row-1][col-1],checkvalue,tol)) {
					return false

				}
			}
		}
		return true
	},


	Multiply: function(srcmatrix1,srcmatrix2)
	{

		var a	=	srcmatrix1.m
		var b	=	srcmatrix2.m

		var a1 	=	a[0]
		var a2 	=	a[1]
		var a3 	=	a[2]
		var a4 	=	a[3]


		var a11 	= a1[0], a12 = a1[1], a13 = a1[2], a14 = a1[3]
		var a21		= a2[0], a22 = a2[1], a23 = a2[2], a24 = a2[3]
		var a31		= a3[0], a32 = a3[1], a33 = a3[2], a34 = a3[3]
		var a41		= a4[0], a42 = a4[1], a43 = a4[2], a44 = a4[3]


		var b1 	=	b[0]
		var b2 	=	b[1]
		var b3 	=	b[2]
		var b4 	=	b[3]

		var b11 	= b1[0], b12 = b1[1], b13 = b1[2], b14 = b1[3]
		var b21		= b2[0], b22 = b2[1], b23 = b2[2], b24 = b2[3]
		var b31		= b3[0], b32 = b3[1], b33 = b3[2], b34 = b3[3]
		var b41		= b4[0], b42 = b4[1], b43 = b4[2], b44 = b4[3]


		var dstm 	= this.m

		dstm[0][0] = a11*b11 + a12*b21 + a13*b31 + a14*b41
		dstm[0][1] = a11*b12 + a12*b22 + a13*b32 + a14*b42
		dstm[0][2] = a11*b13 + a12*b23 + a13*b33 + a14*b43
		dstm[0][3] = a11*b14 + a12*b24 + a13*b34 + a14*b44


		dstm[1][0] = a21*b11 + a22*b21 + a23*b31 + a24*b41
		dstm[1][1] = a21*b12 + a22*b22 + a23*b32 + a24*b42
		dstm[1][2] = a21*b13 + a22*b23 + a23*b33 + a24*b43
		dstm[1][3] = a21*b14 + a22*b24 + a23*b34 + a24*b44

		dstm[2][0] = a31*b11 + a32*b21 + a33*b31 + a34*b41
		dstm[2][1] = a31*b12 + a32*b22 + a33*b32 + a34*b42
		dstm[2][2] = a31*b13 + a32*b23 + a33*b33 + a34*b43
		dstm[2][3] = a31*b14 + a32*b24 + a33*b34 + a34*b44


		dstm[3][0] = a41*b11 + a42*b21 + a43*b31 + a44*b41
		dstm[3][1] = a41*b12 + a42*b22 + a43*b32 + a44*b42
		dstm[3][2] = a41*b13 + a42*b23 + a43*b33 + a44*b43
		dstm[3][3] = a41*b14 + a42*b24 + a43*b34 + a44*b44

	},


	SetAxisRotation: function()
	{
		NOT_YET_IMPLEMENTED('SetAxisRotation')

	},

	SetIdentity: function()
	{
		this.SetRow(1,1,0,0,0)
		this.SetRow(2,0,1,0,0)
		this.SetRow(3,0,0,1,0)
		this.SetRow(4,0,0,0,1)
	},

	SetRotationXyz: function(rxang, ryang, rzang, rtype)
	{
		this._SetRotationXyz(rxang,ryang,rzang,rtype) ;
	},

	_SetRotationXyz: function(rxang,ryang,rzang,rtype)
	{
		var mtype		=	rtype || MATRIX_REPLACE
		var rotMatrix	=	Matrix44.Create()

		var rmx	=	_BuildRotation(1,0,0,rxang || 0)
		var rmy	=	_BuildRotation(0,1,0,ryang || 0)
		var rmz	=	_BuildRotation(0,0,1,rzang || 0)

		rotMatrix.Multiply(rotMatrix,rmx)
		rotMatrix.Multiply(rotMatrix,rmy)
		rotMatrix.Multiply(rotMatrix,rmz)


		switch(mtype)
		{
			case MATRIX_REPLACE:
						this.Copy(rotMatrix)
						break ;
			case MATRIX_PREMULTIPLY:
						this.Multiply(rotMatrix,this)
						break ;
			case MATRIX_POSTMULTIPLY:
						this.Multiply(this,rotMatrix)
						break ;
			default:
						break ;
		}

	},


	SetRow: function(row,xv,yv,zv,wv)
	{
		if (xv instanceof Vector4)
		{
			this._SetRowVector(row,xv)

		} else
		{
			this._SetRow(row,xv,yv,zv,wv)

		}
	},

	_SetRowVector: function(row,vect)
	{
		var xv = Vector4.X(vect),yv = Vector4.Y(vect),zv  = Vector4.Z(vect),wv = Vector4.W(vect)
		this._SetRow(row,xv,yv,zv,wv)
	},

	_SetRow: function(row,xv,yv,zv,wv)
	{
		var rrow 	= 	this.m[row-1]
		rrow[0]		=	xv
		rrow[1]		=	yv
		rrow[2]		=	zv
		rrow[3]		=	wv
	},


	SetScale: function(scalex,scaley,scalez)
	{
		this.scalex	=	scalex
		this.scaley	=	scaley
		this.scalez	=	scalez
	},



	// SetTranslation(matrix,vector,multtype)
 	// or SetTranslation(matrix,x,y,z,multtype)

	SetTranslation: function()
	{

		if (arguments[0] && arguments[0] instanceof Vector4)
		{
			alert("Trans vector4") ;

			var vt			=	arguments[0]
			var ptype		=	arguments[1]
			var tx 			=	Vector4.X(vt),ty = Vector4.Y(vt),tz = Vector4.Z(vt)

			this._SetTranslationXYZ(tx,ty,tz,ptype)

		} else
		{
			this._SetTranslationXYZ(arguments[0],arguments[1],arguments[2],arguments[3])

		}
	},

	_SetTranslationXYZ: function(tx,ty,tz,ptype)
	{

		var ttype	=	ptype || MATRIX_REPLACE
		var tVector =	Vector4.Create(tx,ty,tz,1)
		var tmatrix =	Matrix44.Create()
		//

		Matrix44.SetRow(tmatrix,4,tVector)

		switch(ttype)
		{
			case MATRIX_REPLACE:
						this.SetRow(4,tVector)
						break ;
			case MATRIX_PREMULTIPLY:
						this.Multiply(tmatrix,this)
						break ;
			case MATRIX_POSTMULTIPLY:
						this.Multiply(this,tmatrix)
						break ;
			default:
						break ;
		}

	},



	Transpose: function(srcmatrix)
	{
		var A 		=	(srcmatrix && srcmatrix.m) || this.m

		var A1 		= 	A[0]
		var A2 		= 	A[1]
		var A3 		= 	A[2]
		var A4 		= 	A[3]

		var	A11		=	A1[0]
		var	A12		=	A1[1]
		var	A13		=	A1[2]
		var	A14		=	A1[3]

		var	A21		=	A2[0]
		var	A22		=	A2[1]
		var	A23		=	A2[2]
		var	A24		=	A2[3]

		var	A31		=	A3[0]
		var	A32		=	A3[1]
		var	A33		=	A3[2]
		var	A34		=	A3[3]

		var	A41		=	A4[0]
		var	A42		=	A4[1]
		var	A43		=	A4[2]
		var	A44		=	A4[3]

		var dstm 	= this.m

		dstm[0][0] =	A11
		dstm[1][0] = 	A12
		dstm[2][0] = 	A13
		dstm[3][0] = 	A14

		dstm[0][1] =	A21
		dstm[1][1] = 	A22
		dstm[2][1] = 	A23
		dstm[3][1] = 	A24

		dstm[0][2] =	A31
		dstm[1][2] = 	A32
		dstm[2][2] = 	A33
		dstm[3][2] = 	A34

		dstm[0][3] =	A41
		dstm[1][3] = 	A42
		dstm[2][3] = 	A43
		dstm[3][3] = 	A44


	},

	// This is not part of Sony's API

	_MultiplyVector: function(v,dstv)
	{
		var ldstv	=	dstv || Vector4.Create()

		var rm = this.m
		var m1 = rm[0]
		var m2 = rm[1]
		var m3 = rm[2]
		var m4 = rm[3]

		var x	=	Vector4.X(v)
		var y 	=   Vector4.Y(v)
		var z 	= 	Vector4.Z(v)
		var w 	= 	Vector4.W(v)

		ldstv.SetXyzw(
			m1[0]*x + m1[1]*y + m1[2]*z + m1[3]*w,
			m2[0]*x + m2[1]*y + m2[2]*z + m2[3]*w,
			m3[0]*x + m3[1]*y + m3[2]*z + m3[3]*w,
			m4[0]*x + m4[1]*y + m4[2]*z + m4[3]*w)
		return ldstv
	},



//	function Matrix44._Test()
//	{
//		TestMatrix() ;
//	},


	_toString: function(matrix)
	{
		return Matrix44.toString(matrix) ;
	},


	toString: function()
	{
		var str =	[]
		var tmp	=	Vector4.Create()

		str.push("Matrix=")

		for (var row = 1 ; row <= 4 ; row++)
		{
			str.push("[ ") ;
			this.GetRow(row,tmp) ;
			str.push(""+tmp) ;
			str.push("],") ;
		}

		var txt = "" ;
		for (var idx in str)
		{
			var line = str[idx] ;
			txt	=	txt + line ;
		}
		return txt ;
	},




}



//@header

function ImageResource(imageName,realResource)
{
		this._imageName	= 	imageName ;

		if (!ImageResource.images[imageName])
		{
			this._realResource				=	realResource || imageName ;
			this._img						= 	new Image() ;
			this._img.src					=	this._realResource ;
			ImageResource.images[imageName]	=	this._img ;

		} else
		{

			this._img						=	ImageResource.images[imageName] ;

		}

		this.className						=	'ImageResource' ;
}

ImageResource.images	=	{} ;
ImageResource.count		=	0 ;


ImageResource.getResource	=	function(name)
{
	return ImageResource.images[name] ;
}

ImageResource.DEBUG		=	function()
{
	alert("ImageResource.DEBUG - START") ;

	for (var name in ImageResource.images)
	{
		alert("ImageResource Name ="+name+" "+ImageResource.images[name]) ;
	}
	alert("ImageResource.DEBUG -END") ;

}

ImageResource.isLoaded	=	function()
{
	ImageResource.count = 0 ;

	for (idx  in  ImageResource.images)
	{
		var res	=	ImageResource.images[idx] ;
		if (!res.complete)
		{
			return false ;
		} else {
			ImageResource.count = ImageResource.count + 1 ;
		}

	}
	return ImageResource.count ;
}

ImageResource.prototype = {

			constructor: ImageResource,


			getImage:	function()
			 			{
							return ImageResource.images[this._imageName] ;
						},
			getWidth:	function()
			 			{
							return this._img.width ;
						},
			getHeight:	function()
						{
							return this._img.height ;
						},

			isLoaded:	function()
						{

							return this._img && this._img.complete ;
						},

			toString:	function()
						{
							return "Class "+this.className+" "+this._imageName+" "+this._realResource ;
						}
}

	//@header

function Sprite(imgName,x,y)
{
			this._x			=	x || 0 ;
			this._y			=	y || 0 ;
			this._cx		=	this._x ;
			this._cy		=	this._y ;
			this._time		=	0 ;
			this._img		= 	new ImageResource(imgName) ;
		//	this._img.src 	= 	imgName ;
			this._rangle	=	0 ;
			this._sx		=	1 ;
			this._sy		=	1 ;
			this.className	=	'Sprite' ;
}

Sprite.prototype = {

			constructor: Sprite,
			setTexture: function(textid)
						{
							// NOT YET IMPLEMENTED!
						},
			setPosition: function(xpos,ypos) {
								this._x = xpos ;
								this._y = ypos ;
							},

			draw: function(context)
							{
								var imgW	=	this._img.getWidth() ;
								var imgH	=	this._img.getHeight() ;

								context.save();
								context.translate(this._x,this._y) ;
								context.scale(this._sx,this._sy) ;
								context.rotate(this._rangle);
								context.drawImage( this._img.getImage(),0,0,imgW,imgH,-imgW/2,-imgH/2,imgW,imgH) ;
								context.restore() ;
							},


			getScaleX: function()
							{
								return this._sx
							},

			getScaleY: function()
							{
								return this._sy
							},

			setScale: function(sx,sy)
							{
								this._sx	=	sx || 1 ;
								this._sy	=	sy || 1 ;
							},


			setRotation: function(angle)
							{
								this._rangle	=	 angle*(Math.PI / 180) ;
							},

			getRotation: function()
							{
								return this._rangle *180/Math.PI;
							},

			getX: function()
							{
								return this._x ;
							},

			getY: function()
							{
								return this._y ;
							},

			update: function(dt)
							{
								this._time = this._time + dt
							}
}

	//@header

function Spritesheet(imageName,spritesacross,spritesdown,spritewidth,spritehgt,xoff,yoff)
{
			this._imagename		=	imageName ;
			this._image			= 	ImageResource.getResource(imageName) ;

			this._numFrames		=	0 ;
			this._spritesacross	=	spritesacross ;
			this._spritesdown	=	spritesdown ;
			this._spritewidth	=	spritewidth ;
			this._spriteheight	=	spritehgt ;
			this._numFrames		=	this._spritesacross * this._spritesdown ;

			this._init() ;

			this._frame			=	0 ;
			this.className		=	'Spritesheet' ;
}

Spritesheet.Create	=	function(imageName,spritesacross,spritesdown,spritewidth,spritehgt,xoff,yoff)
{
	return new Spritesheet(imageName,spritesacross,spritesdown,spritewidth,spritehgt,xoff,yoff) ;
}

Spritesheet.prototype = {

		constructor: Spritesheet,

			_init:	function()
					{
						if (!this._spritewidth)
						{
								this._width			=	this._image.width ;
								this._height		=	this._image.height ;
								this._spritewidth	=	this._width / this._spritesacross ;
								this._spriteheight	=	this._height / this._spritesdown ;
						}
					},

			draw: 	function(context,frameNumber,x,y,rot,sx,sy)
					{


						var imgW	=	this._spritewidth;
						var imgH	=	this._spriteheight ;
						var fNumber	=	frameNumber % this._numFrames ;
						var fy		=	imgH*parseInt(fNumber / this._spritesacross) ;
						var fx		=	imgW*(fNumber % this._spritesacross) ;
						var rangle	=	 (rot || 0)*(Math.PI / 180) ;
						this._frame	=	fNumber ;

						context.save();
						context.translate(x,y) ;
						context.scale(sx || 1, sy || 1) ;
						context.rotate(rangle);
						context.drawImage( this._image,fx,fy,imgW,imgH,-imgW/2,-imgH/2,imgW,imgH) ;
						context.restore() ;
					},

			toString:	function()
						{

							var imgW	=	this._spritewidth;
							var imgH	=	this._spriteheight ;
							var fNumber	=	this._frame % this._numFrames ;
							var fy		=	imgH*parseInt(fNumber / this._spritesacross) ;
							var fx		=	imgW*(fNumber % this._spritesacross) ;
							return this.className+' '+this._imagename+" "+fNumber+":"+fx+","+fy ;
						}

}

	//@header

function RenderHelper(context1,context2,width,height)
{
			this._context1		=	context1 ;
			this._context2		=	context2 ;

			this._width			=	width ;
			this._height		=	height ;
			this._ccontext		=	this._context2 ;
			this._inkcolour		=	"#000000" ;
			this._papercolour	=	"#FFFFFF" ;
			this._defaultfont	=	"12px sans-seri" ;
			this._currentfont	=	this._defaultfont ;
			this._overlays		=	[
										{x:0,y:0,name:"overlay0"},
										{x:0,y:0,name:"overlay1"},
										{x:0,y:0,name:"overlay2"},
										{x:0,y:0,name:"overlay3"},
										{x:0,y:0,name:"overlay4"},
										{x:0,y:0,name:"overlay5"},
										{x:0,y:0,name:"overlay6"},
										{x:0,y:0,name:"overlay7"},
										{x:0,y:0,name:"overlay8"},
										{x:0,y:0,name:"overlay9"},
										{x:0,y:0,name:"overlay10"},
										{x:0,y:0,name:"overlay11"},
										{x:0,y:0,name:"overlay12"},
										{x:0,y:0,name:"overlay13"},
										{x:0,y:0,name:"overlay14"},
										{x:0,y:0,name:"overlay15"},
									] ;
			this._overlayindex	=	0 ;
			this.setOverlay(0) ;
			this.className		=	"RenderHelper" ;
			this.copyright			=	"Javascript code (c) John Wilson 2012" ;

}
// Some 'Static Methods'

RenderHelper.CreateTextureAnimation	=	function(frameshor,framesvert,texture,fps,timeout)
										{
											var textureN			=	texture ;
											var animation			=	TextureAnim.Create(fps,timeout) ;
											var sprsheet			=	Spritesheet.Create(texture,frameshor,framesvert)	;

											animation.render		=	function(rHelper,x,y,scalex,scaley,rot)
																		{
																			if (this.isPlaying())
																			{
																				var texinfo =	this.getRenderTexture() ;
																				rHelper.drawSpriteSheet(texinfo.sheet,x,y,texinfo.frame,(rot || 0),scalex,scaley) ;
																			}
																		}

											for (var frame = 0 ; frame < frameshor*framesvert ; frame++)
											{
												animation.addFrame({frame:frame,sheet:sprsheet}) ;
											}
											return animation ;
										}

RenderHelper.TextureFind			=	function(textureName)
										{
											var		res	= 	new ImageResource(textureName) ;
											return 	res.getImage() ;
										}
RenderHelper.prototype =
{
			constructor: RenderHelper,

			setOverlay: 			function(overlay)
									{
										var oldoverlay	=	this._overlays[this._overlayindex] ;

									//	this._context1.translate(-oldoverlay.x,-oldoverlay.y) ;
									//	this._context2.translate(-oldoverlay.x,-oldoverlay.y) ;


										this._overlayindex		=	overlay % this._overlays.length ;
										this._currentoverlay	=	this._overlays[this._overlayindex] ;

									//	this._context1.translate(this._currentoverlay.x,this._currentoverlay.y) ;
									//	this._context2.translate(this._currentoverlay.x,this._currentoverlay.y) ;
									},

			getOverlay: 			function(overlay)
									{
										return 	this._overlayindex ;
									},

			camera2dSetPostition: 	function(x,y)
									{
										this._currentoverlay.x	=	x ;
										this._currentoverlay.y	=	y ;
									},

			convertRGB:	function(col,debug)
						{
							var red = 0, green = 0, blue = 0, alpha = 255 ;

							if (col instanceof Array)
							{

								red		=	Math.min(255,(col[0] || red)).toString(16) ;
								green	=	Math.min(255,(col[1] || green)).toString(16) ;
								blue	= 	Math.min(255,(col[2] || blue)).toString(16) ;
								alpha	= 	Math.min(255,(col[3] || alpha)).toString(16) ;

							} else if (typeof col == "string" )
							{

								return col ;
							} else {
								red 	=	(col.r || col.red || red).toString(16) ;
								green	=	(col.g || col.green || green).toString(16) ;
								blue	=	(col.b || col.blue || blue).toString(16) ;
								alpha	=	(col.a || col.alpha || alpha).toString(16) ;
							}
							var fstr = "#"+(red.length > 1 ? red : ("0"+red))+(green.length > 1 ? green : ("0"+green)) + (blue.length > 1 ? blue : ("0"+blue)) ;
							if (fstr.length != 7)
							{
								alert("BAD COLOUR "+fstr+","+red.length+","+green.length+","+blue.length) ;
							}
							return fstr ;


						},
			getColour: function(colour,debug)
							{
								return (colour == undefined) ? this._inkcolour : this.convertRGB(colour,debug) ;
							},

			setColour: function(colour)
								{
									this._colour = colour ;
								},



			drawRawImage: function(image,x,y,rot,sx,sy)
							{
								var imgW	=	image.width ;
								var imgH	=	image.height ;
								var  xt		=	this._currentoverlay.x, yt = this._currentoverlay.y ;
								if (imgW)
								{
									var context	=	this._ccontext ;
									context.save();
									context.translate(x-xt,y-yt) ;
									context.scale(sx,sy) ;
									context.rotate(rot*(Math.PI / 180));
									context.drawImage(image,0,0,imgW,imgH,-imgW/2,-imgH/2,imgW,imgH) ;
									context.restore() ;
								}

							},


			drawSprite: function(sprite,x,y,rot,sx,sy)
							{
								var  xt		=	this._currentoverlay.x, yt = this._currentoverlay.y ;
								sprite.setRotation(rot || sprite.getRotation())
								sprite.setScale(sx || sprite.getScaleX(),sy || sprite.getScaleY())
								sprite.setPosition((x || sprite.getX())-xt,(y || sprite.getY())-yt)	;
								sprite.draw(this._ccontext) ;
							},

			drawSpriteSheet: function(spritesheet,x,y,frame,rot,sx,sy)
										{
											var  xt		=	this._currentoverlay.x, yt = this._currentoverlay.y ;
											spritesheet.draw(this._ccontext,frame,x-xt,y-yt,rot,sx,sy) ;

										},

			drawLine: function(xs,ys,xe,ye,colour)
							{
								var  xt		=	this._currentoverlay.x, yt = this._currentoverlay.y ;
								var ctx	=	this._ccontext ;
								ctx.beginPath() ;
								ctx.strokeStyle= this.getColour(colour);
								ctx.moveTo(xs-xt, ys-yt) ;
								ctx.lineTo(xe-xt, ye-yt) ;
								ctx.stroke() ;

							},



			drawBox: function(x,y,wid,hgt,colour)
								{

								   this.drawLine(x,y,x+wid,y,colour)
								   this.drawLine(x+wid,y,x+wid,y+hgt,colour)
								   this.drawLine(x+wid,y+hgt,x,y+hgt,colour)
								   this.drawLine(x,y+hgt,x,y,colour)
								},

			drawCircle: function(x,y,radius,colour)
								{
									var  xt		=	this._currentoverlay.x, yt = this._currentoverlay.y ;

									var ctx	=	this._ccontext ;
									ctx.beginPath() ;
									ctx.strokeStyle = this.getColour(colour);
									ctx.arc(x-xt,y-yt,radius,0,Math.PI*2,true);
									ctx.stroke() ;

								},

			drawPoly: function(vertices,colour)
								{
									var ctx	=	this._ccontext ;
									ctx.beginPath() ;

									for (var index = 0; index < vertices.length; index+=2)
									{
										var x1 = vertices[index]
										var y1 = vertices[index+1]
										var x2 = vertices[index+2] || vertices[0]
										var y2 = vertices[index+3] || vertices[1]
										this.drawLine(x1,y1,x2,y2,colour)
									}
									ctx.stroke() ;
								},

			clearRect: 		function(colour,alpa)
							{
								var ctx			=	this._ccontext ;
								var alpha		=	alpa || 1 ;

								if (colour) {
									var scol		=	ctx.fillStyle ;
									var salpha		=	ctx.globalAlpha ;
									var col			=	this.getColour(colour);
									ctx.fillStyle	=	col ;
									ctx.globalAlpha = 	alpha ;
									ctx.fillRect(0, 0, this._width, this._height);
									ctx.fillStyle	=	scol ;
									ctx.globalAlpha	=	salpha ;
								} else {
									ctx.clearRect(0, 0, this._width, this._height);
								}
							},


			drawTriangle: 	function(x1,y1,x2,y2,x3,y3,colour,alpa)
							{
									var ctx			=	this._ccontext ;
									var  xt			=	this._currentoverlay.x, yt = this._currentoverlay.y ;

									var col			=	this.getColour(colour);
									var alpha		=	alpa || 1 ;


									var scol		=	ctx.fillStyle ;
									var salpha		=	ctx.globalAlpha ;

									ctx.globalAlpha	=	alpha ;
									ctx.fillStyle	=	col ;
									ctx.beginPath();
									ctx.moveTo(x1-xt,y1-yt) ;
									ctx.lineTo(x2-xt,y2-yt) ;
									ctx.lineTo(x3-xt,y3-yt) ;
									ctx.closePath() ;
									ctx.fill() ;

									ctx.fillStyle	=	scol ;
									ctx.globalAlpha	=	salpha ;

							},

			fillRect: 		function(colour)
							{
								var col			=	this.getColour(colour);
								var ctx			=	this._ccontext ;
								ctx.fillStyle	=	col ;
								ctx.fillRect(0, 0, this._width, this._height);
							},

			drawText: function(str,x,y,colour,align,font,alpha)
							{
								var  xt		=	this._currentoverlay.x, yt = this._currentoverlay.y ;
								var ctx	=	this._ccontext ;
//								ctx.save() ;

								var aln			=	ctx.textAlign ;
								var ftn			=	ctx.font
								var bline		=	ctx.textBaseline ;
								var salpha			=	ctx.globalAlpha	;
								ctx.globalAlpha		=	alpha  ;
								ctx.fillStyle		=	this.getColour(colour);
								var bNo				=	this.getBuffer() ;
								ctx.textAlign 		=	(align && align.horizontal) || "left";
								ctx.font 			=	font || this._currentfont ;
								ctx.textBaseline	=	(align && align.vertical) || "top" ;

								var txt				=	str || "B"+bNo+str	;
							  	var dim				=	ctx.measureText(txt) ;
								ctx.fillText(txt,x-xt,y-yt);

//								ctx.restore() ;

								ctx.textAlign		=	aln ;
								ctx.font			=	ftn ;
								ctx.textBaseline	=	bline ;
								ctx.globalAlpha		=	salpha ;


							},

			drawQuads2d:	function(tilemapTexture,posmatrix,posData,uvData)
							{

								var  xt	=	this._currentoverlay.x, yt = this._currentoverlay.y ;

								var ctx	=	this._ccontext ;
								var sx	=	1, sy	=	1
								var tr	=	posmatrix.GetRow(4) ;
								var tx	=	tr.X(), ty = tr.Y() ;

								ctx.save() ;
								ctx.rotate(0) ;
								ctx.scale(sx || 1, sy || 1) ;

								for (var idx = 0 ; idx < posData.length ; idx++)
								{


									var pos	=	posData[idx] ;
									var uv	=	uvData[idx] ;
									//if (!uv) {
									//	break ;
										//alert("drawQuads2d: NO UV AT IDX = "+idx)
									//}
									var	x 	=	pos.xstart + tx, y =	pos.ystart + ty;
									var fx	=	uv.x, fy	= uv.y, imgW	= uv.width	, imgH	=	uv.height;

									ctx.translate(x-xt,y-yt) ;
//									ctx.drawImage(tilemapTexture,fx,fy,imgW,imgH,-imgW/2,-imgH/2,imgW,imgH) ;
									ctx.drawImage(tilemapTexture,fx,fy,imgW,imgH,0,0,imgW,imgH) ;

									ctx.translate(-x,-y) ;

								}

								ctx.restore();


							},

			// Hmmmm... not exactly a 'primitive' render function!

			drawArrowHead:		function(direction,baseVector,stemLength,tipAngle,colour)
								{
									var rad = function(deg) { return deg * Math.PI/180 ; }


									var xbase	=	baseVector.X(), ybase = baseVector.Y() ;

									var tipLength		=	stemLength*0.20 ;

									var ly = ybase + stemLength*Math.sin(rad(direction - 90)) ;
									var lx = xbase + stemLength*Math.cos(rad(direction - 90)) ;

									var t1y = tipLength*Math.sin(rad(direction - 90 + tipAngle)) ;
									var t1x = tipLength*Math.cos(rad(direction - 90 + tipAngle)) ;

									var t2y = tipLength*Math.sin(rad(direction - 90 - tipAngle)) ;
									var t2x = tipLength*Math.cos(rad(direction - 90 - tipAngle)) ;


									this.drawLine(xbase, ybase, lx,ly,colour) ;
									this.drawLine(lx, ly, lx-t1x, ly-t1y,colour) ;
									this.drawLine(lx, ly, lx-t2x, ly-t2y,colour) ;
								},


			flipBuffer: 	function()
							{
								if (this._ccontext == this._context1)
								{
									this._ccontext	=	this._context2;
								} else
								{
									this._ccontext	=	this._context1;
								}

							},

			getBuffer: function()
							{
							//	console.log( "hello" )
								return (this._ccontext == this._context1 ? 0 : 1) ;
							}


}

	//@header

function TextureAnim(fps,timeout,maxs)
{
		this._timeout 				=	timeout || 0 ;
		this._MaxSize 				=	maxs || 32 ;
  		this._FramesPerSecond		=	fps || 15.0 ;
		this._looping				=	true ;
		this._bouncing				=	true ;
		this._playing				=	false ;
		this._TexIDList 			=	new Array() ;
		this._nFrames				=	0 ;
  		this._FrameTimer			=	0.0;
		this.className				=	"TextureAnim" ;

}
TextureAnim.Create	=	function(fps,maxs)
						{
							return new TextureAnim(fps,maxs) ;
						}

TextureAnim.prototype = {

	constructor: TextureAnim,

	addFrame: function(texID)
  	{
		if (this._nFrames < this._MaxSize) {
    		this._TexIDList[this._nFrames]  = texID
			this._nFrames = this._nFrames + 1
  		}
	},

	getFrames:	function()
	{
		return this._TexIDList ;
	},

	update: function (dt)
	{
		var mSize	=	this._nFrames	; //this._MaxSize ;
		if (this._playing) {
  			this._FrameTimer = this._FrameTimer + dt ;
			this._playing 	= (this._timeout && this._FrameTimer > this._timeout) ? false : true ;
			if (!this._looping) {
				var nFrames = parseInt(this._FrameTimer * this._FramesPerSecond) ;
				if (nFrames > mSize - 1) {
					this._playing = false ;
				}
			}
		}
	},

	getRenderTexture: function()
 	{
		var nFrames	=	parseInt(this._FrameTimer * this._FramesPerSecond) ;
		var mSize	=	this._nFrames	//this._MaxSize ;

		if (!this._looping)
		{
			nFrames = Math.min(nFrames,mSize - 1) ;
		}
		else
		{
			if (this._bouncing)
			{
				nFrames = mSize > 1 ? nFrames % (mSize*2 - 2) : 0 ;
				if (nFrames > mSize -1)
				{
					nFrames = (mSize*2 - 2) - nFrames ;
				}
			}
			else
			{
				nFrames = nFrames % mSize ;
			}
		}

		return this._TexIDList[nFrames]
	},

	play: function(looping,bouncing,timeout)
	{
 		this._looping  		= 	looping ;
 		this._bouncing  	=	bouncing ;
		this._FrameTimer	=	0.0 ;
		this._playing		= 	true ;
		this._timeout 		=	timeout || this._timeout ;
	},

	isPlaying: function()
	{
		return this._playing ;
	},


  	stop: function()
  	{
		this._playing		=	false ;
  	}

}

  //@header

function Bezier( cp0,  cp1, cp2, cp3)
{
		// Debug
		this._cp0		=	cp0 ;
		this._cp1		=	cp1 ;
		this._cp2		=	cp2 ;
		this._cp3		=	cp3 ;
		//^^Debug

		this._vCP		=	new Vector2(cp0) ;
	    this._cx		=	3.0 * (cp1.x - cp0.x) ;
	    this._bx		=	3.0 * (cp2.x - cp1.x) - this._cx ;
	    this._ax		=	cp3.x - cp0.x - this._cx - this._bx ;
	    this._cy		=	3.0 * (cp1.y - cp0.y) ;
	    this._by		=	3.0 * (cp2.y - cp1.y) - this._cy ;
	    this._ay		=	cp3.y - cp0.y - this._cy - this._by ;
		this._length	=	this._CalcLength() ;
		this.className	=	'Bezier' ;

}

Bezier.Create = function(cp0, cp1, cp2, cp3)
{
	return new Bezier(cp0, cp1, cp2, cp3) ;
}

Bezier.prototype = {
		constructor: Bezier,


		getLength: function()
		{
			return this._length ;
		},


		getVectorPosition: function(t)
		{
			var pos =  this.getPositionXY(t) ;
	    	return new Vector2(pos.x,pos.y) ;
		},

		getPositionXY: function(t)
		{

	    	var tSquared	=	t * t ;
	    	var tCubed		=	tSquared * t ;

	    	var resultx = (this._ax * tCubed) + (this._bx * tSquared) + (this._cx * t) + this._vCP.x ;
	    	var resulty = (this._ay * tCubed) + (this._by * tSquared) + (this._cy * t) + this._vCP.y ;

	    	return {x:resultx,y:resulty} ;
		},

		// Calculate Srt(x'(t)^2 + y'(t)^2)
		//x'(t),y'(t) is d/dt of x(t), y(t) - (Bezier defn getPositionXY(t))
		GetPrimeT: function(tv)
		{

			var	t			=	tv || 1 ;
	    	var tSquared	=	t * t ;
			// work out dx/dt and dy/dt

	   		var resultx = (3*this._ax * tSquared) + (2*this._bx * t) + (this._cx) ;
	  		var resulty = (3*this._ay * tSquared) + (2*this._by * t) + (this._cy) ;

	    	return Math.sqrt(resultx*resultx + resulty*resulty)	;
		},

		// Length of a Parametric curve x(t),y(t)
		// is Int(a,b) [Sqrt(x'(t)*x'(t) + y'(t)*y'(t))]

		_CalcLength: function(fft)
		{
			var ft	=	fft	|| 1 ;

			//Integrate using Trapezium rule
			var N	 = 	100 ;
			var n	 =	parseInt(ft*N) ; //Math.floor(ft*N) ;
			var dt =	1/N //0.01 == one hundred bits ;

			var sum1 	=	(this.GetPrimeT(0) + this.GetPrimeT(ft))/(2*n) ;
			var sum		=	0 ;
//			for t = dt,ft - dt, dt do
//				sum	=	sum	+	 this.GetPrimeT(t)
//			end
			for (var t = dt; t <= ft - dt; t+=dt)
			{
				sum	=	sum	+	 this.GetPrimeT(t) ;
			}

			return sum/n + sum1 ;

		},

		render: function(rHelper)
		{
			rHelper.drawCircle(this._cp0.x,this._cp0.y,10) ;
			rHelper.drawCircle(this._cp1.x,this._cp1.y,10) ;
			rHelper.drawCircle(this._cp2.x,this._cp2.y,10) ;
			rHelper.drawCircle(this._cp3.x,this._cp3.y,10) ;

			for (var t = 0 ; t <= 1 ; t+=0.01)
			{
				var pos = this.getVectorPosition(t)
				rHelper.drawCircle(pos.x,pos.y,1) ;
			}
		},


		toString: function()
		{
				return this.className ;
		}



}

//@header

var STATE_WAITING	=	0 ;
var	STATE_RUNNING	=	1 ;
var	STATE_FINISHED	=	2 ;


function Event(startTime,endTime,eventObj,eventParam)
{
	this._state			=	STATE_WAITING ;
	this._runtime 		= 	0 ;
	this._starttime		=	startTime ;
	this._duration		=	endTime-startTime ;
	this._eventObj		=	eventObj ;
	this._eventParam	= 	eventParam ;
	this.className		=	'Event' ;
}


Event.prototype = {

	constructor: Event,


	StartEvent: function()
	{
		this._eventObj.StartEvent() ;
	},


	Running: function()
	{
		var nTime = this._runtime/this._duration ;
		this._eventObj.Running(nTime) ;
	},

	EndEvent: function()
	{
		this._eventObj.EndEvent() ;

	},

	IsFinished: function()
	{
		return (this._state == STATE_FINISHED)  ;
	},

	toString: function()
	{
		return "Event Debug() "+this._starttime+","+this._duration+","+this._runtime+","+this._state ;
	},



	Update: function(ctime,dt)
	{
			var sstate = this._state
			if (sstate == STATE_WAITING)
			{
				if (ctime >= this._starttime)
				{
					this._runtime = 0.0  ;
					this.StartEvent() ;
					if (this._duration == 0) {
						this._state = STATE_FINISHED ;
					}
					else
					{
						this._state = STATE_RUNNING ;
					}
				}
			}
			else if (sstate == STATE_RUNNING)
			{
				this._runtime = this._runtime + dt ;
				if (this._runtime <= this._duration)
				{
					this.Running() ;
				}
				else
				{
					this.EndEvent() ;
					this._state = STATE_FINISHED ;
				}
			}

	}

}

//@header

function SingleShotEvent(callback,param)
{
	this._callback		=	callback ;
	this._param			=	param ;
	this.className		=	'SingleShotEvent' ;

}

SingleShotEvent.prototype = {

	constructor: SingleShotEvent,

	StartEvent: function()
	{
		if (this._callback)
		{
        	this._callback(this._param) ;
		}
	},

	Running: function(nTime)
	{
		//	Logger.warning("SingleShotEvent:Running - This should not be called!!! - See a code doctor ref: them to Event class")
	},


	EndEvent: function()
	{
		//		Logger.warning("SingleShotEvent:EndEvent - This should not be called!!! - See a code doctor ref: them to Event class")
	}


}


//@header

function EventManager()
{
	this._currentTime 	=	0 ;
	this._eventTable	=	new Array() ;
	this.className		=	"EventManager" ;
}

EventManager.prototype =
{
	constructor: EventManager,

	addImmediateEvent:	function(subevent,duration)
	{
		var triggerTime =   this._currentTime  ;
		this._addNewEvent(new Event(triggerTime,triggerTime+(duration || 0),subevent)) ;
        return (duration || 0) ;
	},


	addEventAfterTime:	function(subevent,after,duration)
	{
      	var triggerTime =   this._currentTime + after ;
		this._addNewEvent(new Event(triggerTime,triggerTime+(duration || 0),subevent)) ;
  		return after+(duration || 0) ;
	},

	addSingleShotEvent:	function(callback,param,timefromnow)
	{
  		return this.addEventAfterTime(new SingleShotEvent(callback,param),timefromnow) ;
	},


	_addNewEvent:	function(evt)
	{
		this._eventTable.push(evt) ;
	},

	_removeEvent:	function(evtIndex)
	{
		delete this._eventTable[evtIndex]  ;
	},


	ClearEvents:	function(warning)
	{
		if (warning) {
			for (var evtIndex in  this._eventTable)
			{
				var evt	= this._eventTable[evtIndex] ;
				if (evt) {
					evt.EndEvent() ;
				}
			}
		}
		this._eventTable = new Array() ;
	},

	_getSize:	function()
	{
		return this._eventTable.length ;
	},

	cleanArray: function(actual)
	{
		var newArray = new Array() ;
		for(var i = 0; i < actual.length; i++)
		{
	    	if (actual[i])
			{
	        	newArray.push(actual[i]) ;
	    	}
	  	}
	  	return newArray;
	},

	Update:	function(dt)
	{
		this._currentTime = this._currentTime + dt ;
		for (var evtIndex in  this._eventTable)
		{
			var evt	= this._eventTable[evtIndex] ;
			if (evt) {
				evt.Update(this._currentTime,dt) ;
				if (evt.IsFinished()) {
					this._removeEvent(evtIndex) ;
				}
			}
		}
		// todo - linked list?
		this._eventTable = this.cleanArray(this._eventTable) ;
	}

}



//@header

WorldClock 				=	{}	;
WorldClock.time 		=	0 ;
WorldClock.observers	=	new Array()	;
WorldClock.pause		=	false ;

WorldClock.AddObserver = function(func)
{
	WorldClock.observers.push(func)	;
}

WorldClock.Restart = function()
{
		WorldClock.Resume()
		WorldClock.Reset()
}

WorldClock.Reset = function()
{
	WorldClock.time = 0
	WorldClock.InformObservers()

}

WorldClock.Pause = function()
{
	WorldClock.pause = true

}

WorldClock.Resume	=	function()
{
	WorldClock.pause = false

}


//Inform Watchers of 'major' changes in time
WorldClock.InformObservers = function()
{
		for (var oidx in WorldClock.observers)
		{
			var f = 	WorldClock.observers[oidx] ;
			if (f) {
				f(WorldClock.time)	;
			}
		}
}

WorldClock.GetClock = function()
{
	return WorldClock.time ;

}

WorldClock.Update = function(dtime)
{
	if (!WorldClock.pause) {
		WorldClock.time = WorldClock.time + dtime
	}
}


//@header

// Based on Damped Oscillator Maths Unit MST204/MST209 Open University

var k_strongly_damped 	= 	0
var k_weakly_damped		=	1
var k_critically_damped	=	2

function KDampedOscillator( m,  r,  k,  x,  v)
{
			this.x0_ 		= x ;
			this.v0_		= v ;
			this.m_			= m ;
			this.r_			= r ;
			this.k_  		= k ;
			this.xe_		= 0 ;
			this.v_			= 0 ;
			this.w_			= 0 ;
		    this.alpha 		= 0 ;
			this.p_			= 0 ;
}


KDampedOscillator.Create				=	function( m,  r,  k,  x,  v)
											{
												return new KDampedOscillator( m,  r,  k,  x,  v) ;
											}

KDampedOscillator.prototype =
{
	constructor: KDampedOscillator,


	reset: function( x0,  v0,  xe)
	{

		this.x0_ = x0 - xe ;
		this.v0_ = v0 ;
		this.xe_ = xe ;

		// Calculate the natural angular frequency and damping ratio.

		this.w_ 	= Math.sqrt( this.k_ / this.m_ ) ;
		this.alpha_ = this.r_ / ( 2 * Math.sqrt( this.m_ * this.k_ ) ) ;

	 	// Calculate the solution type.

		if ( this.alpha_ > 1 ) {
			this.damping_type_ = k_strongly_damped ;
		} else if ( this.alpha_ < 1 ) {
			this.damping_type_ = k_weakly_damped ;
		} else {

			this.damping_type_ = k_critically_damped ;
		}
		var damping_type_ = this.damping_type_ ;

		switch(damping_type_)
		{
			case k_strongly_damped:
				var a = Math.sqrt( this.alpha_*this.alpha_ - 1.0) ;

				this.l1_ = this.w_*( -this.alpha_ + a ) ;
				this.l2_ = this.w_*( -this.alpha_ - a ) ;

			// Initial conditions.

				this.c_ = ( this.v0_ - this.l1_*this.x0_ ) / ( this.l2_ - this.l1_ ) ;
				this.b_ = this.x0_ - this.c_ ;

				break ;

			case k_weakly_damped:

				this.p_ = this.r_ / this.m_ * 0.5  ;
				this.v_ = Math.sqrt( 4.0*this.m_*this.k_ - this.r_*this.r_ ) / this.m_ * 0.5 ;
				this.a_ = Math.sqrt( this.x0_*this.x0_ + this.v0_*this.v0_ / (this.p_*this.p_)) ;

				if (this.a_ == 0.0) {
					this.phi_ =	0.0 ;
				} else
				{
					this.phi_ =	Math.acos( this.x0_ / this.a_ ) ;
				}

				break ;

			case k_critically_damped:
				this.c_ = this.x0_ ;
				this.b_ = this.v0_ + this.x0_ * this.w_ ;

				break ;

			default:
				alert("defa")

				break ;
		}

	},

	// Reference MST204/MST209 Handbook
	//
	// 	centre()	-	returns the centre position of the spring
	//
	// 	The centre is the position when the spring is in equilibrium.
	//
	// public void centre( float & x ) // const
	// {
	// 	x = xe_
	// }

	centre: function()
	{
		return this.xe_ ;
	},


	//
	// 	equilibrium()	-	check if the oscillator is in static equilibrium
	//
	// 	The oscillator is static if it is at the equilibrium position with zero velocity.
	//
	// 	Parameters:
	//
	// 		t		-	the time to evaluate the system at
	// 		epsilon	-	how near to true equilbrium to calculate to
	//
	// 	Returns:
	//
	// 		the position of the system at the time t
	//

	equilibrium: function( t,  epsilon )
	{
		return Math.abs( this.evaluate( t ) - this.xe_ ) <= epsilon && Math.abs( this.velocity(t ) ) <= epsilon  ;
	},




	evaluate: function( t)
	{

		var x = 0.0
		var damping_type_ = this.damping_type_
		switch(damping_type_)
		{
			case k_strongly_damped:
				x = this.b_*Math.exp( this.l1_*t ) + this.c_*Math.exp( this.l2_*t )
				break ;
			case k_weakly_damped:
				x = this.a_*Math.exp( -this.p_*t ) * Math.cos( this.v_*t + this.phi_ )
				break ;

			case k_critically_damped:
				x = (this.b_*t +this.c_)*Math.exp( -this.w_*t )
				break ;

			default:
				break ;
		}

		return this.xe_ + x
	},

	velocity: function( t)
	{

		var v = 0.0
		var damping_type_ = this.damping_type_ ;

		switch(damping_type_ )
		{
			case k_strongly_damped:
				v = this.b_*this.l1_*Math.exp( this.l1_*t ) + this.c_*this.l2_*Math.exp( this.l2_*t ) ;
				break ;

			case k_weakly_damped:
				v = -this.a_*this.p_*Math.exp( -this.p_*t ) * Math.cos( this.v_*t + this.phi_ ) - this.v_ * this.a_*Math.exp( -this.p_*t ) * Math.sin( this.v_*t + this.phi_ ) ;
				break ;

			case k_critically_damped:
				v = ( this.b_ - this.w_*(this.b_*t +this.c_ ) )*Math.exp( -this.w_*t ) ;

			default:
				break ;
		}

		return v
	},

	toString: function()
	{
		return "KDampedOscillator" ;
	}
}//@header

function Ktimer(scale,paused)
{
	this.scale_ 	=	scale || 1.0 ;
	this.paused_ 	=	paused ;
	this.p1_		=	0 ;
	this.p2_		=	1 ;
//	this.className	=	'Ktimer' ;
	this.reset(scale) ;

}

Ktimer.Create = function(scale,  paused )
{
		return new Ktimer(scale,paused) ;
}

//
// 	static time()	-	class method to return the absolute time (dep}s on module WorldTime.lua)
//
// 	The absolute time is the real time measured in seconds as returned by CFAbsoluteTimeGetCurrent().
//
// 	Returns:
//
// 		the absolute time in seconds
//

Ktimer.time = function()
{
		var t = WorldClock.GetClock()  ;
		return t  ;
}


Ktimer.prototype = {

	constructor: Ktimer,

//
// 	reset()	-	reset the time object to now
//
// 	The current time is used as the start time and the elapsed time is set to 0.
//
// 	Parameters:
//
// 		scale	-	a time scaling factor, eg 4 will slow the timer by a factor of 4
//
	reset: function(scale)
	{

		if (scale)
		{
			this.scale_ = 1.0 / scale
		}
		this.elapsed_time_ = 0.0
		this.start_time_ = Ktimer.time()
	},

//
// 	adjust()	-	adds a time adjustment
//
// 	The adjustemnt is made to the start time.
//
// 	Parameters:
//
// 		dt	-	the time interval to add to the timer's start tiem
//

	adjust: function(dt )
	{

		//  Not sure what to do about the scale!!!
		//
		this.start_time_ = this.start_time_  + dt
	},

//
// 	finished()	-	return whether the timer has finished
//
// 	A timer is finished when the scaled elapsed time is >= 1.0.
//
// 	Returns:
//
// 		true if the timer has finished
//
	finished: function()
	{
		return this.elapsed() >= 1.0
	},

//
// 	range()	-	set the range for the parameterised animation value
//
// 	The returned value is linearly interpolated and clipped to [ p1, p2 ] parametereised by
// 	the elapsed time.
//
// 	Parameters:
//
// 		p1, p2	-	the start and } values of the animation
//
	range: function(p1,  p2 )
	{
		this.p1_ = p1
		this.p2_ = p2
	},

//
// 	p()	-	return a parameterised animation value
//
// 	The returned value is linearly interpolated and clipped to [ p1, p2 ] parametereised by
// 	the elapsed time.
//
// 	Parameters:
//
// 		p1, p2	-	the start and } values of the animation
//
// 	Returns:
//
// 		the parameterised value
//
	p: function()
	{
		return this.p2(this.p1_,this.p2_) ;
	},

	p2: function(  p1,  p2 )
	{
		var elapsed_time = this.elapsed() ;
		var t = 0 ;
		if (elapsed_time > 1.0) {
			t = 1.0 ;
		}
		else
		{
			t = elapsed_time ;
		}
		return p1 - ( p1 - p2 ) * t
	},

//
// 	elapsed()	-	return the elapsed time
//
// 	The elapsed time is the time that has passed since this time object was initialised or reset.
// 	Elapsed time does not include periods when the timer is paused. The elapsed time is multiplied up
// 	by the supplied scaling factor.
//
	elapsed: function()
	{
		//  If paused { return the last know elapsed time.
		//
		var elapsed_time = 0

		if (this.paused_) {
		 	elapsed_time = this.elapsed_time_
		}
		else
		{
		 	elapsed_time = Ktimer.time() - this.start_time_
		}

		return elapsed_time * this.scale_
	},

//
// 	paused()	-	accessor to the paused state of the time object
//
// 	Returns:
//
// 		true if the time object is paused
//
 	paused: function()
 	{
		return this.paused_ ;
	},

//
// 	pause()		-	pause the time object
//
	pause: function()
	{
	//
	//  No need to do anything if already paused.
	//
		if (!this.paused_ ) {
			this.elapsed_time_ = Ktimer.time() - this.start_time_ ;
			this.paused_ = true ;
		}
	},

//
// 	resume()	-	continue a paused object
//
// 	The start time is recalculated to take into account the time
// 	at which the time object was paused.
//
	resume: function()
	{
		//
		//  No need to do anything if not paused.
		//
		if ( this.paused_ ) {
			this.start_time_ = Ktimer.time() - this.elapsed_time_
			this.paused_ = false
		}

	},
	toString: function()
	{
		return "Ktimer" ;
	}

}

//@header

function SpringBox(startx,y,x,m,r,k,time)
{
	var darg = function(val,defval) { return (typeof(val) === 'undefined' || typeof(val) !== typeof(defval) ? defval : val) ; }

 	this.osc          	=   KDampedOscillator.Create( darg(m,1),  darg(r,12),  darg(k,100),0,0) ;
	this.osctimer      	=	Ktimer.Create(1,true) ;
	this.endx			=	x ;
    this.y				=   y ;
	this.startx			=	startx ;
	this.time			= 	0 ;
	this.finishby		=	darg(time,5) ;
	this.started		=	false ;
	this.osc.reset( this.endx,  0,  this.startx) ;
	return this ;
}

SpringBox.className	    =	"SpringBox"
SpringBox.ZEROVEL_EPS	=	0.1

SpringBox.Create = function(startx,y,x,m,r,k,time)
{
	return new SpringBox(startx,y,x,m,r,k,time) ;
}

SpringBox.prototype = {

	constructor: SpringBox,

	Start: function()
	{
		this.started	=	true ;
		this.osctimer.resume() ;
	},

	GetDuration: function()
	{
		return this.finishby ;
	},


    IsFinished: function()
	{
        return (this.time > this.finishby)  ;
    },

	IsStationary: function()
	{
		 return this.osc.equilibrium(this.osctimer.elapsed(),SpringBox.ZEROVEL_EPS) ;
	},

    Update: function(dt)
	{
		if (!this.IsFinished() && this.started)
		{
			this.time	=	this.time + dt ;
		}
    },


    GetPosition: function()
	{
    	var elapsed = this.osctimer.elapsed()
   		var cx = this.osc.evaluate(elapsed)
        return { x: (this.IsStationary() ? this.startx : parseInt(cx)), y: this.y } ;

    },

	toString: function()
	{
		return "SpringBox" ;
	}


}
//@header

function DisplayableTextWithImage(text,pos,imageresource,sx,sy)
{
	if (imageresource instanceof ImageResource) {
		this._img				=	imageresource.getImage() ;
	}
	else if (imageresource instanceof Image) {
		this._img				=	imageresource ;
	} else
	{
	    this._backimageName		=	imageresource || "messagebackground.png" ;
		this._imgRes			=	new ImageResource(this._backimageName)
		this._img				=	this._imgRes.getImage() ;
	}

    this._text			=	text ;

    this._sx			=	sx || 1.5 ;
    this._sy			=	sy || 4 ;

    this._font			=	"italic 20pt Calibri" ;
	this._align			=	{horizontal:"center",vertical:"middle"} ;

    this._position		=	pos || { x:0, y:0 } ;

    this._backcolour		=	"#FFFFFF" ;
    this._colour			=	"#000000" ;


}

DisplayableTextWithImage.Create = function(text,sx,sy,pos,imageresource)
{
	return new DisplayableTextWithImage(text,sx,sy,pos,imageresource) ;
}

DisplayableTextWithImage.GlobalFont      =  "26bold"

DisplayableTextWithImage.prototype =
{
	constructor: DisplayableTextWithImage,

	Update: function(dt)
	{

	},

	GetPosition: function()
	{
        return this._position ;
	},

    SetPosition: function(pos)
	{
        this._position = pos ;
	},

	SetFont: function(font)
	{
         this._font = font ;
	},

	SetAlignment: function(align)
	{
         this._align = align ;
	},

    Render: function(rHelper)
	{
        var x = this._position.x ;
        var y = this._position.y ;


        if (this._img)
		{
			rHelper.drawRawImage(this._img,x,y,0,this._sx,this._sy) ;
		}

		if (this._text)
		{
			var text	=	this._text ;
			var align 	=	this._align ;
			var	font	=	this._font ;
			var fcolour	=	this._colour ;
			var bcolour	=	this._backcolour ;

			rHelper.drawText(text,x-1,y-1,fcolour,align,font) ;
			rHelper.drawText(text,x,y,fcolour,align,font) ;
			rHelper.drawText(text,x+1,y+1,bcolour,align,font) ;
			rHelper.drawText(text,x+2,y+2,bcolour,align,font) ;


		}
	},

	toString: function()
	{
		return "DisplayableTextWithImage "+this.text ;
	}

}
//@header

function Message(displayable,spring,duration)
{
		this._time			=	0 ;
		this._duration		=	duration || spring.GetDuration() ;
      	this._displayable	=   displayable ;
        this._spring		=   spring ;
		this._started		=	false ;
}

Message.Create = function(displayable,spring,duration)
{
	return new Message(displayable,spring,duration) ;
}

Message.prototype =
{
	constructor: Message,

	Start: function()
	{
		this._spring.Start() ;				// start the spring off
		this._started		=	true ;

		if (this._displayable.SetPosition)
		{
			// set initial position of displayable item (message)
            this._displayable.SetPosition(this._spring.GetPosition())
		}

	},

    IsFinished: function()
	{
        return this._time > this._duration && this._spring && this._spring.IsFinished() ;
    },

    IsSettled: function()
	{
        return this._spring && this._spring.IsFinished()
    },

    Update: function(dt)
	{

		if (this._started)
		{
			this._time	=	this._time + dt
		}

        if (this._spring && this._displayable)
		{
            this._spring.Update(dt)
			if (this._displayable.SetPosition)
			{
	            this._displayable.SetPosition(this._spring.GetPosition())
			}
        }
    },

   	Render: function(rHelper)
	{
        if (this._displayable && this._displayable.Render)
		{
            this._displayable.Render(rHelper)
        }
    },

	toPrint: function()
	{
		return "aMessage"
	}

}

//@header

MessageManager					=	{}
MessageManager.items        	=	new Array()
MessageManager.pooled        	=   new Array()
MessageManager.time			 	=   0
MessageManager.lasttime		 	=   0
MessageManager.UPDATEDURATION 	=	5

MessageManager.Init = function(cb)
{
 	MessageManager.items		=	new Array() ;
    MessageManager.pooled 		=   new Array()
	MessageManager.time			 =   0
	MessageManager.lasttime		 =   0
	MessageManager.callback		 = 	 cb || MessageManager.DefaultCallBack

}
MessageManager.DefaultCallBack = function(message)
{

}

MessageManager.Clear = function()
{
	MessageManager.Init(MessageManager.callback)
}

MessageManager.ClearLastMessage = function(filter)
{
	if (!filter || filter == MessageManager.CheckLastMessageType())
	{
//		table.remove(MessageManager.items,#MessageManager.items) ;
		delete MessageManager.items[MessageManager.items.length - 1]
	}
}

MessageManager.CheckLastMessageType = function()
{
	var litem = MessageManager.items[MessageManager.items.length - 1]
	return litem && litem.GetDisplayType()  ;
}

MessageManager.Count = function()
{
	return MessageManager.items.length ;
}


MessageManager._GetPooled = function()
{
	var item = MessageManager.pooled[1]
	delete MessageManager.pooled[1]
	return item
}

MessageManager.Update	=	function(dt)
{

		MessageManager.time	=	MessageManager.time + dt

		if ((MessageManager.time > MessageManager.lasttime + MessageManager.UPDATEDURATION) || MessageManager.items.length == 0)
		{
			var item = MessageManager._GetPooled()
			if (item)
			{
				item.Start()
				MessageManager.items.push(item)
				if (MessageManager.callback)
				{
					MessageManager.callback(item)
				}
			}
			MessageManager.lasttime = MessageManager.time
		}


        var finished = new Array() ;

        for (var index in MessageManager.items)
		{
			var item = MessageManager.items[index] ;
         	item.Update(dt)
       		if (item.IsFinished())
			{
            	finished.push( { index:index, item:item })
          	}
        }

        for (var idx in finished)
		{
			var freeitem = finished[idx] ;
         	delete MessageManager.items[freeitem.index]
		}


}

MessageManager.IsSettled = function()
{
    	for (var index in MessageManager.items)
		{
			var item = 	MessageManager.items[index]
        	if (!item.IsSettled()) {
				return false
			}
    	}
		return true
}

MessageManager.AddPooled = function(message)
{
	MessageManager.Add(message,true)

}

MessageManager.Add = function(message,pooled)
{
		if (pooled)
		{
       		MessageManager.pooled.push(message)
		}
		else {
			message.Start()
			MessageManager.items.push(message)
			if (MessageManager.callback)
			{
				MessageManager.callback(message)
			}
		}
}



MessageManager.Render = function(rHelper)
{
	for (var index in MessageManager.items)
	{
		var item = MessageManager.items[index] ;
        item.Render(rHelper);
	}
}

/*
*/
//@header

function Locale() {}

Locale.className		=	"Locale"
Locale.gUseKeyAsText	= 	false ;
Locale.locale 			= 	null ;
Locale.prefix 			= 	"*" ;
Locale.keys				=	{} ;
Locale.region			=	"en-GB" ;

Locale.Init	=	function(usekey,region)
{
		Locale.keys		=	{}
		if (!Locale.locale)
		{
			//LoadLibrary("Object") ;
			//Locale.locale = Object.GetMe()  ;
		}

		Locale.gUseKeyAsText	= 	usekey ;
		Locale.region 			=	region || "en-GB" ;

}

Locale.ResolveRegionText = function(regionalTextArray)
{
	return 	regionalTextArray[Locale.region] || 'NO_REGIONAL_TEXT' ;
}


Locale.AddLocaleText = function(key,text)
{
	Locale.keys[key] = text ;
}

//	We use a wrapper for retrieving localised text,
// that way we can use the keys for text if
// we don't have the localized xml ready
// If we are using the key for our ingame text
// we pre-append a 'prefix' string infront on our text string.

Locale.GetLocaleText = function(key)
{
	return Locale.prefix+key ;
}

Locale.GetLocaleText2 = function(key)
{
	if (Locale.gUseKeyAsText)
	{
		return (Locale.prefix+(Locale.keys[key] || key || "NIL")) ;
	} else
	{
		if (!Locale.locale)
		{
			Locale.Init(Locale.gUseKeyAsText) ;
		}
		return (Object && Object.GetLocalizedText(Locale.locale,key) || "")  ;
	}
}


//	function Locale.ModifyText(text)
//		local modtext 	=	text
//		string.gsub(text,"_LOCALE%W*[(]([^)]+)[)]",
//			function(txt)
//				modtext = Locale and Locale.GetLocaleText and Locale.GetLocaleText(txt) or txt
//			end)
//
//		return modtext
//	end



//@header

function Spline(primitive)
{
	this.primitive	=	primitive ;
	this.type		=	'spline',
	this._Init(primitive) ;
}


Spline.Create = function(primitive)
{
	return new Spline(primitive) ;
}

Spline.prototype =
{
	constructor: Spline,

	_Init: function(primitive)
			{
				if (primitive.type == 'spline') {
					alert('NOT DEFINED!!!!! SEE A CODE DOCTOR!') ;
					this._InitSpline(primitive)
				}
				else
				{
					this._InitBezier(primitive)
				}
			},


	_InitBezier: function(primitive)
			{
				var totalLen 	=	0
				var sections 	= 	new Array() ;
				var lastNode	=	null
				var nodes		=	primitive.nodes
				var closed		=	primitive.closed

				this.type		=	primitive.type
				this.closed		=	closed ;


				var cp1,cp2,cp3,cp4 ;

				for ( var bezIndex in nodes )
				{

					var bez = nodes[bezIndex] ;

					if (!lastNode)
					{
						cp1	=	bez[0] ;
						cp2	=	bez[1] ;
						cp3	=	bez[2] ;
						cp4	=	bez[3] ;
					}
					else
					{
						cp1	=	lastNode ;
						cp2	=	bez[0]  ;
						cp3	=	bez[1] ;
						cp4	=	bez[2] ;
					}


					lastNode	=	cp4


					// Create bez,bz
					var bz = Bezier.Create(
								Vector2.Create(cp1.x,cp1.y),
								Vector2.Create(cp2.x,cp2.y),
								Vector2.Create(cp3.x,cp3.y),
								Vector2.Create(cp4.x,cp4.y)) ;


					var len = bz.getLength()

					totalLen = totalLen + len

					sections.push(
						{ 	splineVector: bz,
							length: len,
							accumlen: totalLen,
							cp1: 	{ x: cp1.x, 	y: cp1.y},
						    cp2: 	{ x: cp4.x, 	y: cp4.y},
							cp1a: 	{ x: cp2.x,		y: cp2.y},
		 					cp2a: 	{ x: cp3.x,		y: cp3.y}
						}) ;


			} // for loop


			if (closed)
			{
				var bez		=	nodes[0] ;
				cp1			=	cp4
				cp2			=	cp3
				cp3			=	bez[1]
				cp4			=	bez[0]

				var bz = Bezier.Create(
								Vector2.Create(cp1.x,cp1.y),
								Vector2.Create(cp2.x,cp2.y),
								Vector2.Create(cp3.x,cp3.y),
								Vector2.Create(cp4.x,cp4.y)) ;

				var len = bz.getLength()

				totalLen = totalLen + len

				sections.push(
					{ 	splineVector: bz,
						length: len,
						accumlen: totalLen,
						cp1: 	{x: cp1.x, 	y: cp1.y},
					    cp2: 	{x: cp4.x, 	y: cp4.y},
						cp1a: 	{x: cp2.x,	y: cp2.y},
	 					cp2a: 	{x: cp3.x,	y: cp3.y}
					}) ;

//				table.insert(sections,{splineVector = bz, length = len, accumlen = totalLen,
//					cp1  = {x = cp1.x, 	y = cp1.y},
//					cp2 =  {x = cp4.x, 	y = cp4.y},
//					cp1a = {x = cp2.x,	y = cp2.y},
//		 			cp2a = {x = cp3.x,	y = cp3.y}
//					})

			}	// if closed

			this.sections 		=	sections  ;
			this.totalLength	=	totalLen ;
		},



	_InitSpline: function(primitive)
		{
			// TODO -

		},


	IsClosed: function()
		{
			return this.closed ;
		},


	GetTotalLength: function()
		{
			return this.totalLength ;
		},


	Debug: function()
		{
			var	sections	=	spline.sections
			var tLen		=	spline.totalLength
			var isCls		=	spline.closed && 'closed' || 'not closed' ;

			//print("Spline.Debug",isCls," total Len",tLen,"Number of Sections = ",#sections)

		//	for secIdx,section in pairs(sections) do
		//		print("Section ",secIdx," Direction Vector ",section.splineVector:toString()," length = ",section.length, " Position Vector ",section.position:toString())
		//	end

		},


	//tValue from 0 to 1

	CalcPosition: function(vector,tValue,fromEnd)
	{
		var rtValue				=	fromEnd && (1-tValue) || tValue ;
		var lengthTravelled		=	rtValue*this.totalLength ;
		var sections			=	this.sections  ;

		for (var secIdx in this.sections)
		{
			var section = this.sections[secIdx] ;

			if (lengthTravelled <= section.accumlen)
			{
				//found section, now calculate how far 'in' we are on that section (0 = @start 1 = @end)
				var lt 		= 	1 - (section.accumlen - lengthTravelled)/section.length
				var bz		= 	section.splineVector
				var pos		=	bz.getPositionXY(lt)
				vector.SetXyzw(pos.x,pos.y,0,0)
				return
			}
		}
	},


	// Calculate Spline tValue from DAME segmentID and DAME t value

	FindPathTValue: function(segmentID,tValue)
	{
		var sections			=	spline.sections
		var section				=	sections[segmentID + 1]		//segmentID is 0 based
		var lenTravelled 		=	section.accumlen + (tValue-1)*section.length
		return lenTravelled/spline.totalLength
	},

	_RenderDebug: function(rHelper)
		{

			for (var sectionidx in this.sections)
			{
				var section = this.sections[sectionidx] ;

				var cp1	=	section.cp1,cp2 = section.cp2,cp1a = section.cp1a,cp2a = section.cp2a ;

				rHelper.drawCircle(cp1.x,cp1.y,16,[255,255,255,255]) ;
				rHelper.drawCircle(cp1a.x,cp1a.y,32,[255,0,0,255]) ;
				rHelper.drawCircle(cp2a.x,cp2a.y,32,[0,0,255,255]) ;
				rHelper.drawCircle(cp2.x,cp2.y,16,[0,255,0,255]) ;

				var bz		=	section.splineVector ;
				var blen	= 	bz.getLength() ;

				rHelper.drawText("BEZIER LENGTH = "+blen,cp1.x,cp1.y) ;

				for (var t = 0 ; t <= 1 ; t+=0.01)
				{
					var pos = bz.getPositionXY(t)
					rHelper.drawCircle(pos.x,pos.y,1,[0,255,0,120]) ;
				}
		}

	},

	Render: function(rHelper)
		{
			if (this.debug)
			{
				this._RenderDebug(rHelper) ;
			}
		},

	toString: function()
		{
			return "Spline" ;
		}

}

// @header

// Simple Trigger Manager - allowing us to trigger events on a 'moveable'object (eg. LocalPlayer)
// which enters or leaves a defined area within a 'shape' object.
// A shape object must have the boolean function IsPointInside()
// The parameter 'moveable' object used in Trigger.Update function must also
// have the function GetVectorPosition() defined.This should return an object
// compatible with the 'shape' object's expectations for the function IsPointInside()
// eg. Vector4
// Johnny - June 2012

var TRIGGER_STATE_NONE		=	0
var TRIGGER_STATE_INSIDE	=	1
var TRIGGER_STATE_OUTSIDE	=	2

function Trigger(shape,observerlist)
{
	this.state			=	TRIGGER_STATE_NONE ;
	this.shape			=	shape ;
	this.observers		=	observerlist ;
	this._Init()	;
}

Trigger.Create			=	function(shape,observerlist)
							{
								return new Trigger(shape,observerlist)
    						}

Trigger.debug			=	false

Trigger.prototype =
{

	_Init: function(shape)
	{
		assert(this.observers,'NIL OBSERVERS')
		this.time			=	0
		this.timeinside		=	0
		this.timeoutside	=	0
		this.inside_count	=	0
		this.outside_count	=	0
	},


	ChangeState: function(newstate,object)
	{
	//	Logger.lprint(newstate)

		if (newstate != this.state) {
			//Logger.lprint("TRY AND INFORM... CHANGE OF STATE")

			for (var idx in this.observers)
			{
					// Inform Observer
					var observer =	this.observers[idx] ;

					if (newstate == TRIGGER_STATE_INSIDE) {
						if (observer.ObjectInside)
						{
							observer.ObjectInside(object,this.shape,this.timeoutside) ;
						}
						this.inside_count	=	this.inside_count + 1
						this.timeoutside	=	0 ;
					} else
					{
						if (observer.ObjectOutside)
						{
							observer.ObjectOutside(object,this.shape,this.timeinside) ;
						}
						this.outside_count	=	this.outside_count + 1
						this.timeinside		=	0
					}
			}
			this.state	=	newstate
		} else {

			// if they have an inform callback - just let them
			// know what is going on.

			for (var idx in this.observers)
			{
				var observer 	=	this.observers[idx] ;
				if (observer.Inform)
				{
					observer.Inform(object,(newstate == TRIGGER_STATE_INSIDE),this.time,this.timeinside,this.timeoutside)
				}
			}
		}

	},


	Update: function(dt,movableobject)
	{
		this.time			=	this.time	+	dt ;
		var objectPosition	=	movableobject.GetVectorPosition() ;

		if (this.shape.IsPointInside(objectPosition))
		{
				this.timeinside		=	this.timeinside	+ dt ;
				this.ChangeState(TRIGGER_STATE_INSIDE,movableobject)
		} else {
				this.timeoutside	=	this.timeoutside + dt ;
				this.ChangeState(TRIGGER_STATE_OUTSIDE,movableobject) ;
		}

	},


    Render: function(rHelper)
	{
		if (this.shape && this.shape.Render)
		{
			this.shape.Render(rHelper)
		}
    },

    Render2D: function(rHelper)
	{
		if (this.shape) {
			this.shape.Render(rHelper)
			var cx,cy,cz = this.shape._GetCentre()
			rHelper.drawCircle(cx,cz,4)	//
		}
    },

	toString: function()
	{
		return "Trigger"
	}

}


TriggerManager					=	{} ;

TriggerManager.className		=	"TriggerManager" ;
TriggerManager.triggers        	=	{} ;
TriggerManager.time			 	=   0 ;
TriggerManager.debug			=  	true ;
TriggerManager.count			=	0 ;


    TriggerManager.Init = function()
	{
		TriggerManager.count			=	0	;
        TriggerManager.triggers        	=   new Array() ;
    }

	 TriggerManager.Clear = function()
	{
		TriggerManager.Init() ;
	}

     TriggerManager.Update = function(dt,moveableobject)
	{
		TriggerManager.time	=	TriggerManager.time + dt

		for (var index in TriggerManager.triggers)
		{
			var trigger = TriggerManager.triggers[index] ;
      		trigger.Update(dt,moveableobject) ;
    	}

    }

     TriggerManager.Add = function(trigger)
	{
		TriggerManager.triggers.push(trigger) ;
		TriggerManager.count = TriggerManager.count + 1
    }


    TriggerManager.Remove = function(trigger)
	{
		for (var index in TriggerManager.triggers)
		{
			var trg 	=	TriggerManager.triggers[index] ;
			if (trigger == trg)
			{
				TriggerManager.count = TriggerManager.count - 1
				delete TriggerManager.triggers[index]
				return true;
			}
		}
		return false ;
    }

	TriggerManager.Render = function(rHelper)
	{
		if (TriggerManager.debug)
		{
    		for (var index in TriggerManager.triggers)
			{
				var trigger 	=	TriggerManager.triggers[index] ;
          		trigger.Render(rHelper) ;
        	}
		}
 	}
//@header

var	QuadHotspotDEFAULTDEPTH		=	0.125
var	QuadHotspotclassName		=	"QuadHotspot"

function QuadHotspot(quads,depth,name,debug)
{
	this.quads		=	quads ;
	this.name		=	name || "NONAME" ;
	this.depth		=	depth || QuadHotspotDEFAULTDEPTH ;
	this.className	=	QuadHotspotclassName ;
	this.debug		=	debug ;
	this._Init()
}

function stringformat()
{
	return arguments ;
}

function _subtractv(v1,v2)
{
	var answ = Vector4.Create()
	answ.Subtract(v1,v2)
	return answ ;
}

function _Dot2(v1,v2) {
	// Dot2 takes x && z components of 2 Vector4's to produce 2D dot product
	return v1.X()*v2.X() + v1.Z()*v2.Z() ;
}


QuadHotspot.Create =	function(quads,depth,name,debug)
{
	return new QuadHotspot(quads,depth,name,debug) ;
}
	// Build Regular QHS

QuadHotspot.Build2DPoly	=	function(tx,tz,radius,phase,name,debug)
{


	var polypoints	=	new Array() ;
	var points 		= 	4 ;
	var angle		=	2*Math.PI/points ;
	var qrtpi	 	=	2*Math.PI/4 ;
	for (var i=1 ; i <= points ; i++)
	{
		var x = radius*Math.cos(angle*(i-1)-qrtpi+(phase || 0)) ;
		var z = radius*Math.sin(angle*(i-1)-qrtpi+(phase || 0)) ;
		polypoints.push(Vector4.Create(tx+x,0,tz+z)) ;
	}
	var qhs = QuadHotspot.Create(polypoints,0.5,name,debug)
//		qhs.cenx,qhs.cenz	=	tx,tz
	return qhs
}

QuadHotspot.prototype =
{

	constructor: QuadHotspot,

	_Init: function() {
		// Find Equation of plane - Normal

		// Make sure we have our own copies of vectors.
		var	quads		=	this.quads
		var	nquads		=	[Vector4.Create(quads[0]), Vector4.Create(quads[1]), Vector4.Create(quads[2]), Vector4.Create(quads[3])]
		this.quads	=	nquads

		// Work out normal to plane
		this.normal		=	Vector4.Create()
		this.Enormal1	=	Vector4.Create()
		this.Enormal2	=	Vector4.Create()
		this.Enormal3	=	Vector4.Create()
		this.Enormal4	=	Vector4.Create()

//		this.normal2	=	Vector4.Create()
//		this.normal3	=	Vector4.Create()
//		this.normal4	=	Vector4.Create()

		Vector4.Cross(this.normal,_subtractv(nquads[2], nquads[0]),_subtractv(nquads[1] , nquads[0]))
		Vector4.Normalize3(this.normal)

		this.D		=	-Vector4.Dot3(this.normal,nquads[0])

		// Now recalculate Y coord of 4th point
		// Make all our points are on the same plane!

		var		rY		=	-(this.D + this.normal.X()*nquads[3].X() + this.normal.Z()*nquads[3].Z())/this.normal.Y()
		nquads[3].SetY(rY)
		var eps	=	0.001

		assert(Math.abs(Vector4.Dot3(this.normal,nquads[0]) + this.D) <= eps,"SHOULD BE 0")
		assert(Math.abs(Vector4.Dot3(this.normal,nquads[1]) + this.D) <= eps,"SHOULD BE 0")
		assert(Math.abs(Vector4.Dot3(this.normal,nquads[2]) + this.D) <= eps,"SHOULD BE 0")
		assert(Math.abs(Vector4.Dot3(this.normal,nquads[3]) + this.D) <= eps,"SHOULD BE 0")

		// Calculate Edge Normals

		Vector4.Cross(this.Enormal1,this.normal,_subtractv(nquads[1] , nquads[0]))
		Vector4.Cross(this.Enormal2,this.normal,_subtractv(nquads[2] , nquads[1]))
		Vector4.Cross(this.Enormal3,this.normal,_subtractv(nquads[3] , nquads[2]))
		Vector4.Cross(this.Enormal4,this.normal,_subtractv(nquads[0] , nquads[3]))

		Vector4.Normalize3(this.Enormal1)
		Vector4.Normalize3(this.Enormal2)
		Vector4.Normalize3(this.Enormal3)
		Vector4.Normalize3(this.Enormal4)

		this.centre		=	this._GetCentre()

		assert(this.IsPointInside(Vector4.Create(this.centre.x,this.centre.y,this.centre.z)),'CENTRE NOT IN HOTSPOT - SEE A CODE DOCTOR')


	},




	_GetCentre: function(quadhotspot)
	{

		var	quads		=	this.quads ;
		var x			=	0,y = 0, z = 0 ;
		for (var idx in quads)
		{
			var v = quads[idx] ;
			x 	=	x + v.X()
			y 	=	y + v.Y()
			z 	=	z + v.Z()
		}
		return {x:x/4,y:y/4,z:z/4} ;
	},

//	function Polygon.BuildPolyIreg(radius,angles,colour) {
//
//		var polypoints = {}
//		var points = #angles
//		var rad	=	Math.rad
//		for i=1,points do
//			var angle = rad(angles[i]-90)
//			var x = radius*Math.cos(angle)
//			var y = radius*Math.sin(angle)
//			table.insert(polypoints,{x = x,y = y})
//		}
//
//		var poly = Polygon.Create(polypoints,radius)
//		poly.radius = radius
//		poly.colour	= colour || Polygon.DEFAULTCOLOUR
//		return poly
//	},


	SetName: function(name) {
		this.name	=	name
	},

	GetRawQuads: function(quadhotspot) {
		return this.quads
	},

	GetName: function(name) {
		return this.name
	},




	IsPointInside: function(point,somedepth) {
//		Logger.lprint("QuadHotspot.IsPointInside"..point:X()..","..point:Y()..","..point:Z())
		var dpth	=	somedepth || this.depth
		var quads	=	this.quads
		// Ignore Y! - becareful now - watch GC!!
		var v1	=	_Dot2(this.Enormal1,_subtractv(point,quads[0]))
		var v2	=	_Dot2(this.Enormal2,_subtractv(point,quads[1]))
		var v3	=	_Dot2(this.Enormal3,_subtractv(point,quads[2]))
		var v4	=	_Dot2(this.Enormal4,_subtractv(point,quads[3]))

		this.debug	=	{v1: v1, v2: v2, v3: v3, v4: v4, pdist: this.DistanceFromPlane(point)}
		//if ( (v1 < 0) && (v2 < 0) && (v3 < 0) && (v4 < 0) && this.DistanceFromPlane(point) <= dpth)
		//{
		//	console.log("INSIDE "+this.name)
		//}
		return (v1 < 0) && (v2 < 0) && (v3 < 0) && (v4 < 0) && this.DistanceFromPlane(point) <= dpth
	},

	DistanceFromPlane: function(point)
	{
		return Math.abs(Vector4.Dot3(point,this.normal) + this.D) ;
	},

	RenderDebug: function(renderHelper,point,x,y)
	{
		var	defaultCol		=	[255,255,0,64]
		var	insideCol		=	[255,0,0,255]

		if (point) {
			var inside = this.IsPointInside(point)
			if (this.debug) {

				var dbg 	=	this.debug
				var col	=	inside && insideCol || defaultCol
				renderHelper.drawText(
					stringformat(
							this.GetName(),
							dbg.v1,
							dbg.v2,
							dbg.v3,
							dbg.v4,
							dbg.pdist),x,y,col,{horizontal:"left",vertical:"top"})
			}
		} else
		{
			renderHelper.drawText(stringformat(this.GetName()),x,y,col,{horizontal:"left",vertical:"top"}) ;
		}


	},

	Render: function(renderHelper,col)
	{
			this.Render2D(renderHelper,col)
		//	this.Render3D(renderHelper,col)
	},

	Render3D: function(renderHelper,col)
	{
		assert(this.className && this.className == QuadHotspotclassName,'NOT A QUADHOTSPOT!')
		var dcol	=	col || Vector4.Create( 1, 0, 1, 1 )
		var qquad	=	this.GetRawQuads()
	//	Debug.DrawQuad3d(qquad[1],qquad[2],qquad[3],qquad[4],dcol,true)
	},


	Render2D: function(renderHelper,col)
	{
		var dcol	=	col || [255,255,0,255]
		var qquad	=	this.GetRawQuads()

		var x1		=	qquad[0].X(),y1 = 	qquad[0].Z() ;
		var x2		=	qquad[1].X(),y2 = 	qquad[1].Z() ;
		var x3		=	qquad[2].X(),y3	=	qquad[2].Z() ;
		var x4		=	qquad[3].X(),y4=	qquad[3].Z() ;

		renderHelper.drawLine(x1,y1,x2,y2,dcol) ;
		renderHelper.drawLine(x2,y2,x3,y3,dcol) ;
		renderHelper.drawLine(x3,y3,x4,y4,dcol) ;
		renderHelper.drawLine(x4,y4,x1,y1,dcol) ;
		renderHelper.drawText(this.name,this.centre.x,this.centre.z) ;


	},

	toString: function()
			{
				return "QuadHotspot" ;
			}
}
//@header

// An ObserverEvent object is responsible for deciding if an event is triggered.
// tiPoint is duration in seconds the moveable object has to be in the hotspot for.
// eventCh is the % (0-100) chance of the event actually being triggered
// tFunction is the callback function in the event that the event is triggered.
// optCond is optional boolean callback function which needs to return true if event attempts to trigger.
// limit [optional] is the number of times the event can happen
// backoff is the duration in seconds that a next possible event will be held back for
// before testing again.
// rGen is an optional random number generator.
// Johnny - June 2012

function ObserverEventRandom(start,end)
{
	return start+Math.random()*(end-start) ;
}

function ObserverEvent(tiPoint,eventCh,tFunction,optCond,limit,backoff,rGen)
{

	this.triggerPoint	=	tiPoint ;
	this.eventChance	=	eventCh ;
	this.makeitso		=	tFunction ;
	this.triggered		=	false ;
	this.count			=	0 ;
	this.limit			=	limit ;
	this.backoff		=	backoff ;
	this.rGen			=	rGen || ObserverEventRandom ;
	this.optCondition	=	optCond ;
	this.className		=	"ObserverEvent" ;

}

ObserverEvent.Create = function(tiPoint,eventCh,tFunction,optCond,limit,backoff,rGen)
{
	return new ObserverEvent(tiPoint,eventCh,tFunction,optCond,limit,backoff,rGen) ;
}

function _debugPrint(s)
{

}


ObserverEvent.prototype	=	{
			constructor:	ObserverEvent,

			ObjectOutside:		function()
								{
									_debugPrint("RESET STATE "+this.className)
									this.triggered	=	false
								},


			Inform:			function(obj,isinside,ctime,timein,timeout)
							{

									if (timein > this.triggerPoint && !this.triggered && (!this.optCondition || this.optCondition())
											&& (!this.limit || this.count < this.limit)
											&& (!this.backoff || (!this.lasttime || ctime - this.lasttime > this.backoff)))
									{
											this.triggered	=	true
											_debugPrint("Throwing Dice")
											if (this.rGen(0,100) < this.eventChance)
											{

												if (this.makeitso)
												{
													this.makeitso(obj)
													this.count 		=	this.count + 1
													this.lasttime	=	ctime
												}
											}
											else
											{
												_debugPrint("Dice - says no!")
											}
									}
							},

			toString:		function()
							{
								return "ObserverEvent" ;
							}

}

//@header

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




//@header

var tmpV			=	Vector4.Create() ;

function dprint()
{

}

function Path(primitive)
{
	var nodes		=	primitive.nodes  ;
	var closed		=	primitive.closed ;
	var lastV		=	null ;
	var totalLen 	=	0 ;
	var sections	=	new Array() ;

	this.type		=	primitive.type
	this.className 	= 	Path.className ;
	this.closed		=	closed ;
	this.primitive	=	primitive ;		// TODO NOT NEEDED! REMOVE ON RELEASE!!!

	for (var nodeIndex = 0 ; nodes && nodeIndex < nodes.length ; nodeIndex++)
	{
		var node	=	nodes[nodeIndex] ;
		var v 		=	Vector4.Create(node.x,node.y) ;

		if (lastV)
		{
			tmpV.Subtract(v,lastV) ;

			var len		=	Vector4.Length3(tmpV) ;

			totalLen	=	totalLen + len ;

			var dV		=	Vector4.Create(tmpV) ;
			dV.Normalise3() ;

			sections.push({pathVector:dV, length:len, position:lastV, accumlen:totalLen}) ;
		}

		lastV   = v ;

	}


	if (closed)
	{
		var lv			=	nodes[nodes.length - 1]
		var fv			=	nodes[0]
		var position	=	Vector4.Create(lv.x,lv.y)

		tmpV.Subtract(Vector4.Create(fv.x,fv.y),position)

		var len			=	Vector4.Length3(tmpV)
		totalLen 		=	totalLen + len

		var dV			=	Vector4.Create(tmpV)

		dV.Normalise3()
		sections.push({pathVector:dV, length:len, position:position, accumlen:totalLen})

	}


	this.sections 		=	sections ;
	this.totalLength	=	totalLen ;

}

Path.className		=	"Path" ;
Path.debug			=	true ;

Path.Create			=	function(primitive)
						{
							return new Path(primitive) ;
						}


Path.prototype =
{
	constructor:		Path,

	IsClosed:			function()
						{
							return this.closed
						},

	GetTotalLength:		function()
						{
							return this.totalLength ;
						},


	Debug:				function()
						{
							var sections	=	this.sections ;
							var tLen		=	this.totalLength ;
							var isCls		=	this.closed ? 'closed' : 'not closed' ;
							dprint("Path.Debug",isCls,
								" total Len",tLen,
								"Number of Sections = ",sections.length) ;

							for (var secIdx = 0 ; secIdx < sections.length ; secIdx++)
							{
								var section	=	sections[secIdx] ;

								dprint("Section ",secIdx," Direction Vector ",section.pathVector.toString(),
										" length = ",section.length,
										" Position Vector ",section.position.toString()) ;
							}
						},


							// tValue from 0 to 1

	CalcPosition:		function(vector,tValue,fromEnd)
						{
							var rtValue				=	(fromEnd ? (1-tValue) : tValue) ;
							var lengthTravelled		=	rtValue*this.totalLength ;
							var sections			=	this.sections ;

							for (var secIdx = 0 ; secIdx < sections.length ; secIdx++)
							{
								var section	=	sections[secIdx] ;

								if (lengthTravelled <= section.accumlen)
								{
									// found section, now calculate how far 'in' we are on that section (0 = @start 1 = @})
									var lt = 1 - (section.accumlen - lengthTravelled)/section.length ;

									// new position =  section.position + lt*section.pathVector
									vector.Multiply(section.pathVector,lt*section.length) ;
									vector.Add(vector,section.position) ;
									return ;
								}

							}

						},

						// Calculate Path tValue from DAME segmentID and DAME t value

	FindPathTValue:		function(segmentID,tValue)
						{
						//	assert(this.className == Path.className,'Path object Mismatch '+this.className)

							var sections			=	this.sections  ;
							var section				=	sections[segmentID]	;	// segmentID is 0 based
							var lenTravelled 		=	section.accumlen + (tValue-1)*section.length ;
							return lenTravelled/this.totalLength ;
						},

	_RenderDebug:		function(rHelper)
						{

							var sections = this.sections ;
							for (var secIdx = 0 ; secIdx < sections.length ; secIdx++)
							{
								var section	=	sections[secIdx] ;
								var pv		=	section.pathVector ;
								var plen	=	section.length ;
								tmpV.Multiply(section.pathVector,section.length) ;
								tmpV.Add(tmpV,section.position) ;
							//	alert("Section "+secIdx+"Draw From "+section.position+" to "+tmpV.X()+","+tmpV.Y()) ;

								rHelper.drawLine(section.position.X(),section.position.Y(),tmpV.X(),tmpV.Y(),[255,0,0,120]) ;

							}
						},


	Render:			function(rHelper)
					{
						if (Path.debug)
						{
							this._RenderDebug(rHelper) ;
						}
					},

}


function PathManager() {}

PathManager.paths	=	new Array() ;

PathManager.Init		=	function(patharray)
							{
								PathManager.paths		=	new Array() ;
								if (patharray)
								{
									for (var idx = 0 ; idx < patharray.length ; idx++)
									{
										PathManager.Add(new Path(patharray[idx])) ;
									}

								}
							}

PathManager.Add		=	function(path)
						{
							var id		=	 PathManager.paths.length ;
							PathManager.paths.push(path) ;
							return id ;
						}

PathManager.GetPath	=	function(id)
						{
							return PathManager.paths[id] ;
						}

PathManager.Iterator	=	function()
							{
								var idx = 0 ;

								return {	HasElements:	function()	{ return (idx < PathManager.paths.length) ; },
											Reset: 			function() 	{ idx = 0 ; },
											Next: 			function()	{ idx++ ; },
											GetElement: 	function()	{return PathManager.paths[idx] ;}

										} ;
							}

PathManager.Clear		=	function()
							{
								PathManager.paths	=	new Array() ;
							}

PathManager.Render		=	function(rHelper)
							{

								for (var idx = 0 ; idx < PathManager.paths.length ; idx++)
								{
									var path = PathManager.paths[idx] ;
									path.Render(rHelper) ;

								}
							}

PathManager.Test		=	function()
							{
								PathManager.Clear() ;
								PathManager.Add(new Path("Path1")) ;
								PathManager.Add(new Path("Path2")) ;
								PathManager.Add(new Path("Path3")) ;
								PathManager.Add(new Path("Path4")) ;
								for (var it = PathManager.Iterator(); it.HasElements() ; it.Next())
								{
									alert(it.GetElement().primitive) ;
								}
							}


//@header

function Animation(info,play)
{
		if (!info)
		{
			alert("NO INFO PASSED!") ;
		}
		this.x 			=	info.x ;
		this.y			=	info.y ;
		this.z			=	info.z || 0 ;
		this.scale		=	info.scale || 1 ;
		this.fps		=	info.fps || 13 ;
		this.frameshor	=	info.frameshor || 8 ;
		this.framesvert	=	info.framesvert || 4 ;
		this.texture	=	info.texture || "explosionuv64.png" ;
		this.loop		=	info.loop ;
		this.bounce		=	info.bounce ;
		this.timeout 	=	info.timeout ;
		this.angle		=	info.angle ;
		this.effect		=	info.effect ;
		this.tx			=	0 ;
		this.ty			=	0 ;
		this.time		=	0 ;
		this.hasPlayed	=	false ;

		this.anim		=	RenderHelper.CreateTextureAnimation(this.frameshor,this.framesvert,this.texture,this.fps) ;
		this.className	=	Animation.className ;
		if (play)
		{
//			alert("PLAYING "+this.anim.className)	;
			this.Play() ;
		}
}

Animation.Create		=	function(info,play)
							{
								return new Animation(info,play) ;
							}


Animation.className		=	"Animation"



Animation.prototype 	=
{
	constructor:	Animation,

	Update:			function(dt)
					{
						this.time	=	this.time	+ dt ;
						this.anim.update(dt) ;

						if (this.effect)
						{
							var trans = this.effect(this.time) ;
//							this.tx	=	trans.tx ;
//							this.ty	=	trans.ty ;
							for (var v in trans)
							{
								this[v]	= trans[v] ;
							}
						}

						if (this.effector)
						{
							this.effector.Update(dt) ;
						}

					},

	ApplyEffector:
					function(effector)
					{
							this.effector 	=	effector,
							this.effector.EffectMe(this) ;
					},


	Play:			function()
					{
						this.hasPlayed	=	true ;
						this.anim.play(this.loop,this.bounce,this.timeout) ;
					},

	HasFinished:	function()
					{
						return this.hasPlayed && !this.anim.isPlaying() ;

					},
	Render:			function(rHelper)
					{
						//	drawSpriteSheet: function(spritesheet,x,y,frame,rot,sx,sy)
						if (this.anim.render)
						{
							this.anim.render(rHelper,this.x+this.tx,this.y+this.ty,this.scale,this.scale,this.angle)	;
						} else
						{
							alert("Not Yet Defined!")
							//var texinfo =	this.anim.GetRenderTexture() ;
							//rHelper.drawSheet(texinfo.sheet,this.x,this.y,texinfo.frame,0,this.scale,this.scale) ;
						}
					}
}

function AnimationManager() {}

AnimationManager.llist			=	new Array() ;
AnimationManager.currentOverlay	=	0 ;
AnimationManager.MAXOVERLAYS	=	16
AnimationManager.clist			=	null ;
AnimationManager.removeList		=	new LinkedList()  ;

AnimationManager.Init		=	function()
								{
									for (var idx = 0 ; idx < AnimationManager.MAXOVERLAYS ; idx++)
									{
										AnimationManager.llist[idx]	=	new LinkedList() ;
									}
									AnimationManager.SetOverlay(0) ;

									AnimationManager.removeList		=	new LinkedList()  ;
								}
AnimationManager.Size			=	function()
								{
									var totalSize		=	0 ;

									for (var idx = 0 ; idx < AnimationManager.MAXOVERLAYS ; idx++)
									{
										var size = AnimationManager.llist[idx].Size() ;
										totalSize	=	totalSize + size ;
									}
									return totalSize ;

								}

AnimationManager.SetOverlay	=	function(overlay)
								{
									AnimationManager.currentOverlay	=	overlay ;
									AnimationManager.clist			=	AnimationManager.llist[overlay]	;
								}

AnimationManager.GetOverlay	=	function(overlay)
								{
									return (overlay == undefined) ? AnimationManager.clist : AnimationManager.llist[overlay]	;
								}

AnimationManager.Update		=	function(dt)
								{

									var removeList	=	new LinkedList() ; ///AnimationManager.removeList	;

									for (var overlayindex = 0 ; overlayindex < AnimationManager.MAXOVERLAYS ; overlayindex++)
									{
										var list		=	AnimationManager.GetOverlay(overlayindex)

										for (var it = list.Iterator() ; it.HasElements() ; it.Next())
										{
											var animationEl = it.GetCurrent() ;

											var animation	= animationEl.GetData() ;
											if (!animation.HasFinished())
											{
												animation.Update(dt)
											} else
											{
												removeList.Add({list:list,element:animationEl}) ;
											}
										}


									}

									// finished updating - now remove those that have finished.
									for (var it = removeList.Iterator(true) ; it.HasElements() ; it.Next())
									{
										var removeInfo = it.GetCurrent() ;
										removeInfo.list.Remove(removeInfo.element) ;
									}

								}

AnimationManager.Render		=	function(rHelper)
								{
									// todo preserver rHelper's own overlay index
									var cOverlayIndex	=	rHelper.getOverlay() ;

									for (var overlayindex = 0 ; overlayindex < AnimationManager.MAXOVERLAYS ; overlayindex++)
									{
										var list	=	AnimationManager.GetOverlay(overlayindex)

										// todo set rHelper's  overlay index to 'overlayindex'
										rHelper.setOverlay(overlayindex) ;

										for (var it = list.Iterator(true) ; it.HasElements() ; it.Next())
										{

											var animation = it.GetCurrent() ;
											animation.Render(rHelper)
										}
									}
									// todo restore rHelper's own overlay index
									rHelper.setOverlay(cOverlayIndex) ;

								}

AnimationManager.Add		=	function(animation,overlayindex)
								{
									var list	=	AnimationManager.GetOverlay(overlayindex) ;
									list.Add(animation) ;
								}


AnimationManager.RenderDebug	=	function(rHelper)
									{
										for (var overlayindex = 0 ; overlayindex < AnimationManager.MAXOVERLAYS ; overlayindex++)
										{
											var list	=	AnimationManager.GetOverlay(overlayindex)
											var size 	=	list.Size() ;
											rHelper.drawText("Index "+overlayindex+" Size "+size,100,120+overlayindex*20) ;

										}
									}
// Needs Spline.js library
// Used to move round a fixed Spline Path

function Orbitor(bezRelTable,dwidth,dheight,angle)
{

	var rangle	=	(angle || 0)*Math.PI/180 ;

	var dBez = {	type:			'bezier',
					nodes:			new Array(),
					primitiveType:	'path',
					closed:			false
				} ;

	var k1 = 1.0,k2 = 1.0 ;

	var mapWidth = dwidth*k1,mapHeight	=	dheight*k2 ;
	var cos		=	Math.cos(rangle) ;
	var sin		=	Math.sin(rangle) ;


	for (var bzIndex in bezRelTable)
	{
		var bez	=	bezRelTable[bzIndex] ;
		var bz	=	[] ;

		for (var ptIndex in bez)
		{
			var rtPoint =	bez[ptIndex] ;
			var rx		=	rtPoint.x*mapWidth-mapWidth*0.5, ry = rtPoint.y*mapHeight-mapHeight*0.5 ;
			var	tx		=	rx*cos - ry*sin + mapWidth*0.5
			var	ty		=	rx*sin + ry*cos + mapHeight*0.5

			bz.push({x:tx, y:ty}) ;
		}
		dBez.nodes.push(bz) ;
	}

	this.path				=	Spline.Create(dBez) ;
	this.totalPathLength	=	this.path.GetTotalLength() ;
	this.tValue				=	0	;
	this.back				=	false ;
	this.tSpeed 			=	256	;
	this.speedConst			=	this.path && this.totalPathLength || 1 ;
	this.speedFact			=	this.tSpeed/this.speedConst ;
	this.time				=	0 ;
	this.x					=	0 ;
	this.y					=	0 ;
	this.vpos				=	new Vector2() ;

}

Orbitor.prototype	=
{
		GetPosition:	function()
						{
								return {_x: this.x, _y:this.y, _z:0}
						},
		Update:			function(dt)
						{
							this.time = this.time + dt

							this.tValue	=	this.tValue + dt*this.speedFact

							if (this.tValue > 1)
							{
								this.tValue = 0
								if (!this.path.IsClosed())
								{
									this.back	 = !this.back
								}
							}
							this.path.CalcPosition(this.vpos,this.tValue,this.back)

							this.x		=	this.vpos.x
							this.y		=	this.vpos.y

						},

		CameraUpdate:	function(dt)
						{
							this.Update(dt) ;
						},

		Render:			function(rHelper)
						{
							var oldval		=	this.path.debug ;
							this.path.debug =	true ;
							this.path.Render(rHelper) ;
							this.path.debug = 	oldval ;

						}

}


//@header

function Spring(startpos,endpos,m,r,k,time,pause)
{
    this.osc           	=   KDampedOscillator.Create( m || 1,  r || 12,  k || 100,0,0) ;
    this.osctimer		=	Ktimer.Create(1,pause) ;
	this.time			= 	0 ;
	this.startpos		=	startpos ;
	this.endpos			=	endpos ;
	this.finishby		=	time || 5 ;

	this.osc.reset( this.startpos,  0,  this.endpos) ;

}

Spring.Create = function(startpos,endpos,m,r,k,time,pause)
{
    return new Spring(startpos,endpos,m,r,k,time,pause) ;
}

Spring.ZEROVEL_EPS		=	0.01 ;

Spring.prototype = {

	constructor: Spring,

	Resume: function()
	{
		this.osctimer.resume() ;
	},

   	IsFinished: function()
	{
        return (this.finishby && this.time > this.finishby) ;
    },

	IsStationary: function()
	{
		 return this.osc.equilibrium(this.osctimer.elapsed(),Spring.ZEROVEL_EPS) ;
	},

   	Update: function(dt)
	{
		this.time	=	this.time + dt
//		if (Spring.IsFinished(spring)) {
//            spring.osc.reset(spring.endpos, 0, spring.endpos)
//        }
    },

  	GetPosition: function()
	{
		if (this.IsFinished())
		{
			return this.endpos ;
		}
		else
		{
			return this.osc.evaluate( this.osctimer.elapsed()) ;
		}
   },

	toString: function()
	{
		return "Spring" ;
	}



}
//@header
//var 	MAXEXPLOSIONS	=	20
function Explosion(info,play)
{
		this.x 			=	info.x ;
		this.y			=	info.y ;
		this.z			=	info.z || 0 ;
		this.scale		=	info.scale || 1 ;
		this.fps		=	info.fps || 13 ;
		this.frameshor	=	info.frameshor || 8 ;
		this.framesvert	=	info.framesvert || 1 ;
		this.texture	=	info.texture || "explosionuv64.png" ;
		this.loop		=	info.loop
		this.time		=	0 ;
		this.anim		=	RenderHelper.CreateTextureAnimation(this.frameshor,this.framesvert,this.texture,this.fps) ;
		this.className	=	Explosion.className ;
		if (play)
		{
			this.anim.Play(false,false) ;
		}
}


Explosion.className		=	"Explosion"
Explosion.STATE_MOVE	=	0
Explosion.STATE_DEAD	=	1
Explosion.prototype 	=
{
	constructor:	Explosion,

	GetState:		function()
					{
	   					return this.state ;
					},
	Update:			function(dt)
					{
						this.time	=	this.time	+ dt ;
						this.anim.Update(dt) ;


					},

	HasFinished:	function()
					{
						return !this.anim.isPlaying() ;

					},
	Render:			function(rHelper)
					{
						//	drawSpriteSheet: function(spritesheet,x,y,frame,rot,sx,sy)
						if (this.anim.render)
						{
							this.anim.render(rHelper,this.x,this.y,this.scale)	;
						} else
						{
							alert("Not Yet Defined!")
							//var texinfo =	this.anim.GetRenderTexture() ;
							//rHelper.drawSheet(texinfo.sheet,this.x,this.y,texinfo.frame,0,this.scale,this.scale) ;
						}
					}
}

ExplosionManager		=	{}	;

ExplosionManager.Init	=	function()
{

}

ExplosionManager.AddExplosion	=	function(animationinfo,overlay)
{
	AnimationManager.Add(new Animation(animationinfo,true), overlay) ;
}

ExplosionManager.Update	=	function(dt)
{

}

ExplosionManager.Render	=	function(rHelper)
{

}



		//@header

// Use sprite sheet!

function TextureParticle(initpackage)
{
		this.className		=	TextureParticle.className ;

		this._texid			=	initpackage.texid || "flare.png" ;

		this._time			=	0 ;
		this._sprite 		= 	new sprite(initpackage.texid) ;

		this._x				=	initpackage.x ;
		this._y				=	initpackage.y ;
		this._duration		=	initpackage.duration ;
		this._velx			=	initpackage.velx ;
		this._vely			=	initpackage.vely ;
		this._alpha			=	0 ;

		var anim 			=	new textureanim(1,initpackage.fps || 5)
		this._anim			=	anim
		anim.addFrame({frame:1,textureid:this._texid})
		anim.play(true) ;

}

TextureParticle.className	=	"TextureParticle" ;

TextureParticle.Create		=	function(initpackage)
								{
										return new TextureParticle(initpackage) ;
								}


TextureParticle.prototype =
{

	constructor:	TextureParticle,

	Update:			function(dt)
					{
						this._anim.update(dt) ;

						this._time	=	this._time + dt ;
						this._alpha	=	1	-	Math.min((this._time/this._duration),1) ;
						this._x		=	this._x	+ this._velx*dt ;
						this._y		=	this._y	+ this._vely*dt ;

					},

	IsFree:			function()
					{
						return this._time > this._duration ;
					},

	Alive: 			function()
					{
						return !this._IsFree() ;
					},

	GetVectorPosition:	function()
						{
							// TODO OPTIMISE!
							return Vector4.Create(this._x,this._y,0) ;
						},


	Render:			function(renderHelper)
					{
						//var textureid		=	this._anim.getRenderTexture().textureid ;

						var rgba 			=	[255,255,255,255*this._alpha] ;

						//this._sprite.setTexture(RenderHelper.TextureFind(textureid))
						renderHelper.drawSprite(this._sprite,this._x,this._y,0.5,0,rgba) ;
						//RenderHelper.drawCircle(renderHelper, this._x, this._y, 8, rgba) ;
					},


}//@header
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
									//@header

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

//@header
var TURRETFULLSWING_DURATION	=	72 ;

function EnemyPart(enemy,width,height,ctype,tanim,offset,poly,radius,indes,weaponcollide,explosions)
{
	this.offset		=	offset ;
	this.anim		=	tanim ;
	this.enemy		=	enemy ;
	this.tx			=	offset.x ;
	this.ty			=	offset.y ;
	this.ctype		=	ctype ;
	this.direction	=	enemy.direction ;
	this.tangle		=	0 ;					// turret angle
	this.tphase		=	Math.random()*2*Math.PI ;
	this.time		=	0 ;
	var	 degaim		=	this.enemy.realpath ? 16 : 90
	this.aim		=	rad(degaim) ;

	var	turretFreq		=	(180/(degaim*TURRETFULLSWING_DURATION)) ;
	this.turretFreqCnst	=	2*Math.PI*turretFreq ;		// == 2*pi*freq


	var texFrames	=	tanim.getFrames() ;

//	alert("CTYPE "+this.ctype) ;

	this.frames		=	{} ;

	for (var idx = 0 ; idx < texFrames.length ; idx++)
	{
		this.frames[texFrames[idx]] = ImageResource.getResource(texFrames[idx]) ;
	}

}


EnemyPart.Create=function(enemy,width,height,ctype,tanim,offset,poly,radius,indes,weaponcollide,explosions)
{
	return new EnemyPart(enemy,width,height,ctype,tanim,offset,poly,radius,indes,weaponcollide,explosions) ;
}

function rad(deg)	{	return deg*Math.PI/180 ;	}
function deg(rad)	{	return rad*180/Math.PI ;	}

EnemyPart.prototype =
{
	constructor:		EnemyPart,

	Update:				function(dt)
						{
							this.time	=	this.time + dt ;

							if (this.anim)
							{
								this.anim.update(dt) ;


							}
							if (this.ctype && this.ctype == 'rotate')
							{
								var ROTATESPEED	=	360 ;

								this.direction 	= 	this.direction + dt*ROTATESPEED ;
							}

							if (this.ctype && this.ctype == 'turret')
							{
								this.tangle 	= 	deg(this.aim*Math.sin(this.turretFreqCnst*this.time + this.tphase)) ;
							}

						},

	GetFiringDirection:	function()
						{
							return (this.ctype && this.ctype == 'turret')  ? this.enemy.direction + this.tangle : this.direction ;
						},

 	Render:				function(rHelper)
						{
							if (this.anim)
							{
								var DEFAULTSCL	=	0.5 ;

								var scale		=	this.enemy.scale || DEFAULTSCL;
								var pos 		=	this.enemy.GetPosition() ;
								var direction	=	this.enemy.GetDirection() + this.direction ;

								var x 			=	pos._x, y = pos._y ;
								var img 		=	this.frames[this.anim.getRenderTexture()];
								var toffset		=	this.ctype == 'turret' ?  this.tangle : 0
								rHelper.drawRawImage(img,x,y,direction+toffset,scale,scale) ;
							}
						},

	RenderDebug:		function(rHelper)
						{
						},

}


//@header
var hCode	=	"" ;

function Camera(screenDim,mapDim,follow,interp)
{

	this._follow	=	follow ;
	this._x 		=	0 ;
	this._y			=	0 ;
	this._z			=	0 ;
	this._leftx		=	0 ;
	this._topy		=	0 ;
	this._time		=	0 ;
	this._mapwidth	=	mapDim.X() ;
	this._mapheight	=	mapDim.Y() ;
	this._centrex	=	screenDim.X()/2 ;
	this._centrey	=	screenDim.Y()/2 ;
	this._interp	=	interp || Camera.INTERPRATE ;
	this.className	=	Camera.className ;
	this.Init() ;

	hCodeRH 		=	HashCode.value(RenderHelper) ;
	//hCode			=	HashCode.value(executeGame3) ;

}

Camera.className	=	"Camera" ;
Camera.INTERPRATE	=	0.4 ;
Camera.debug		=	false ;


Camera.Create	=	function(screenDim, mapDim, follow, interp)
{
	return new Camera(screenDim,mapDim,follow,interp) ;
}
var floor 			=	function(val)
						{
							//return Math.ceil(val) ;
							return val ;
						}


Camera.prototype	=
{
	constructor:	Camera,
	regionHelper:	EnemyManager,
	SetRestriction: function(minx,maxx,miny,maxy)
					{
						this._minx	=	minx ;
						this._maxx	=	maxx ;
						this._miny	=	miny ;
						this._maxy	=	maxy ;
					},

	Init: 			function()
					{
						if (this._follow)
						{
							var pos =	this._follow.GetPosition() ;
							this._x =	floor(pos._x) ;
							this._y	=	floor(pos._y) ;
							this._z =	pos._z ;
						}

						this.SetRestriction(this._centrex,this._mapwidth-this._centrex,this._centrey,this._mapheight-this._centrey) ;
						this._vpos		=	Vector4.Create(this._x,this._y) ;
					},

	Follow: 		function(follow,snap)
					{

						this._follow		=	follow ;
						if (snap)
						{
							var pos	=	follow.GetPosition()  ;
							this._x	=	floor(pos._x) ;
							this._y	=	floor(pos._y) ;
//							this._z	=	pos._z ;
						}
					},

	Update: 		function(dt)
					{

						this._time = this._time + dt

						if (this._follow)
						{
							// allow Camera to update Orbitor - if a callback exists.
							if (this._follow.CameraUpdate)
							{
								this._follow.CameraUpdate(dt) ;
							}

							var pos = this._follow.GetPosition() ;

							var followx = floor(pos._x),followy = floor(pos._y), followz  = pos._z ;

							this._x = this._x + floor((followx	-	this._x)*dt/this._interp) ;
							this._y = this._y + floor((followy	-	this._y)*dt/this._interp) ;


							this._x = (this._x > this._maxx) ? this._maxx : this._x ;
							this._x = (this._x < this._minx) ? this._minx : this._x ;

							this._y = (this._y > this._maxy) ? this._maxy : this._y ;
							this._y = (this._y < this._miny) ? this._miny : this._y ;


							this._leftx		=	Math.floor(this._x - this._centrex) ;
							this._topy		=	Math.floor(this._y - this._centrey) ;

						}
					},
	IsAlive:		function()			// this function here allows us to fire Homing Missiles at Camera!
					{
						return true ;
					},
	IsFollowing:	function(who)
					{
						return this._follow == who ;

					},
	GetTopLeft: 	function()
					{
						return {x:this._leftx, y:this._topy} ;
					},
	GetPosition: 	function()
					{
						return {_x:this._x, _y:this._y, _z:this._z} ;
					},

	X: 				function()
					{
						return this._x ;
					},
	Y: 				function()
					{
						return this._y ;
					},
	Z: 				function()
					{
						return this._z ;
					},
	GetRegion:		function()
					{
						return this.regionHelper.GetRegion(this._x, this._y) ;
					},

	Render:			function(rHelper)
					{

					},

	RenderDebug:	function(rHelper)
					{
						var region 	= 	this.GetRegion() ;
						var rcnt 	=	EnemyManager.GetRegionCount() ;

						rHelper.drawText("region:"+region+"                                   regionCount "+rcnt+" pos: "+Math.floor(this._x)+","+Math.floor(this._y),this._x+10,this._y,[255,255,255],{vertical:"bottom",horizontal:"left"}) ;
						rHelper.drawCircle(this._x, this._y,10,[255,255,0]) ;
					},
	GetVectorPosition: 	function()
						{
							this._vpos.SetXyzw(this._x,this._y,this._z,0)
							return this._vpos
						},


}//@header
//var 	MAXEXPLOSIONS	=	20
function Explosion(info,play)
{
		this.x 			=	info.x ;
		this.y			=	info.y ;
		this.z			=	info.z || 0 ;
		this.scale		=	info.scale || 1 ;
		this.fps		=	info.fps || 13 ;
		this.frameshor	=	info.frameshor || 8 ;
		this.framesvert	=	info.framesvert || 1 ;
		this.texture	=	info.texture || "explosionuv64.png" ;
		this.loop		=	info.loop
		this.time		=	0 ;
		this.anim		=	RenderHelper.CreateTextureAnimation(this.frameshor,this.framesvert,this.texture,this.fps) ;
		this.className	=	Explosion.className ;
		if (play)
		{
			this.anim.Play(false,false) ;
		}
}


Explosion.className		=	"Explosion"
Explosion.STATE_MOVE	=	0
Explosion.STATE_DEAD	=	1
Explosion.prototype 	=
{
	constructor:	Explosion,

	GetState:		function()
					{
	   					return this.state ;
					},
	Update:			function(dt)
					{
						this.time	=	this.time	+ dt ;
						this.anim.Update(dt) ;


					},

	HasFinished:	function()
					{
						return !this.anim.isPlaying() ;

					},
	Render:			function(rHelper)
					{
						//	drawSpriteSheet: function(spritesheet,x,y,frame,rot,sx,sy)
						if (this.anim.render)
						{
							this.anim.render(rHelper,this.x,this.y,this.scale)	;
						} else
						{
							alert("Not Yet Defined!")
							//var texinfo =	this.anim.GetRenderTexture() ;
							//rHelper.drawSheet(texinfo.sheet,this.x,this.y,texinfo.frame,0,this.scale,this.scale) ;
						}
					}
}

ExplosionManager		=	{}	;

ExplosionManager.Init	=	function()
{

}

ExplosionManager.AddExplosion	=	function(animationinfo,overlay)
{
	AnimationManager.Add(new Animation(animationinfo,true), overlay) ;
}

ExplosionManager.Update	=	function(dt)
{

}

ExplosionManager.Render	=	function(rHelper)
{

}



		//@header
var	tempV						=	Vector4.Create() ;
var	zeroVector					=	Vector4.Create(0,0,0,0) ;

function Line2D( startpoint,  endpoint)
{
	this.startpoint		=	startpoint ;
	this.endpoint		=	endpoint ;
	this.direction		=	Vector4.Create() ;
	this.unit			=	Vector4.Create() ;
	this.className		=	Line2D.className ;
	this.CalculateCentreAndRadius() ;
}

Line2D.className					=	"Line2D" ;


Line2D.Create		=	function(startpoint, endpoint)
{
	return new Line2D(startpoint, endpoint) ;
}

Line2D.Intersects	=	function(line1,line2,intPt)
{
	var	intersectionPoint = intPt || Vector4.Create() ;
	var res	= Vector4.Calculate2dLineIntersection(intersectionPoint,  line1.startpoint,  line1.endpoint,  line2.startpoint,  line2.endpoint,  false ) ;
	return (res.collide) ;
}

Line2D.prototype =
{
	constructor:				Line2D,

	SetPoints:					function(startpoint,endpoint)
								{
									this.startpoint.SetXyzw(startpoint.X(),startpoint.Y(),0,0) ;
									this.endpoint.SetXyzw(endpoint.X(),endpoint.Y(),0,0) ;
									this.CalculateCentreAndRadius() ;
								},

	CalculateCentreAndRadius:	function()
								{
									Vector4.Subtract(this.direction,this.endpoint,this.startpoint)
									this.length 	=	Vector4.Length2(this.direction) ;
									this.radius		=	this.length / 2 ;
									this.unit		=	this.length === 0 ? zeroVector : Vector4.Normal2(this.direction) ;
									this.midpoint	=	Vector4.Create() ;
									Vector4.Multiply(this.midpoint,this.unit,this.radius) ;
									Vector4.Add(this.midpoint,this.midpoint,this.startpoint) ;

								},


	Normalise:					function(v,scale)
								{
									var vt		=	v || Vector4.Create() ;
									var sscale	=	 scale || 1 ;
									Vector4.Subtract(vt,this.endpoint,this.startpoint) ;
									Vector4.Normalise2(vt) ;
									vt.Multiply(vt,sscale) ;
									return vt ;
								},
	Render:						function(renderHelper)
								{
									this.RenderDebug(renderHelper) ;
								},

	RenderDebug:				function(renderHelper)
								{
									renderHelper.drawCircle(this.startpoint.X(),this.startpoint.Y(),4,[255, 0, 0]) ;
									renderHelper.drawCircle(this.midpoint.X(),this.midpoint.Y(),4, [0, 255, 0]) ;
									renderHelper.drawCircle(this.endpoint.X(),this.endpoint.Y(),4, [0, 0, 255]) ;

									renderHelper.drawLine(
											this.startpoint.X(),this.startpoint.Y(),
											this.endpoint.X(),this.endpoint.Y()) ;


								},

	toString:					function()
								{
									return Line2D.className ;
								}

}//@header



var	STATE_HMISSILE_TRACKING					=	1 ;
var	STATE_HMISSILE_FALLING					=	2 ;
var	STATE_HMISSILE_SLEEPING					=	3 ;


var	kHMISSILES_MAX							= 	8 ;
var	kHMISSILE_MAXTURNANGLE					=	90.0 ;
var	kHMISSILE_SPEED							=	400.0 ;
var	kHMISSILE_LIFESPAN						=	15.0 ;
var	kHMISSILE_ANGULAR_ACCELERATION			=	180.0 ;


var	ANIM_ENEMYMISSILE_FRAME1				=	"enemy_missile__1" ;
var	ANIM_ENEMYMISSILE_FRAME2				=	"enemy_missile__2" ;
var	ANIM_ENEMYMISSILE_FRAME3				=	"enemy_missile__3" ;

var	Tempv0									=	Vector4.Create() ;
var	Tempv1									=	Vector4.Create() ;
var	Tempv2									=	Vector4.Create() ;
var	Tempv3									=	Vector4.Create() ;

function rad(deg)
{
	return deg*Math.PI/180 ;
}
function deg(rad)
{
	return rad*180/Math.PI ;
}

function HomingMissile( owner, startpos,  rot,  follow,  damage, lifespan)
{

		this.owner					=	owner ;
		this.following				=	follow ;
		this.vPos					=	Vector4.Create(startpos) ;
		this.vDir					=	Vector4.Create(0,0) ;
        this.rot					=	rot || 0.0 ;
        this.Lifespan				=	lifespan || kHMISSILE_LIFESPAN ;
        this.time					=	0 ;
		this.strength				=	255 ;
        this.nState					=	STATE_HMISSILE_TRACKING ;
        this.damage					=	damage || 0 ;
        this.bInvincible			=	false ;
		this.bMarkedForDeath		=	false ;
		this.isPlayer 				=	(follow.className != 'Player') ;
		this.colline 				=	Line2D.Create(Vector4.Create(0,0),Vector4.Create(0,0)) ;
        this.currentAngularDir		=	Vector4.Create();
        this.currentAngularSpeed	=	Vector4.Create() ;
        this.tMissile 				=	null ;
		this.className				=	HomingMissile.className ;

		this.vPos.Add(this.vPos,Vector4.Create(4*Math.random(),4*Math.random())) ;

		this.animation 				= new TextureAnim() ;
		this.animation.addFrame(ANIM_ENEMYMISSILE_FRAME1) ;
		this.animation.addFrame(ANIM_ENEMYMISSILE_FRAME2) ;
		this.animation.addFrame(ANIM_ENEMYMISSILE_FRAME3) ;
		this.animation.play(true, true) ;

}

HomingMissile.className					=	"HomingMissile" ;

HomingMissile.Create			=	function( owner, startpos,  rot,  follow,  damage, lifespan)
{
	return new HomingMissile( owner, startpos,  rot,  follow,  damage, lifespan) ;
}

HomingMissile.prototype	=
{

	constructor:			HomingMissile,

	Follow:					function(who)
							{
								this.following = who ;
							},

	Update:					function(dt)
							{
						 		this.UpdateLive(dt) ;
							},

	UpdateLive:				function(dt)
							{

								this.time =	this.time +	dt ;

								if (this.animation)
								{
							 		this.animation.update(dt) ;
								}



								var	diff_vec	=	Tempv0  ;
								var	state		=	this.nState ;

								if(state	!=	STATE_HMISSILE_FALLING && this.time > this.Lifespan)
								{
									this.nState	=	STATE_HMISSILE_FALLING ;
									state		=	this.nState ;
								}

								if(state	==	STATE_HMISSILE_FALLING || !this.following.IsAlive())
								{

									diff_vec.SetXyzw(0,this.vPos.Y(),0,0) ;
									if (this.time > 1.25*this.Lifespan)
									{
										this.nState		=	STATE_HMISSILE_SLEEPING ;
										this.MarkForDeath() ;
										this.time		=	0 ;
										return ;
									}
								}
								else if(state	==	STATE_HMISSILE_TRACKING)
								{
									Vector4.Subtract(diff_vec,this.following.GetVectorPosition(), this.vPos) ;

								} else if(state	==	STATE_HMISSILE_SLEEPING)
								{
									if (this.time > 4)
									{
										//this.nState	=	STATE_HMISSILE_TRACKING ;
										this.time	=	0 ;
									}
									return ;
								}

								diff_vec.Normalise2() ;

								// Work out current angle
								var rot_tar =	Math.atan2(diff_vec.Y(), diff_vec.X()) ;
								rot_tar 	=	deg(rot_tar) ;
								rot_tar 	=	(rot_tar + 360.0 ) % 360.0 ;


								var heading_vec= Tempv1 ;

								heading_vec.SetXyzw(this.vDir.X(),this.vDir.Y(),0,0) ;
								heading_vec.Normalise2() ;

								var perpheading_vec= Tempv2 ;

								perpheading_vec.SetXyzw(-heading_vec.Y(), heading_vec.X(), 0, 0) ;


								var perpCosineAngle = Vector4.Dot2(diff_vec, perpheading_vec) ;

								var newAngularDirection	=	(perpCosineAngle>0) && 1.0 || -1.0 ;


								if ( newAngularDirection != this.currentAngularDir )
								{
									this.currentAngularDir		=	newAngularDirection ;
									this.currentAngularSpeed	=	0.0 ;
								}

								this.currentAngularSpeed = this.currentAngularSpeed +(dt * kHMISSILE_ANGULAR_ACCELERATION) ;

								if ( this.currentAngularSpeed > kHMISSILE_MAXTURNANGLE )
								{
									this.currentAngularSpeed = kHMISSILE_MAXTURNANGLE ;

								}

								var maxTurnAngle = this.currentAngularSpeed * dt ;

								if(Math.abs(rot_tar-this.rot)>maxTurnAngle)
								{

									var leftAngle  = ( this.rot + 360.0 - maxTurnAngle ) % 360.0 ;
									var rightAngle = ( this.rot + maxTurnAngle ) % 360.0 ;

									if(perpCosineAngle>0) {
										this.rot = rightAngle ;
									}
									else
									{
										this.rot = leftAngle ;
									}
								}
								else
								{
									this.rot = rot_tar ;

								}

								// Work out new direction
								var rotrad	=	rad(this.rot) ;

								var vx = Math.cos(rotrad) ;
								var vy = Math.sin(rotrad) ;

								this.vDir.SetXyzw(vx * dt * kHMISSILE_SPEED,vy * dt * kHMISSILE_SPEED,0,0) ;

								Vector4.Add(this.vPos, this.vDir, this.vPos) ;


							},

	GetCollisionLine:		function(dt)
							{
							 	var	future = Vector4.Create( this.vDir) ;
								Vector4.Multiply(future,future,4) ;
								Vector4.Add(future,future,this.vPos) ;

								this.colline.SetPoints(this.vPos,future) ;
						//		this.colline.CalculateCentreAndRadius()

								return this.colline ;
							},


	Render:					function(renderHelper)
							{
								if(this.nState	!=	STATE_HMISSILE_SLEEPING)
								{
									renderHelper.drawRawImage(ImageResource.getResource(this.animation.getRenderTexture()),this.vPos.X(), this.vPos.Y(),90+this.rot,0.65,0.65) ;
									//this.RenderDebug(renderHelper)
								}
							},

	RenderDebug:			function(renderHelper)
							{
								var mpos 	= 	this.GetVectorPosition() ;
								renderHelper.drawCircle(mpos.X(), mpos.Y(),  4,[255,255,0]) ;

								renderHelper.drawText(this.toString(),mpos.X()+40, mpos.Y()) ;
								this.GetCollisionLine().Render(renderHelper) ;

							},

	toString:				function()
							{
								return "HomingMissile" ;
							},

	GetVectorPosition:		function()
							{
								return this.vPos ;
							},

	GetPosition:			function()
							{
								return {x: this.vPos.X(), y: this.vPos.Y(), z: this.vPos.Z()} ;
							},

	GetCoords:				function()
							{
								return this.GetPosition() ;
							},


	SetPosition:			function(v)
							{
								this.vPos = Vector4.Create(v) ;
							},

	MarkForDeath:			function()
							{
								this.bMarkedForDeath = true ;
								var animationinfo = {texture:"bullethits",frameshor:4,framesvert:2,x:this.vPos.X(),y:this.vPos.Y(),loop:false,bounce:false,scale:4} ;
								ExplosionManager.AddExplosion(animationinfo,7) ;
							},

	IsMarkedForDeath:		function()
							{
								return this.bMarkedForDeath ;

							},

	ApplyDamage:			function(damage)
							{
								this.MarkForDeath()

							},

	GetDamage:				function()
							{
								return this.damage ;
							},


	IsAlive:				function()
							{
								return !this.IsMarkedForDeath() ;
							},

	Cleanup:				function()
							{
								this.vPos		=	null ;
								this.following	=	null ;
								this.tMissile	=	null ;
								this.vDir		=	null ;
								this.colline	=	null  ;
							},

}

MissileManager				=	{} 	;

MissileManager.follow		=	null ;
var hmissile				=	null ;


MissileManager.Init			=	function(follow)
								{
									hmissile	=	null ;
								}

MissileManager.CanFire		=	function()
								{
									return !hmissile ;
								}

MissileManager.AddMissile	=	function(owner, startpos,  rot,  follow,  damage, lifespan)
								{
									if (!hmissile) {
										hmissile			=	new HomingMissile(owner, startpos,  rot,  follow,  damage || 1, lifespan || 15) ;
									}

								}

MissileManager.Update		=	function(dt)
								{
									if (hmissile) {
										hmissile.Update(dt) ;
										if (!hmissile.IsAlive())
										{
											hmissile	=	null ;
										}
									}

								}

MissileManager.Render		=	function(rHelper)
								{
									if (hmissile) {
										hmissile.Render(rHelper) ;
									}
								}

//@header


var kENEMY_MAXTURNANGLE			=	180.0 ;
var kENEMY_ANGULAR_ACCELERATION	=	180.0 ;
var scalearound					=	0.95 ;



function PlayerHelicopter(mapDim, regionHelper)
{

	this._time					=	0 ;
	this._velx					=	0 ;
	this._vely					=	0 ;
	this._freeze_effect			=	1 ;
	this._currentAngularDir		=	true ;
	this._currentAngularSpeed	=	0.0 ;
	this._direction				=	0 ;
	this._targetbearing			=	0 ;

	this._rightangdist			=	0 ;
	this._leftangdist			=	0 ;

	this._x						=	1024 ;
	this._y						=	1024 ;
	this._z						=	0 ;
	this._hoverFreq				=	0.25 ;

	this._boundx				=	mapDim.X() ;
	this._boundy				=	mapDim.Y() ;
	this._regionHelper			=	regionHelper || EnemyManager ;
	this._vPos					=	Vector4.Create() ;
	this._bladesprite			=	new Sprite("heliblades") ;
	this._shadowsprite			=	new Sprite("helishadow") ;
	this._sprite				=	new Sprite("helibody") ;
	this._blade					=	0 ;
	this._fired					=	0 ;
	this._fireperiod			=	0.125 ;
	this._phase					=	0 ;
	this._canfire				=	true ;
	this._lastfired				=	0 ;
	this._fireFunction			=	function(fired) {  return (fired % 2) ? {x:14, y:-8, z:0} : {x:-14, y:-8, z:0}; } ;
	this.firingpos				=	Vector4.Create() ;
	this.className				=	PlayerHelicopter.className ;


}

PlayerHelicopter.className		=	"PlayerHelicopter" ;
PlayerHelicopter.STEPX			=	8 ;
PlayerHelicopter.STEPY			=	8 ;
PlayerHelicopter.STATE_ALIVE	=	0 ;
PlayerHelicopter.canfire		=	true ;

function deg(rad)	{	return rad*180/Math.PI ;	}

PlayerHelicopter.prototype =
{

	SetPosition: 				function(pos)
								{
									this._x	=	pos._x ;
									this._y	=	pos._y ;
									this._z	=	pos._z ;
								},

	GetRegion:					function()
								{
									return this._regionHelper.GetRegion(this._x, this._y)  ;
								},

	IsAlive:					function()
								{
									return true ;
								},

	GetVectorPosition:			function()
								{
									this._vPos.SetXyzw(this._x, this._y, this._z) ;
									return this._vPos ;
								},
	GetPosition: 				function()
								{
									return {_x: this._x, _y:this._y, _z: this._z}
								},


	GetFiringDirection:			function()
								{
									return this._direction ;
								},

	HasMoved:					function()
								{
									return (this._lastx != this._x || this._lasty != this._y) ;
								},

	// Brakes On - used for end of game sequence..

	BrakesOn:					function()
								{
									this._velx			=	0 ;
									this._vely			=	0 ;
									this._freeze_effect	=	0 ;
								},


	Update:						function(dt)
								{

									var isMoving	=	true ;
									this._time 		=	this._time + dt   ;
									this._blade		=	this._blade + dt*(isMoving && 520 || 360)

									this._scale		=	scalearound + (1-scalearound)*Math.sin(6*this._hoverFreq*this._time)

									this.Accelerate(dt) ;
									this.Bound() ;
									this.Turn(dt) ;
									this.AttemptFire(dt) ;

								},



	Bound:						function()
								{
									var lx	=	this._boundx, ly = this._boundy ;
									this._x		=	Math.max(0, Math.min(this._x,lx)) ;
									this._y		=	Math.max(0, Math.min(this._y,ly)) ;
								},

	PlayerUp:					function()
								{
									this._analvert	=	-1 ;
								},

	PlayerDown:					function()
								{
									this._analvert	=	1 ;
								},

	PlayerLeft:					function()
								{
									this._analhor	=	-1 ;
								},

	PlayerRight:				function()
								{

									this._analhor	=	1 ;
								},

	PlayerSelect:				function()
								{
								},

	Turn:						function(dt)
								{

									var direction		=	this._direction	;
									var targetbearing	=	this._targetbearing ;
									this._angdistance 	=	((targetbearing - (direction % 360))) ;

									this._leftangdist 	= 	((360-targetbearing)	+ (direction % 360)) % 360 ;
									this._rightangdist 	=	((targetbearing + (360-(direction % 360)))) % 360 ;


									var	clockwiseDirection	=	(this._rightangdist < this._leftangdist) ;


									if ( clockwiseDirection != this._currentAngularDir )
									{
										this._currentAngularDir	=	clockwiseDirection ;
										this._currentAngularSpeed	=	0.0 ;
									}

									this._currentAngularSpeed = this._currentAngularSpeed +(dt * kENEMY_ANGULAR_ACCELERATION) ;

									if ( this._currentAngularSpeed > kENEMY_MAXTURNANGLE )
									{
										this._currentAngularSpeed	=	kENEMY_MAXTURNANGLE ;
									}

									var maxTurnAngle = this._currentAngularSpeed * dt ;

									this._maxTurnAngle	=	maxTurnAngle ;

									if(Math.min(this._rightangdist,this._leftangdist) > maxTurnAngle)
									{

										if (clockwiseDirection)
										{
											this._direction = (direction + maxTurnAngle) % 360 ;
										}
										else
										{
											//go anti clockwise
											this._direction = (direction - maxTurnAngle) % 360 ;
										}
									}
									else
									{
										this._direction	=	targetbearing ;
									}
								},






	Accelerate:					function(dt)
								{

									var PlyAcceleration	=	2800 ;
									var PlyDampValue	=	8 ;

									var joyx 			= 	this.GetJoystickXAxis() ;
									var joyy 			= 	this.GetJoystickYAxis() ;

									var vx	=	0, vy	=	0 ;

									var freeze_effect 	=	this._freeze_effect || 1 ;

									vx	=	freeze_effect*(this._velx + PlyAcceleration*(joyx || 0)*dt) ;
									vy	=	freeze_effect*(this._vely + PlyAcceleration*(joyy || 0)*dt) ;

									this._x	=	this._x + dt*vx ;
									this._y	=	this._y + dt*vy ;

									var damp	=   Math.max(0,(1-PlyDampValue*dt)) ;
									this._velx	=	vx*damp ;
									this._vely	=	vy*damp ;

								},


	GetFiringOffset:			function(fired)
								{
									return this._fireFunction && this._fireFunction(typeof fired  == 'undefined' ? this._fired : fired ) ||  {x:0, y:0, z:0} ;
								},

	GetFiringPosition:			function(fired,angle)
								{
									var ra	=	angle || 0 ;
									var	cos	=	Math.cos(ra*Math.PI/180) ;
									var sin	=	Math.sin(ra*Math.PI/180) ;

									var x	=	this._x, y	=	this._y, z	=	this._z ;
									var fo	=	this.GetFiringOffset(fired) ;
									var ox	=	fo.x, oy	= fo.y ;
									var	tox	=	ox*cos - oy*sin ;
									var	toy	=	ox*sin + oy*cos ;

									this.firingpos.SetXyzw(x + tox, y + toy, z, 0) ;
									return this.firingpos ;
								},


	AttemptFire:				function(dt,viewdist)
								{


									// Attempt to fire bullets
									if (PlayerHelicopter.canfire && this._canfire && this._time - (this._lastfired || 0) > this._fireperiod)
									//&& Math.sin(6*this._time/8+this._phase) > 0 && Math.sin(6*this._time/4+this._phase) > 0)
									{

											//BulletManager.Fire				=	function(owner,damage,vel,angle,duration,animation,scale,radius)
										var kDAMAGE		=	10 ;
										var kDURATION	=	0.75 ;
										var kVELOCITY	=	600 ;

										var animation 	=	RenderHelper.CreateTextureAnimation(2,1,"bullets",10) ;

										BulletManager.Fire(this,kDAMAGE,kVELOCITY,this.GetFiringDirection(),kDURATION,animation,1,10) ;

										this._fired++ ;
										this._lastfired	=	this._time
									}
								},



    AngleMove:					function(analx,analy)
								{
									var angle		=	deg(Math.atan2(analy,analx)) ;
									var d			=	Math.sqrt(analx*analx + analy*analy) ;
									var angspeed	=	40 ;

									if (d > 0.5)
									{
										this._targetbearing	=	angle + 90 ;
										//this.BulletSelect() ;
									}
								//	Logger.lprint("D = ",d," angle = ",angle)  ;

							   	},

	AxisMove:					function(analx,analy)
								{
									this._analhor    =	analx || 0 ;
									this._analvert	=	analy || 0 ;
							   	},



	GetJoystickXAxis:			function()
								{
									var hor 		=	this._analhor ;
									this._analhor	=	0 ;
									return hor ;
								},


	GetJoystickYAxis:			function()
								{
									var vert 		=	this._analvert ;
									this._analvert	=	0 ;
									return vert ;
								},


	Render:						function(rHelper)
								{
									var	ang		=	this._direction, scale = this._scale , sscale = (1 + scalearound - this._scale)*0.85  ;
									var	xpos	=	this._x, ypos	 =  this._y ;

									rHelper.drawSprite(this._shadowsprite,xpos-16,ypos+16,ang,sscale,sscale) ;
									rHelper.drawSprite(this._sprite,xpos,ypos,ang,scale,scale) ;
									rHelper.drawSprite(this._bladesprite,xpos,ypos,this._blade,scale,scale) ;

									//this.RenderDebug(rHelper) ;
								},

	RenderDebug:				function(rHelper)
								{
									var region = this.GetRegion() ;
									rHelper.drawText("player: region:"+region+" pos: "+Math.floor(this._x)+","+Math.floor(this._y),this._x+10,this._y,[255,255,255],{vertical:"bottom",horizontal:"left"}) ;
									rHelper.drawText("player: bearing:"+this._targetbearing+" maxTurnAngle="+(this._maxTurnAngle || 0),this._x+10,this._y+20,[255,255,255],{vertical:"bottom",horizontal:"left"}) ;

									rHelper.drawCircle(this._x, this._y,10,[255,255,0]) ;
									rHelper.drawCircle(this._x, this._y,4,[255,0,0]) ;
								},


	// Temp functions

	update:	function(dt)
			{
				this.Update(dt) ;
			},
	render:	function(rHelper)
			{
				this.Render(rHelper) ;
			},

	moveup:	function()
			{
				this.PlayerUp() ;
			},
	movedown:
			function()
			{
				this.PlayerDown() ;
			},
	moveleft:
			function()
			{
				this.PlayerLeft() ;
			},

	moveright:
			function()
			{
				this.PlayerRight() ;
			},

	move:	function(dx,dy)
			{
				if (dx) {
					if (dx > 0) {
						this.moveright() ;
					} else
					{
						this.moveleft() ;
					}
				}
				if (dy)
				{
					if (dy > 0) {
						this.movedown() ;
					} else
					{
						this.moveup() ;
					}


				}
			},
}

//function PlayerHelicopter.RenderShadow(player,renderHelper,x,y)
//		local xpos,ypos	=	player.x,player.y
//		local extra		=	scalearound - player.scale
//		local shadowoffx,shadowoffy	=	PlayerHelicopter._MakeDirectionVectorPair(180+player.direction+sunangle,xpos,ypos,40)
//		RenderHelper.DrawSprite(renderHelper,player.shadowSprite,shadowoffx,shadowoffy,0.85*(1 + extra),-(player.direction or 0))
//end



/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/

var MD5 = function (string) {

	function RotateLeft(lValue, iShiftBits) {
		return (lValue << iShiftBits) | (lValue>>>(32-iShiftBits));
	}

	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}

 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }

	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};

	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;

	string = Utf8Encode(string);

	x = ConvertToWordArray(string);

	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

	for (k=0;k < x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}

	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

	return temp.toLowerCase();
}

/**
 * Javascript HashCode v1.0.0
 * This function returns a hash code (MD5) based on the argument object.
 * http://pmav.eu/stuff/javascript-hash-code
 *
 * Example:
 *  var s = "my String";
 *  alert(HashCode.value(s));
 *
 * pmav, 2010
 */
var HashCode = function() {

    var serialize = function(object) {
        // Private
        var type, serializedCode = "";

        type = typeof object;

        if (type === 'object') {
            var element;

            for (element in object) {
                serializedCode += "[" + type + ":" + element + serialize(object[element]) + "]";
            }

        } else if (type === 'function') {
            serializedCode += "[" + type + ":" + object.toString() + "]";
        } else {
            serializedCode += "[" + type + ":" + object+"]";
        }

        return serializedCode.replace(/\s/g, "");
    };

    // Public, API
    return {
        value : function(object) {
            return MD5(serialize(object));
        }
    };
}();
