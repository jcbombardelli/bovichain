export type Network = {
  name: 'mainnet' | 'testnet';
  rpcUrl: string;
}
export type Networks = Network[];
export type NetworksList = Network[];

export const networks: Networks = [
  {
    name: 'mainnet',
    rpcUrl: '',
  },
  {
    name: 'testnet',
    rpcUrl: 'https://rpc-amoy.polygon.technology',
  },
]

export function networkByName(name: string): Network | undefined {
  return networks.find((network) => network.name === name);
}

export function rpcUrlByNetworkName(name: string): string | undefined {
  return networkByName(name)?.rpcUrl;
}
