//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

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

  
