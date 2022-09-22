import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
var fs = require("fs");
var { Big } = require("big.js");

module.exports = {
  getHashedPassword: function (password: any) {
    return crypto.createHash("sha256").update(password).digest("base64");
  },

  createToken: function (object: any, expiresIn: any) {
    let options: any = {};
    if (expiresIn) {
      options.expiresIn = expiresIn;
    }
    return jwt.sign(object, (global as any).environment.jwtSecret, options);
  },

  decodeAPiToken: function (token: any) {
    return jwt.verify(token, ((global as any) as any).environment.jwtSecret);
  },

  async getValueFromStringsPhrase(queryKey: any) {
    return new Promise((resolve, reject) => {
      fs.readFile("./app/lib/stringsPhrase.json", "utf8", function (err: any, data: any) {
        if (err) {
          console.log(err);
          resolve("");
        }
        if (data) {
          const phraseObj = JSON.parse(data);
          if (phraseObj) {
            for (const [key, value] of Object.entries(phraseObj)) {
              if (key == queryKey) {
                resolve(value);
                return;
              }
            }
          }
        }
        resolve("");
      });
    });
  },

  async amountToHuman_(network: any, cabn: any, amount: number) {
		let decimal = await this.decimals(network, cabn);
		if (decimal) {
			let decimalFactor = 10 ** decimal;
			return new Big(amount).div(decimalFactor).toFixed();
		}

		return null;
	},

  async amountToMachine(network: any, cabn: any, amount: number) {
		let decimal = await this.decimals(network, cabn);
		let decimalFactor = 10 ** decimal;
		return new Big(amount).times(decimalFactor).toFixed(0);
	},

	async decimals(network: any, cabn: any) {

		if (network.rpcUrl && cabn.tokenContractAddress) {

			let con = web3ConfigurationHelper.erc20(network.rpcUrl, cabn.tokenContractAddress)
			if (con) {
				return await con.methods.decimals().call();
			}

		}

		return null;
	},

  async estimateGasOrDefault(method: any, from: string, defaultGas?: number) {
		  return await method.estimateGas({ from });
	  },
  
};
