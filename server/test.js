var inc = 0, pid;
var sayHello = function () {if (inc===20) {clearInterval(pid)} else {inc++; console.log("HELLO!");}}
var sayHelloInterval = function () {pid = setInterval(sayHello, 3000)}
var sayHi = function () { if (inc===10) {clearInterval(pid); pid=sayHelloInterval()} else {inc++; console.log("HI")}}
var sayHiInterval = function () {pid = setInterval(sayHi, 3000)}
sayHiInterval()
