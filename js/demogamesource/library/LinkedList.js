//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function LinkedList() 
{
	this._headr		=	null ;
	this._tail		=	null ;
	this._size		=	0 ;
	this.className	=	"LinkedList" ;
	
}

function LinkedObject(data)
{
	this._next		=	null	;
	this._prev		=	null	;
	this._data		=	data	;
	this.className	=	"LinkedObject" ;
}

LinkedObject.prototype	=
{
	
	constructor: LinkedObject,
	
	GetData:		function()
					{
						return this._data ;
					},
	GetNext:		function()
					{
						return this._next ;
					},
	GetPrevious:	function()
					{
						return this._previous ;
					}

}	

LinkedList.prototype =
{
	
	constructor: LinkedList,
	
	Clear:			function()
					{
						this._headr	=	null ;
						this._tail	=	null ;
					},
	
	toArray:		function(rawdata)
					{
						var arr = new Array() ;

						for (var it 	=	this.Iterator() ; it.HasElements() ; it.Next())
						{
							var node	=	it.GetCurrent() ;
							arr.push(!rawdata ? node : node.GetData()) ;
						}
						return arr ;
					},
	Add:	 		function(data)
					{
						var obj 	=	new LinkedObject(data) ;
						var tail	=	this._tail ;
						var headr	=	this._headr;

						if (!tail) 
						{
							this._headr =	obj ;
							this._tail 	=	obj ;
						} else 
						{
							tail._next	=	obj ;
							obj._prev	=	this._tail ;
							this._tail	=	obj ;
						}
						this._size		=	this._size + 1 ;
						
						return obj ;
					},
	Size:			function()
					{
						return this._size ;
					},
	Iterator:		function(rawdata)
	 				{
						var raw			=	rawdata ;
						var header		=	this._headr ;
						var current		=	header ;
						
						return {
							

							Reset:			function()
											{
												current = header ;
											},
											
							Next:			function()
											{
												if (current) 
												{
													current = current._next ;
												}
												return current ;
											},
							HasElements:	function()
											{
												return current ;
											},
							GetCurrent:     function()
											{
												return raw ? current.GetData() : current ;
											}
						}
					},

	Remove:			function(linkeddata)
					{
					
						//if (!linkeddata._prev && !linkeddata._next)
						//{
							//alert("OH NO! TRYING TO REMOVE A NON LINKED OBJECT! WHAT'S GOING ON? "+linkeddata.className+" size now "+this._size)
							//var obj = linkeddata._data ;
							//alert("l "+linkeddata._deleted) ;
						//}
					
						//assert(linkeddata instanceOf LinkedObject,'LinkedList.Remove - PARAMETER SHOULD BE A LinkedObject! SEE A CODE DOCTOR')
						var chead		=	this._headr ;
						var ctail		=	this._tail ;
						
						var prev		=	linkeddata._prev ;
						var next		=	linkeddata._next ;

						if (prev)
						{
							prev._next	=	next ;
						}

						if (next) 
						{
							next._prev	=	prev ;
						}
						
						if (chead == linkeddata)
						{
							this._headr 	=	next ;
						}

						if (ctail == linkeddata)
						{
							this._tail		=	prev ;
						}

						this._size		=	this._size - 1 ;
						

						// make sure we can't remove it again!
						linkeddata._prev			=	null ;
						linkeddata._next			=	null ;
						linkeddata._deleted			=	"deleted" ;
						
						
							
					},
					
	AddArray:		function(arr)
					{
						for(var idx = 0 ; idx < arr.length ; idx ++)
						{
							var data = arr[idx] ;
							this.Add(data) ;
						}	
					},
					
}	

