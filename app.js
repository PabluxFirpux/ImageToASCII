const createAsciiHTML = require('./imageToAscii');
const express = require("express")

const app = express();
const port = 23232
app.use(express.json());
// Routing
app.post('/sendimg', async(req, res) => {
    console.log('recieved request')
    res.status(200).json({ message: "pedo"} )
});



app.listen(port, () => console.log('API server is running on port ' + port));





//createAsciiHTML('./resources/mongus.webp');
