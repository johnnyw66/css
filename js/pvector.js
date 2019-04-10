

  // Conversion of Processing Java code - Johnny

  class PVector {

    constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    debug() {
      console.log('PVector x:' + this.x + ", y:" + this.y + ", z:" + this.z);
    }

    cross(v2) {
      return this.crossTarget(v2,new PVector());
    }
    /**
       * Return a vector composed of the cross product between this and another.
       */

      /**
       * Perform cross product between this and another vector, and store the
       * result in 'target'. If target is null, a new vector is created.
       */
       crossTarget( v,  target) {
        let crossX = this.y * v.z - v.y * this.z;
        let crossY = this.z * v.x - v.z * this.x;
        let crossZ = this.x * v.y - v.x * this.y;

        target.x = crossX;
        target.y = crossY;
        target.z = crossZ;

        return target;
      }
  }



  // Conversion of Processing Java code
  class PMatrix2D {

    constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0) {

      this.set(m00, m01, m02, m10, m11, m12);

    }

    reset() {
      this.set(1, 0, 0, 0, 1, 0);
    }

    set(m00, m01, m02, m10, m11, m12) {
      this.m00 = m00;
      this.m01 = m01;
      this.m02 = m02;

      this.m10 = m10;
      this.m11 = m11;
      this.m12 = m12;
    }

    debug() {
      console.log('m00:' + this.m00 + ", m01:" + this.m01 + ", m02:" + this.m02);
      console.log('m10:' + this.m10 + ", m11:" + this.m11 + ", m12:" + this.m12);
    }

    get() {
      let outgoing = new PMatrix2D();
      outgoing.set(this.m00, this.m01, this.m02, this.m10, this.m11, this.m12);
      return outgoing;
    }

    setMatrix(srcmatrix) {
      if (srcmatrix instanceof PMatrix2D) {
        this.set(srcmatrix.m00, srcmatrix.m01, srcmatrix.m02,
          srcmatrix.m10, srcmatrix.m11, srcmatrix.m12);
      } else {
        throw new Exception("PMatrix2D.set() only accepts PMatrix2D objects.");
      }
    }

   isIdentity() {
    return ((this.m00 == 1) && (this.m01 == 0) && (this.m02 == 0) &&
            (this.m10 == 0) && (this.m11 == 1) && (this.m12 == 0));
   }

  rotate( angle) {
    let s = Math.sin(angle);
    let c = Math.cos(angle);

    let temp1 = this.m00;
    let temp2 = this.m01;
    this.m00 =  c * temp1 + s * temp2;
    this.m01 = -s * temp1 + c * temp2;
    temp1 = this.m10;
    temp2 = this.m11;
    this.m10 =  c * temp1 + s * temp2;
    this.m11 = -s * temp1 + c * temp2;
  }


  //PVector mult(PVector source, PVector target) {
  /**
    * Apply another matrix to the left of this one.
    */
    preApply( left) {
     this.preApplyValues(left.m00, left.m01, left.m02,
              left.m10, left.m11, left.m12);
    }


    preApplyValues( n00,  n01,  n02,
                        n10,  n11,  n12) {
    let t0 = this.m02;
    let t1 = this.m12;
    n02 += t0 * n00 + t1 * n01;
    n12 += t0 * n10 + t1 * n11;

    this.m02 = n02;
    this.m12 = n12;

    t0 = this.m00;
    t1 = this.m10;
    this.m00 = t0 * n00 + t1 * n01;
    this.m10 = t0 * n10 + t1 * n11;

    t0 = this.m01;
    t1 = this.m11;
    this.m01 = t0 * n00 + t1 * n01;
    this.m11 = t0 * n10 + t1 * n11;
  }




  mult( source,  target) {
     if (target == null) {
       target = new PVector();
     }
     target.x = this.m00*source.x + this.m01*source.y + this.m02;
     target.y = this.m10*source.x + this.m11*source.y + this.m12;
     return target;
   }

    multX( x,  y) {
     return this.m00*x + this.m01*y + this.m02;
   }


    multY( x,  y) {
     return this.m10*x + this.m11*y + this.m12;
   }

    invert() {
      determinant = this.determinant();
     if (Math.abs(determinant) <= 0.0000001) {
       return false;
     }

     const t00 = m00;
     const t01 = m01;
     const t02 = m02;
     const t10 = m10;
     const t11 = m11;
     const t12 = m12;

     this.m00 =  t11 / determinant;
     this.m10 = -t10 / determinant;
     this.m01 = -t01 / determinant;
     this.m11 =  t00 / determinant;
     this.m02 = (t01 * t12 - t11 * t02) / determinant;
     this.m12 = (t10 * t02 - t00 * t12) / determinant;

     return true;
   }

   transpose() {
     throw new Exception("PMatrix2D.transpose not yet supported");

   }

   determinant() {
     return this.m00 * this.m11 - this.m01 * this.m10;
   }

}
