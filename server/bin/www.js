const app = require('../app');
const normalizePort = (val) => {
    let port = parseInt(val, 10);
    if(port > 0) {
        return port;
    }
    return false;

}

const PORT = normalizePort(process.env.PORT || '5000');

app.listen(PORT, () => console.log(`Server initialized on port ${PORT}`));