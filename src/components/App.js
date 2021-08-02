import { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar';
import Marketplace from '../abis/Marketplace.json';

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying Metamask.')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    // console.log(accounts)
    this.setState({ accounts: accounts[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if (networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      console.log(productCount.toString())
      this.setState({ loading: false })
    } else {
      window.alert('Marketplace contract not deployed to deteted network')
    }
  }

  createProduct(name, price) {
    this.setState( {loading: true})
    this.state.marketplace.methods.createProduct(name, price).send({ 
      from: this.state.account
    })
    .once('receipt', (receipt) => {
      this.setState( { loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
    this.createProduct = this.createProduct.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
      </div>
    )
  }
}

export default App;
