//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function Manager() {
	
	this.llist			=	new Array() ;
}


Manager.prototype	=	
{
		constructor:			Manager,
		Init:					function()
								{
										this.llist			=	new LinkedList() ;
								},

		Size:					function()
								{
									return this.llist.Size()  ;
								},
								
		Update:					function(dt)
								{
									
										var removeList	=	new LinkedList() ; 
										var list		=	this.llist ;
										
										for (var it = list.Iterator() ; it.HasElements() ; it.Next())
										{
											var listEl = it.GetCurrent() ;
											
											var data	= listEl.GetData() ;
											if (!data.HasFinished())
											{
												data.Update(dt)
											} else
											{
												removeList.Add({list:list,element:listEl}) ;
											}	
										}
										
									
										// finished updating - now remove those that have finished.
										for (var it = removeList.Iterator(true) ; it.HasElements() ; it.Next())
										{
											var removeInfo = it.GetCurrent() ;
											removeInfo.list.Remove(removeInfo.element) ;
										}

								},
							
		Render:					function(rHelper)
								{
									var list		=	this.llist ;
									for (var it = list.Iterator(true) ; it.HasElements() ; it.Next())
									{
										var data = it.GetCurrent() ;
										data.Render(rHelper) ;
									}
								},
							
		Add:					function(data)
								{
									var list		=	this.llist ;
									list.Add(data) ;
								}

}
