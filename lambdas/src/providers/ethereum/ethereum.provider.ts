import { Contract, ethers, Wallet } from 'ethers';
import 'dotenv/config';

import { abi } from '../../../../contracts/artifacts/contracts/Bovichain.sol/BoviChain.json';
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
  link?: string;
}

export class EthereumProvider {

  private provider: ethers.JsonRpcProvider;
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
    this.provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC)
  }

  public async getBlockByNumber(blockNumber?: number) {
    return await this.provider.getBlock(blockNumber || 'latest');
  }

  public async mint(params: MintParams, privateKey: string, dryrun: boolean = false): Promise<MintResult> {

    const wallet = new Wallet(privateKey, this.provider);
    const txExplorerUrl = `${process.env.POLYGONSCAN_URL}/tx`;

    if(dryrun) {
      logger.info('Dryrun mode enabled for mint');
      return {
        from: wallet.address,
        to: ethers.ZeroAddress,
        hash: ethers.ZeroHash,
        data: params.data,
        link: `${txExplorerUrl}/${ethers.ZeroHash}`
      };
    }

  

    const contract = new Contract(this.contractAddress, abi, wallet);

    const gasEstimated = await this.estimateGas(contract, 'mint', Number(params.id), params.name, JSON.stringify(params.data));
    const gasEstimatedLimit = gasEstimated * BigInt(120) / BigInt(100);
    const gasPrice = (await this.provider.getFeeData()).gasPrice;

    logger.info(`Estimated gas for mint: ${gasEstimated.toString()}`);
    logger.info(`Estimated gas limit for mint: ${gasEstimatedLimit.toString()}`);
    logger.info(`Current gas price: ${gasPrice}`);

    try {
      const tx = await contract.mint(Number(params.id), params.name, JSON.stringify(params.data), {
      gasLimit: gasEstimatedLimit,
      gasPrice: gasPrice,
    })

    return {
      from: tx.from,
      hash: tx.hash,
      to: tx.to,
      data: params.data,
      link : `${txExplorerUrl}/${tx.hash}`
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
  private async estimateGas(contract: Contract, methodName: string, ...args: any[]): Promise<bigint> {
    try {
      return await contract[methodName].estimateGas(...args);
    } catch (error) {
      logger.error(`Error estimating gas for ${methodName}: ${error}`);
      throw error;
    }
  }
 
}