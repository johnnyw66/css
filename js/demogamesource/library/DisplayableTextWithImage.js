//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

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
