
class RomBuilder:
	def __init__(self,size,defChar):
		self.rom = bytearray([defChar]*size)
		self.ptr = 0 ;

	def sendByte(self,v):
		self.rom[self.ptr] = v
		self.ptr = self.ptr + 1

	def writeRom(self,fname):
		with open(fname,"wb") as out_file:
			out_file.write(self.rom)


class CommandSet:
	def __init__(self):
		self.commands = Queue()

	def addCommand(self,cmd):
		self.commands.add(cmd)

	def flushCommands(self,romBuilder):
		ptr = self.commands.getHead()
		while(ptr != 0):
			cmd = ptr.data
			romBuilder.sendByte(cmd)
			ptr = ptr.next



class Note:
	def __init__(self,freq,vchannel,start,duration):
		self.frequency = freq
		self.start = start
		self.duration =	duration
		self.virtualChannel = vchannel

	def buildNoPlayCommandSet(self):
		commands = CommandSet()
		commands.addCommand(0)	# Note reg data - not actually strobed so put anything, here.
		commands.addCommand(0) # WE1, WE2 control lines  -make sure we don't strobe!
		return commands


	def buildPlayCommandSet(self,vol):
			#
		commands = CommandSet()

		freq = self.calcFrequencyValue()
		channel = self.virtualChannel
		sndChannelBase = 8 + channel * 2
		volChannelBase = sndChannelBase + 1

		lowFreqCmd = (sndChannelBase << 4) | (freq & 15)
		commands.addCommand(lowFreqCmd)
		commands.addCommand(3) ; # WE1, WE2 control lines

		topFreqCmd = (freq >> 4) & 0x3f
		commands.addCommand(topFreqCmd)
		commands.addCommand(3) ; # WE1, WE2 control lines

		volCmd = (volChannelBase << 4) | ((15-vol) & 0x0f)
		commands.addCommand(volCmd)
		commands.addCommand(3) ; # WE1, WE2 control lines


		return commands


	# def buildPlayCommandSequence(self):
	# 	self.buildCommandSet()


	def calcFrequencyValue(self):
		return (4000000/(self.frequency * 32))

	def debug(self):
		print("frequency",self.frequency,"start",self.start,"duration",self.duration,"vChannel",self.virtualChannel)


class Node:
	def __init__(self,data):
		self.data = data
		self.next = 0
		self.prev = 0

	def debug(self):
		print(self.data)
		self.data.debug()

class Queue:
	def __init__(self):
		self.head = 0
		self.tail = 0
		self.size = 0

	def list(self):
		ptr = self.head
		print("list")
		while(ptr != 0):
			print("ptr",ptr)
			ptr.data.debug()
			ptr = ptr.next

	def add(self,data):
		n = Node(data);

		if (self.head == 0):
			self.head = n

		if (self.tail != 0):
			self.tail.next = n
			n.prev = self.tail
			n.next = 0


		self.tail = n
		self.size = self.size + 1


	def remove(self,node):

		if (node.prev != 0):
			node.prev.next = node.next

		if (node.next != 0):
			node.next.prev = node.prev

		if (self.head == node):
			self.head = node.next

		if (self.tail == node):
			self.tail = node.prev

		self.size = self.size - 1


	def bumpHead(self):
		ptr = self.head
		self.head = self.head.next
		self.size = self.size - 1
		return ptr

	def getHead(self):
		return self.head

	def getHeadData(self):
		return self.head.data

	def getSize(self):
		return self.size

class RomSequencer:
	def __init__(self,events):
		self.playing = Queue()
		self.events = events
		self.time = 0
		self.romBuilder = RomBuilder(32768,0xea)


	def update(self,dt):
			self.time = self.time + dt
			self.updateEvents()
			self.updatePlaying()

	def updateEvents(self):
		print("updateEvents",self.time)
		if (self.events.getHead() != 0):
			note = self.events.getHeadData()
			if (self.time > note.start):
				self.events.bumpHead()
				self.playing.add(note)
				cmds = note.buildPlayCommandSet(15)
				cmds.flushCommands(self.romBuilder)


	def updatePlaying(self):
		print("updatePlaying",self.time," size = ",self.playing.getSize())
		ptr = self.playing.getHead()
		notesPlaying = self.playing.getSize() ;
		while(ptr != 0):
			note = ptr.data
			if (self.time >= note.start + note.duration):
				self.playing.remove(ptr)
				#stopPlaying(note)
				cmds = note.buildPlayCommandSet(0)
				cmds.flushCommands(self.romBuilder)
				print("Stop playing note")
			else:
				print("playing note",note)
			nxt = ptr.next
			ptr = nxt ;

		if (self.playing.getSize() == 0):
			# add some dummy play sound data.
			#	freq,vchannel,start,duration
			note = Note(0,0,0,0)
			cmds = note.buildNoPlayCommandSet()
			cmds.flushCommands(self.romBuilder)
			print("play some dummy silent note")

	def isFinished(self):
		return self.events.getHead() == 0 and self.playing.getHead() == 0 ;


	def writeRomSequence(self,fname):
		#@TODO add final command sequence to restart
		self.romBuilder.writeRom(fname)



queue = Queue()
# freq,vchannel,start,duration:

queue.add(Note(440,0,0,300))
queue.add(Note(600,0,3400,1200))
queue.list() ;

sequencer = RomSequencer(queue)

while(not sequencer.isFinished()):
	sequencer.update(0.25)

sequencer.writeRomSequence("sequence.rom")
