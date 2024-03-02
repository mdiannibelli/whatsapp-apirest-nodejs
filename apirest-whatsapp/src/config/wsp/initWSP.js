const { Client, NoAuth, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { sendMsgReceived } = require('../webhook');

// var modifiable client
let clientWSP = null;

const initializeWSP = async () => {
    clientWSP = new Client({
        authStrategy: new LocalAuth(),
    });

    clientWSP.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });

    //autentication
    clientWSP.on('authenticated', () => {
        console.log('autentificado')
    })
    
    // autentication error
    clientWSP.on('auth_failure', (msg) => {
        console.log('auth_failure', msg)
    })
    
    // loading screen
    clientWSP.on('loading_screen', (porcentaje, mensaje) => {
        console.log(`Cargando ${porcentaje} - ${mensaje}`)
    })

    clientWSP.on('ready', () => {
        console.log('Client is ready!')
      })
    
    // test send msg !ping and return pong
    /* clientWSP.on('message', async (message) => {
        if (message.body === '!ping') {
            await message.reply('pong');
        }
    }); */

    clientWSP.on('message', message => {
        sendMsgReceived(message.from, message.body) // .from es de la librería y es el número, el .body el mensaje
    })
     
    
    await clientWSP.initialize();
}

const sendMsg = async (numero, mensaje) => {
    try {
        numero = numero + '@c.us' // <number>@c.us -- the <number> is user id |  <number>@g.us -- the <number> is group id
        const res = await clientWSP.sendMessage(numero, mensaje);
        return res;
    } catch (err) {
        const mensajeError = `Error al enviar el mensaje a ${numero}`;
        console.log(mensajeError, err)
        throw new Error(mensajeError) // dispara el mensaje error hacia el cliente final
    }
}

 module.exports = {initializeWSP, sendMsg}