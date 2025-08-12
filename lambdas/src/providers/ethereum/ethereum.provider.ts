import { Contract, ethers, Wallet } from 'ethers';
import { rpcUrlByNetworkName } from './ethereum.networks';
import 'dotenv/config';

import { abi } from '../../../../contracts/artifacts/contracts/BOVICHAIN.sol/BOVICHAIN.json';
import logger from '../../utils/logger.util';

export type MintParams = {
  id: Number;
  name: String;
  data: any;
}

export type MintResult = {
  from: string;
  to: string;
  hash: string;
  data: any
}

export class EthereumProvider {

  private provider: ethers.providers.JsonRpcProvider;
  private contractAddress: string;
  
  constructor() {

    if(!process.env.CONTRACT_BOVICHAIN) {
      logger.error(`Environment variable CONTRACT_BOVICHAIN is required`);
      throw new Error('Environment variable CONTRACT_BOVICHAIN is required')
    }
    this.contractAddress = process.env.CONTRACT_BOVICHAIN;

    if(!process.env.POLYGON_RPC) {
      logger.error(`Environment variable POLYGON_RPC is required`);
      throw new Error('Environment variable POLYGON_RPC is required')
    }
    this.provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC)
  }

  public async getBlockByNumber(blockNumber?: number) {
    return await this.provider.getBlock(blockNumber || 'latest');
  }

  public async mint(params: MintParams, privateKey: string): Promise<MintResult> {

    const wallet = new Wallet(privateKey, this.provider);
    const contract = new Contract(this.contractAddress, abi, wallet);

    //const estimatedGasLimit = await contract.estimateGas.mint(Number(params.id), params.name, JSON.stringify(params.data));
    //console.log(`Gas Limit estimated in: ${estimatedGasLimit.toString()}`);

    try {
      const tx = await contract.mint(Number(params.id), params.name, JSON.stringify(params.data), {
      //gasLimit: estimatedGasLimit, // ajuste se necessário
      //maxFeePerGas: ethers.utils.parseUnits('26', 'gwei'), // total máximo de gas (incluso base + tip)
      //maxPriorityFeePerGas: ethers.utils.parseUnits('25', 'gwei'), // gorjeta para validadores
    })

    return {
      from: tx.from,
      hash: tx.hash,
      to: tx.to,
      data: params.data,
    }

    } catch (error: any) {
      console.error(error)
      throw new Error(error.body)
    }
 


  }

  public async tokenURI(id: number): Promise<string> {

    const contract = new Contract(this.contractAddress, abi, this.provider);
    const result = await contract.tokenURI(id);
    
    const prepareResponse = Buffer.from(result, 'base64').toString('utf8');
    return prepareResponse;
  }
 
}