var Tester = require('./eth.js');
var gamanetz = new Tester();
var express = require('express');
var session = require('express-session');
var fileSession = require('session-file-store')(session);
var fileStore = new fileSession();
var app = express();
var port = process.env.PORT || '3000';
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
app.use(session({
  secret: 'ethereum-gamanetz-2018',
  name: 'guest',
  store: fileStore,
  resave: true,
  rolling: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 86400000 }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, content-type, Accept, X-CSRF, X-XSRF-TOKEN");
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  next();
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname,'public','index.html'));
});

app.post('/rx/send_tx', (req, res) => {
  	let account = gamanetz.pk_to_account(req.body._priv);
  	gamanetz.load(account.address, account.privateKey.replace('0x',''));
	gamanetz.transactions().create({
		to: req.body.to || null,
		value: req.body.amount || '0.01', // Eth amount of tx
		gasp: req.body.gasp || '12', // Gas fee in gwei https://ethgasstation.info/
		gasl: req.body.gasl || '21000', // Gas limit in gwei https://ethgasstation.info/
	})
	.then(tx => {
		// gamanetz.transactions().send(tx).then(txhash => {
		// 	gamanetz.web3.eth.getTransaction(txhash).then(console.log).catch(console.error);
  // 			res.json({status:'ok', 'message':'Your tx signed and queued. Raw tx: ' + txhash});
		// });
	})
	.catch(e => {
		res.json({status:'failed', 'message':'Error on creating transaction ' + e});
	});
});

app.post('/rx/create_wallet', (req, res) => {
	var mnemonic = req.body._mnemonic ? req.body._mnemonic.toString() : '';
	var response = gamanetz.create_wallet(mnemonic);
	response.status = 'ok';
	response.privateKey = response.privateKey.replace('0x', '');
  	res.json(response);
});

app.post('/rx/enter', (req, res) => {
  let account = gamanetz.pk_to_account(req.body._priv);
  if(account) {
	  gamanetz.get_balance(account.address, response => {
	  	response.account = account.address;
	  	if(response.status == 'ok') {
	  		req.session.signed = 1;
	  		req.session._account = account.address;
	  		req.session._priv = account.privateKey;
	  		req.session.save();
	  	}
	  	res.json(response);
	  });
  } else {
  	res.json({'status':'failed'});
  }
});

app.post('/rx/check_balance', (req, res) => {
  if(req.body._account) {
  	gamanetz.get_balance(req.body._account, response => {
  		res.json(response);
  	});
  } else {
  	res.json({status:'failed'});
  }
});

app.listen(port, () => console.log(`Running on localhost:${port}`));
