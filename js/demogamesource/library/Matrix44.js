//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

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
	
	

