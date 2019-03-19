//jshint esversion:6
const express = require("express") ;
const request = require("request") ;
const bodyParser = require("body-parser");
const bluetooth = require("node-bluetooth") ;

const scanner = require("bluetooth-scanner");


// //define input
// var device = "hci0";
// // Scan for devices
// var bleScanner = new scanner(device, function(mac, name) {
//     console.log('Found device: ' + name);
// });

// console.log("Blue Tooth") ;
//
 const device = new bluetooth.DeviceINQ();
//
 device.listPairedDevices(console.log) ;
// console.log("scanning....") ;

var cnt = 0 ;
var wifiDev = 'en0';

const pcap = require('pcap');
console.log("sniffing device:" + wifiDev) ;
var pcapSession = pcap.createSession(wifiDev, 'wlan type mgt subtype probe-req');

// pcapSession.on('packet', function(rawPacket){
//   var packet = pcap.decode.packet(rawPacket);
//   console.log('from: ' + packet.link.ieee802_11Frame.shost);
//   console.log('to: ' + packet.link.ieee802_11Frame.dhost);
//   console.log('signal strength: ' + packet.link.ieee802_11Frame.strength);
// });

setInterval(()=>{
  const ch = ["|", "/", "-"] ;
  process.stdout.write("Scanning " + ch[++cnt % ch.length]+ "\r");
}, 500); //time is in ms


device
.on('finished',  console.log.bind(console, 'finished'))
.on('found', function found(address, name){
  console.log('Found: ' + address + ' with name ' + name);
}).scan();


console.log("scanner -- set up") ;
