import React, { Component } from "react";
import ipfs from './ipfs';
import getWeb3 from './getWeb3';
import { Flex,ToastMessage, Button, Link, Card, Heading, Text, ThemeProvider, Box} from 'rimble-ui';
import ProofOfExistenceContract from './contracts/ProofOfExistence.json';

class App extends Component {

  state = { route: "default"};

  config = {
    accountBalanceMinimum: 0.001,
    requiredNetwork: 4
  }


  showRoute = route => {
    this.setState({
      route
    });
  };

  componentDidMount = async () => {
    try {
     // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ProofOfExistenceContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ProofOfExistenceContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ networkId, web3 });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
   };

  captureFile = (event)=>{
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend =() => this.convertToBuffer(reader);
  }

  async notarize(){
    const { accounts, contract } = this.state;
    let fileName = document.getElementById('file').files[0].name;
    await contract.methods.notarize(fileName).send({ from: accounts[0] });
  }

  async checkDocument(){
    const { contract } = this.state;
    let fileName = document.getElementById('file').files[0].name;
    const response = await contract.methods.checkDocument(fileName).call();
    this.setState({ storageValue: response});
  }

  checkDocumentToast(){
    const { contract } = this.state;
    let fileName = document.getElementById('file').files[0].name;
    return (<div>
        <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
        {window.toastProvider.addMessage("Verifying...", {
        secondaryMessage: "Checking document is notarized",
        actionHref:"",
        actionText: "",
        variant: "processing"})}
      </div>
      )
  }

  async ipfsHashCalculating() { 
        return (<div>
        <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
        {window.toastProvider.addMessage("IPFS Hash is being calculated...", {
        secondaryMessage: "",
        actionHref:"",
        actionText: "",
        variant: "processing"})}
      </div>
      )
  }

  async ipfsHash(){
    await ipfs.add(this.state.buffer, (err, ipfsHash)=>{
      console.log(err, ipfsHash);
      this.setState({ipfsHash:ipfsHash[0].hash});
    }) 
  }

  notarizeToast(){
    let fileName = document.getElementById('file').files[0].name;
    if(fileName !=''){
      return (<div>
        <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
        {window.toastProvider.addMessage("Document is being notarized", {
        secondaryMessage: "Your document "+ fileName + " is being notarized.",
        actionHref:"",
        actionText: "",
        variant: "processing"})}
      </div>
      )
    }
    }

  onClick = async(e) =>{
    let fileName = document.getElementById('file').files[0].name;
    let file = document.getElementById('file').files[0];
  }

  render() {
    if (!this.state.web3) {
      return <Heading.h2>Loading Web3, accounts, and contract...</Heading.h2>;
    }

    return (
      <div className="App">
        <h2>Proof Of Existence</h2>
        <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
        <p> Click "Choose File" to add a file to notarize and upload to IPFS. </p>
        <p>Once you choose a file, upload it to IPFS and notarize it with Ganache on your private blockchain!</p>
        <br/>
        <br/>
        <form id="form" onSubmit={this.onClick}>
          <input type="file" name="file" id="file" onChange={this.captureFile} />
          <Button as="submit" mb={3} onClick={this.onClick}>Upload to IPFS and Notarize with Ganache</Button>
          <br/>
        </form>
        <div>
        <p>Save your IPFS Hash.</p>
        <p>Your IPFS Hash is {this.state.ipfsHash}</p>
        </div>
        <ToastMessage.Success
  my={3}
  message={"Your IPFS Hash is: "+ this.state.ipfsHash}
/>
      </div>
          )}

}

export default App;