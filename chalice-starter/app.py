from chalice import Chalice
import requests
import json
from jinja2 import Environment, PackageLoader, select_autoescape
import datetime

app = Chalice(app_name='chalice-starter')
apiKey = "3ab6d523a29713d557d8d75ee7d68325"


@app.route('/', cors=True)
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

        env = Environment(
            loader=PackageLoader('chalice-starter', 'templates'),
            autoescape=select_autoescape(['html', 'xml'])
        )
        template = env.get_template("notfound.html")

        return template.render()

        #  return template.render(accounts=accountsNoCards, format_price=format_price, transfers=transfers)
    else:
        template = Template("notfound.html")
        return template.render()
