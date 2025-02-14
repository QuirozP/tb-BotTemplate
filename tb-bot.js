let odd = true
const io = require("socket.io-client");
var he = require('he');
const moment = require("moment");
const _ = require("lodash"); 
// you can add another npm package if you want for your bot.
const socket = io("http://www.windows93.net:8081", {
	forceNew: true,
	transportOptions: {
		polling: {
			extraHeaders: {
				"Accept": "*/*",
				"Accept-Encoding": "identity",
				"Accept-Language": "*",
				"Cache-Control": "no-cache",
				"Connection": "keep-alive",
				"Cookie": "",
				"Host": "www.windows93.net",
				"Origin": "http://www.windows93.net",
				"Pragma": "no-cache",
				"Referer": 'http://www.windows93.net/trollbox/index.php',
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"
			}
		}
	}
});

function botsend(msg){
  if (odd) {
    socket.send(msg)
    odd = false
  } else {
    socket.send(msg + ` `)
    odd = true
  }
}

socket.emit("user joined", "t.testbot", "steelblue", "", "")
// You can edit this by your preference, Example: socket.emit("user joined", "myBot (my.help)", "deeppink", "", "")
socket.send("Hello, World!") // a welcome message. you can remove this.

socket.on("message", function(data) {
  
  if (data.msg == "t.hello") {
    botsend(he.decode("Hello, " + data.nick + "")) // you can replace this
  } // NOTE: It's recommendable to use he.decode when the command code has "data.nick". EXAMPLE: socket.send(he.decode("" + data.nick + " is nice."))

  if (data.msg == "t.ping") {
    botsend("Pong!")
  }
  
  if (data.msg == "t.time") {
    botsend("The time is: " + moment().format('LT') + "")
  }
  
  if (data.msg == "t.date") {
    botsend("The date is: " + moment().format('LL') + "")
  }

  if (data.msg == "t.random") {
    botsend(_.sample(response.random))
  }
  
})
//Lodash JSON
const response = {"random": ["Message No. 1", "Message No. 2", "Message No. 3"] }
