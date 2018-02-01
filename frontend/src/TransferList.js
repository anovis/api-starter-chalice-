import React, { Component } from 'react';


class Accounts extends Component {
     constructor(props) {
        super(props);
         this.state = {transfers: this.props.transfers,};
      }
     componentWillReceiveProps(nextProps){
         this.setState({transfers:nextProps.transfers})
         }

     render(){
        var html_rows = this.state.transfers.map((transfer) =>

            <tr className={( (transfer.status == 'pending') ? 'pending' : 'good')}>
                <td>{ transfer.payer_id }</td>
                <td>{ transfer.payee_id }</td>
                <td>${ transfer.amount }</td>
                <td >{transfer.status }</td>
            </tr>
        );


        return ( <div> <table class="table table-striped">
                       	<tr>
                       		<th>Pay From</th>
                       		<th>Pay To</th>
                       		<th>Amount</th>
                       		<th>Status</th>
                       	</tr>
                        {html_rows}
                       </table> </div> );


     }
}

export default Accounts;


