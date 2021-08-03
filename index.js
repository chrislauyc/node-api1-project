const server = require('./api/server');

const port = 5000;

server.app.listen(port,()=>console.log(`app listening at http://localhost:${port}`))
// START YOUR SERVER HERE
