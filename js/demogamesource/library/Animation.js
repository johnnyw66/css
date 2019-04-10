//Copyright 2012, John Wilson, Brighton Sussex UK. Licensed under the BSD License. See licence.txt

function Animation(info,play)
{
		if (!info)
		{
			alert("NO INFO PASSED!") ;
		}
		this.x 			=	info.x ;
		this.y			=	info.y ;
		this.z			=	info.z || 0 ;
		this.scale		=	info.scale || 1 ;
		this.fps		=	info.fps || 13 ;
		this.frameshor	=	info.frameshor || 8 ;
		this.framesvert	=	info.framesvert || 4 ;
		this.texture	=	info.texture || "explosionuv64.png" ;
		this.loop		=	info.loop ;
		this.bounce		=	info.bounce ;
		this.timeout 	=	info.timeout ;
		this.angle		=	info.angle ;
		this.effect		=	info.effect ;
		this.tx			=	0 ;
		this.ty			=	0 ;
		this.time		=	0 ;
		this.hasPlayed	=	false ;
		
		this.anim		=	RenderHelper.CreateTextureAnimation(this.frameshor,this.framesvert,this.texture,this.fps) ;
		this.className	=	Animation.className ;
		if (play) 
		{
//			alert("PLAYING "+this.anim.className)	;
			this.Play() ;
		}
}
	
Animation.Create		=	function(info,play)
							{
								return new Animation(info,play) ;
							}
							

Animation.className		=	"Animation"



Animation.prototype 	=
{
	constructor:	Animation,
	
	Update:			function(dt)
					{
						this.time	=	this.time	+ dt ;
						this.anim.update(dt) ;

						if (this.effect)
						{
							var trans = this.effect(this.time) ;
//							this.tx	=	trans.tx ;
//							this.ty	=	trans.ty ;
							for (var v in trans)
							{
								this[v]	= trans[v] ;
							}
						}
						
						if (this.effector)
						{
							this.effector.Update(dt) ;
						}
						
					},
					
	ApplyEffector:			
					function(effector)
					{
							this.effector 	=	effector,
							this.effector.EffectMe(this) ;
					},


	Play:			function()
					{
						this.hasPlayed	=	true ;
						this.anim.play(this.loop,this.bounce,this.timeout) ;
					},
					
	HasFinished:	function()
					{
						return this.hasPlayed && !this.anim.isPlaying() ;
						
					},
	Render:			function(rHelper)
					{
						//	drawSpriteSheet: function(spritesheet,x,y,frame,rot,sx,sy)
						if (this.anim.render)
						{
							this.anim.render(rHelper,this.x+this.tx,this.y+this.ty,this.scale,this.scale,this.angle)	;
						} else
						{
							alert("Not Yet Defined!")
							//var texinfo =	this.anim.GetRenderTexture() ;
							//rHelper.drawSheet(texinfo.sheet,this.x,this.y,texinfo.frame,0,this.scale,this.scale) ;
						}	
					}
}

function AnimationManager() {}

AnimationManager.llist			=	new Array() ;
AnimationManager.currentOverlay	=	0 ;
AnimationManager.MAXOVERLAYS	=	16
AnimationManager.clist			=	null ;
AnimationManager.removeList		=	new LinkedList()  ;

AnimationManager.Init		=	function()
								{
									for (var idx = 0 ; idx < AnimationManager.MAXOVERLAYS ; idx++)
									{
										AnimationManager.llist[idx]	=	new LinkedList() ;
									}
									AnimationManager.SetOverlay(0) ;

									AnimationManager.removeList		=	new LinkedList()  ;
								}
AnimationManager.Size			=	function()
								{
									var totalSize		=	0 ;
									
									for (var idx = 0 ; idx < AnimationManager.MAXOVERLAYS ; idx++)
									{
										var size = AnimationManager.llist[idx].Size() ;
										totalSize	=	totalSize + size ;
									}
									return totalSize ;
									
								}
								
AnimationManager.SetOverlay	=	function(overlay)
								{
									AnimationManager.currentOverlay	=	overlay ;
									AnimationManager.clist			=	AnimationManager.llist[overlay]	;	
								}

AnimationManager.GetOverlay	=	function(overlay)
								{
									return (overlay == undefined) ? AnimationManager.clist : AnimationManager.llist[overlay]	;
								}

AnimationManager.Update		=	function(dt)
								{
									
									var removeList	=	new LinkedList() ; ///AnimationManager.removeList	;
									
									for (var overlayindex = 0 ; overlayindex < AnimationManager.MAXOVERLAYS ; overlayindex++)
									{
										var list		=	AnimationManager.GetOverlay(overlayindex)
										
										for (var it = list.Iterator() ; it.HasElements() ; it.Next())
										{
											var animationEl = it.GetCurrent() ;
											
											var animation	= animationEl.GetData() ;
											if (!animation.HasFinished())
											{
												animation.Update(dt)
											} else
											{
												removeList.Add({list:list,element:animationEl}) ;
											}	
										}
										
										
									}
									
									// finished updating - now remove those that have finished.
									for (var it = removeList.Iterator(true) ; it.HasElements() ; it.Next())
									{
										var removeInfo = it.GetCurrent() ;
										removeInfo.list.Remove(removeInfo.element) ;
									}

								}
							
AnimationManager.Render		=	function(rHelper)
								{
									// todo preserver rHelper's own overlay index
									var cOverlayIndex	=	rHelper.getOverlay() ;
									
									for (var overlayindex = 0 ; overlayindex < AnimationManager.MAXOVERLAYS ; overlayindex++)
									{
										var list	=	AnimationManager.GetOverlay(overlayindex)

										// todo set rHelper's  overlay index to 'overlayindex'
										rHelper.setOverlay(overlayindex) ; 

										for (var it = list.Iterator(true) ; it.HasElements() ; it.Next())
										{

											var animation = it.GetCurrent() ;
											animation.Render(rHelper)
										}
									}
									// todo restore rHelper's own overlay index
									rHelper.setOverlay(cOverlayIndex) ;

								}
							
AnimationManager.Add		=	function(animation,overlayindex)
								{
									var list	=	AnimationManager.GetOverlay(overlayindex) ;
									list.Add(animation) ;
								}


AnimationManager.RenderDebug	=	function(rHelper)
									{
										for (var overlayindex = 0 ; overlayindex < AnimationManager.MAXOVERLAYS ; overlayindex++)
										{
											var list	=	AnimationManager.GetOverlay(overlayindex)
											var size 	=	list.Size() ;
											rHelper.drawText("Index "+overlayindex+" Size "+size,100,120+overlayindex*20) ;
											 
										}
									}
