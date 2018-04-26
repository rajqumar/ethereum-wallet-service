$( document ).ready(function() {
	$('#seedDiv').hide();
	$('#addressDiv').hide();
	$('#logout').hide();
	$('#sendEthDiv').hide();
	$('#transactionDiv').hide();
});

function seed_phrase(){

	var password = $('#password').val();
	
	var seedphrase = lightwallet.keystore.generateRandomSeed();

	$('#passwordDiv').hide();
	$('#seedDiv').show();
	$('#seedPhrase').html(seedphrase);
}

function generate_address(password, seed){
	var password = $('#password').val();
	var seed = $('#seedPhrase').text();
	
	if(!lightwallet.keystore.isSeedValid(seed)){
		alert('Please enter a valid seed');
	}

	console.log("password:" + password + " Seed: " + seed);

	lightwallet.keystore.createVault({
		password: password,
		seedPhrase: seed
	}, function(err, ks){
		if(err) alert(err);
		ks.keyFromPassword(password, function(err, pwDerivedKey){
			if(err) alert(err);
			ks.generateNewAddress(pwDerivedKey, 1);
			var addr = ks.getAddresses();
			// var exp = lightwallet.keystore.exportKey(addr, pwDerivedKey);
			// console.log(exp);
			console.log(addr);
			$('#passwordDiv').hide();
			$('#seedDiv').show();

			var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/GOLwPdGco4MXYgisAa50"));
			console.log(web3);

			var private_key = ks.exportPrivateKey(addr, pwDerivedKey);
			var balance = web3.eth.getBalance("0x"+addr);
			var address = "0x" + addr;
			console.log("PK: " + private_key + "Balance: " + balance);	
		
			$('#logout').show();
			$('#addressDiv').show();
			$('#seedDiv').hide();
			$('#sendEthDiv').show();
			$('#info').html('Your wallet information');	
			$('#wallet_addr').text(address);
			$('#balance').text(balance);
			$('#private_key').html("<strong>Private Key: </strong>" + private_key);
			$('#private_key').hide();
		});
	});
}

function private_key_gen(){
	$('#private_key').show();
	$('#pkbutton').hide();
}

function sendEth() {
	var txs;
	var fromAddr = document.getElementById('sendFrom').value
	var toAddr = document.getElementById('sendTo').value
	var valueEth = document.getElementById('sendValueAmount').value

	var value = parseFloat(valueEth)*1.0e18
	var gasPrice = 18000000000
	var gas = 50000
	
	web3.eth.sendTransaction({from: fromAddr, to: toAddr, value: value, gasPrice: gasPrice, gas: gas}, function (err, txhash) {
	  console.log('error: ' + err)
	  console.log('go to : https://kovan.etherscan.io/tx/' + txhash)
	  var txs = 'https://kovan.etherscan.io/tx/' + txhash;
	})
	
	$('#transactionDiv').show();
	$('#etherscan').text(txs);
}