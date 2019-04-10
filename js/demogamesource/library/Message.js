//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

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

