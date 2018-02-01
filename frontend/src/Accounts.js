import React, { Component } from 'react';


class Accounts extends Component {
     constructor(props) {
        super(props);
         this.state = {accounts: this.props.accounts,};
      }

     componentWillReceiveProps(nextProps){
     this.setState({accounts:nextProps.accounts})
     }

     render(){

        var html_rows = this.state.accounts.map((account) =>
            <div class="row">
                <div className="well well-sm account" id="{{ account._id }}">
                    <p className="nickname" >{account.nickname}</p>
                    <p className="balance">{account.balance}</p>
                </div>
            </div>
        );


        return ( <div> {html_rows} </div> );


     }
}

export default Accounts;
