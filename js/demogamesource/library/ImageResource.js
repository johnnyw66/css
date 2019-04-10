//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

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
		
	
