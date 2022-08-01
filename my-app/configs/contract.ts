export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const contractABI = [
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "newAddress", "type": "address" }], "name": "newContract", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "uint256", "name": "supply_", "type": "uint256" }], "name": "createToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];