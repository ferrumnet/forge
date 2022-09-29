var axios = require("axios").default;
var Web3 = require('web3');
var { Big } =  require("big.js");

module.exports = {
  async getNetworkByChainId(chainId: any) {
    try {
      let url = `${process.env.networkBaseUrl}${chainId}`;
      let res = await axios.get(url);
      return res.data.body.network;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
