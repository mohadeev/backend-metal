const express = require("express");
const app = express();
const Web3 = require("web3");
const dotenv = require("dotenv");

dotenv.config();

const web3 = new Web3(process.env.INFURA_URL); // Initialize web3 with Infura endpoint or local node URL
const contractAddress = process.env.CONTRACT_ADDRESS; // MohaCoin contract address
const contractABI = JSON.parse(process.env.CONTRACT_ABI); // MohaCoin contract ABI
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

app.post("/transfer", async (req, res) => {
  const { toAddress, amount } = req.body; // Get the user's Ethereum wallet address and amount of tokens to transfer
  const myAddress = await web3.eth.getCoinbase(); // Get your own Ethereum wallet address
  const privateKey = Buffer.from(process.env.PRIVATE_KEY, "hex"); // Convert your private key from hex string to buffer
  const nonce = await web3.eth.getTransactionCount(myAddress); // Get the nonce for the transaction

  const txObject = {
    nonce: web3.utils.toHex(nonce),
    to: contractAddress,
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    value: "0x0",
    data: contractInstance.methods.transfer(toAddress, amount).encodeABI(),
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    txObject,
    privateKey
  ); // Sign the transaction with your private key
  const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction); // Send the signed transaction to the Ethereum network

  res.json(result);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

const transferTokens = async (toAddress, amount) => {
  const response = await fetch("/transfer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toAddress, amount }),
  });

  const result = await response.json();

  console.log(result);
};
