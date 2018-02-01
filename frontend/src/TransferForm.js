import React, { Component } from 'react';
import axios from 'axios';



class TransferForm extends Component {
      constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {accounts: this.props.accounts,transferFrom:this.props.accounts[0].balance,transferTo:this.props.accounts[0].balance, amount:0, description:"", to:this.props.accounts[0]["_id"],from:this.props.accounts[0]["_id"]};
      }
      componentWillReceiveProps(nextProps){
               this.setState({accounts: nextProps.accounts,transferFrom:nextProps.accounts[0].balance,transferTo:nextProps.accounts[0].balance,})
               }

     handleSubmit(e){
        const chalice_api = window.chalice_url
        var data = {
                    "fromAccount": this.state.from,
                    "toAccount": this.state.to,
                    "amount":this.state.amount,
                    "description":this.state.description
                  }
        console.log(data)
        axios.post(chalice_api + '/transfer', data).then(function(response){console.log(response)});
     }

      onChange(e){
          this.setState({[e.target.id]:e.target.value})
       }

      handleSelect(e){

             for (var i=0; i<this.state.accounts.length ; i++){
                if (this.state.accounts[i].nickname === e.target.value )
                    {
                    this.setState({[e.target.id]:this.state.accounts[i].balance, [e.target.name]:this.state.accounts[i]["_id"]})
                    }
             }

          }

     render(){

        const account_options = this.state.accounts.map((account)=>
        <option> {account.nickname}</option>
        )

        return ( <div className="well well-sm">
                    <form onSubmit={this.handleSubmit}>
         	            <p>From: <span id="transferFromAccount"></span></p>
                          <select onChange={this.handleSelect} className="form-control" name="from" id="transferFrom" >
                            {account_options}
                          </select>
                          <br />
                           <p className="red"> {this.state.transferFrom - this.state.amount} </p>

                       	<br />

                       	<p>To: <span id="transferToAccount"></span></p>
                          <select onChange={this.handleSelect} className="form-control" name="to" id="transferTo">
                            {account_options}
                          </select>
                          <br />
                            <p className="green"> {this.state.transferTo + parseInt(this.state.amount)} </p>

                       	<br />


                       		<p>Amount: <span id="transferAmount"></span></p>
                       		<input id="amount" type="text" name="amount" onChange={this.onChange} />
                       		<br /><br />
                       		<p>Description: <span id="transferDescription"></span></p>
                       		<input id="description" type="text" name="description" onChange={this.onChange} />
                       		<br /><br />


                       		<input type="submit" className="btn btn-primary" name="Confirm Transfer" />
                       	</form>

                 </div>
                  );


     }
}

export default TransferForm;


