"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tx = require("ethereumjs-tx");
const Fs = require("fs");
const Web3 = require("web3");
const bip39 = require("bip39");

module.exports = class Tester {
    constructor() {
        this.provider = "https://mainnet.infura.io/PddluMUvtBCZgkY5f6sN";
		this.web3 = new Web3(new Web3.providers.HttpProvider(this.provider));
		this.web3.eth.net.isListening()
		.then(() => console.log(`Connection established. Node ${this.provider}`))
		.catch(e => console.log(`Couldn\`t connect to ${this.provider}`));
        this.wallet = null;
        this.private_key = null;
    }
    load(wallet, pk) {
        this.wallet = wallet;
        this.private_key = pk;
    }
    create_wallet(mnemonic) {
		mnemonic = mnemonic.trim.length > 10 ? mnemonic : bip39.generateMnemonic();
		let seed = bip39.mnemonicToSeed(mnemonic);
		let account = this.web3.eth.accounts.create(seed);
		account.mnemonic = mnemonic;
		Fs.writeFile(`./accounts/${account.address}.json`, JSON.stringify(account), function(err) {
		    if(err) return console.log(err);
		});
		return account; 
    }
    get_balance(account, cb) {
		let balance = this.web3.eth.getBalance(account)
		.then(res => {
			let eth = this.web3.utils.fromWei(res, 'ether');
			cb({status:'ok',balance:eth});
		})
		.catch(e => {
			cb({status:'failed',balance:null});
		})
    }
    pk_to_account(pk) {
    	return this.web3.eth.accounts.privateKeyToAccount('0x' + pk);
    }
    transactions() {
    	var self = this;
    	return {
    		create: function(argv) {
    			argv.gasp = self.web3.utils.toWei(String(argv.gasp), 'gwei');
    			argv.gasl = self.web3.utils.toWei(String(argv.gasl), 'gwei');
    			return new Promise(function(resolve, reject) {
					self.web3.eth.getTransactionCount(self.wallet, function (err, nonce) {
						if(err) reject(err);
						console.log('Collecting raw tx...');
						var tx = new Tx({
							to: argv.to,
							// chainId: self.web3.utils.toHex('1'),
							nonce: self.web3.utils.toHex(nonce),
							gasPrice: self.web3.utils.toHex(argv.gasp),
							gasLimit: self.web3.utils.toHex(argv.gasl),
							value: self.web3.utils.toHex(self.web3.utils.toWei(argv.value)),
						});
						tx.sign(new Buffer(self.private_key, 'hex'));
						var txraw = tx.serialize().toString('hex');
						resolve('0x' + txraw);
					});
				});
    		},
    		send: function(txraw) {
    			return new Promise(function(resolve, reject) {
    				self.web3.eth.sendSignedTransaction(txraw)
					.on('receipt', receipt => resolve(receipt))
					.on('error', err => reject(err));
    			});
    		},
		    list: function(cb) {
		    	console.log(`Fetching transactions...`);
				var txs = [];
				var blocks_offset = 10000;
		    	self.web3.eth.getBlockNumber().then(blocks_count => {
		    		blocks_count = blocks_count - 6250;
					(function loop(i) {
					    if (i > blocks_count - blocks_offset) {
					    	self.web3.eth.getBlock(i, true).then(block => {
							    var txfound = 0;
							    var transactions = block.transactions;
							    for(var j = 0; j < transactions.length; j++) {
							        if(String(transactions[j].to).toLowerCase() == self.wallet || 
							           String(transactions[j].from).toLowerCase() == self.wallet) {
							        	txs.push(transactions[j]);
							        	txfound = txfound + 1;
							        }
							    }
							    console.log(`Block ${block.number} | Size ${block.size}` + (txfound ? ` | Transactions listed ${txfound}` : ''));
					    	}).then(loop.bind(null, i - 1));
					    } else {
					    	cb(txs);
					    }
					})(blocks_count - 1);
		    	});
		    },
		    count: function() {
		    	console.log(`Counting transactions...`);
		    	let transactions = self.web3.eth.getTransactionCount(self.wallet).then(res => {
		    		console.log(`Signed transactions: ${res}`);
		    	});
		        return transactions;
		    }
    	};
    }
}