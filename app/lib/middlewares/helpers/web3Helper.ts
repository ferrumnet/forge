import Web3 from 'web3';
var { Big } = require("big.js");

module.exports = {

  async getUserBalance(network: any, cabn: any, address: any) {
    let balance = await (web3ConfigurationHelper.erc20(network.rpcUrl, cabn.tokenContractAddress)).methods.balanceOf(address.address).call();
    return balance;
  },

  async getTransactionsCount(network: any, address: any) {
    let web3 = web3ConfigurationHelper.web3(network.rpcUrl).eth;
    if (web3) {
      let transactionCount = await web3.getTransactionCount(address.address, 'pending')
      return transactionCount;
    }
    return null;
  },
}
