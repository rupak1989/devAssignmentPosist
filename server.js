var express 			= require('express'),
 	 mongoose 			= require('mongoose'),
	 bodyParser 		= require('body-parser'),
	 generateCustomer 	= require('./server/generateData');
	 //routes           	= require('./routes/index');




var PORT  = process.env.PORT || 8081;
console.log('rupak server has has been created ', PORT);
var app = express();


mongoose.connect('mongodb://localhost:27017/posist');
console.log('Mongo DB has been connected');
app.use(bodyParser.json());



app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads")); 

//generate customer and bill records
generateCustomer.generateCustomerAndBill();

app.get('/customers/get', require('./server/controllers/userController').find);
app.get('/customers/bills/get', require('./server/controllers/billsController').find);
app.get('/customer/:userId/get', require('./server/controllers/userController').findCustomer);
app.post('/customer/create', require('./server/controllers/userController').createUser);
app.post('/customer/update', require('./server/controllers/userController').updateUser);
app.get('/customer/:userId/get/report', require('./server/controllers/userController').getReport);



app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/customers', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


app.listen(PORT, function(){
  console.log('listening to port no ' + PORT);
});
