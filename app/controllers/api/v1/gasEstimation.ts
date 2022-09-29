module.exports = function (router: any) {

  router.get('/for/source/and/destination/', asyncMiddleware(async (req: any, res: any) => {

    let address: any = null;
    let sourceNetwork: any = null;
    let sourceCabn: any = null;
    let destinationCabn: any = null;

    if (!req.query.walletAddress || !req.query.sourceChainId 
      || !req.query.sourceTokenContractAddress || !req.query.destinationTokenContractAddress 
      || !req.query.amount || !req.query.smartContractAddress) {
      return res.http400('walletAddress & sourceChainId & sourceTokenContractAddress & destinationTokenContractAddress & amount & smartContractAddress are required.');
    }

    address = {address:(req.query.walletAddress).toLowerCase()};
    // sourceNetwork = {rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/'}
    sourceNetwork = await networksHelper.getNetworkByChainId(req.query.sourceChainId);
    req.query.smartContractAddress = (req.query.smartContractAddress).toLowerCase();
    sourceCabn = {tokenContractAddress: (req.query.sourceTokenContractAddress).toLowerCase()};
    destinationCabn = {tokenContractAddress: (req.query.destinationTokenContractAddress).toLowerCase()};

    if (address && sourceNetwork && sourceCabn && destinationCabn && req.query.smartContractAddress) {
      let response = await contractHelper.doSwapAndGetTransactionPayload(address, sourceNetwork, sourceCabn, req.query.smartContractAddress, req.query.amount, destinationCabn, true);
      if (response.code == 200) {
        return res.http200({
          data: response.data
        });
      } else {
        return res.http400(response.message);
      }
    }

    return res.http400('Invalid walletAddress & sourceChainId & sourceTokenContractAddress & destinationTokenContractAddress & amount or smartContractAddress');
  }));

};
