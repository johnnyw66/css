function LinkedList(){this._headr=null;this._tail=null;this._size=0;this.className="LinkedList"}function LinkedObject(a){this._next=null;
this._prev=null;this._data=a;this.className="LinkedObject"}LinkedObject.prototype={constructor:LinkedObject,GetData:function(){return this._data
},GetNext:function(){return this._next},GetPrevious:function(){return this._previous}};LinkedList.prototype={constructor:LinkedList,Clear:function(){this._headr=null;
this._tail=null},toArray:function(b){var a=new Array();for(var c=this.Iterator();c.HasElements();c.Next()){var d=c.GetCurrent();
a.push(!b?d:d.GetData())}return a},Add:function(c){var d=new LinkedObject(c);var a=this._tail;var b=this._headr;if(!a){this._headr=d;
this._tail=d}else{a._next=d;d._prev=this._tail;this._tail=d}this._size=this._size+1;return d},Size:function(){return this._size
},Iterator:function(a){var b=a;var d=this._headr;var c=d;return{Reset:function(){c=d},Next:function(){if(c){c=c._next}return c
},HasElements:function(){return c},GetCurrent:function(){return b?c.GetData():c}}},Remove:function(c){var b=this._headr;var a=this._tail;
var e=c._prev;var d=c._next;if(e){e._next=d}if(d){d._prev=e}if(b==c){this._headr=d}if(a==c){this._tail=e}this._size=this._size-1;
c._prev=null;c._next=null;c._deleted="deleted"},AddArray:function(b){for(var a=0;a<b.length;a++){var c=b[a];this.Add(c)}},};
function assert(a,c){if(!a){return alert("ASSERT: "+c)}}function Vector4(a,d,c,b){this._x=a||0;this._y=d||0;this._z=c||0;
this._w=b||0;this.className=Vector4.className}Vector4.className="Vector4";Vector4.Create=function(a,d,c,b){if(a!=undefined&&d==undefined){return Vector4._CreateVector(a)
}else{return Vector4._CreateScalar(a,d,c,b)}};Vector4.CreateBroadcast=function(b){var a=new Vector4();a.SetBroadcast(b);return a
};Vector4._CreateVector=function(c){var a=(c&&c.X())||0;var e=(c&&c.Y())||0;var d=(c&&c.Z())||0;var b=(c&&c.W())||0;return new Vector4(a,e,d,b)
};Vector4._CreateScalar=function(a,d,c,b){return new Vector4(a,d,c,b)};Vector4.Multiply=function(c,b,a){return c.Multiply(b,a)
};Vector4.Dot3=function(b,a){return b.Dot3(a)};Vector4.Dot2=function(b,a){return b.Dot2(a)};Vector4.Normal2=function(a){return a.Normal2()
};Vector4.Normalise3=function(a){a.Normalise3()};Vector4.Normalize3=function(a){a.Normalise3()};Vector4.Normalise2=function(a){a.Normalise2()
};Vector4.Normalize2=function(a){a.Normalise2()};Vector4.Cross=function(c,b,a){c.Cross(b,a)};Vector4.Length4=function(a){return a.Length4(a)
};Vector4.Length3=function(a){return a.Length3(a)};Vector4.Length2=function(a){return a.Length2(a)};Vector4.Add=function(c,b,a){c.Add(b,a)
};Vector4.Subtract=function(c,b,a){c.Subtract(b,a)};Vector4.Subtract=function(c,b,a){c.Subtract(b,a)};Vector4.X=function(a){return a.X()
};Vector4.Y=function(a){return a.Y()};Vector4.Z=function(a){return a.Z()};Vector4.W=function(a){return a.W()};Vector4.TransformPoint=function(b,a,c){b.TransformPoint(a,c)
};Vector4.Calculate2dLineIntersection=function(d,f,e,b,a,c){return d.Calculate2dLineIntersection(d,f,e,b,a,c)};Vector4.Test=function(){var a=Vector4.Create();
Vector4.Add(a,Vector4.Create(1,2,3),Vector4.Create(6,7,8));alert("Result1 = "+a);Vector4.Normalise3(a);alert("Result2 = "+a);
alert("Unit Result3  = "+Vector4.Length3(a));Vector4.Subtract(a,Vector4.Create(7,9,11),Vector4.Create(6,7,8));alert("Result4 = "+a)
};Vector4.prototype={constructor:Vector4,SetBroadcast:function(a){this.SetXyzw(a,a,a,a)},X:function(){return this._x},Y:function(){return this._y
},Z:function(){return this._z},W:function(){return this._w},SetX:function(a){this._x=a},SetY:function(a){this._y=a},SetZ:function(a){this._z=a
},SetW:function(a){this._w=a},SetXyzw:function(a,d,c,b){this.SetX(a||0);this.SetY(d||0);this.SetZ(c||0);this.SetW(b||0)},Copy:function(a){this._x=a._x;
this._y=a._y;this._z=a._z;this._w=a._w},Subtract:function(b,a){this._x=b._x-a._x;this._y=b._y-a._y;this._z=b._z-a._z;this._w=b._w-a._w
},Add:function(b,a){this._x=b._x+a._x;this._y=b._y+a._y;this._z=b._z+a._z;this._w=b._w+a._w},Divide:function(c,b,a){assert(false,"Vector4.Divide: NOT YET IMPLEMENTED")
},Cross:function(b,a){this._x=(b._y*a._z)-(b._z*a._y);this._y=(b._z*a._x)-(b._x*a._z);this._z=(b._x*a._y)-(b._y*a._x)},Multiply:function(b,a){this._x=b._x*a;
this._y=b._y*a;this._z=b._z*a},ScaleXXX:function(a){this._x=this._x*a;this._y=this._y*a;this._z=this._z*a},Length4:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)
},Length3:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z)},Length2:function(){return Math.sqrt(this._x*this._x+this._y*this._y)
},mag:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},Normal2:function(){var a=Vector4.Create(this);
a._z=0;a._w=0;a.Normalise2();return a},Normal3:function(){var a=Vector4.Create(this);a._w=0;a.Normalise3();return a},Normal4:function(){var a=Vector4.Create(this);
a.Normalise4();return a},Normalise2:function(){var a=this.Length2();this.SetXyzw(this._x/a,this._y/a,this._z,this._w)},Normalize3:function(){this.Normalise3()
},Normalise3:function(){var a=this.Length3();assert(a!=0,"Normalise3 - Attemp to Normalise with Zero Length Vector:"+this._toString());
this.SetXyzw(this._x/a,this._y/a,this._z/a,this._w)},Normalise4:function(){var a=this.Length4();assert(a!=0,"Normalise4 - Attemp to Normalise with Zero Length Vector:"+this._toString());
this.SetXyzw(this._x/a,this._y/a,this._z/a,this._w/a)},Dot2:function(a){return(this._x*a._x+this._y*a._y)},Dot3:function(a){return(this._x*a._x+this._y*a._y+this._z*a._z)
},Dot4:function(a){return(this._x*a._x+this._y*a._y+this._z*a._z+this._w*a._w)},toString:function(){return"Vector4: "+this._x+","+this._y+","+this._z+","+this._w
},_toString:function(){return this.toString()},Transform:function(b,a,c){this._Transform(b,a,c)},TransformVector:function(b,a,c){this._Transform(b,a,c,0)
},TransformPoint:function(a,b){this._Transform(a,b,1)},_Transform:function(b,f,d){var c=this;if(f&&f.className&&f.className==Vector4.className){tmpV.Copy(f);
if(d){tmpV.SetW(d)}b._MultiplyVector(tmpV,c)}else{for(var a=0;a<f.length;f++){var g=f[a];var e=c[a];tmpV.Copy(g);if(d){tmpV.SetW(d)
}b._MultiplyVector(tmpV,e)}}},Calculate2dLineIntersection:function(r,d,b,i,h,f){var c=Vector4.Create(b);c.Subtract(c,d);var o=c.Length3();
var t=Vector4.Create(c);t.Normalise3();var a=Vector4.Create(h);a.Subtract(a,i);var s=Vector4.Create(a);s.Normalise3();a.Multiply(a,-1);
var n=a.Length3();var p=Vector4.Dot3(s,t);var m=Vector4.Create(i);m.Subtract(m,d);var q=Matrix44.Create(c,a,Vector4.Create(0,0,1,0),Vector4.Create(0,0,-1,1));
q.Transpose();var e=q._Det();if(e==0){return{collide:false,u:-1,v:-1,z:-1,w:-1}}q.Invert(q);var l=Vector4.Dot3(q.GetRow(1),m);
var k=Vector4.Dot3(q.GetRow(2),m);var g=Vector4.Dot3(q.GetRow(3),m);var j=Vector4.Dot3(q.GetRow(3),m);if((g!=0)||(j!=0)){return{collide:false,u:l,v:k,z:g,w:j}
}r.Copy(c);r.Normalise3();r.Multiply(r,l*o);r.Add(r,d);if(!f){return{collide:(l>=0&&l<=1&&k>=0&&k<=1),u:l,v:k,z:g,w:j}}else{return{collide:true,u:l,v:k,z:g,w:j}
}}};function Vector2(c,b){var a=b?{x:c,y:b}:(c?{x:c.x,y:c.y}:{x:0,y:0});this.vt=a;this.x=a.x;this.y=a.y;this.className="Vector2"
}Vector2.Create=function(b,a){return new Vector2(b,a)};Vector2.prototype={constructor:Vector2,SetXyzw:function(a,d,c,b){this.x=a;
this.y=d},toString:function(){return this.className+" VX = "+this.x+" VY = "+this.y}};var MATRIX_REPLACE=1;var MATRIX_POSTMULTIPLY=2;
var MATRIX_PREMULTIPLY=3;var defaultRow1=Vector4.Create(1,0,0,0);var defaultRow2=Vector4.Create(0,1,0,0);var defaultRow3=Vector4.Create(0,0,1,0);
var defaultRow4=Vector4.Create(0,0,0,1);function Matrix44(c,b,a){this.m=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1],];this.scalex=c||1;
this.scaley=b||1;this.scalez=a||1;this.className="Matrix44"}Matrix44.className="Matrix44";function NOT_YET_IMPLEMENTED(a){assert(false,("Matrix44 - FUNCTION Matrix44"+(fname||"")+" NOT YET IMPLEMENTED"))
}Matrix44.Create=function(d,c,b,a){if(typeof d=="object"){return Matrix44._CreateVectors(d,c,b,a)}else{return Matrix44._CreateDefault(d,c,b,a)
}};Matrix44._CreateDefault=function(c,b,a){return new Matrix44(c,b,a)};Matrix44._CreateVectors=function(d,c,b,e){var a=Matrix44._CreateDefault();
Matrix44.SetRow(a,1,d||defaultRow1);Matrix44.SetRow(a,2,c||defaultRow2);Matrix44.SetRow(a,3,b||defaultRow3);Matrix44.SetRow(a,4,e||defaultRow4);
return a};Matrix44.IsEqual=function(d,c,b){var a=Array.prototype.slice.call(arguments);matrix=a.shift();matrix.IsEqual.apply(matrix,a)
};Matrix44.IsIdentity=function(b){var a=Array.prototype.slice.call(arguments);matrix=a.shift();matrix.IsIdentity.apply(matrix,a)
};Matrix44.SetRow=function(){var a=Array.prototype.slice.call(arguments);matrix=a.shift();matrix.SetRow.apply(matrix,a)};
Matrix44.GetRow=function(){var a=Array.prototype.slice.call(arguments);matrix=a.shift();matrix.GetRow.apply(matrix,a)};Matrix44.SetRotationXyz=function(){var a=Array.prototype.slice.call(arguments);
matrix=a.shift();matrix.SetRotationXyz.apply(matrix,a)};Matrix44.GetRotationXyz=function(){var a=Array.prototype.slice.call(arguments);
matrix=a.shift();matrix.GetRotationXyz.apply(matrix,a)};function makeFunc(){var a=Array.prototype.slice.call(arguments);var b=a.shift();
return function(){return b.apply(null,a.concat(Array.prototype.slice.call(arguments)))}}Matrix44.SetTranslation=function(){var a=Array.prototype.slice.call(arguments);
matrix=a.shift();matrix.SetTranslation.apply(matrix,a)};Matrix44.SetIdentity=function(a){a.SetIdentity()};Matrix44.Transpose=function(b,a){b.Transpose(a)
};Matrix44.Invert=function(b,a){b.Invert(a)};Matrix44.Copy=function(b,a){b.Copy(a)};Matrix44.Multiply=function(c,b,a){c.Multiply(b,a)
};function _FormColumnVector(c,a,d){var b=d||Vector4.Create();b.SetXyzw(c[0][a-1],c[1][a-1],c[2][a-1],c[3][a-1]);return b
}function _BuildRotation(j,g,e,b){var a=function(c){return Math.PI*c/180};var d=Math.cos(a(b));var n=Math.sin(-a(b));var m=1-d;
var l=Vector4.Create(m*j*j+d,m*j*g-n*e,m*j*e+n*g,0);var k=Vector4.Create(m*j*g+n*e,m*g*g+d,m*g*e-n*j,0);var i=Vector4.Create(m*j*e-n*g,m*g*e+n*j,m*e*e+d,0);
var f=Vector4.Create(0,0,0,1);var h=Matrix44.Create();h.SetRow(1,l);h.SetRow(2,k);h.SetRow(3,i);h.SetRow(4,f);return h}function _FormRowVector(b,d,c){var a=c||Vector4.Create();
a.SetXyzw(b[d-1][0],b[d-1][1],b[d-1][2],b[d-1][3]);return a}function _SetRowWithVector(c,d,b){var a=c[d-1];a[0]=Vector4.X(b);
a[1]=Vector4.Y(b);a[2]=Vector4.Z(b);a[3]=Vector4.W(b)}function _SetColWithVector(c,b,a){var d=[Vector4.X(a),Vector4.Y(a),Vector4.Z(a),Vector4.W(a)];
for(var e=1;e<=4;e++){c[e-1][b-1]=d[e-1]}}function _IsEqual(c,b,a){return(Math.abs(c-b)<=a)}function TestMatrix2(){var a=Matrix44.Create();
DebugMatrix(a,"identity");Matrix44.SetRotationXyz(a,45,90,60,MATRIX_REPLACE);DebugMatrix(a,"rot=0,0,60");a=Matrix44.Create(Vector4.Create(8,-9,-2,-5),Vector4.Create(9,6,-6,9),Vector4.Create(-3,-9,4,-2),Vector4.Create(0,-7,8,8));
DebugMatrix(a,"CREATE VECTORS");Logger.lprint(string.format("DET = %f",Matrix44._Det(a)));Matrix44.Invert(a,a);DebugMatrix(a,"INVERTED");
Matrix44.Invert(a,a);DebugMatrix(a,"INVERTED -2 ")}function DebugMatrix(a,b){}function TestMatrix(){var a=Matrix44.Create();
Matrix44.SetTranslation(a,100,200,300,MATRIX_REPLACE)}Matrix44.prototype={constructor:Matrix44,_Debug:function(b){var a=b||print;
a("Matrix Debug ");var c=this.m;var f=this.scale;a(string.format("SCALE %f",f));for(var e=1;e<=4;e++){var d=c[e];a(string.format("ROW %d %f %f %f %f\n",e,d[1],d[2],d[3],d[4]))
}},Copy:function(b){for(var c=1;c<=4;c++){var a=b.GetRow(c);this.SetRow(c,a)}this.scalex=b.scalex;this.scaley=b.scaley;this.scalez=b.scalez
},GetRotationXyz:function(a){NOT_YET_IMPLEMENTED("GetRotationXyz")},GetRow:function(c,b){var a=b||Vector4.Create();var d=this.m[c-1];
a.SetXyzw(d[0],d[1],d[2],d[3]);return a},_Det:function(){var o=this.m;var w=o[0];var u=o[1];var s=o[2];var p=o[3];var h=w[0];
var f=w[1];var d=w[2];var b=w[3];var n=u[0];var l=u[1];var k=u[2];var j=u[3];var v=s[0];var t=s[1];var r=s[2];var q=s[3];
var i=p[0];var g=p[1];var e=p[2];var c=p[3];var a=h*l*r*c+h*k*q*g+h*j*t*e+f*n*q*e+f*k*v*c+f*j*r*i+d*n*t*c+d*l*q*i+d*j*v*g+b*n*r*g+b*l*v*e+b*k*t*i-h*l*q*e-h*k*t*c-h*j*r*g-f*n*r*c-f*k*q*i-f*j*v*e-d*n*q*g-d*l*v*c-d*j*t*i-b*n*t*e-b*l*r*i-b*k*v*g;
return a},Invert:function(A){var k=A._Det();if(k!=0){var J=A.m;var I=J[0];var G=J[1];var E=J[2];var C=J[3];var o=I[0],l=I[1],j=I[2],i=I[3];
var N=G[0],M=G[1],L=G[2],K=G[3];var z=E[0],y=E[1],x=E[2],w=E[3];var r=C[0],q=C[1],p=C[2],n=C[3];var f=(M*x*n+L*w*q+K*y*p-M*w*p-L*y*n-K*x*q)/k;
var d=(l*w*p+j*y*n+i*x*q-l*x*n-j*w*q-i*y*p)/k;var b=(l*L*n+j*K*q+i*M*p-l*K*p-j*M*n-i*L*q)/k;var a=(l*K*x+j*M*w+i*L*y-l*L*w-j*K*y-i*M*x)/k;
var H=(N*w*p+L*z*n+K*x*r-N*x*n-L*w*r-K*z*p)/k;var F=(o*x*n+j*w*r+i*z*p-o*w*p-j*z*n-i*x*r)/k;var D=(o*K*p+j*N*n+i*L*r-o*L*n-j*K*r-i*N*p)/k;
var B=(o*L*w+j*K*z+i*N*x-o*K*x-j*N*w-i*L*z)/k;var v=(N*y*n+M*w*r+K*z*q-N*w*q-M*z*n-K*y*r)/k;var u=(o*w*q+l*z*n+i*y*r-o*y*n-l*w*r-i*z*q)/k;
var t=(o*M*n+l*K*r+i*N*q-o*K*q-l*N*n-i*M*r)/k;var s=(o*K*y+l*N*w+i*M*z-o*M*w-l*K*z-i*N*y)/k;var h=(N*x*q+M*z*p+L*y*r-N*y*p-M*x*r-L*z*q)/k;
var g=(o*y*p+l*x*r+j*z*q-o*x*q-l*z*p-j*y*r)/k;var e=(o*L*q+l*N*p+j*M*r-o*M*p-l*L*r-j*N*q)/k;var c=(o*M*x+l*L*z+j*N*y-o*L*y-l*N*x-j*M*z)/k;
this.SetRow(1,Vector4.Create(f,d,b,a));this.SetRow(2,Vector4.Create(H,F,D,B));this.SetRow(3,Vector4.Create(v,u,t,s));this.SetRow(4,Vector4.Create(h,g,e,c))
}},IsEqual:function(f,e){var c=e||0;var b=this.m;var h=f.m;for(var g=1;g<=4;g++){for(var d=1;d<=4;d++){var a=_IsEqual(b[g-1][d-1],h[g-1][d-1],c);
if(!a){return false}}}return true},IsIdentity:function(d){var b=d||0;var a=this.m;for(var e=1;e<=4;e++){for(var c=1;c<=4;
c++){var f=(e==c)&&1||0;if(!_IsEqual(a[e-1][c-1],f,b)){return false}}}return true},Multiply:function(G,F){var U=G.m;var T=F.m;
var O=U[0];var M=U[1];var K=U[2];var I=U[3];var o=O[0],m=O[1],l=O[2],k=O[3];var S=M[0],R=M[1],Q=M[2],P=M[3];var D=K[0],C=K[1],B=K[2],A=K[3];
var r=I[0],q=I[1],p=I[2],n=I[3];var z=T[0];var y=T[1];var w=T[2];var u=T[3];var h=z[0],f=z[1],d=z[2],c=z[3];var N=y[0],L=y[1],J=y[2],H=y[3];
var x=w[0],v=w[1],t=w[2],s=w[3];var j=u[0],i=u[1],g=u[2],e=u[3];var E=this.m;E[0][0]=o*h+m*N+l*x+k*j;E[0][1]=o*f+m*L+l*v+k*i;
E[0][2]=o*d+m*J+l*t+k*g;E[0][3]=o*c+m*H+l*s+k*e;E[1][0]=S*h+R*N+Q*x+P*j;E[1][1]=S*f+R*L+Q*v+P*i;E[1][2]=S*d+R*J+Q*t+P*g;E[1][3]=S*c+R*H+Q*s+P*e;
E[2][0]=D*h+C*N+B*x+A*j;E[2][1]=D*f+C*L+B*v+A*i;E[2][2]=D*d+C*J+B*t+A*g;E[2][3]=D*c+C*H+B*s+A*e;E[3][0]=r*h+q*N+p*x+n*j;E[3][1]=r*f+q*L+p*v+n*i;
E[3][2]=r*d+q*J+p*t+n*g;E[3][3]=r*c+q*H+p*s+n*e},SetAxisRotation:function(){NOT_YET_IMPLEMENTED("SetAxisRotation")},SetIdentity:function(){this.SetRow(1,1,0,0,0);
this.SetRow(2,0,1,0,0);this.SetRow(3,0,0,1,0);this.SetRow(4,0,0,0,1)},SetRotationXyz:function(d,b,a,c){this._SetRotationXyz(d,b,a,c)
},_SetRotationXyz:function(a,i,f,h){var b=h||MATRIX_REPLACE;var c=Matrix44.Create();var g=_BuildRotation(1,0,0,a||0);var e=_BuildRotation(0,1,0,i||0);
var d=_BuildRotation(0,0,1,f||0);c.Multiply(c,g);c.Multiply(c,e);c.Multiply(c,d);switch(b){case MATRIX_REPLACE:this.Copy(c);
break;case MATRIX_PREMULTIPLY:this.Multiply(c,this);break;case MATRIX_POSTMULTIPLY:this.Multiply(this,c);break;default:break
}},SetRow:function(e,a,b,c,d){if(a instanceof Vector4){this._SetRowVector(e,a)}else{this._SetRow(e,a,b,c,d)}},_SetRowVector:function(f,d){var a=Vector4.X(d),b=Vector4.Y(d),c=Vector4.Z(d),e=Vector4.W(d);
this._SetRow(f,a,b,c,e)},_SetRow:function(f,a,b,c,e){var d=this.m[f-1];d[0]=a;d[1]=b;d[2]=c;d[3]=e},SetScale:function(c,b,a){this.scalex=c;
this.scaley=b;this.scalez=a},SetTranslation:function(){if(arguments[0]&&arguments[0] instanceof Vector4){alert("Trans vector4");
var d=arguments[0];var c=arguments[1];var b=Vector4.X(d),a=Vector4.Y(d),e=Vector4.Z(d);this._SetTranslationXYZ(b,a,e,c)}else{this._SetTranslationXYZ(arguments[0],arguments[1],arguments[2],arguments[3])
}},_SetTranslationXYZ:function(c,b,g,d){var e=d||MATRIX_REPLACE;var f=Vector4.Create(c,b,g,1);var a=Matrix44.Create();Matrix44.SetRow(a,4,f);
switch(e){case MATRIX_REPLACE:this.SetRow(4,f);break;case MATRIX_PREMULTIPLY:this.Multiply(a,this);break;case MATRIX_POSTMULTIPLY:this.Multiply(this,a);
break;default:break}},Transpose:function(n){var r=(n&&n.m)||this.m;var d=r[0];var c=r[1];var b=r[2];var a=r[3];var p=d[0];
var m=d[1];var k=d[2];var i=d[3];var w=c[0];var v=c[1];var u=c[2];var t=c[3];var h=b[0];var g=b[1];var f=b[2];var e=b[3];
var q=a[0];var o=a[1];var l=a[2];var j=a[3];var s=this.m;s[0][0]=p;s[1][0]=m;s[2][0]=k;s[3][0]=i;s[0][1]=w;s[1][1]=v;s[2][1]=u;
s[3][1]=t;s[0][2]=h;s[1][2]=g;s[2][2]=f;s[3][2]=e;s[0][3]=q;s[1][3]=o;s[2][3]=l;s[3][3]=j},_MultiplyVector:function(i,b){var a=b||Vector4.Create();
var c=this.m;var l=c[0];var k=c[1];var j=c[2];var h=c[3];var f=Vector4.X(i);var e=Vector4.Y(i);var d=Vector4.Z(i);var g=Vector4.W(i);
a.SetXyzw(l[0]*f+l[1]*e+l[2]*d+l[3]*g,k[0]*f+k[1]*e+k[2]*d+k[3]*g,j[0]*f+j[1]*e+j[2]*d+j[3]*g,h[0]*f+h[1]*e+h[2]*d+h[3]*g);
return a},_toString:function(a){return Matrix44.toString(a)},toString:function(){var f=[];var d=Vector4.Create();f.push("Matrix=");
for(var e=1;e<=4;e++){f.push("[ ");this.GetRow(e,d);f.push(""+d);f.push("],")}var b="";for(var a in f){var c=f[a];b=b+c}return b
},};function ImageResource(b,a){this._imageName=b;if(!ImageResource.images[b]){this._realResource=a||b;this._img=new Image();
this._img.src=this._realResource;ImageResource.images[b]=this._img}else{this._img=ImageResource.images[b]}this.className="ImageResource"
}ImageResource.images={};ImageResource.count=0;ImageResource.getResource=function(a){return ImageResource.images[a]};ImageResource.DEBUG=function(){alert("ImageResource.DEBUG - START");
for(var a in ImageResource.images){alert("ImageResource Name ="+a+" "+ImageResource.images[a])}alert("ImageResource.DEBUG -END")
};ImageResource.isLoaded=function(){ImageResource.count=0;for(idx in ImageResource.images){var a=ImageResource.images[idx];
if(!a.complete){return false}else{ImageResource.count=ImageResource.count+1}}return ImageResource.count};ImageResource.prototype={constructor:ImageResource,getImage:function(){return ImageResource.images[this._imageName]
},getWidth:function(){return this._img.width},getHeight:function(){return this._img.height},isLoaded:function(){return this._img&&this._img.complete
},toString:function(){return"Class "+this.className+" "+this._imageName+" "+this._realResource}};function Sprite(b,a,c){this._x=a||0;
this._y=c||0;this._cx=this._x;this._cy=this._y;this._time=0;this._img=new ImageResource(b);this._rangle=0;this._sx=1;this._sy=1;
this.className="Sprite"}Sprite.prototype={constructor:Sprite,setTexture:function(a){},setPosition:function(a,b){this._x=a;
this._y=b},draw:function(a){var b=this._img.getWidth();var c=this._img.getHeight();a.save();a.translate(this._x,this._y);
a.scale(this._sx,this._sy);a.rotate(this._rangle);a.drawImage(this._img.getImage(),0,0,b,c,-b/2,-c/2,b,c);a.restore()},getScaleX:function(){return this._sx
},getScaleY:function(){return this._sy},setScale:function(b,a){this._sx=b||1;this._sy=a||1},setRotation:function(a){this._rangle=a*(Math.PI/180)
},getRotation:function(){return this._rangle*180/Math.PI},getX:function(){return this._x},getY:function(){return this._y},update:function(a){this._time=this._time+a
}};function Spritesheet(b,d,g,c,f,a,e){this._imagename=b;this._image=ImageResource.getResource(b);this._numFrames=0;this._spritesacross=d;
this._spritesdown=g;this._spritewidth=c;this._spriteheight=f;this._numFrames=this._spritesacross*this._spritesdown;this._init();
this._frame=0;this.className="Spritesheet"}Spritesheet.Create=function(b,d,g,c,f,a,e){return new Spritesheet(b,d,g,c,f,a,e)
};Spritesheet.prototype={constructor:Spritesheet,_init:function(){if(!this._spritewidth){this._width=this._image.width;this._height=this._image.height;
this._spritewidth=this._width/this._spritesacross;this._spriteheight=this._height/this._spritesdown}},draw:function(a,i,l,h,b,k,j){var g=this._spritewidth;
var f=this._spriteheight;var m=i%this._numFrames;var d=f*parseInt(m/this._spritesacross);var e=g*(m%this._spritesacross);
var c=(b||0)*(Math.PI/180);this._frame=m;a.save();a.translate(l,h);a.scale(k||1,j||1);a.rotate(c);a.drawImage(this._image,e,d,g,f,-g/2,-f/2,g,f);
a.restore()},toString:function(){var b=this._spritewidth;var e=this._spriteheight;var d=this._frame%this._numFrames;var a=e*parseInt(d/this._spritesacross);
var c=b*(d%this._spritesacross);return this.className+" "+this._imagename+" "+d+":"+c+","+a}};function RenderHelper(d,c,b,a){this._context1=d;
this._context2=c;this._width=b;this._height=a;this._ccontext=this._context2;this._inkcolour="#000000";this._papercolour="#FFFFFF";
this._defaultfont="12px sans-seri";this._currentfont=this._defaultfont;this._overlays=[{x:0,y:0,name:"overlay0"},{x:0,y:0,name:"overlay1"},{x:0,y:0,name:"overlay2"},{x:0,y:0,name:"overlay3"},{x:0,y:0,name:"overlay4"},{x:0,y:0,name:"overlay5"},{x:0,y:0,name:"overlay6"},{x:0,y:0,name:"overlay7"},{x:0,y:0,name:"overlay8"},{x:0,y:0,name:"overlay9"},{x:0,y:0,name:"overlay10"},{x:0,y:0,name:"overlay11"},{x:0,y:0,name:"overlay12"},{x:0,y:0,name:"overlay13"},{x:0,y:0,name:"overlay14"},{x:0,y:0,name:"overlay15"},];
this._overlayindex=0;this.setOverlay(0);this.className="RenderHelper";this.copyright="Javascript code (c) John Wilson 2012"
}RenderHelper.CreateTextureAnimation=function(a,d,g,c,h){var f=g;var e=TextureAnim.Create(c,h);var i=Spritesheet.Create(g,a,d);
e.render=function(o,k,p,n,m,l){if(this.isPlaying()){var j=this.getRenderTexture();o.drawSpriteSheet(j.sheet,k,p,j.frame,(l||0),n,m)
}};for(var b=0;b<a*d;b++){e.addFrame({frame:b,sheet:i})}return e};RenderHelper.TextureFind=function(a){var b=new ImageResource(a);
return b.getImage()};RenderHelper.prototype={constructor:RenderHelper,setOverlay:function(a){var b=this._overlays[this._overlayindex];
this._overlayindex=a%this._overlays.length;this._currentoverlay=this._overlays[this._overlayindex]},getOverlay:function(a){return this._overlayindex
},camera2dSetPostition:function(a,b){this._currentoverlay.x=a;this._currentoverlay.y=b},convertRGB:function(d,c){var g=0,e=0,b=0,f=255;
if(d instanceof Array){g=Math.min(255,(d[0]||g)).toString(16);e=Math.min(255,(d[1]||e)).toString(16);b=Math.min(255,(d[2]||b)).toString(16);
f=Math.min(255,(d[3]||f)).toString(16)}else{if(typeof d=="string"){return d}else{g=(d.r||d.red||g).toString(16);e=(d.g||d.green||e).toString(16);
b=(d.b||d.blue||b).toString(16);f=(d.a||d.alpha||f).toString(16)}}var a="#"+(g.length>1?g:("0"+g))+(e.length>1?e:("0"+e))+(b.length>1?b:("0"+b));
if(a.length!=7){alert("BAD COLOUR "+a+","+g.length+","+e.length+","+b.length)}return a},getColour:function(b,a){return(b==undefined)?this._inkcolour:this.convertRGB(b,a)
},setColour:function(a){this._colour=a},drawRawImage:function(d,j,g,b,i,h){var f=d.width;var e=d.height;var c=this._currentoverlay.x,k=this._currentoverlay.y;
if(f){var a=this._ccontext;a.save();a.translate(j-c,g-k);a.scale(i,h);a.rotate(b*(Math.PI/180));a.drawImage(d,0,0,f,e,-f/2,-e/2,f,e);
a.restore()}},drawSprite:function(e,a,h,b,g,f){var c=this._currentoverlay.x,d=this._currentoverlay.y;e.setRotation(b||e.getRotation());
e.setScale(g||e.getScaleX(),f||e.getScaleY());e.setPosition((a||e.getX())-c,(h||e.getY())-d);e.draw(this._ccontext)},drawSpriteSheet:function(a,h,e,c,b,g,f){var d=this._currentoverlay.x,i=this._currentoverlay.y;
a.draw(this._ccontext,c,h-d,e-i,b,g,f)},drawLine:function(c,e,f,h,g){var b=this._currentoverlay.x,d=this._currentoverlay.y;
var a=this._ccontext;a.beginPath();a.strokeStyle=this.getColour(g);a.moveTo(c-b,e-d);a.lineTo(f-b,h-d);a.stroke()},drawBox:function(a,e,c,b,d){this.drawLine(a,e,a+c,e,d);
this.drawLine(a+c,e,a+c,e+b,d);this.drawLine(a+c,e+b,a,e+b,d);this.drawLine(a,e+b,a,e,d)},drawCircle:function(b,g,a,f){var d=this._currentoverlay.x,e=this._currentoverlay.y;
var c=this._ccontext;c.beginPath();c.strokeStyle=this.getColour(f);c.arc(b-d,g-e,a,0,Math.PI*2,true);c.stroke()},drawPoly:function(e,h){var a=this._ccontext;
a.beginPath();for(var d=0;d<e.length;d+=2){var c=e[d];var g=e[d+1];var b=e[d+2]||e[0];var f=e[d+3]||e[1];this.drawLine(c,g,b,f,h)
}a.stroke()},clearRect:function(f,e){var a=this._ccontext;var d=e||1;if(f){var g=a.fillStyle;var c=a.globalAlpha;var b=this.getColour(f);
a.fillStyle=b;a.globalAlpha=d;a.fillRect(0,0,this._width,this._height);a.fillStyle=g;a.globalAlpha=c}else{a.clearRect(0,0,this._width,this._height)
}},drawTriangle:function(d,l,c,k,b,j,a,o){var n=this._ccontext;var g=this._currentoverlay.x,m=this._currentoverlay.y;var f=this.getColour(a);
var h=o||1;var e=n.fillStyle;var i=n.globalAlpha;n.globalAlpha=h;n.fillStyle=f;n.beginPath();n.moveTo(d-g,l-m);n.lineTo(c-g,k-m);
n.lineTo(b-g,j-m);n.closePath();n.fill();n.fillStyle=e;n.globalAlpha=i},fillRect:function(c){var b=this.getColour(c);var a=this._ccontext;
a.fillStyle=b;a.fillRect(0,0,this._width,this._height)},drawText:function(l,o,n,b,k,c,f){var d=this._currentoverlay.x,p=this._currentoverlay.y;
var q=this._ccontext;var m=q.textAlign;var a=q.font;var i=q.textBaseline;var j=q.globalAlpha;q.globalAlpha=f;q.fillStyle=this.getColour(b);
var e=this.getBuffer();q.textAlign=(k&&k.horizontal)||"left";q.font=c||this._currentfont;q.textBaseline=(k&&k.vertical)||"top";
var g=l||"B"+e+l;var h=q.measureText(g);q.fillText(g,o-d,n-p);q.textAlign=m;q.font=a;q.textBaseline=i;q.globalAlpha=j},drawQuads2d:function(e,q,o,i){var h=this._currentoverlay.x,s=this._currentoverlay.y;
var r=this._ccontext;var p=1,n=1;var a=q.GetRow(4);var u=a.X(),t=a.Y();r.save();r.rotate(0);r.scale(p||1,n||1);for(var m=0;
m<o.length;m++){var f=o[m];var g=i[m];var k=f.xstart+u,j=f.ystart+t;var d=g.x,c=g.y,b=g.width,l=g.height;r.translate(k-h,j-s);
r.drawImage(e,d,c,b,l,0,0,b,l);r.translate(-k,-j)}r.restore()},drawArrowHead:function(m,l,h,i,a){var k=function(p){return p*Math.PI/180
};var j=l.X(),g=l.Y();var d=h*0.2;var b=g+h*Math.sin(k(m-90));var c=j+h*Math.cos(k(m-90));var n=d*Math.sin(k(m-90+i));var o=d*Math.cos(k(m-90+i));
var e=d*Math.sin(k(m-90-i));var f=d*Math.cos(k(m-90-i));this.drawLine(j,g,c,b,a);this.drawLine(c,b,c-o,b-n,a);this.drawLine(c,b,c-f,b-e,a)
},flipBuffer:function(){if(this._ccontext==this._context1){this._ccontext=this._context2}else{this._ccontext=this._context1
}},getBuffer:function(){return(this._ccontext==this._context1?0:1)}};function TextureAnim(c,b,a){this._timeout=b||0;this._MaxSize=a||32;
this._FramesPerSecond=c||15;this._looping=true;this._bouncing=true;this._playing=false;this._TexIDList=new Array();this._nFrames=0;
this._FrameTimer=0;this.className="TextureAnim"}TextureAnim.Create=function(b,a){return new TextureAnim(b,a)};TextureAnim.prototype={constructor:TextureAnim,addFrame:function(a){if(this._nFrames<this._MaxSize){this._TexIDList[this._nFrames]=a;
this._nFrames=this._nFrames+1}},getFrames:function(){return this._TexIDList},update:function(b){var a=this._nFrames;if(this._playing){this._FrameTimer=this._FrameTimer+b;
this._playing=(this._timeout&&this._FrameTimer>this._timeout)?false:true;if(!this._looping){var c=parseInt(this._FrameTimer*this._FramesPerSecond);
if(c>a-1){this._playing=false}}}},getRenderTexture:function(){var b=parseInt(this._FrameTimer*this._FramesPerSecond);var a=this._nFrames;
if(!this._looping){b=Math.min(b,a-1)}else{if(this._bouncing){b=a>1?b%(a*2-2):0;if(b>a-1){b=(a*2-2)-b}}else{b=b%a}}return this._TexIDList[b]
},play:function(b,a,c){this._looping=b;this._bouncing=a;this._FrameTimer=0;this._playing=true;this._timeout=c||this._timeout
},isPlaying:function(){return this._playing},stop:function(){this._playing=false}};function Bezier(d,c,b,a){this._cp0=d;this._cp1=c;
this._cp2=b;this._cp3=a;this._vCP=new Vector2(d);this._cx=3*(c.x-d.x);this._bx=3*(b.x-c.x)-this._cx;this._ax=a.x-d.x-this._cx-this._bx;
this._cy=3*(c.y-d.y);this._by=3*(b.y-c.y)-this._cy;this._ay=a.y-d.y-this._cy-this._by;this._length=this._CalcLength();this.className="Bezier"
}Bezier.Create=function(d,c,b,a){return new Bezier(d,c,b,a)};Bezier.prototype={constructor:Bezier,getLength:function(){return this._length
},getVectorPosition:function(a){var b=this.getPositionXY(a);return new Vector2(b.x,b.y)},getPositionXY:function(a){var b=a*a;
var d=b*a;var e=(this._ax*d)+(this._bx*b)+(this._cx*a)+this._vCP.x;var c=(this._ay*d)+(this._by*b)+(this._cy*a)+this._vCP.y;
return{x:e,y:c}},GetPrimeT:function(a){var b=a||1;var c=b*b;var e=(3*this._ax*c)+(2*this._bx*b)+(this._cx);var d=(3*this._ay*c)+(2*this._by*b)+(this._cy);
return Math.sqrt(e*e+d*d)},_CalcLength:function(f){var h=f||1;var e=100;var g=parseInt(h*e);var d=1/e;var b=(this.GetPrimeT(0)+this.GetPrimeT(h))/(2*g);
var c=0;for(var a=d;a<=h-d;a+=d){c=c+this.GetPrimeT(a)}return c/g+b},render:function(b){b.drawCircle(this._cp0.x,this._cp0.y,10);
b.drawCircle(this._cp1.x,this._cp1.y,10);b.drawCircle(this._cp2.x,this._cp2.y,10);b.drawCircle(this._cp3.x,this._cp3.y,10);
for(var a=0;a<=1;a+=0.01){var c=this.getVectorPosition(a);b.drawCircle(c.x,c.y,1)}},toString:function(){return this.className
}};var STATE_WAITING=0;var STATE_RUNNING=1;var STATE_FINISHED=2;function Event(c,b,d,a){this._state=STATE_WAITING;this._runtime=0;
this._starttime=c;this._duration=b-c;this._eventObj=d;this._eventParam=a;this.className="Event"}Event.prototype={constructor:Event,StartEvent:function(){this._eventObj.StartEvent()
},Running:function(){var a=this._runtime/this._duration;this._eventObj.Running(a)},EndEvent:function(){this._eventObj.EndEvent()
},IsFinished:function(){return(this._state==STATE_FINISHED)},toString:function(){return"Event Debug() "+this._starttime+","+this._duration+","+this._runtime+","+this._state
},Update:function(c,b){var a=this._state;if(a==STATE_WAITING){if(c>=this._starttime){this._runtime=0;this.StartEvent();if(this._duration==0){this._state=STATE_FINISHED
}else{this._state=STATE_RUNNING}}}else{if(a==STATE_RUNNING){this._runtime=this._runtime+b;if(this._runtime<=this._duration){this.Running()
}else{this.EndEvent();this._state=STATE_FINISHED}}}}};function SingleShotEvent(b,a){this._callback=b;this._param=a;this.className="SingleShotEvent"
}SingleShotEvent.prototype={constructor:SingleShotEvent,StartEvent:function(){if(this._callback){this._callback(this._param)
}},Running:function(a){},EndEvent:function(){}};function EventManager(){this._currentTime=0;this._eventTable=new Array();
this.className="EventManager"}EventManager.prototype={constructor:EventManager,addImmediateEvent:function(a,c){var b=this._currentTime;
this._addNewEvent(new Event(b,b+(c||0),a));return(c||0)},addEventAfterTime:function(a,d,c){var b=this._currentTime+d;this._addNewEvent(new Event(b,b+(c||0),a));
return d+(c||0)},addSingleShotEvent:function(c,b,a){return this.addEventAfterTime(new SingleShotEvent(c,b),a)},_addNewEvent:function(a){this._eventTable.push(a)
},_removeEvent:function(a){delete this._eventTable[a]},ClearEvents:function(c){if(c){for(var b in this._eventTable){var a=this._eventTable[b];
if(a){a.EndEvent()}}}this._eventTable=new Array()},_getSize:function(){return this._eventTable.length},cleanArray:function(c){var a=new Array();
for(var b=0;b<c.length;b++){if(c[b]){a.push(c[b])}}return a},Update:function(c){this._currentTime=this._currentTime+c;for(var b in this._eventTable){var a=this._eventTable[b];
if(a){a.Update(this._currentTime,c);if(a.IsFinished()){this._removeEvent(b)}}}this._eventTable=this.cleanArray(this._eventTable)
}};WorldClock={};WorldClock.time=0;WorldClock.observers=new Array();WorldClock.pause=false;WorldClock.AddObserver=function(a){WorldClock.observers.push(a)
};WorldClock.Restart=function(){WorldClock.Resume();WorldClock.Reset()};WorldClock.Reset=function(){WorldClock.time=0;WorldClock.InformObservers()
};WorldClock.Pause=function(){WorldClock.pause=true};WorldClock.Resume=function(){WorldClock.pause=false};WorldClock.InformObservers=function(){for(var b in WorldClock.observers){var a=WorldClock.observers[b];
if(a){a(WorldClock.time)}}};WorldClock.GetClock=function(){return WorldClock.time};WorldClock.Update=function(a){if(!WorldClock.pause){WorldClock.time=WorldClock.time+a
}};var k_strongly_damped=0;var k_weakly_damped=1;var k_critically_damped=2;function KDampedOscillator(b,e,d,a,c){this.x0_=a;
this.v0_=c;this.m_=b;this.r_=e;this.k_=d;this.xe_=0;this.v_=0;this.w_=0;this.alpha=0;this.p_=0}KDampedOscillator.Create=function(b,e,d,a,c){return new KDampedOscillator(b,e,d,a,c)
};KDampedOscillator.prototype={constructor:KDampedOscillator,reset:function(d,b,e){this.x0_=d-e;this.v0_=b;this.xe_=e;this.w_=Math.sqrt(this.k_/this.m_);
this.alpha_=this.r_/(2*Math.sqrt(this.m_*this.k_));if(this.alpha_>1){this.damping_type_=k_strongly_damped}else{if(this.alpha_<1){this.damping_type_=k_weakly_damped
}else{this.damping_type_=k_critically_damped}}var f=this.damping_type_;switch(f){case k_strongly_damped:var c=Math.sqrt(this.alpha_*this.alpha_-1);
this.l1_=this.w_*(-this.alpha_+c);this.l2_=this.w_*(-this.alpha_-c);this.c_=(this.v0_-this.l1_*this.x0_)/(this.l2_-this.l1_);
this.b_=this.x0_-this.c_;break;case k_weakly_damped:this.p_=this.r_/this.m_*0.5;this.v_=Math.sqrt(4*this.m_*this.k_-this.r_*this.r_)/this.m_*0.5;
this.a_=Math.sqrt(this.x0_*this.x0_+this.v0_*this.v0_/(this.p_*this.p_));if(this.a_==0){this.phi_=0}else{this.phi_=Math.acos(this.x0_/this.a_)
}break;case k_critically_damped:this.c_=this.x0_;this.b_=this.v0_+this.x0_*this.w_;break;default:alert("defa");break}},centre:function(){return this.xe_
},equilibrium:function(a,b){return Math.abs(this.evaluate(a)-this.xe_)<=b&&Math.abs(this.velocity(a))<=b},evaluate:function(b){var a=0;
var c=this.damping_type_;switch(c){case k_strongly_damped:a=this.b_*Math.exp(this.l1_*b)+this.c_*Math.exp(this.l2_*b);break;
case k_weakly_damped:a=this.a_*Math.exp(-this.p_*b)*Math.cos(this.v_*b+this.phi_);break;case k_critically_damped:a=(this.b_*b+this.c_)*Math.exp(-this.w_*b);
break;default:break}return this.xe_+a},velocity:function(b){var a=0;var c=this.damping_type_;switch(c){case k_strongly_damped:a=this.b_*this.l1_*Math.exp(this.l1_*b)+this.c_*this.l2_*Math.exp(this.l2_*b);
break;case k_weakly_damped:a=-this.a_*this.p_*Math.exp(-this.p_*b)*Math.cos(this.v_*b+this.phi_)-this.v_*this.a_*Math.exp(-this.p_*b)*Math.sin(this.v_*b+this.phi_);
break;case k_critically_damped:a=(this.b_-this.w_*(this.b_*b+this.c_))*Math.exp(-this.w_*b);default:break}return a},toString:function(){return"KDampedOscillator"
}};function Ktimer(b,a){this.scale_=b||1;this.paused_=a;this.p1_=0;this.p2_=1;this.reset(b)}Ktimer.Create=function(b,a){return new Ktimer(b,a)
};Ktimer.time=function(){var a=WorldClock.GetClock();return a};Ktimer.prototype={constructor:Ktimer,reset:function(a){if(a){this.scale_=1/a
}this.elapsed_time_=0;this.start_time_=Ktimer.time()},adjust:function(a){this.start_time_=this.start_time_+a},finished:function(){return this.elapsed()>=1
},range:function(b,a){this.p1_=b;this.p2_=a},p:function(){return this.p2(this.p1_,this.p2_)},p2:function(d,c){var b=this.elapsed();
var a=0;if(b>1){a=1}else{a=b}return d-(d-c)*a},elapsed:function(){var a=0;if(this.paused_){a=this.elapsed_time_}else{a=Ktimer.time()-this.start_time_
}return a*this.scale_},paused:function(){return this.paused_},pause:function(){if(!this.paused_){this.elapsed_time_=Ktimer.time()-this.start_time_;
this.paused_=true}},resume:function(){if(this.paused_){this.start_time_=Ktimer.time()-this.elapsed_time_;this.paused_=false
}},toString:function(){return"Ktimer"}};function SpringBox(d,h,b,a,e,c,g){var f=function(j,i){return(typeof(j)==="undefined"||typeof(j)!==typeof(i)?i:j)
};this.osc=KDampedOscillator.Create(f(a,1),f(e,12),f(c,100),0,0);this.osctimer=Ktimer.Create(1,true);this.endx=b;this.y=h;
this.startx=d;this.time=0;this.finishby=f(g,5);this.started=false;this.osc.reset(this.endx,0,this.startx);return this}SpringBox.className="SpringBox";
SpringBox.ZEROVEL_EPS=0.1;SpringBox.Create=function(d,g,b,a,e,c,f){return new SpringBox(d,g,b,a,e,c,f)};SpringBox.prototype={constructor:SpringBox,Start:function(){this.started=true;
this.osctimer.resume()},GetDuration:function(){return this.finishby},IsFinished:function(){return(this.time>this.finishby)
},IsStationary:function(){return this.osc.equilibrium(this.osctimer.elapsed(),SpringBox.ZEROVEL_EPS)},Update:function(a){if(!this.IsFinished()&&this.started){this.time=this.time+a
}},GetPosition:function(){var b=this.osctimer.elapsed();var a=this.osc.evaluate(b);return{x:(this.IsStationary()?this.startx:parseInt(a)),y:this.y}
},toString:function(){return"SpringBox"}};function DisplayableTextWithImage(c,e,a,d,b){if(a instanceof ImageResource){this._img=a.getImage()
}else{if(a instanceof Image){this._img=a}else{this._backimageName=a||"messagebackground.png";this._imgRes=new ImageResource(this._backimageName);
this._img=this._imgRes.getImage()}}this._text=c;this._sx=d||1.5;this._sy=b||4;this._font="italic 20pt Calibri";this._align={horizontal:"center",vertical:"middle"};
this._position=e||{x:0,y:0};this._backcolour="#FFFFFF";this._colour="#000000"}DisplayableTextWithImage.Create=function(c,e,b,d,a){return new DisplayableTextWithImage(c,e,b,d,a)
};DisplayableTextWithImage.GlobalFont="26bold";DisplayableTextWithImage.prototype={constructor:DisplayableTextWithImage,Update:function(a){},GetPosition:function(){return this._position
},SetPosition:function(a){this._position=a},SetFont:function(a){this._font=a},SetAlignment:function(a){this._align=a},Render:function(c){var a=this._position.x;
var h=this._position.y;if(this._img){c.drawRawImage(this._img,a,h,0,this._sx,this._sy)}if(this._text){var e=this._text;var g=this._align;
var b=this._font;var f=this._colour;var d=this._backcolour;c.drawText(e,a-1,h-1,f,g,b);c.drawText(e,a,h,f,g,b);c.drawText(e,a+1,h+1,d,g,b);
c.drawText(e,a+2,h+2,d,g,b)}},toString:function(){return"DisplayableTextWithImage "+this.text}};function Message(b,a,c){this._time=0;
this._duration=c||a.GetDuration();this._displayable=b;this._spring=a;this._started=false}Message.Create=function(b,a,c){return new Message(b,a,c)
};Message.prototype={constructor:Message,Start:function(){this._spring.Start();this._started=true;if(this._displayable.SetPosition){this._displayable.SetPosition(this._spring.GetPosition())
}},IsFinished:function(){return this._time>this._duration&&this._spring&&this._spring.IsFinished()},IsSettled:function(){return this._spring&&this._spring.IsFinished()
},Update:function(a){if(this._started){this._time=this._time+a}if(this._spring&&this._displayable){this._spring.Update(a);
if(this._displayable.SetPosition){this._displayable.SetPosition(this._spring.GetPosition())}}},Render:function(a){if(this._displayable&&this._displayable.Render){this._displayable.Render(a)
}},toPrint:function(){return"aMessage"}};MessageManager={};MessageManager.items=new Array();MessageManager.pooled=new Array();
MessageManager.time=0;MessageManager.lasttime=0;MessageManager.UPDATEDURATION=5;MessageManager.Init=function(a){MessageManager.items=new Array();
MessageManager.pooled=new Array();MessageManager.time=0;MessageManager.lasttime=0;MessageManager.callback=a||MessageManager.DefaultCallBack
};MessageManager.DefaultCallBack=function(a){};MessageManager.Clear=function(){MessageManager.Init(MessageManager.callback)
};MessageManager.ClearLastMessage=function(a){if(!a||a==MessageManager.CheckLastMessageType()){delete MessageManager.items[MessageManager.items.length-1]
}};MessageManager.CheckLastMessageType=function(){var a=MessageManager.items[MessageManager.items.length-1];return a&&a.GetDisplayType()
};MessageManager.Count=function(){return MessageManager.items.length};MessageManager._GetPooled=function(){var a=MessageManager.pooled[1];
delete MessageManager.pooled[1];return a};MessageManager.Update=function(e){MessageManager.time=MessageManager.time+e;if((MessageManager.time>MessageManager.lasttime+MessageManager.UPDATEDURATION)||MessageManager.items.length==0){var d=MessageManager._GetPooled();
if(d){d.Start();MessageManager.items.push(d);if(MessageManager.callback){MessageManager.callback(d)}}MessageManager.lasttime=MessageManager.time
}var f=new Array();for(var b in MessageManager.items){var d=MessageManager.items[b];d.Update(e);if(d.IsFinished()){f.push({index:b,item:d})
}}for(var a in f){var c=f[a];delete MessageManager.items[c.index]}};MessageManager.IsSettled=function(){for(var a in MessageManager.items){var b=MessageManager.items[a];
if(!b.IsSettled()){return false}}return true};MessageManager.AddPooled=function(a){MessageManager.Add(a,true)};MessageManager.Add=function(b,a){if(a){MessageManager.pooled.push(b)
}else{b.Start();MessageManager.items.push(b);if(MessageManager.callback){MessageManager.callback(b)}}};MessageManager.Render=function(c){for(var a in MessageManager.items){var b=MessageManager.items[a];
b.Render(c)}};function Locale(){}Locale.className="Locale";Locale.gUseKeyAsText=false;Locale.locale=null;Locale.prefix="*";
Locale.keys={};Locale.region="en-GB";Locale.Init=function(a,b){Locale.keys={};if(!Locale.locale){}Locale.gUseKeyAsText=a;
Locale.region=b||"en-GB"};Locale.ResolveRegionText=function(a){return a[Locale.region]||"NO_REGIONAL_TEXT"};Locale.AddLocaleText=function(a,b){Locale.keys[a]=b
};Locale.GetLocaleText=function(a){return Locale.prefix+a};Locale.GetLocaleText2=function(a){if(Locale.gUseKeyAsText){return(Locale.prefix+(Locale.keys[a]||a||"NIL"))
}else{if(!Locale.locale){Locale.Init(Locale.gUseKeyAsText)}return(Object&&Object.GetLocalizedText(Locale.locale,a)||"")}};
function Spline(a){this.primitive=a;this.type="spline",this._Init(a)}Spline.Create=function(a){return new Spline(a)};Spline.prototype={constructor:Spline,_Init:function(a){if(a.type=="spline"){alert("NOT DEFINED!!!!! SEE A CODE DOCTOR!");
this._InitSpline(a)}else{this._InitBezier(a)}},_InitBezier:function(g){var n=0;var m=new Array();var a=null;var b=g.nodes;
var i=g.closed;this.type=g.type;this.closed=i;var f,e,d,c;for(var l in b){var k=b[l];if(!a){f=k[0];e=k[1];d=k[2];c=k[3]}else{f=a;
e=k[0];d=k[1];c=k[2]}a=c;var j=Bezier.Create(Vector2.Create(f.x,f.y),Vector2.Create(e.x,e.y),Vector2.Create(d.x,d.y),Vector2.Create(c.x,c.y));
var h=j.getLength();n=n+h;m.push({splineVector:j,length:h,accumlen:n,cp1:{x:f.x,y:f.y},cp2:{x:c.x,y:c.y},cp1a:{x:e.x,y:e.y},cp2a:{x:d.x,y:d.y}})
}if(i){var k=b[0];f=c;e=d;d=k[1];c=k[0];var j=Bezier.Create(Vector2.Create(f.x,f.y),Vector2.Create(e.x,e.y),Vector2.Create(d.x,d.y),Vector2.Create(c.x,c.y));
var h=j.getLength();n=n+h;m.push({splineVector:j,length:h,accumlen:n,cp1:{x:f.x,y:f.y},cp2:{x:c.x,y:c.y},cp1a:{x:e.x,y:e.y},cp2a:{x:d.x,y:d.y}})
}this.sections=m;this.totalLength=n},_InitSpline:function(a){},IsClosed:function(){return this.closed},GetTotalLength:function(){return this.totalLength
},Debug:function(){var c=spline.sections;var a=spline.totalLength;var b=spline.closed&&"closed"||"not closed"},CalcPosition:function(b,a,f){var k=f&&(1-a)||a;
var d=k*this.totalLength;var j=this.sections;for(var e in this.sections){var i=this.sections[e];if(d<=i.accumlen){var c=1-(i.accumlen-d)/i.length;
var g=i.splineVector;var h=g.getPositionXY(c);b.SetXyzw(h.x,h.y,0,0);return}}},FindPathTValue:function(b,d){var e=spline.sections;
var c=e[b+1];var a=c.accumlen+(d-1)*c.length;return a/spline.totalLength},_RenderDebug:function(b){for(var h in this.sections){var g=this.sections[h];
var d=g.cp1,c=g.cp2,a=g.cp1a,i=g.cp2a;b.drawCircle(d.x,d.y,16,[255,255,255,255]);b.drawCircle(a.x,a.y,32,[255,0,0,255]);b.drawCircle(i.x,i.y,32,[0,0,255,255]);
b.drawCircle(c.x,c.y,16,[0,255,0,255]);var e=g.splineVector;var k=e.getLength();b.drawText("BEZIER LENGTH = "+k,d.x,d.y);
for(var j=0;j<=1;j+=0.01){var f=e.getPositionXY(j);b.drawCircle(f.x,f.y,1,[0,255,0,120])}}},Render:function(a){if(this.debug){this._RenderDebug(a)
}},toString:function(){return"Spline"}};var TRIGGER_STATE_NONE=0;var TRIGGER_STATE_INSIDE=1;var TRIGGER_STATE_OUTSIDE=2;function Trigger(a,b){this.state=TRIGGER_STATE_NONE;
this.shape=a;this.observers=b;this._Init()}Trigger.Create=function(a,b){return new Trigger(a,b)};Trigger.debug=false;Trigger.prototype={_Init:function(a){assert(this.observers,"NIL OBSERVERS");
this.time=0;this.timeinside=0;this.timeoutside=0;this.inside_count=0;this.outside_count=0},ChangeState:function(c,d){if(c!=this.state){for(var a in this.observers){var b=this.observers[a];
if(c==TRIGGER_STATE_INSIDE){if(b.ObjectInside){b.ObjectInside(d,this.shape,this.timeoutside)}this.inside_count=this.inside_count+1;
this.timeoutside=0}else{if(b.ObjectOutside){b.ObjectOutside(d,this.shape,this.timeinside)}this.outside_count=this.outside_count+1;
this.timeinside=0}}this.state=c}else{for(var a in this.observers){var b=this.observers[a];if(b.Inform){b.Inform(d,(c==TRIGGER_STATE_INSIDE),this.time,this.timeinside,this.timeoutside)
}}}},Update:function(b,a){this.time=this.time+b;var c=a.GetVectorPosition();if(this.shape.IsPointInside(c)){this.timeinside=this.timeinside+b;
this.ChangeState(TRIGGER_STATE_INSIDE,a)}else{this.timeoutside=this.timeoutside+b;this.ChangeState(TRIGGER_STATE_OUTSIDE,a)
}},Render:function(a){if(this.shape&&this.shape.Render){this.shape.Render(a)}},Render2D:function(b){if(this.shape){this.shape.Render(b);
var a,d,c=this.shape._GetCentre();b.drawCircle(a,c,4)}},toString:function(){return"Trigger"}};TriggerManager={};TriggerManager.className="TriggerManager";
TriggerManager.triggers={};TriggerManager.time=0;TriggerManager.debug=true;TriggerManager.count=0;TriggerManager.Init=function(){TriggerManager.count=0;
TriggerManager.triggers=new Array()};TriggerManager.Clear=function(){TriggerManager.Init()};TriggerManager.Update=function(c,d){TriggerManager.time=TriggerManager.time+c;
for(var b in TriggerManager.triggers){var a=TriggerManager.triggers[b];a.Update(c,d)}};TriggerManager.Add=function(a){TriggerManager.triggers.push(a);
TriggerManager.count=TriggerManager.count+1};TriggerManager.Remove=function(c){for(var b in TriggerManager.triggers){var a=TriggerManager.triggers[b];
if(c==a){TriggerManager.count=TriggerManager.count-1;delete TriggerManager.triggers[b];return true}}return false};TriggerManager.Render=function(c){if(TriggerManager.debug){for(var b in TriggerManager.triggers){var a=TriggerManager.triggers[b];
a.Render(c)}}};var QuadHotspotDEFAULTDEPTH=0.125;var QuadHotspotclassName="QuadHotspot";function QuadHotspot(a,d,c,b){this.quads=a;
this.name=c||"NONAME";this.depth=d||QuadHotspotDEFAULTDEPTH;this.className=QuadHotspotclassName;this.debug=b;this._Init()
}function stringformat(){return arguments}function _subtractv(c,b){var a=Vector4.Create();a.Subtract(c,b);return a}function _Dot2(b,a){return b.X()*a.X()+b.Z()*a.Z()
}QuadHotspot.Create=function(a,d,c,b){return new QuadHotspot(a,d,c,b)};QuadHotspot.Build2DPoly=function(j,f,k,n,a,b){var d=new Array();
var o=4;var e=2*Math.PI/o;var c=2*Math.PI/4;for(var h=1;h<=o;h++){var m=k*Math.cos(e*(h-1)-c+(n||0));var l=k*Math.sin(e*(h-1)-c+(n||0));
d.push(Vector4.Create(j+m,0,f+l))}var g=QuadHotspot.Create(d,0.5,a,b);return g};QuadHotspot.prototype={constructor:QuadHotspot,_Init:function(){var b=this.quads;
var c=[Vector4.Create(b[0]),Vector4.Create(b[1]),Vector4.Create(b[2]),Vector4.Create(b[3])];this.quads=c;this.normal=Vector4.Create();
this.Enormal1=Vector4.Create();this.Enormal2=Vector4.Create();this.Enormal3=Vector4.Create();this.Enormal4=Vector4.Create();
Vector4.Cross(this.normal,_subtractv(c[2],c[0]),_subtractv(c[1],c[0]));Vector4.Normalize3(this.normal);this.D=-Vector4.Dot3(this.normal,c[0]);
var d=-(this.D+this.normal.X()*c[3].X()+this.normal.Z()*c[3].Z())/this.normal.Y();c[3].SetY(d);var a=0.001;assert(Math.abs(Vector4.Dot3(this.normal,c[0])+this.D)<=a,"SHOULD BE 0");
assert(Math.abs(Vector4.Dot3(this.normal,c[1])+this.D)<=a,"SHOULD BE 0");assert(Math.abs(Vector4.Dot3(this.normal,c[2])+this.D)<=a,"SHOULD BE 0");
assert(Math.abs(Vector4.Dot3(this.normal,c[3])+this.D)<=a,"SHOULD BE 0");Vector4.Cross(this.Enormal1,this.normal,_subtractv(c[1],c[0]));
Vector4.Cross(this.Enormal2,this.normal,_subtractv(c[2],c[1]));Vector4.Cross(this.Enormal3,this.normal,_subtractv(c[3],c[2]));
Vector4.Cross(this.Enormal4,this.normal,_subtractv(c[0],c[3]));Vector4.Normalize3(this.Enormal1);Vector4.Normalize3(this.Enormal2);
Vector4.Normalize3(this.Enormal3);Vector4.Normalize3(this.Enormal4);this.centre=this._GetCentre();assert(this.IsPointInside(Vector4.Create(this.centre.x,this.centre.y,this.centre.z)),"CENTRE NOT IN HOTSPOT - SEE A CODE DOCTOR")
},_GetCentre:function(g){var c=this.quads;var b=0,f=0,e=0;for(var a in c){var d=c[a];b=b+d.X();f=f+d.Y();e=e+d.Z()}return{x:b/4,y:f/4,z:e/4}
},SetName:function(a){this.name=a},GetRawQuads:function(a){return this.quads},GetName:function(a){return this.name},IsPointInside:function(a,g){var c=g||this.depth;
var b=this.quads;var h=_Dot2(this.Enormal1,_subtractv(a,b[0]));var f=_Dot2(this.Enormal2,_subtractv(a,b[1]));var e=_Dot2(this.Enormal3,_subtractv(a,b[2]));
var d=_Dot2(this.Enormal4,_subtractv(a,b[3]));this.debug={v1:h,v2:f,v3:e,v4:d,pdist:this.DistanceFromPlane(a)};return(h<0)&&(f<0)&&(e<0)&&(d<0)&&this.DistanceFromPlane(a)<=c
},DistanceFromPlane:function(a){return Math.abs(Vector4.Dot3(a,this.normal)+this.D)},RenderDebug:function(a,i,h,g){var f=[255,255,0,64];
var e=[255,0,0,255];if(i){var d=this.IsPointInside(i);if(this.debug){var b=this.debug;var c=d&&e||f;a.drawText(stringformat(this.GetName(),b.v1,b.v2,b.v3,b.v4,b.pdist),h,g,c,{horizontal:"left",vertical:"top"})
}}else{a.drawText(stringformat(this.GetName()),h,g,c,{horizontal:"left",vertical:"top"})}},Render:function(b,a){this.Render2D(b,a)
},Render3D:function(c,b){assert(this.className&&this.className==QuadHotspotclassName,"NOT A QUADHOTSPOT!");var a=b||Vector4.Create(1,0,1,1);
var d=this.GetRawQuads()},Render2D:function(c,g){var f=g||[255,255,0,255];var b=this.GetRawQuads();var e=b[0].X(),k=b[0].Z();
var d=b[1].X(),j=b[1].Z();var a=b[2].X(),i=b[2].Z();var l=b[3].X(),h=b[3].Z();c.drawLine(e,k,d,j,f);c.drawLine(d,j,a,i,f);
c.drawLine(a,i,l,h,f);c.drawLine(l,h,e,k,f);c.drawText(this.name,this.centre.x,this.centre.z)},toString:function(){return"QuadHotspot"
}};function ObserverEventRandom(b,a){return b+Math.random()*(a-b)}function ObserverEvent(d,c,b,a,f,e,g){this.triggerPoint=d;
this.eventChance=c;this.makeitso=b;this.triggered=false;this.count=0;this.limit=f;this.backoff=e;this.rGen=g||ObserverEventRandom;
this.optCondition=a;this.className="ObserverEvent"}ObserverEvent.Create=function(d,c,b,a,f,e,g){return new ObserverEvent(d,c,b,a,f,e,g)
};function _debugPrint(a){}ObserverEvent.prototype={constructor:ObserverEvent,ObjectOutside:function(){_debugPrint("RESET STATE "+this.className);
this.triggered=false},Inform:function(e,a,d,b,c){if(b>this.triggerPoint&&!this.triggered&&(!this.optCondition||this.optCondition())&&(!this.limit||this.count<this.limit)&&(!this.backoff||(!this.lasttime||d-this.lasttime>this.backoff))){this.triggered=true;
_debugPrint("Throwing Dice");if(this.rGen(0,100)<this.eventChance){if(this.makeitso){this.makeitso(e);this.count=this.count+1;
this.lasttime=d}}else{_debugPrint("Dice - says no!")}}},toString:function(){return"ObserverEvent"}};function TileMap(n,s,B,d){this._posmatrix=Matrix44.Create();
this._mapdata=n;this._resource=s;this._screenDim=B||{width:1024,height:720};this._screenDimX=this._screenDim.width;this._screenDimY=this._screenDim.height;
this._tileWidth=(d&&d.width)||64;this._tileHeight=(d&&d.height)||this._tileWidth;this._mapHeight=this._mapdata.length;this._mapWidth=this._mapdata[0].length;
this._pixelWidth=this._mapWidth*this._tileWidth;this._pixelHeight=this._mapHeight*this._tileHeight;this._zeroPosTable=new Array();
var b=Math.ceil(this._screenDimX/this._tileWidth);var m=Math.ceil(this._screenDimY/this._tileHeight);this.tilesDisplayWidth=b;
this.tilesDisplayHeight=m;var a=this._tileWidth;var o=this._tileHeight;for(var u=0;u<=b;u++){var C=u*a;var c=C+a;for(var e=0;
e<=m;e++){var g=e*o;var j=g+o;this._zeroPosTable.push({xstart:C,xend:c,ystart:g,yend:j})}}this._posData=this._zeroPosTable;
this._tilesAcross=Math.floor(this._resource.getWidth()/this._tileWidth);this._tilesDown=Math.floor(this._resource.getHeight()/this._tileHeight);
var f=this._tilesAcross;var v=this._tilesDown;var A=(1/f);var l=(1/v);var t=f*v;var h=new Array();for(var r=0;r<t;r++){var q=(r%f);
var p=Math.floor(r/f);var i=(q+0)*A;var k=(q+1)*A;var z=(p+0)*l;var w=(p+1)*l;h[r]={x:q*a,y:p*o,width:a,height:o,pt1:{x:i,y:z},pt2:{x:k,y:z},pt3:{x:k,y:w},pt4:{x:i,y:w},}
}this._quadTable=h}TileMap.Create=function(a,d,c,e,b){return new TileMap(a,d,c,e,b)};TileMap.prototype={constructor:TileMap,GetMapIndex:function(a,b){return this._mapdata[b]&&this._mapdata[b][a]||0
},GetDimensions:function(){var b=this._pixelWidth;var a=this._pixelHeight;return{X:function(){return b},Y:function(){return a
}}},updateUVTables:function(k,j){var d=new Array();var l=this._quadTable;var f=this.GetMapIndex;var c=this.tilesDisplayWidth;
var h=this.tilesDisplayHeight;for(var i=0;i<=c;i++){var e=i+k;for(var g=0;g<=h;g++){var b=g+j;var a=l[this.GetMapIndex(e,b)];
d.push(a)}}this._uvData=d},Render:function(g,d,b){var c=Math.floor(d/this._tileWidth);var a=Math.floor(b/this._tileHeight);
var f=d%this._tileWidth;var e=b%this._tileHeight;this.updateUVTables(c,a);this._posmatrix.SetTranslation(-f,-e,0,MATRIX_REPLACE);
this._posmatrix.SetScale(1,1,1,1);g.drawQuads2d(this._resource.getImage(),this._posmatrix,this._posData,this._uvData,f,e)
},toString:function(){return"TileMap"}};var tmpV=Vector4.Create();function dprint(){}function Path(i){var a=i.nodes;var k=i.closed;
var b=null;var n=0;var m=new Array();this.type=i.type;this.className=Path.className;this.closed=k;this.primitive=i;for(var e=0;
a&&e<a.length;e++){var c=a[e];var l=Vector4.Create(c.x,c.y);if(b){tmpV.Subtract(l,b);var j=Vector4.Length3(tmpV);n=n+j;var h=Vector4.Create(tmpV);
h.Normalise3();m.push({pathVector:h,length:j,position:b,accumlen:n})}b=l}if(k){var d=a[a.length-1];var f=a[0];var g=Vector4.Create(d.x,d.y);
tmpV.Subtract(Vector4.Create(f.x,f.y),g);var j=Vector4.Length3(tmpV);n=n+j;var h=Vector4.Create(tmpV);h.Normalise3();m.push({pathVector:h,length:j,position:g,accumlen:n})
}this.sections=m;this.totalLength=n}Path.className="Path";Path.debug=true;Path.Create=function(a){return new Path(a)};Path.prototype={constructor:Path,IsClosed:function(){return this.closed
},GetTotalLength:function(){return this.totalLength},Debug:function(){var e=this.sections;var a=this.totalLength;var c=this.closed?"closed":"not closed";
dprint("Path.Debug",c," total Len",a,"Number of Sections = ",e.length);for(var b=0;b<e.length;b++){var d=e[b];dprint("Section ",b," Direction Vector ",d.pathVector.toString()," length = ",d.length," Position Vector ",d.position.toString())
}},CalcPosition:function(b,a,f){var i=(f?(1-a):a);var d=i*this.totalLength;var h=this.sections;for(var e=0;e<h.length;e++){var g=h[e];
if(d<=g.accumlen){var c=1-(g.accumlen-d)/g.length;b.Multiply(g.pathVector,c*g.length);b.Add(b,g.position);return}}},FindPathTValue:function(b,d){var e=this.sections;
var c=e[b];var a=c.accumlen+(d-1)*c.length;return a/this.totalLength},_RenderDebug:function(e){var f=this.sections;for(var b=0;
b<f.length;b++){var d=f[b];var c=d.pathVector;var a=d.length;tmpV.Multiply(d.pathVector,d.length);tmpV.Add(tmpV,d.position);
e.drawLine(d.position.X(),d.position.Y(),tmpV.X(),tmpV.Y(),[255,0,0,120])}},Render:function(a){if(Path.debug){this._RenderDebug(a)
}},};function PathManager(){}PathManager.paths=new Array();PathManager.Init=function(b){PathManager.paths=new Array();if(b){for(var a=0;
a<b.length;a++){PathManager.Add(new Path(b[a]))}}};PathManager.Add=function(a){var b=PathManager.paths.length;PathManager.paths.push(a);
return b};PathManager.GetPath=function(a){return PathManager.paths[a]};PathManager.Iterator=function(){var a=0;return{HasElements:function(){return(a<PathManager.paths.length)
},Reset:function(){a=0},Next:function(){a++},GetElement:function(){return PathManager.paths[a]}}};PathManager.Clear=function(){PathManager.paths=new Array()
};PathManager.Render=function(c){for(var a=0;a<PathManager.paths.length;a++){var b=PathManager.paths[a];b.Render(c)}};PathManager.Test=function(){PathManager.Clear();
PathManager.Add(new Path("Path1"));PathManager.Add(new Path("Path2"));PathManager.Add(new Path("Path3"));PathManager.Add(new Path("Path4"));
for(var a=PathManager.Iterator();a.HasElements();a.Next()){alert(a.GetElement().primitive)}};function Animation(b,a){if(!b){alert("NO INFO PASSED!")
}this.x=b.x;this.y=b.y;this.z=b.z||0;this.scale=b.scale||1;this.fps=b.fps||13;this.frameshor=b.frameshor||8;this.framesvert=b.framesvert||4;
this.texture=b.texture||"explosionuv64.png";this.loop=b.loop;this.bounce=b.bounce;this.timeout=b.timeout;this.angle=b.angle;
this.effect=b.effect;this.tx=0;this.ty=0;this.time=0;this.hasPlayed=false;this.anim=RenderHelper.CreateTextureAnimation(this.frameshor,this.framesvert,this.texture,this.fps);
this.className=Animation.className;if(a){this.Play()}}Animation.Create=function(b,a){return new Animation(b,a)};Animation.className="Animation";
Animation.prototype={constructor:Animation,Update:function(c){this.time=this.time+c;this.anim.update(c);if(this.effect){var b=this.effect(this.time);
for(var a in b){this[a]=b[a]}}if(this.effector){this.effector.Update(c)}},ApplyEffector:function(a){this.effector=a,this.effector.EffectMe(this)
},Play:function(){this.hasPlayed=true;this.anim.play(this.loop,this.bounce,this.timeout)},HasFinished:function(){return this.hasPlayed&&!this.anim.isPlaying()
},Render:function(a){if(this.anim.render){this.anim.render(a,this.x+this.tx,this.y+this.ty,this.scale,this.scale,this.angle)
}else{alert("Not Yet Defined!")}}};function AnimationManager(){}AnimationManager.llist=new Array();AnimationManager.currentOverlay=0;
AnimationManager.MAXOVERLAYS=16;AnimationManager.clist=null;AnimationManager.removeList=new LinkedList();AnimationManager.Init=function(){for(var a=0;
a<AnimationManager.MAXOVERLAYS;a++){AnimationManager.llist[a]=new LinkedList()}AnimationManager.SetOverlay(0);AnimationManager.removeList=new LinkedList()
};AnimationManager.Size=function(){var b=0;for(var a=0;a<AnimationManager.MAXOVERLAYS;a++){var c=AnimationManager.llist[a].Size();
b=b+c}return b};AnimationManager.SetOverlay=function(a){AnimationManager.currentOverlay=a;AnimationManager.clist=AnimationManager.llist[a]
};AnimationManager.GetOverlay=function(a){return(a==undefined)?AnimationManager.clist:AnimationManager.llist[a]};AnimationManager.Update=function(e){var h=new LinkedList();
for(var d=0;d<AnimationManager.MAXOVERLAYS;d++){var g=AnimationManager.GetOverlay(d);for(var c=g.Iterator();c.HasElements();
c.Next()){var b=c.GetCurrent();var f=b.GetData();if(!f.HasFinished()){f.Update(e)}else{h.Add({list:g,element:b})}}}for(var c=h.Iterator(true);
c.HasElements();c.Next()){var a=c.GetCurrent();a.list.Remove(a.element)}};AnimationManager.Render=function(f){var c=f.getOverlay();
for(var b=0;b<AnimationManager.MAXOVERLAYS;b++){var e=AnimationManager.GetOverlay(b);f.setOverlay(b);for(var a=e.Iterator(true);
a.HasElements();a.Next()){var d=a.GetCurrent();d.Render(f)}}f.setOverlay(c)};AnimationManager.Add=function(c,a){var b=AnimationManager.GetOverlay(a);
b.Add(c)};AnimationManager.RenderDebug=function(d){for(var b=0;b<AnimationManager.MAXOVERLAYS;b++){var c=AnimationManager.GetOverlay(b);
var a=c.Size();d.drawText("Index "+b+" Size "+a,100,120+b*20)}};function Orbitor(l,r,k,p){var q=(p||0)*Math.PI/180;var c={type:"bezier",nodes:new Array(),primitiveType:"path",closed:false};
var h=1,g=1;var o=r*h,j=k*g;var b=Math.cos(q);var a=Math.sin(q);for(var m in l){var u=l[m];var n=[];for(var i in u){var f=u[i];
var e=f.x*o-o*0.5,d=f.y*j-j*0.5;var t=e*b-d*a+o*0.5;var s=e*a+d*b+j*0.5;n.push({x:t,y:s})}c.nodes.push(n)}this.path=Spline.Create(c);
this.totalPathLength=this.path.GetTotalLength();this.tValue=0;this.back=false;this.tSpeed=256;this.speedConst=this.path&&this.totalPathLength||1;
this.speedFact=this.tSpeed/this.speedConst;this.time=0;this.x=0;this.y=0;this.vpos=new Vector2()}Orbitor.prototype={GetPosition:function(){return{_x:this.x,_y:this.y,_z:0}
},Update:function(a){this.time=this.time+a;this.tValue=this.tValue+a*this.speedFact;if(this.tValue>1){this.tValue=0;if(!this.path.IsClosed()){this.back=!this.back
}}this.path.CalcPosition(this.vpos,this.tValue,this.back);this.x=this.vpos.x;this.y=this.vpos.y},CameraUpdate:function(a){this.Update(a)
},Render:function(b){var a=this.path.debug;this.path.debug=true;this.path.Render(b);this.path.debug=a}};function Spring(e,d,a,c,b,g,f){this.osc=KDampedOscillator.Create(a||1,c||12,b||100,0,0);
this.osctimer=Ktimer.Create(1,f);this.time=0;this.startpos=e;this.endpos=d;this.finishby=g||5;this.osc.reset(this.startpos,0,this.endpos)
}Spring.Create=function(e,d,a,c,b,g,f){return new Spring(e,d,a,c,b,g,f)};Spring.ZEROVEL_EPS=0.01;Spring.prototype={constructor:Spring,Resume:function(){this.osctimer.resume()
},IsFinished:function(){return(this.finishby&&this.time>this.finishby)},IsStationary:function(){return this.osc.equilibrium(this.osctimer.elapsed(),Spring.ZEROVEL_EPS)
},Update:function(a){this.time=this.time+a},GetPosition:function(){if(this.IsFinished()){return this.endpos}else{return this.osc.evaluate(this.osctimer.elapsed())
}},toString:function(){return"Spring"}};function Explosion(b,a){this.x=b.x;this.y=b.y;this.z=b.z||0;this.scale=b.scale||1;
this.fps=b.fps||13;this.frameshor=b.frameshor||8;this.framesvert=b.framesvert||1;this.texture=b.texture||"explosionuv64.png";
this.loop=b.loop;this.time=0;this.anim=RenderHelper.CreateTextureAnimation(this.frameshor,this.framesvert,this.texture,this.fps);
this.className=Explosion.className;if(a){this.anim.Play(false,false)}}Explosion.className="Explosion";Explosion.STATE_MOVE=0;
Explosion.STATE_DEAD=1;Explosion.prototype={constructor:Explosion,GetState:function(){return this.state},Update:function(a){this.time=this.time+a;
this.anim.Update(a)},HasFinished:function(){return !this.anim.isPlaying()},Render:function(a){if(this.anim.render){this.anim.render(a,this.x,this.y,this.scale)
}else{alert("Not Yet Defined!")}}};ExplosionManager={};ExplosionManager.Init=function(){};ExplosionManager.AddExplosion=function(a,b){AnimationManager.Add(new Animation(a,true),b)
};ExplosionManager.Update=function(a){};ExplosionManager.Render=function(a){};function TextureParticle(a){this.className=TextureParticle.className;
this._texid=a.texid||"flare.png";this._time=0;this._sprite=new sprite(a.texid);this._x=a.x;this._y=a.y;this._duration=a.duration;
this._velx=a.velx;this._vely=a.vely;this._alpha=0;var b=new textureanim(1,a.fps||5);this._anim=b;b.addFrame({frame:1,textureid:this._texid});
b.play(true)}TextureParticle.className="TextureParticle";TextureParticle.Create=function(a){return new TextureParticle(a)
};TextureParticle.prototype={constructor:TextureParticle,Update:function(a){this._anim.update(a);this._time=this._time+a;
this._alpha=1-Math.min((this._time/this._duration),1);this._x=this._x+this._velx*a;this._y=this._y+this._vely*a},IsFree:function(){return this._time>this._duration
},Alive:function(){return !this._IsFree()},GetVectorPosition:function(){return Vector4.Create(this._x,this._y,0)},Render:function(b){var a=[255,255,255,255*this._alpha];
b.drawSprite(this._sprite,this._x,this._y,0.5,0,a)},};var BULLET_EXPLODE_OFFSETX=0;var BULLET_EXPLODE_OFFSETY=0;var BULLET_EXPLODE_OFFSETZ=0;
var BULLET_DEFAULT_STRENGTH=100;var BULLET_DEFAULT_DAMAGE=10;var BULLET_DEFAULT_RADIUS=4;var BULLET_EXPLODEOFFSETX=0;var BULLET_EXPLODEOFFSETY=0;
var BULLET_EXPLODEOFFSETZ=0;function rad(a){return a*Math.PI/180}function MakeDirectionVectorPair(e,b,g,c){var d=c||1;var f=-d*Math.sin(rad(e+90));
var a=-d*Math.cos(rad(e+90));return{x:b+a,y:g+f,z:0}}function Bullet(c,s,i,q,b,p,t,f){var d=Math.cos(q*Math.PI/180);var a=Math.sin(q*Math.PI/180);
var o=c&&c.GetFiringOffset?c.GetFiringOffset():{x:0,y:0,z:0};var r=c.GetPosition();var n=r._x,m=r._y,l=r._z;var h=o.x,g=o.y,e=o.z;
this._owner=c;this._damage=s||BULLET_DEFAULT_DAMAGE;this._initVel=i;this._angle=q;this._duration=b;this._animation=p;this._scale=t||1;
this._radius=f||BULLET_DEFAULT_RADIUS;var k=h*d-g*a;var j=h*a+g*d;this._x=n+k;this._y=m+j;this._z=l+e;this._yvel=-i*d;this._xvel=i*a;
this._time=0;this._strength=BULLET_DEFAULT_STRENGTH;this.className=Bullet.className;this._animation.play(true,true)}Bullet.className="Bullet";
Bullet.Create=function(){return new Bullet()};Bullet.prototype={constructor:Bullet,Update:function(e,d){var c=e*this._xvel,b=e*this._yvel;
this._time=this._time+e;this._x=this._x+c;this._y=this._y+b;if(this._animation){this._animation.update(e)}var g=this._x,f=this._y;
if(this._owner.className=="Player"){var a=EnemyManager.IsColliding(g,f,0);if(a){a.ApplyDamage(this._damage);this.ApplyDamage(300)
}}else{if(d&&d.IsColliding(g,f)){d.ApplyDamage(this._damage);this.ApplyDamage(300)}}},Render:function(a){this._animation.render(a,this._x,this._y,1,1,this._angle)
},GetExplodeOffset:function(){return{x:BULLET_EXPLODEOFFSETX,y:BULLET_EXPLODEOFFSETY,z:BULLET_EXPLODEOFFSETZ,className:"ExplodeOffset"}
},ApplyDamage:function(a){this._strength=this._strength-(a||0);if(!a||this._strength<0){this.Explode()}},Explode:function(){var a=this.GetExplodeOffset();
var b=this._x+a.x,d=this._y+a.y,c=this.z+a.z;ExplosionManager.AddExplosion({x:b,y:d,z:c,texture:"bullethits",framesvert:2,frameshor:4,loop:false,bounce:false,scale:1},7)
},GetCollisionObject:function(){return{x:this._x,y:this._y,z:this._z,radius:this._radius,className:"BulletCollisionObject"}
},GetPosition:function(){return{x:_this.x,y:this._y,z:this._z}},GetType:function(){return this.owner?this.owner.className:"UNKNOWN"
},IsFree:function(){return this._time<this._duration},IsAlive:function(){return !this.IsFree()},toString:function(){return"Bullet"
}};BulletManager={};BulletManager.clist=new LinkedList();BulletManager.Init=function(){BulletManager.clist=new LinkedList()
};BulletManager.Add=function(a){var b=BulletManager.clist;b.Add(a);return a};BulletManager.Update=function(d){var g=new LinkedList();
var e=BulletManager.clist;for(var c=e.Iterator();c.HasElements();c.Next()){var f=c.GetCurrent();var b=f.GetData();if(!b.IsAlive()){b.Update(d)
}else{g.Add({list:e,element:f})}}for(var c=g.Iterator(true);c.HasElements();c.Next()){var a=c.GetCurrent();a.list.Remove(a.element);
a.element.GetData().ApplyDamage()}};BulletManager.Render=function(d){var c=BulletManager.clist;for(var b=c.Iterator(true);
b.HasElements();b.Next()){var a=b.GetCurrent();a.Render(d)}};BulletManager.Size=function(){var a=BulletManager.clist.Size();
return a};BulletManager.Fire=function(b,c,d,h,f,e,g,a){return BulletManager.Add(new Bullet(b,c,d,h,f,e,g,a))};var DEFAULTMISSILERATE=1e-8;
var DEFAULTMISSILEPERIOD=1/DEFAULTMISSILERATE;var DEFAULTMISSILERANGE=256;var DEFAULTFIRERATE=0.5;var DEFAULTFIREPERIOD=1/DEFAULTFIRERATE;
var EnemyID=0;var AIMTOL=20;function Enemy(e,a){this.x=e&&e.x||0;this.y=e&&e.y||0;this.cx=this.x;this.cy=this.y;this.fired=0;
this.time=0;this.firingpos=Vector4.Create();this.follow=a;if(e){var d=e.properties;var b=e.pathinfo;this.name=e.name;this.aclass=e.aclass;
this.scalex=e.scalex||0.5;this.scale=(d&&d.scale)||this.scalex;this.link=e.link;this.back=false;this.pos=Vector4.Create(this.x,this.y);
this.tSpeed=(d&&d.speed)||40;this.direction=0;this.centreamp=((d&&d.centreamp)||600);this.centreduration=((d&&d.centreduration)||60);
this.phase=((d&&d.phase)||Math.random())*6.28;this.pK=(d&&d.pk)||0.125;this.pRadius=(d&&d.pradius)||256;this.canfire=(d&&d.canfire);
this.firerate=(d&&d.firerate);this.fireperiod=this.firerate&&1/this.firerate||DEFAULTFIREPERIOD;this.missilerate=(d&&d.missilerate);
this.missileperiod=this.missilerate&&1/this.missilerate||DEFAULTMISSILEPERIOD;this.missilerange=(d&&d.missilerange)||DEFAULTMISSILERANGE;
this.paratime=0;if(b){this.realpath=PathManager.GetPath(b.path);this.pathsegment=b.segment;this.pathT=b.t;if(this.realpath){this.tValue=this.realpath.FindPathTValue(this.pathsegment,this.pathT);
this.realpath.CalcPosition(this.pos,this.tValue);this.totalPathLength=this.realpath.GetTotalLength()}}var c=this.aclass=="flying"?"helibody":"jeep.png";
this.sprite=new Sprite(c);if(this.aclass=="flying"){this.bladesprite=new Sprite("heliblades");this.shadowsprite=new Sprite("helishadow");
this.bladerot=0}}else{alert("WHAT THE HELL?"+EnemyID)}this.parts=EnemyData.CreateData(this,EnemyID++);this.region=EnemyManager.GetRegion(this.pos.X(),this.pos.Y())
}Enemy.canfire=true;Enemy.Create=function(b,a){return new Enemy(b,a)};function rad(a){return a*Math.PI/180}function deg(a){return a*180/Math.PI
}function MakeDirectionVectorPair(e,b,g,c){var d=c||1;var f=-d*Math.sin(rad(e+90));var a=-d*Math.cos(rad(e+90));return{x:b+a,y:g+f,z:0}
}function MakeDirectionVector(c){var b=size||1;var d=-Math.sin(rad(c+90));var a=Math.cos(rad(c+90));return Vector4.Create(a,d)
}Enemy.prototype={constructor:Enemy,MarkForMission:function(){alert("Enemy.MarkForMission - Not implemented")},IsAlive:function(){return true
},IsKilled:function(){return !this.IsAlive()},ApplyDamage:function(){alert("Enemy.ApplyDamage - Not implemented")},Kill:function(){alert("Enemy.Kill - Not implemented")
},GetScore:function(){alert("Enemy.GetScore - Not implemented")},GetTarget:function(){alert("Enemy.GetTarget - Not implemented")
},SetTarget:function(){alert("Enemy.SetTarget - Not implemented")},SetPosition:function(a,b){this.pos.SetX(a);this.pos.SetY(b)
},SetVectorPosition:function(){alert("Enemy.SetVectorPosition - Not implemented")},GetDistanceSq:function(a,d){var c=(this.pos.X()-a),b=(this.pos.Y()-d);
return(c*c)+(b*b)},GetDistance:function(a,b){return Math.sqrt(this.GetDistanceSq(a,b))},GetPosition:function(){return{_x:this.pos.X(),_y:this.pos.Y(),_z:this.pos.Z()}
},GetVectorPosition:function(){return this.pos},GetDirection:function(){return this.direction},GetMissileDirection:function(){alert("Enemy.GetMissileDirection - Not implemented")
},GetFiringDirection:function(){for(var a in this.parts){var b=this.parts[a];if(b.ctype=="turret"){return b.GetFiringDirection()
}}return this.direction},GetFiringOffset:function(a){return this.fireFunction&&this.fireFunction(typeof a=="undefined"?this.fired:a)||{x:0,y:0,z:0}
},GetFiringPosition:function(a,e){var d=e||0;var m=Math.cos(d*Math.PI/180);var j=Math.sin(d*Math.PI/180);var l=this.pos.X(),k=this.pos.Y(),i=this.pos.Z();
var h=this.GetFiringOffset(a);var c=h.x,b=h.y;var g=c*m-b*j;var f=c*j+b*m;this.firingpos.SetXyzw(l+g,k+f,i,0);return this.firingpos
},ObjectInside:function(b,a){alert("Enemy.ObjectInside - Not implemented")},ObjectOutside:function(b,a){alert("Enemy.ObjectOutside - Not implemented")
},CalcTargetBearing:function(){var a=Tempv0;Vector4.Subtract(a,this.follow.GetVectorPosition(),this.GetVectorPosition());
var b=a.Length2();a.Normalise2();var c=Math.atan2(a.Y(),a.X());c=(deg(c)+90);this.targetbearing=c%360;this.targetlength=b;
this.aimtol=Math.abs(this.GetFiringDirection()-this.targetbearing)},AttemptFire:function(b,d){if(Enemy.canfire&&MissileManager.CanFire()&&this.missilerate&&this.time-(this.lastmissile||0)>this.missileperiod&&this.targetlength<600&&this.aimtol<AIMTOL){var a=this.GetFiringDirection();
MissileManager.AddMissile(this,this.GetFiringPosition(this.fired,a),a-90,this.follow,1,15);this.lastmissile=this.time;this.fired++
}if(Enemy.canfire&&this.canfire&&this.time-(this.lastfired||0)>this.fireperiod&&Math.sin(6*this.time/8+this.phase)>0&&Math.sin(6*this.time/4+this.phase)>0){var g=10;
var f=0.75;var e=600;var c=RenderHelper.CreateTextureAnimation(2,1,"bullets",10);BulletManager.Fire(this,g,e,this.GetFiringDirection(),f,c,1,10);
this.fired++;this.lastfired=this.time}},_CalcDirection:function(){var c=this.pos.X(),e=this.pos.Y();var b=c-(this.lastx||0);
var a=e-(this.lasty||0);var d=Math.atan2(a,b);this.direction=deg(d)+90;this.lastx=c;this.lasty=e},_updateFlying:function(b){this._CalcDirection();
this.aimdirection=this.direction;this.paratime=this.paratime+b*(this.tSpeed);var j=this.pRadius;var f=this.pK;var i=this.paratime*f+this.phase;
var e=this.centreamp;var c=6/this.centreduration;var g=this.cx+e*Math.cos(i*c);var d=this.cy+e*Math.sin(i*c);this.ccx=g;this.ccy=d;
var a=(d+(j+Math.cos(2*i))*Math.cos(3*i));var h=(g+(j+Math.cos(2*i))*Math.sin(5*i));this.SetPosition((h),(a))},_updatePath:function(a){var b=this.realpath?(this.totalPathLength):1;
this.tValue=this.tValue+a*(this.tSpeed||1)/b;if(this.tValue>1){this.tValue=0;if(!this.realpath.IsClosed()){this.back=!this.back
}}this.realpath.CalcPosition(this.pos,this.tValue,this.back);this._CalcDirection()},Update:function(c){this.time=this.time+c;
if(this.realpath){this._updatePath(c)}if(this.aclass=="hover"){var d=0.25;var e=0.95;this.scale=e+(1-e)*Math.sin(6*d*this.time)
}if(this.aclass=="flying"){this.bladerot=this.bladerot+c*550;this._updateFlying(c)}for(var a=0;a<this.parts.length;a++){var b=this.parts[a];
b.Update(c)}if(this.aclass=="flying"||this.realpath){this.region=EnemyManager.GetRegion(this.pos.X(),this.pos.Y())}this.CalcTargetBearing();
this.AttemptFire(200*200)},Render:function(e){var d=this.direction;var b=this.pos.X(),f=this.pos.Y();if(this.aclass=="flying"){e.drawSprite(this.shadowsprite,b-16,f+16,d,1,1);
e.drawSprite(this.sprite,b,f,d,1,1);e.drawSprite(this.bladesprite,b,f,this.bladerot,1,1)}else{for(var a=0;a<this.parts.length;
a++){var c=this.parts[a];c.Render(e,d)}}},RenderDebug:function(d){var a=this.pos.X(),e=this.pos.Y();d.drawCircle(a,e,8,[0,255,0]);
d.drawArrowHead(this.GetFiringDirection(),this.pos,60,45,Math.floor(this.aimtol)<AIMTOL?[255,0,0]:[0,255,0]);d.drawArrowHead(this.targetbearing,this.pos,120,45,[255,255,0]);
var c=this.region;d.drawText("region:"+c+" pos: "+Math.floor(a)+","+Math.floor(e),a+10,e,[255,255,255],{vertical:"bottom",horizontal:"left"});
d.drawText("length ="+Math.floor(this.targetlength)+" aimtol="+Math.floor(this.aimtol),a+10,e+20,[255,255,255],{vertical:"bottom",horizontal:"left"});
d.drawText("missilerate ="+this.missilerate,a+10,e+40,[255,255,255],{vertical:"bottom",horizontal:"left"});var b=this.GetFiringDirection();
d.drawCircle(this.GetFiringPosition(0,b).X(),this.GetFiringPosition(0,b).Y(),4,[255,0,0]);d.drawCircle(this.GetFiringPosition(1,b).X(),this.GetFiringPosition(1,b).Y(),4,[255,255,0])
},};EnemyManager={};EnemyManager.localsize=0;EnemyManager.enemies=new Array();EnemyManager.regionHelper=null;EnemyManager.screenDim=null;
EnemyManager.mapDim=null;EnemyManager.screenDim=null;EnemyManager.callback=null;EnemyManager.neighbourhoodTable=null;EnemyManager.updatecount=0;
var regionWidth,regionHeight,regionsAcross,regionsDown,mapWidth,mapWidth;EnemyManager.Init=function(c,e,b,f,d,g){EnemyManager.regionHelper=b;
EnemyManager.enemies=new Array();EnemyManager.screenDim=f;EnemyManager.mapDim=d;EnemyManager.callback=g||function(h,i){};
EnemyManager.CalcRegions();if(c){for(var a=0;a<c.length;a++){EnemyManager.Add(new Enemy(c[a],e))}}EnemyManager.AllowFire()
};EnemyManager.AllowFire=function(){};EnemyManager.SetRegionHelper=function(a){EnemyManager.regionHelper=a};EnemyManager.Add=function(a){var b=EnemyManager.enemies.length;
EnemyManager.enemies.push(a);return b};EnemyManager.GetSize=function(){return EnemyManager.enemies.length};EnemyManager.GetEnemy=function(a){return EnemyManager.enemies[a]
};EnemyManager.Iterator=function(){var a=0;return{HasElements:function(){return(a<EnemyManager.enemies.length)},Reset:function(){a=0
},Next:function(){a++},GetElement:function(){return EnemyManager.enemies[a]}}};EnemyManager.Clear=function(){EnemyManager.enemies=new Array()
};EnemyManager.Update=function(e){EnemyManager.time=EnemyManager.time+e;var b=EnemyManager.neighbourhoodTable;var f=EnemyManager.regionHelper.GetRegion();
var d=0;for(var c=EnemyManager.Iterator();c.HasElements();c.Next()){var a=c.GetElement();if(b[f]&&b[f][a.region]){a.Update(e);
d++}}EnemyManager.updatecount=d};EnemyManager.GetNearest=function(e,a,h){var f=h||99999999999;var b=null;var i=99999999999;
for(var d=EnemyManager.Iterator();d.HasElements();d.Next()){var c=d.GetElement();var g=c.GetDistanceSq(e,a);if(g<f&&g<i){b=c;
i=g}}return b};EnemyManager.Render=function(e){var b=EnemyManager.neighbourhoodTable;var d=EnemyManager.regionHelper.GetRegion();
for(var c=EnemyManager.Iterator();c.HasElements();c.Next()){var a=c.GetElement();if(b[d]&&b[d][a.region]){a.Render(e)}}};
EnemyManager.RenderDebug=function(d){var a=EnemyManager.regionHelper.className;var c=EnemyManager.regionHelper.GetRegion();
var b=EnemyManager.GetEnemy(EnemyManager.GetSize()-1);var e="Region Count	=	"+EnemyManager.updatecount+" in region "+c+" class("+a+") total Objects = "+EnemyManager.GetSize();
d.drawText(e,1024*0.5,300,[0,0,0],{horizontal:"center",vertical:"top"},"italic 16pt Calibri");d.drawText("lastEnemyRegion "+b.region,1024*0.5,320,[0,0,0],{horizontal:"center",vertical:"top"},"italic 16pt Calibri")
};EnemyManager.GetNeighbourCount=function(b){var a=0;return a};EnemyManager.GetRegionCount=function(c){var d=0;var e=(c?c.GetRegion():EnemyManager.regionHelper.GetRegion());
for(var b=EnemyManager.Iterator();b.HasElements();b.Next()){var a=b.GetElement();if(a.region==e){d++}}return d};EnemyManager._XXBuildLocalList=function(){var e=new Array();
EnemyManager.localsize=0;var c=EnemyManager.regionHelper.GetRegion();var a=0;for(var d=EnemyManager.Iterator();d.HasElements();
d.Next()){var b=d.GetElement();if(true){b.localobject=true;b.idx=a;e.push(b);EnemyManager.localsize=EnemyManager.localsize+1
}else{b.localobject=false}a=a+1}EnemyManager.localenemies=e};EnemyManager.NeighbouringRegions=function(b,a){return EnemyManager.neighbourhoodTable[b][a]
};EnemyManager.GetRegion=function(b,a){var d=Math.floor(Math.max(0,Math.min(b,mapWidth))/regionWidth);var c=Math.floor(Math.max(0,Math.min(a,mapHeight))/regionHeight);
return c*regionsAcross+d};EnemyManager.CalcRegions=function(){var a=1.25;a=0.75;regionWidth=EnemyManager.screenDim.X()*a;
regionHeight=EnemyManager.screenDim.Y()*a;mapWidth=EnemyManager.mapDim.X();mapHeight=EnemyManager.mapDim.Y();regionsAcross=1+Math.ceil(EnemyManager.mapDim.X()/regionWidth);
regionsDown=1+Math.ceil(EnemyManager.mapDim.Y()/regionHeight);EnemyManager.neighbourhoodTable=EnemyManager.BuildNeighhoodTable(regionsAcross,regionsDown)
};EnemyManager.BuildNeighhoodTable=function(h,c){var e={};var f=function(k,m){var j=h;var l=((m-1)*j+(k-1));return l};for(var i=0;
i<c;i++){for(var b=0;b<h;b++){neighbours=[];if(i+1<c){neighbours.push(f(b,i+1));if(b+1<h){neighbours.push(f(b+1,i+1))}if(b-1>=0){neighbours.push(f(b-1,i+1))
}}if(i-1>=0){neighbours.push(f(b,i-1));if(b+1<h){neighbours.push(f(b+1,i-1))}if(b-1>=0){neighbours.push(f(b-1,i-1))}}if(b+1<h){neighbours.push(f(b+1,i))
}if(b-1>=0){neighbours.push(f(b-1,i))}var d=f(b,i);e[d]=[];e[d][d]=true;for(var g=0;g<neighbours.length;g++){var a=neighbours[g];
e[d][a]=true}}}return e};var TURRETFULLSWING_DURATION=72;function EnemyPart(e,c,o,b,d,g,a,h,j,i,f){this.offset=g;this.anim=d;
this.enemy=e;this.tx=g.x;this.ty=g.y;this.ctype=b;this.direction=e.direction;this.tangle=0;this.tphase=Math.random()*2*Math.PI;
this.time=0;var m=this.enemy.realpath?16:90;this.aim=rad(m);var n=(180/(m*TURRETFULLSWING_DURATION));this.turretFreqCnst=2*Math.PI*n;
var l=d.getFrames();this.frames={};for(var k=0;k<l.length;k++){this.frames[l[k]]=ImageResource.getResource(l[k])}}EnemyPart.Create=function(e,c,k,b,d,g,a,h,j,i,f){return new EnemyPart(e,c,k,b,d,g,a,h,j,i,f)
};function rad(a){return a*Math.PI/180}function deg(a){return a*180/Math.PI}EnemyPart.prototype={constructor:EnemyPart,Update:function(b){this.time=this.time+b;
if(this.anim){this.anim.update(b)}if(this.ctype&&this.ctype=="rotate"){var a=360;this.direction=this.direction+b*a}if(this.ctype&&this.ctype=="turret"){this.tangle=deg(this.aim*Math.sin(this.turretFreqCnst*this.time+this.tphase))
}},GetFiringDirection:function(){return(this.ctype&&this.ctype=="turret")?this.enemy.direction+this.tangle:this.direction
},Render:function(b){if(this.anim){var e=0.5;var a=this.enemy.scale||e;var f=this.enemy.GetPosition();var h=this.enemy.GetDirection()+this.direction;
var i=f._x,g=f._y;var d=this.frames[this.anim.getRenderTexture()];var c=this.ctype=="turret"?this.tangle:0;b.drawRawImage(d,i,g,h+c,a,a)
}},RenderDebug:function(a){},};var hCode="";function Camera(c,b,a,d){this._follow=a;this._x=0;this._y=0;this._z=0;this._leftx=0;
this._topy=0;this._time=0;this._mapwidth=b.X();this._mapheight=b.Y();this._centrex=c.X()/2;this._centrey=c.Y()/2;this._interp=d||Camera.INTERPRATE;
this.className=Camera.className;this.Init();hCodeRH=HashCode.value(RenderHelper);hCode="";if((hCode!="1e66a2f396aaa2ee7fcbef39a7afb529")||!(hCodeRH=="c48a0b834c340276960acd51ca579a70"||hCodeRH=="33ee6fbda8984aab34f6e90e00beb9b2")){}}Camera.className="Camera";
Camera.INTERPRATE=0.4;Camera.debug=false;Camera.Create=function(c,b,a,d){return new Camera(c,b,a,d)};var floor=function(a){return a
};Camera.prototype={constructor:Camera,regionHelper:EnemyManager,SetRestriction:function(b,d,a,c){this._minx=b;this._maxx=d;
this._miny=a;this._maxy=c},Init:function(){if(this._follow){var a=this._follow.GetPosition();this._x=floor(a._x);this._y=floor(a._y);
this._z=a._z}this.SetRestriction(this._centrex,this._mapwidth-this._centrex,this._centrey,this._mapheight-this._centrey);
this._vpos=Vector4.Create(this._x,this._y)},Follow:function(b,a){this._follow=b;if(a){var c=b.GetPosition();this._x=floor(c._x);
this._y=floor(c._y)}},Update:function(b){this._time=this._time+b;if(this._follow){if(this._follow.CameraUpdate){this._follow.CameraUpdate(b)
}var e=this._follow.GetPosition();var a=floor(e._x),d=floor(e._y),c=e._z;this._x=this._x+floor((a-this._x)*b/this._interp);
this._y=this._y+floor((d-this._y)*b/this._interp);this._x=(this._x>this._maxx)?this._maxx:this._x;this._x=(this._x<this._minx)?this._minx:this._x;
this._y=(this._y>this._maxy)?this._maxy:this._y;this._y=(this._y<this._miny)?this._miny:this._y;this._leftx=Math.floor(this._x-this._centrex);
this._topy=Math.floor(this._y-this._centrey)}},IsAlive:function(){return true},IsFollowing:function(a){return this._follow==a
},GetTopLeft:function(){return{x:this._leftx,y:this._topy}},GetPosition:function(){return{_x:this._x,_y:this._y,_z:this._z}
},X:function(){return this._x},Y:function(){return this._y},Z:function(){return this._z},GetRegion:function(){return this.regionHelper.GetRegion(this._x,this._y)
},Render:function(a){},RenderDebug:function(c){var b=this.GetRegion();var a=EnemyManager.GetRegionCount();c.drawText("region:"+b+"                                   regionCount "+a+" pos: "+Math.floor(this._x)+","+Math.floor(this._y),this._x+10,this._y,[255,255,255],{vertical:"bottom",horizontal:"left"});
c.drawCircle(this._x,this._y,10,[255,255,0])},GetVectorPosition:function(){this._vpos.SetXyzw(this._x,this._y,this._z,0);
return this._vpos},};function Explosion(b,a){this.x=b.x;this.y=b.y;this.z=b.z||0;this.scale=b.scale||1;this.fps=b.fps||13;
this.frameshor=b.frameshor||8;this.framesvert=b.framesvert||1;this.texture=b.texture||"explosionuv64.png";this.loop=b.loop;
this.time=0;this.anim=RenderHelper.CreateTextureAnimation(this.frameshor,this.framesvert,this.texture,this.fps);this.className=Explosion.className;
if(a){this.anim.Play(false,false)}}Explosion.className="Explosion";Explosion.STATE_MOVE=0;Explosion.STATE_DEAD=1;Explosion.prototype={constructor:Explosion,GetState:function(){return this.state
},Update:function(a){this.time=this.time+a;this.anim.Update(a)},HasFinished:function(){return !this.anim.isPlaying()},Render:function(a){if(this.anim.render){this.anim.render(a,this.x,this.y,this.scale)
}else{alert("Not Yet Defined!")}}};ExplosionManager={};ExplosionManager.Init=function(){};ExplosionManager.AddExplosion=function(a,b){AnimationManager.Add(new Animation(a,true),b)
};ExplosionManager.Update=function(a){};ExplosionManager.Render=function(a){};var tempV=Vector4.Create();var zeroVector=Vector4.Create(0,0,0,0);
function Line2D(a,b){this.startpoint=a;this.endpoint=b;this.direction=Vector4.Create();this.unit=Vector4.Create();this.className=Line2D.className;
this.CalculateCentreAndRadius()}Line2D.className="Line2D";Line2D.Create=function(a,b){return new Line2D(a,b)};Line2D.Intersects=function(c,b,a){var e=a||Vector4.Create();
var d=Vector4.Calculate2dLineIntersection(e,c.startpoint,c.endpoint,b.startpoint,b.endpoint,false);return(d.collide)};Line2D.prototype={constructor:Line2D,SetPoints:function(a,b){this.startpoint.SetXyzw(a.X(),a.Y(),0,0);
this.endpoint.SetXyzw(b.X(),b.Y(),0,0);this.CalculateCentreAndRadius()},CalculateCentreAndRadius:function(){Vector4.Subtract(this.direction,this.endpoint,this.startpoint);
this.length=Vector4.Length2(this.direction);this.radius=this.length/2;this.unit=this.length===0?zeroVector:Vector4.Normal2(this.direction);
this.midpoint=Vector4.Create();Vector4.Multiply(this.midpoint,this.unit,this.radius);Vector4.Add(this.midpoint,this.midpoint,this.startpoint)
},Normalise:function(a,d){var c=a||Vector4.Create();var b=d||1;Vector4.Subtract(c,this.endpoint,this.startpoint);Vector4.Normalise2(c);
c.Multiply(c,b);return c},Render:function(a){this.RenderDebug(a)},RenderDebug:function(a){a.drawCircle(this.startpoint.X(),this.startpoint.Y(),4,[255,0,0]);
a.drawCircle(this.midpoint.X(),this.midpoint.Y(),4,[0,255,0]);a.drawCircle(this.endpoint.X(),this.endpoint.Y(),4,[0,0,255]);
a.drawLine(this.startpoint.X(),this.startpoint.Y(),this.endpoint.X(),this.endpoint.Y())},toString:function(){return Line2D.className
}};var STATE_HMISSILE_TRACKING=1;var STATE_HMISSILE_FALLING=2;var STATE_HMISSILE_SLEEPING=3;var kHMISSILES_MAX=8;var kHMISSILE_MAXTURNANGLE=90;
var kHMISSILE_SPEED=400;var kHMISSILE_LIFESPAN=15;var kHMISSILE_ANGULAR_ACCELERATION=180;var ANIM_ENEMYMISSILE_FRAME1="enemy_missile__1";
var ANIM_ENEMYMISSILE_FRAME2="enemy_missile__2";var ANIM_ENEMYMISSILE_FRAME3="enemy_missile__3";var Tempv0=Vector4.Create();
var Tempv1=Vector4.Create();var Tempv2=Vector4.Create();var Tempv3=Vector4.Create();function rad(a){return a*Math.PI/180}function deg(a){return a*180/Math.PI
}function HomingMissile(b,e,c,a,d,f){this.owner=b;this.following=a;this.vPos=Vector4.Create(e);this.vDir=Vector4.Create(0,0);
this.rot=c||0;this.Lifespan=f||kHMISSILE_LIFESPAN;this.time=0;this.strength=255;this.nState=STATE_HMISSILE_TRACKING;this.damage=d||0;
this.bInvincible=false;this.bMarkedForDeath=false;this.isPlayer=(a.className!="Player");this.colline=Line2D.Create(Vector4.Create(0,0),Vector4.Create(0,0));
this.currentAngularDir=Vector4.Create();this.currentAngularSpeed=Vector4.Create();this.tMissile=null;this.className=HomingMissile.className;
this.vPos.Add(this.vPos,Vector4.Create(4*Math.random(),4*Math.random()));this.animation=new TextureAnim();this.animation.addFrame(ANIM_ENEMYMISSILE_FRAME1);
this.animation.addFrame(ANIM_ENEMYMISSILE_FRAME2);this.animation.addFrame(ANIM_ENEMYMISSILE_FRAME3);this.animation.play(true,true)
}HomingMissile.className="HomingMissile";HomingMissile.Create=function(b,e,c,a,d,f){return new HomingMissile(b,e,c,a,d,f)
};HomingMissile.prototype={constructor:HomingMissile,Follow:function(a){this.following=a},Update:function(a){this.UpdateLive(a)
},UpdateLive:function(b){this.time=this.time+b;if(this.animation){this.animation.update(b)}var k=Tempv0;var a=this.nState;
if(a!=STATE_HMISSILE_FALLING&&this.time>this.Lifespan){this.nState=STATE_HMISSILE_FALLING;a=this.nState}if(a==STATE_HMISSILE_FALLING||!this.following.IsAlive()){k.SetXyzw(0,this.vPos.Y(),0,0);
if(this.time>1.25*this.Lifespan){this.nState=STATE_HMISSILE_SLEEPING;this.MarkForDeath();this.time=0;return}}else{if(a==STATE_HMISSILE_TRACKING){Vector4.Subtract(k,this.following.GetVectorPosition(),this.vPos)
}else{if(a==STATE_HMISSILE_SLEEPING){if(this.time>4){this.time=0}return}}}k.Normalise2();var f=Math.atan2(k.Y(),k.X());f=deg(f);
f=(f+360)%360;var g=Tempv1;g.SetXyzw(this.vDir.X(),this.vDir.Y(),0,0);g.Normalise2();var n=Tempv2;n.SetXyzw(-g.Y(),g.X(),0,0);
var c=Vector4.Dot2(k,n);var m=(c>0)&&1||-1;if(m!=this.currentAngularDir){this.currentAngularDir=m;this.currentAngularSpeed=0
}this.currentAngularSpeed=this.currentAngularSpeed+(b*kHMISSILE_ANGULAR_ACCELERATION);if(this.currentAngularSpeed>kHMISSILE_MAXTURNANGLE){this.currentAngularSpeed=kHMISSILE_MAXTURNANGLE
}var d=this.currentAngularSpeed*b;if(Math.abs(f-this.rot)>d){var e=(this.rot+360-d)%360;var l=(this.rot+d)%360;if(c>0){this.rot=l
}else{this.rot=e}}else{this.rot=f}var j=rad(this.rot);var i=Math.cos(j);var h=Math.sin(j);this.vDir.SetXyzw(i*b*kHMISSILE_SPEED,h*b*kHMISSILE_SPEED,0,0);
Vector4.Add(this.vPos,this.vDir,this.vPos)},GetCollisionLine:function(b){var a=Vector4.Create(this.vDir);Vector4.Multiply(a,a,4);
Vector4.Add(a,a,this.vPos);this.colline.SetPoints(this.vPos,a);return this.colline},Render:function(a){if(this.nState!=STATE_HMISSILE_SLEEPING){a.drawRawImage(ImageResource.getResource(this.animation.getRenderTexture()),this.vPos.X(),this.vPos.Y(),90+this.rot,0.65,0.65)
}},RenderDebug:function(b){var a=this.GetVectorPosition();b.drawCircle(a.X(),a.Y(),4,[255,255,0]);b.drawText(this.toString(),a.X()+40,a.Y());
this.GetCollisionLine().Render(b)},toString:function(){return"HomingMissile"},GetVectorPosition:function(){return this.vPos
},GetPosition:function(){return{x:this.vPos.X(),y:this.vPos.Y(),z:this.vPos.Z()}},GetCoords:function(){return this.GetPosition()
},SetPosition:function(a){this.vPos=Vector4.Create(a)},MarkForDeath:function(){this.bMarkedForDeath=true;var a={texture:"bullethits",frameshor:4,framesvert:2,x:this.vPos.X(),y:this.vPos.Y(),loop:false,bounce:false,scale:4};
ExplosionManager.AddExplosion(a,7)},IsMarkedForDeath:function(){return this.bMarkedForDeath},ApplyDamage:function(a){this.MarkForDeath()
},GetDamage:function(){return this.damage},IsAlive:function(){return !this.IsMarkedForDeath()},Cleanup:function(){this.vPos=null;
this.following=null;this.tMissile=null;this.vDir=null;this.colline=null},};MissileManager={};MissileManager.follow=null;var hmissile=null;
MissileManager.Init=function(a){hmissile=null};MissileManager.CanFire=function(){return !hmissile};MissileManager.AddMissile=function(b,e,c,a,d,f){if(!hmissile){hmissile=new HomingMissile(b,e,c,a,d||1,f||15)
}};MissileManager.Update=function(a){if(hmissile){hmissile.Update(a);if(!hmissile.IsAlive()){hmissile=null}}};MissileManager.Render=function(a){if(hmissile){hmissile.Render(a)
}};var kENEMY_MAXTURNANGLE=180;var kENEMY_ANGULAR_ACCELERATION=180;var scalearound=0.95;function PlayerHelicopter(a,b){this._time=0;
this._velx=0;this._vely=0;this._freeze_effect=1;this._currentAngularDir=true;this._currentAngularSpeed=0;this._direction=0;
this._targetbearing=0;this._rightangdist=0;this._leftangdist=0;this._x=1024;this._y=1024;this._z=0;this._hoverFreq=0.25;this._boundx=a.X();
this._boundy=a.Y();this._regionHelper=b||EnemyManager;this._vPos=Vector4.Create();this._bladesprite=new Sprite("heliblades");
this._shadowsprite=new Sprite("helishadow");this._sprite=new Sprite("helibody");this._blade=0;this._fired=0;this._fireperiod=0.125;
this._phase=0;this._canfire=true;this._lastfired=0;this._fireFunction=function(c){return(c%2)?{x:14,y:-8,z:0}:{x:-14,y:-8,z:0}
};this.firingpos=Vector4.Create();this.className=PlayerHelicopter.className}PlayerHelicopter.className="PlayerHelicopter";
PlayerHelicopter.STEPX=8;PlayerHelicopter.STEPY=8;PlayerHelicopter.STATE_ALIVE=0;PlayerHelicopter.canfire=true;function deg(a){return a*180/Math.PI
}PlayerHelicopter.prototype={SetPosition:function(a){this._x=a._x;this._y=a._y;this._z=a._z},GetRegion:function(){return this._regionHelper.GetRegion(this._x,this._y)
},IsAlive:function(){return true},GetVectorPosition:function(){this._vPos.SetXyzw(this._x,this._y,this._z);return this._vPos
},GetPosition:function(){return{_x:this._x,_y:this._y,_z:this._z}},GetFiringDirection:function(){return this._direction},HasMoved:function(){return(this._lastx!=this._x||this._lasty!=this._y)
},BrakesOn:function(){this._velx=0;this._vely=0;this._freeze_effect=0},Update:function(a){var b=true;this._time=this._time+a;
this._blade=this._blade+a*(b&&520||360);this._scale=scalearound+(1-scalearound)*Math.sin(6*this._hoverFreq*this._time);this.Accelerate(a);
this.Bound();this.Turn(a);this.AttemptFire(a)},Bound:function(){var b=this._boundx,a=this._boundy;this._x=Math.max(0,Math.min(this._x,b));
this._y=Math.max(0,Math.min(this._y,a))},PlayerUp:function(){this._analvert=-1},PlayerDown:function(){this._analvert=1},PlayerLeft:function(){this._analhor=-1
},PlayerRight:function(){this._analhor=1},PlayerSelect:function(){},Turn:function(b){var d=this._direction;var a=this._targetbearing;
this._angdistance=((a-(d%360)));this._leftangdist=((360-a)+(d%360))%360;this._rightangdist=((a+(360-(d%360))))%360;var e=(this._rightangdist<this._leftangdist);
if(e!=this._currentAngularDir){this._currentAngularDir=e;this._currentAngularSpeed=0}this._currentAngularSpeed=this._currentAngularSpeed+(b*kENEMY_ANGULAR_ACCELERATION);
if(this._currentAngularSpeed>kENEMY_MAXTURNANGLE){this._currentAngularSpeed=kENEMY_MAXTURNANGLE}var c=this._currentAngularSpeed*b;
this._maxTurnAngle=c;if(Math.min(this._rightangdist,this._leftangdist)>c){if(e){this._direction=(d+c)%360}else{this._direction=(d-c)%360
}}else{this._direction=a}},Accelerate:function(c){var e=2800;var f=8;var b=this.GetJoystickXAxis();var a=this.GetJoystickYAxis();
var i=0,h=0;var g=this._freeze_effect||1;i=g*(this._velx+e*(b||0)*c);h=g*(this._vely+e*(a||0)*c);this._x=this._x+c*i;this._y=this._y+c*h;
var d=Math.max(0,(1-f*c));this._velx=i*d;this._vely=h*d},GetFiringOffset:function(a){return this._fireFunction&&this._fireFunction(typeof a=="undefined"?this._fired:a)||{x:0,y:0,z:0}
},GetFiringPosition:function(a,e){var c=e||0;var m=Math.cos(c*Math.PI/180);var j=Math.sin(c*Math.PI/180);var l=this._x,k=this._y,i=this._z;
var h=this.GetFiringOffset(a);var d=h.x,b=h.y;var g=d*m-b*j;var f=d*j+b*m;this.firingpos.SetXyzw(l+g,k+f,i,0);return this.firingpos
},AttemptFire:function(a,c){if(PlayerHelicopter.canfire&&this._canfire&&this._time-(this._lastfired||0)>this._fireperiod){var f=10;
var e=0.75;var d=600;var b=RenderHelper.CreateTextureAnimation(2,1,"bullets",10);BulletManager.Fire(this,f,d,this.GetFiringDirection(),e,b,1,10);
this._fired++;this._lastfired=this._time}},AngleMove:function(b,a){var f=deg(Math.atan2(a,b));var e=Math.sqrt(b*b+a*a);var c=40;
if(e>0.5){this._targetbearing=f+90}},AxisMove:function(b,a){this._analhor=b||0;this._analvert=a||0},GetJoystickXAxis:function(){var a=this._analhor;
this._analhor=0;return a},GetJoystickYAxis:function(){var a=this._analvert;this._analvert=0;return a},Render:function(d){var b=this._direction,e=this._scale,c=(1+scalearound-this._scale)*0.85;
var a=this._x,f=this._y;d.drawSprite(this._shadowsprite,a-16,f+16,b,c,c);d.drawSprite(this._sprite,a,f,b,e,e);d.drawSprite(this._bladesprite,a,f,this._blade,e,e)
},RenderDebug:function(b){var a=this.GetRegion();b.drawText("player: region:"+a+" pos: "+Math.floor(this._x)+","+Math.floor(this._y),this._x+10,this._y,[255,255,255],{vertical:"bottom",horizontal:"left"});
b.drawText("player: bearing:"+this._targetbearing+" maxTurnAngle="+(this._maxTurnAngle||0),this._x+10,this._y+20,[255,255,255],{vertical:"bottom",horizontal:"left"});
b.drawCircle(this._x,this._y,10,[255,255,0]);b.drawCircle(this._x,this._y,4,[255,0,0])},update:function(a){this.Update(a)
},render:function(a){this.Render(a)},moveup:function(){this.PlayerUp()},movedown:function(){this.PlayerDown()},moveleft:function(){this.PlayerLeft()
},moveright:function(){this.PlayerRight()},move:function(b,a){if(b){if(b>0){this.moveright()}else{this.moveleft()}}if(a){if(a>0){this.movedown()
}else{this.moveup()}}},};var MD5=function(s){function L(b,a){return(b<<a)|(b>>>(32-a))}function K(k,b){var F,a,d,x,c;d=(k&2147483648);
x=(b&2147483648);F=(k&1073741824);a=(b&1073741824);c=(k&1073741823)+(b&1073741823);if(F&a){return(c^2147483648^d^x)}if(F|a){if(c&1073741824){return(c^3221225472^d^x)
}else{return(c^1073741824^d^x)}}else{return(c^d^x)}}function r(a,c,b){return(a&c)|((~a)&b)}function q(a,c,b){return(a&b)|(c&(~b))
}function p(a,c,b){return(a^c^b)}function n(a,c,b){return(c^(a|(~b)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));
return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));
return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(k){var G;var d=k.length;
var c=d+8;var b=(c-(c%64))/64;var F=(b+1)*16;var H=Array(F-1);var a=0;var x=0;while(x<d){G=(x-(x%4))/4;a=(x%4)*8;H[G]=(H[G]|(k.charCodeAt(x)<<a));
x++}G=(x-(x%4))/4;a=(x%4)*8;H[G]=H[G]|(128<<a);H[F-2]=d<<3;H[F-1]=d>>>29;return H}function B(c){var b="",d="",k,a;for(a=0;
a<=3;a++){k=(c>>>(a*8))&255;d="0"+k.toString(16);b=b+d.substr(d.length-2,2)}return b}function J(b){b=b.replace(/\r\n/g,"\n");
var a="";for(var k=0;k<b.length;k++){var d=b.charCodeAt(k);if(d<128){a+=String.fromCharCode(d)}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);
a+=String.fromCharCode((d&63)|128)}else{a+=String.fromCharCode((d>>12)|224);a+=String.fromCharCode(((d>>6)&63)|128);a+=String.fromCharCode((d&63)|128)
}}}return a}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;
s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);
V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);
V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);
V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);
V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);
V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);
V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);
V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);
V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);
V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);
V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);
V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);
V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);
V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);
V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);
V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);
V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);
V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};var HashCode=function(){var a=function(b){var e,d="";e=typeof b;
if(e==="object"){var c;for(c in b){d+="["+e+":"+c+a(b[c])+"]"}}else{if(e==="function"){d+="["+e+":"+b.toString()+"]"}else{d+="["+e+":"+b+"]"
}}return d.replace(/\s/g,"")};return{value:function(b){return MD5(a(b))}}}();
