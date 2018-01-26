import React, { Component } from 'react';



class TransferForm extends Component {
      constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {accounts: this.props.accounts,transferFrom:0,transferTo:0};
      }

     handleSubmit(event){
        console.log(event);
        event.preventDefault();
     }

      handleSelect(e){

             for (var i=0; i<this.state.accounts.length ; i++){
                if (this.state.accounts[i].nickname === e.target.value )
                    {
                    this.setState({[e.target.id]:this.state.accounts[i].balance})
                    }
             }

          }

     render(){

        const account_options = this.state.accounts.map((account)=>
        <option> {account.nickname}</option>
        )

        return ( <div className="well well-sm">
         	            <p>From: <span id="transferFromAccount"></span></p>
                          <select onChange={this.handleSelect} className="form-control" id="transferFrom" >
                            {account_options}
                          </select>
                          <br />
                           <p className="red"> {this.state.transferFrom} </p>

                       	<br />

                       	<p>To: <span id="transferToAccount"></span></p>
                          <select onChange={this.handleSelect} className="form-control" id="transferTo">
                            {account_options}
                          </select>
                          <br />
                            <p className="green"> {this.state.transferTo} </p>

                       	<br />

                       	<form onSubmit={this.handleSubmit}>
                       		<p>Amount: <span id="transferAmount"></span></p>
                       		<input id="amount" type="text" name="amount" />
                       		<br /><br />
                       		<p>Description: <span id="transferDescription"></span></p>
                       		<input id="description" type="text" name="description" />
                       		<br /><br />


                       		<input id="toAccount" type="hidden" name="toAccount" />
                       		<input id="fromAccount" type="hidden" name="fromAccount" />

                       		<input type="submit" className="btn btn-primary" name="Confirm Transfer" />
                       	</form>

                 </div>
                  );


     }
}

export default TransferForm;


