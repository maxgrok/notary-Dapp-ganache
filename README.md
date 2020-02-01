# README
App Demo: http://bit.ly/31cUDmb
<em>Pre-requisites: Internet Connection, Truffle, NPM, Node.js
</em>
Rinkeby contract deployed: https://rinkeby.etherscan.io/address/0x5b0c51dDA0263bBffEb3093D7F664305FB075e08/ 

<a href="https://youtu.be/9RAs2jaa3fU">![ganache-notary-dapp-demo](https://media.giphy.com/media/XHuqn9rTrup0UqEp2w/giphy.gif)</a>

## What does this project do? 

This is a final project for Consensys Academy Blockchain Developer Bootcamp. It allows users to upload a file to IPFS and notarize it with their MetaMask Local Ganache Ethereum Account and post it on Rinkeby Testnet with the simple click of a single deploy button. Complete with toast messages for user status updates. 

## How Do I Set It Up Locally? 

### Pre-Requisites

<em>Required:</em> MetaMask, Truffle, Node.js, Npm/yarn, Internet Connection (for IPFS uploads)<br/>

### 1st
Update .secret file with your Mnemonic for your MetaMask account and set your MetaMask extension to custom network `localhost` at port `8545`. 

### 2nd
Run `ganache-cli -m 'yourMnemonichere'` and `truffle compile && truffle migrate --network development` to deploy your ProofOfExistence contract to your local blockchain. Move the contracts folder with the .json files in it to client/src/contracts. 

### 3rd
Install dependencies in `client/` directory with `npm i`, then run `npm start` to start application.

### 4th
Navigate to `localhost:3000` and upload and notarize documents with one click of a button!
 
 
 # Ubuntu-Setup For Grading
Ubuntu Setup Document for CABB Testing

# Install the following: 
## Git
sudo apt install git 

## npm
sudo apt install npm

## nvm 
sudo apt-get install build-essential libssl-dev --- installs C++ compiler dependency for nvm
sudo apt-get curl -- installs curl 
curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash

## node 
nvm install 12 (compatible version of node for Dapp below)
nvm use 12 --default (makes 12 default version)

## ganache
https://github.com/trufflesuite/ganache/releases -- for up to date information.
npm install -g ganache-cli 
npm install -g ganache-core@latest

## solc
sudo add-apt-repository ppa:ethereum/ethereum 
sudo apt-get update 
sudo apt-get install solc

## truffle
npm install -g truffle
https://www.trufflesuite.com/docs/truffle/getting-started/installation

## MetaMask
metamask.io/  -- chrome or firefox or etc.

## VS Code 
sudo snap install code --classic

## Git Clone Repo of Dapp project
https://www.github.com/maxgrok/notary-Dapp-ganache.git
cd into client/
npm i
cd into root directory
update .secret with your mnemonic

// only if you want to deploy the contract to a testnet or mainnet
update the infuraKey in truffle-config.js (sign up for <a href="https://infura.io/">Infura</a> if you do not have an account, create a new project, view your project, copy the projectId and paste it into your infuraKey variable)
////

#### Credits
Made with <3 from <a href="https://github.com/ConsenSys/rimble-app-demo">Rimble App Demo</a>.

#### License 
MIT License, Max Goodman, January 2020. 


