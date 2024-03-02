const sendMsgReceived = async (numero, mensaje) => {
    try {
        const URL = 'http://localhost:8080/webhook' //url configurable

        const options = {
            method: 'POST',
            body: JSON.stringify({numero, mensaje}),
            headers: {'Content-Type': 'application/json'}
        }

        const respuesta = await fetch(URL, options) 

        if(respuesta.statusText !== 'OK') {
            throw new Error('Error en la respuesta de la API')
        } 
        await respuesta.json();
        console.log(`Respuesta exitosa de la API`)
        
    } catch (err) {
        const msgErr = `Error al enviar mensaje a ${numero}`
        console.error(msgErr, err)
        throw new Error(msgErr)
    }
}

module.exports = {
    sendMsgReceived
}