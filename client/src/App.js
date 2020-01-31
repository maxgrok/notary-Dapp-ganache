import React, { Component } from "react";
import ipfs from './ipfs';
import getWeb3 from './getWeb3';
import { EthAddress,ToastMessage,Input, Button, Link, Card, Heading, Text} from 'rimble-ui';
import ProofOfExistenceContract from './contracts/ProofOfExistence.json';

class App extends Component {

  state = { web3: null, ipfsHash: null, buffer: null};  

  componentDidMount = async () => {
    try {
     // Get network provider and web3 instance.
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      debugger;
      const deployedNetwork = ProofOfExistenceContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ProofOfExistenceContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ networkId, web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
   };

  notarize(ipfsHash, {...props}){
    const { accounts, contract } = this.state;
    console.log(accounts);
     contract.methods.notarize(ipfsHash).send({ from: accounts[0] });
  }

  awaitingNotarizeToast(){
    if(this.state.ipfsHash){
      return (<div>
        {window.toastProvider.addMessage("Awaiting your confirmation through MetaMask", {
        secondaryMessage: "Your document "+ this.state.ipfsHash + " is will be notarized.",
        actionHref:"",
        actionText: "",
        variant: "processing"})}
      </div>
      )
    }
  }
//IPFS Functions     

  //captures file uploaded through Files API 
    captureFile = (event)=>{
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend =() => this.convertToBuffer(reader);
  }
  //converts file to buffer to upload to IPFS
convertToBuffer = async(reader) =>{
    const buffer = await Buffer.from(reader.result);
    this.setState({ buffer })
  }

 //uploads document file to IPFS and sets the IPFS Hash in response to ipfsHash
  onIPFSSubmit = async() =>{
     await ipfs.add(this.state.buffer, (err, ipfsHash)=>{
      console.log(err, ipfsHash);
      this.setState({ipfsHash: ipfsHash[0].hash});
      this.notarize(ipfsHash[0].hash);
      this.awaitingNotarizeToast();
    });
  }
//End of IPFS Functions

  render() {
    if (!this.state.web3) {

      return  <Card maxWidth={'640px'} mx={'auto'} p={3} >
      <Text>Loading Web3, accounts, and contract...</Text>
      </Card>
    }

    return (
      <div className="App">
      <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
      <Card maxWidth={'640px'} mx={'auto'} p={3} >
                  <Heading.h2 mr={3}>
                    <span role="img" aria-label="Waving hand">
                      👋
                    </span>
                  </Heading.h2>
                  <Text>
                    Hi there, I'm Max. <br/><br/>This is my Proof of Existence Dapplication for the Consensys Academy Blockchain Bootcamp! <br/><br/> It can notarize any document you want to upload and place it on IPFS. Give it a whirl!
                  </Text>
                </Card>
        <Card maxWidth={'640px'} mx={'auto'} p={3} >
                  <Text>
                    <strong>Warning: this Dapp only works on your local Ganache at port 8545.</strong>
                  </Text>
                </Card>
        <Card maxWidth={'640px'} mx={'auto'} p={3} >
        <Card maxWidth={'640px'} mx={'auto'} p={3} px={4}>
                  <Text><strong>Step 1:</strong> Upload a File from your Computer!
<br/><br/>
                  You will see the button "Choose File..." update with your file's name upon selecting a file from your computer!
<br/><br/>
                  The application will not notarize or upload without this! <br/><br/>
                  </Text>
          <Input type="file" name="file" id="file" onChange={this.captureFile} />
          </Card>
          <br/><br/>
          <Card maxWidth={'640px'} mx={'auto'} p={3} px={4}>
           <Text><strong>Step 2:</strong> Click "Upload to IPFS and Notarize with Ganache" to upload your document to IPFS and notarize it. 
                <br/><br/>
                  You will see an update with your IPFS Hash and a link to the IPFS Browser to see your file! 
                  <br/><br/><strong> Make sure you have Ganache running on port 8545, not 7545.</strong>
                  <br/><br/>You will also be prompted by MetaMask to notarize the IPFS Hash of the document you uploaded. <br/><br/><strong>Please click "Confirm" in the MetaMask pop up after clicking this button</strong>
                  </Text>
         
          <Button mb={3} onClick={async(e)=>{
              e.preventDefault();
              this.onIPFSSubmit();
              }}>Upload to IPFS and Notarize with Ganache</Button>
          </Card>
          <Card maxWidth={'640px'} mx={'auto'} p={3} >
          {this.state.ipfsHash ? <Text><strong>IPFS Hash for your file: <br/><EthAddress address={this.state.ipfsHash}/></strong> <br/><strong>To see the file on IPFS, go to the</strong> <Link href={'//ipfsbrowser.com/'} target="_blank" title="This link goes somewhere">IPFS Hash Browser</Link> <strong>and enter in this hash.</strong> </Text>: ""}
          </Card>
  </Card>
  </div>
);
  }

}

export default App;