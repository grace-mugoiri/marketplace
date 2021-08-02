import React, { Component } from 'react';

class Main extends Component {
    render() {
        return (
            <div id="content">
                <h2>Add Product</h2>
                <form 
                    onSubmit={(event) => {
                    event.preventDefault()
                    const name = this.productName.value
                    const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                    this.props.createProduct(name, price)
                    }}>

                    <div className="form-group mr-sm-2">
                        <input 
                            type="text" 
                            id="productName" 
                            ref={(input) => {this.productName = input }}
                            className="form-control"
                            placeholder="productName"
                            required
                        />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input 
                            type="text" 
                            id="productPrice" 
                            ref={(input) => {this.productPrice = input }}
                            className="form-control"
                            placeholder="productPrice"
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">Add product</button>
                </form>
                <p></p>
                <h2>Buy Products</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Owner</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody id="productList">
                        <tr>
                            <th scope='row'>1</th>
                            <td>Think Deeper</td>
                            <td>1 Eth</td>
                            <td>Some address</td>
                            <td><button className="buyButton">Buy</button></td>
                        </tr>
                        <tr>
                            <th scope='row'>2</th>
                            <td>Road to Recovery</td>
                            <td>1 Eth</td>
                            <td>Some address</td>
                            <td><button className="buyButton">Buy</button></td>
                        </tr>
                        <tr>
                            <th scope='row'>3</th>
                            <td>Subtle at of not giving a fuck</td>
                            <td>3 Eth</td>
                            <td>Some address</td>
                            <td><button className="buyButton">Buy</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Main;