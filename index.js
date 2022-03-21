const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')


app.use(cors())
app.use(express.json())

var zmq = require("zeromq"),
  sock = zmq.socket("pull");

try {
    sock.bind('tcp://10.240.177.179:9999')
    sock.connect("tcp://10.240.177.106:9999");
} catch(e) {
    console.log(e)
}

setInterval(() => {
    console.log('sending')
    sock.send("dot_one");
}, 2000);

sock.on("message", function(msg) {
  console.log("work: %s", msg.toString());
});

sock.on('error', (err) => {
    console.log(err)
})

// const ws = new WebSocket('ws://10.240.177.106:9999');
// ws.on('open', (socket) => {
//     console.log(socket)
//     console.log('open')
//     // const testEvent = { event_name: 'furhatos.event.actions.ActionSpeech', text: 'hello' }
//     // ws.send(testEvent)
// });

// ws.on('error', (err) => console.log(err))

// ws.on('close', function close() {
//     console.log('disconnected');
//   });

// ws.on('message', function message(data) {
//   console.log('received: %s', data);
// });


// let furhat = new Furhat()
// furhat.init('10.240.176.153', '9999', 'api', (status, hat) => {
//     if (status === 'open') {
//         hat.say('I am connected!')
//     }
// })

const writeToFile = (body) => {
    fs.writeFile('data.json', JSON.stringify(body), (err) => {
        if (err) throw err
        console.log('The file has been saved!')
    })
}

app.get('/', (req, res) => res.send('hello'))
app.post('/', (req, res) => {
    console.log('req.body', req.body)
    res.send({
        message: 'success'
    })
})

app.post('/game/end', (req, res) => {
    console.log(req.body)
    res.send({
        message: 'success'
    })
})

app.post('/game', (req, res) => {
    console.log(req.body)
    res.send({
        message: 'success'
    })
})

app.post('/turn', (req, res) => {
    console.log(req.body)
    res.send({
        message: 'success'
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))