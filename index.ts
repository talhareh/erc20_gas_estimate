import express from 'express';
import dotenv from 'dotenv'
import axios from 'axios'
import {ethers} from 'ethers'


dotenv.config()
const app = express();

interface CheckTokenRequest {
  contractAddress: string;
}

app.use(express.json());

app.post('/checkToken',async  (req: express.Request<{}, {}, CheckTokenRequest>, res) => {
  
  if (!req.body || !req.body.contractAddress) {
    return res.status(400).json({ error: 'Missing contractAddress in request body' });
  }

  const { contractAddress } = req.body;
  const infura = 'https://mainnet.infura.io/v3/c013cd5cea7f4773bef9c18c34abc378'
  const fromAddress = '0xDF518d298b2F14c92c11d9B03F52dcC7F80EE9ba'
  const toAddress = '0x148D0b5E21CE7641DDDa10114DA6Fc83d75B000F'
  const amountWei = ethers.utils.parseUnits("1.0",18)
  const basescanApiKey = process.env.BASESCAN_API_KEY;
  const apiUrl = `https://api.basescan.org/api?module=contract&action=getabi&address=${contractAddress}&apikey=${basescanApiKey}`;

  try {
    const response = await axios.get(apiUrl);
    //console.log(response)
    const abiData = response.data.result;
    
    if (abiData) {
        const provider = new ethers.providers.JsonRpcProvider(infura)
        
        const contract = new ethers.Contract(contractAddress, abiData, provider);
        
        // Estimate gas for transfer
        const estimateGas = await contract.estimateGas.transfer(toAddress, amountWei, { from: fromAddress });
        console.log("\n\n\n******************************************")
        console.log({estimate : estimateGas})
        console.log("\n\n******************************************")
        
        const gasPrice = await provider.getGasPrice();
        console.log(provider)
        const gasCost = estimateGas.mul(gasPrice);
  
        res.json({
          contractAddress,
          //abi: abiData,
          gasEstimate: estimateGas.toString(),
          gasPrice: gasPrice.toString(),
          gasCost: ethers.utils.formatEther(gasCost) + ' ETH'
        });
    } else {
      res.status(404).json({ error: 'ABI not found for contract address' });
    }
  } catch (error) {
    console.error("Error fetching ABI:", error);
    res.status(500).json({ error: 'Problem token' });
  }
});

const port =  process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
