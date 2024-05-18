# erc20_gas_estimate
This project provides a simple API to estimate the gas cost for transferring tokens on the Ethereum mainnet.

Installation
Prerequisites:

Node.js and npm installed on your system (https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
Steps:

Clone the repository or download the project files.
Open a terminal and navigate to the project directory.
Install the project dependencies:
Bash
npm install
Use code with caution.
content_copy
Configuration
Environment Variables:

This project uses environment variables to store sensitive information. You'll need to create a .env file in the project root directory and add the following variable:

BASESCAN_API_KEY: Your API key for accessing the Etherscan API. You can get a free API key by registering on https://etherscan.io/.
Example .env file:

BASESCAN_API_KEY=YOUR_API_KEY
Important:

Do not commit your .env file to version control.
Usage
Running the server:

Start the server using:
Bash
npm start
Use code with caution.
content_copy
This will start the server on port 5000 by default. You can customize the port by setting the PORT environment variable.

API endpoint:

The project exposes a single API endpoint:

POST /checkToken
This endpoint accepts a JSON request body with the following structure:

JSON
{
  "contractAddress": "STRING"
}
Use code with caution.
content_copy
Request Parameter:

contractAddress: The Ethereum address of the token contract.
Response:

The API will respond with a JSON object containing the following information:

contractAddress: The provided contract address.
gasEstimate: The estimated gas required for the transfer.
gasPrice: The current gas price on the Ethereum mainnet.
gasCost: The estimated gas cost in ETH.
Example request:

Bash
curl -X POST http://localhost:5000/checkToken -H "Content-Type: application/json" -d '{"contractAddress": "0x..."}'
Use code with caution.
content_copy
Example response:

JSON
{
  "contractAddress": "0x...",
  "gasEstimate": "100000",
  "gasPrice": "10000000000",
  "gasCost": "0.00001 ETH"
}
Use code with caution.
content_copy
