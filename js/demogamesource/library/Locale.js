//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

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
	
	

