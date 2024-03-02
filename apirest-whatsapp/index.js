const app = require('./src/config/wsp/apirest-server');
const {initializeWSP} = require('./src/config/wsp/initWSP');

// initializeWSP();

//invoked function
(async() => {
    try {
        await initializeWSP()
        app.listen(3000, () => {
            console.log('server listening on port 3000');
        })
    } catch (err) {
       console.error(err);
       process.exit(1);
    }
})()