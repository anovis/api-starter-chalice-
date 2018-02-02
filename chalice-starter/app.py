from chalice import Chalice
import requests
import json
import datetime

from config import apiKey

app = Chalice(app_name='chalice-starter')



@app.route('/data', cors=True)
def index():
    # create the URL for the request
    accountsUrl = 'http://api.reimaginebanking.com/accounts?key={}'.format(apiKey)

    # make call to the Nessie Accounts endpoint
    accountsResponse = requests.get(accountsUrl)

    # if the accounts call responds with success
    if accountsResponse.status_code == 200:
        accounts = json.loads(accountsResponse.text)

        # filter out any credit card accounts (can't transfer money to/from them)
        accountsNoCards = []
        for account in accounts:
            if account["type"] != "Credit Card":
                accountsNoCards.append(account);

        # variable which will keep track of all transfers to pass to UI
        transfers = []

        # for each account make a request to get it's transfers where it is the payer only...
        for account in accounts:
            transfersUrl = 'http://api.reimaginebanking.com/accounts/{}/transfers?type=payer&key={}'.format(account['_id'], apiKey)
            transfersResponse = requests.get(transfersUrl)

            # if the transfer GET request was successful, add the resulting transfers to the array of data
            if transfersResponse.status_code == 200:
                transfers.extend(json.loads(transfersResponse.text))

        return {"data":{"transfers":transfers,"accounts":accountsNoCards}}
    else:
        return {"data":{"transfers":[], "accounts":[]}}


@app.route('/transfer', methods=['POST'], cors=True)
def transfer():
    request = app.current_request
    json_body = request.json_body
    # get values from the request (populated by user into the form on the UI)
    # (added some error handling here for invalid form input)
    fromAccount = json_body["fromAccount"]
    if fromAccount == "":
        return {"code":302}

    toAccount = json_body["toAccount"]
    if toAccount == "":
        return {"code":302}

    try:
        amount = float(json_body["amount"]) # need to convert to an int or this fails
    except ValueError:
        amount = ""

    description = json_body["description"]

    # set values that are not included in the form
    medium = "balance";
    dateObject = datetime.date.today()
    dateString = dateObject.strftime('%Y-%m-%d')

    # set up payload for request
    body = {
        'medium' : medium,
        'payee_id' : toAccount,
        'amount' : amount,
        'transaction_date' : dateString,
        'description' : description
    }

    # make the request to create the transfer
    url = "http://api.reimaginebanking.com/accounts/{}/transfers?key={}".format(fromAccount, apiKey)
    response = requests.post(
        url,
        data=json.dumps(body),
        headers={'content-type':'application/json'})


    # redirect user to the same page, which should now show there latest transaction in the list
    return {"data": "success"}