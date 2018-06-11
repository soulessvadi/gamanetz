"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tx = require("ethereumjs-tx");
const Fs = require("fs");
const Web3 = require("web3");
const bip39 = require("bip39");

class Tester {
    constructor() {
        this.provider = "https://mainnet.infura.io/PddluMUvtBCZgkY5f6sN";
        // this.provider = "https://mainnet.infura.io/PddluMUvtBCZgkY5f6sN";
        // this.provider = 'http://localhost:8545';
		this.web3 = new Web3(new Web3.providers.HttpProvider(this.provider));
		this.web3.eth.net.isListening()
		.then(() => console.log(`Connection established. Node ${this.provider}`))
		.catch(e => console.log(`Couldn\`t connect to ${this.provider}`));
        this.wallet = null;
        this.private_key = null;
    }
    loadWallet(wallet, pk) {
        this.wallet = wallet;
        this.private_key = pk;
    }
    createWallet() {
		let mnemonic = bip39.generateMnemonic();
		let seed = bip39.mnemonicToSeed(mnemonic);
		return self.web3.eth.accounts.create(seed); 
    }
    balance() {
    	console.log(`Fetching balance...`);
		let balance = this.web3.eth.getBalance(this.wallet)
		.then(res => {
			let eth = this.web3.utils.fromWei(res, 'ether');
    		console.log(`Wallet: ${this.wallet}`);
			console.log(`Balance: ${eth} ETH`);
		})
		.catch(e => console.error('Something went wrong'))
        return balance;
    }
    pkToAccount(pk) {
    	return this.web3.eth.accounts.privateKeyToAccount('0x' + pk);
    }
    transactions() {
    	var self = this;
    	return {
    		create: function(argv) {
    			argv.gas = self.web3.utils.toWei(argv.gas, 'gwei');
    			return new Promise(function(resolve, reject) {
					self.web3.eth.getTransactionCount(self.wallet, function (err, nonce) {
						if(err) reject(err);
						console.log('Collecting raw tx...');
						var tx = new Tx({
							to: argv.to,
							chainId: self.web3.utils.toHex('4'),
							nonce: self.web3.utils.toHex(nonce),
							gasPrice: self.web3.utils.toHex(argv.gas),
							gasLimit: self.web3.utils.toHex('21000'),
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

let testnet = new Tester();
testnet.loadWallet('0x65bc2bc63e956628db7c91f1ba3b995bf255d291', '9d2b7370eeb5b58232bcec6d26d1c2c4ed3714642aa19b3de841e5013e932dd0');
testnet.balance();
var account = testnet.privateKeyToAccount('9d2b7370eeb5b58232bcec6d26d1c2c4ed3714642aa19b3de841e5013e932dd0');
console.log(account);

if(process.argv[2] || null) {
	testnet.transactions().create({
		to: process.argv[2],
		value: process.argv[3] || '0.01', // Eth amount of tx
		gas: process.argv[4] || '12', // Gas fee in gwei https://ethgasstation.info/
	})
	.then(tx => {
		testnet.transactions().send(tx).then(txhash => {
			testnet.web3.eth.getTransaction(txhash)
			.then(console.log)
			.catch(console.error);
		});
	})
	.catch(e => console.log(e));
}
