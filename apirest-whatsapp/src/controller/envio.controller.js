const { sendMsg } = require("../config/wsp/initWSP");

const envioController = async(req,res) => {
    const {numero, mensaje} = req.body;

    try {
        const respuesta = await sendMsg(numero, mensaje)

        if(respuesta) {
            res.send({mensaje: 'Mensaje enviado'})
        } else {
            res.send({mensaje: 'Mensaje no enviado'})
        }
    } catch (err) {
        const msgErr = `Error al enviar mensaje ${numero}`
        console.error(msgErr, err)
        res.status(500).send({mensaje: msgErr})
    }
}


module.exports = {envioController};