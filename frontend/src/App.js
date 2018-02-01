import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Accounts from './Accounts.js';
import TransferForm from './TransferForm.js';
import TransferList from './TransferList.js';
import axios from 'axios';


        const data = [
         {"nickname": "placeholder", "balance":100},
         ];

         const transfers_data = [
          {"payee_id": "1", "payer_id": "2", "amount":100, "status":"canceled"},
         ];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          accounts: data,
          transfers: transfers_data
        };
      }
    componentDidMount(){
        const chalice_api = window.chalice_url
        if (chalice_api != "CHALICE_API_ENDPOINT"){
            axios.get(chalice_api + '/data')
              .then(response => {
                this.setState({accounts:response.data.data["accounts"],transfers:response.data.data["transfers"]})
              })
              .catch(error => {
                console.log('Error fetching and parsing data', error);
              });
        }
    }

  render() {
    return (
      <div className="container-fluid">


          <div className="row">
              <div className="col-md-1">&nbsp;</div>
              <div className="col-md-3">
                  <h3>My Accounts</h3>
                  <br/>
              </div>
              <div className="col-md-1">&nbsp;</div>
              <div className="col-md-6">
                  <h3>Transfer Money</h3>
                  <br/>
              </div>
          </div>


          <div className="row">
              <div className="col-md-1">&nbsp;</div>

              <div className="col-md-3">
                 <Accounts accounts={this.state.accounts} />
              </div>

              <div className="col-md-1">&nbsp;</div>

              <div className="col-md-6">
                  <TransferForm accounts={this.state.accounts} />

                  <br />
                  <h3>Transfers</h3>
                  <br/>

                  <TransferList transfers={this.state.transfers} />
              </div>
          </div>
      </div>

    );
  }
}

export default App;
