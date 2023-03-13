const WebSocket = require('ws');
const tokenModule = require('../modules/token');
const db = require('../database/db');

/*
 * clients = {
    idA: [client, ...],
    idB: [client, ...]
 }
 */
let clients = {}

const run = () => {
    // const server = new WebSocket.Server({
    //     port: process.env.PORT_SERVER_SOCKET
    // });
    const server = new WebSocket.Server({ 
        port: process.env.PORT_SERVER_SOCKET
     });
    server.on('connection', async (socket) => {
        try {
            socket.on('message', async (msg) => {
                msg = msg.toString();
                const data = JSON.parse(msg);
                process_mess(socket, data);
            });
        } catch (e) {
            console.log(e);
        }
    });
}

// handle process when clients request socket
const process_mess = async (soc, data) => {
    try {
        switch (data.action) {
            case "CONNECT_SOCKET":
                await init_connect_socket(soc, data);
                break;
        }
    } catch (e) {
        console.log(e);
    }
}

// init client connect socket
const init_connect_socket = async (soc, data) => {
    try {
        const token = tokenModule.decode(data.token);
        const id = token.id;

        if (!clients[id]) {
            clients[id] = [];
        }

        soc.ID = id;
        clients[id].push(soc);

        send_mess_socket(soc, {
            action: "STATUS_SOCKET",
            data: {
                messages: "success"
            }
        });

        // Remove handle when close connect
        soc.on("close", () => {
            try {
                const id = soc.ID;

                if (clients[id]) {
                    const idx = clients[id].findIndex(item => item == soc);

                    if (idx >= 0) {
                        clients[id].splice(idx, 1);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

//Send message to socket client
const send_mess_socket = (soc, mess) => {
    try{
        soc.send(JSON.stringify(mess));
    }catch(e){
        console.log(e);
    }
}

setInterval(() => {
    try{
        for(const key in clients){
            if(clients[key]){
                for(const soc of clients[key]){
                    send_mess_socket(soc, {
                        action: "PIN"
                    })
                }
            }
        }
    }catch(e){
        console.log(e);
    }
  }, 20000);

module.exports = {
    run: run,
};

//wss:localhost:5001