require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpress = require('aws-serverless-express');
const app = express();
const fun = require('./function');
const request = require('request');

const {
    purchaseOrderList
} = require('./getPurchaseOrderList');
const {
    getpurchaseOrderById
} = require('./getpurchaseOrderById.js');
const {
    deletepurchaseOrderById
} = require('./deletepurchaseOrderById');



const cors = require('cors');
app.use(cors());
app.use(express.static("public"));
//app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.json());


//////////////////////////////////ALL SITE RELATED API'S/////////////////////////////////////



////////////////////////////ALL USERS RELATED API'S/////////////////////////////////////////


app.get('/po/poList', async function (req, res) {
    res.send(await  purchaseOrderList());
});



app.post('/po/getPoById', async function (req, res) {
    if (!req.body.Id) {
        res.send({
            'status': 0,
            'message': 'Id not provided',
            'error': 'Invalid Id'
        });
        return 0;
    }
    res.send(await getpurchaseOrderById(req.body.Id));
});



app.post('/po/deletePoById', async function (req, res) {
    var x = req.body;
    if (!x.Id) {
        res.send({
            'status': 0,
            'message': 'Id not provided!',
            'error': 'Invalid Id'
        });
        return 0;
    }
    res.send(await deletepurchaseOrderById(x.Id));
});



//////////////////////////---------------------BUSINESS RELATED API'S------------------/////////////////////////////


/////////////////////////////////////---------------------END OF BUSINESS API'S-----------------------//////////////////////////////////

// app.listen(3000, function (req, res) {
//     console.log(`server is listening on port...................`);
// });
const server=awsServerlessExpress.createServer(app);
exports.handler=(event,context)=>{
	console.log("Event handler :"+JSON.stringify(event));
	awsServerlessExpress.proxy(server,event,context);
}