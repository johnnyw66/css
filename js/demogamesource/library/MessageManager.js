//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

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
