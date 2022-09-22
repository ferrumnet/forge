import Web3 from 'web3';
var { Big } = require("big.js");

module.exports = {

  async doSwapAndGetTransactionPayload(address: any, fromNetwork: any, fromCabn: any, contractAddress: string, amountValue: any, toCabn: any) {

    let userBalance = await web3Helper.getUserBalance(fromNetwork, fromCabn, address);
    let balance = await commonFunctions.amountToHuman_(fromNetwork, fromCabn, userBalance);

    if (new Big(balance).lt(new Big(amountValue))) {
      return standardStatuses.status400(`Not enough balance. ${amountValue} is required but there is only ${balance} available`);
    }

    let response = await this.swap(address, fromNetwork, fromCabn, contractAddress, amountValue, toCabn);

    return standardStatuses.status200(response.gas);
  },

  async swap(address: any, fromNetwork: any, fromCabn: any, contractAddress: string, amountValue: any, toCabn: any) {

    let amountRaw = await commonFunctions.amountToMachine(fromNetwork, fromCabn, amountValue);
    let swapResponse = web3ConfigurationHelper.bridgePool(fromNetwork.rpcUrl, contractAddress).methods.swap(fromCabn.tokenContractAddress, amountRaw, 4, toCabn.tokenContractAddress);
    let gas = await commonFunctions.estimateGasOrDefault(swapResponse, address.address, null);

    let gasLimit = gas ? gas.toFixed() : undefined;

    return {
      gas: { gasPrice: '0', gasLimit }
    };

  }

}
