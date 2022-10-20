var axios = require("axios").default;
var Web3 = require('web3');
var { Big } =  require("big.js");

module.exports = {
  async getNetworkByChainId(chainId: any) {
    try {
      let baseUrl = 'https://api-leaderboard.dev.svcs.ferrumnetwork.io/api/v1/networks/'; 
      let url = `${baseUrl}${chainId}`;
      let res = await axios.get(url);
      return res.data.body.network;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
