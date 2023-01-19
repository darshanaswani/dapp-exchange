require("babel-register");
require("babel-polyfill");
require("dotenv").config(require("path").join(__dirname));
const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeys = process.env.PRIVATE_KEYS || "";
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    goerli: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys.split(","),
          `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`
        );
      },
      gas: 4465030,
      gasPrice: 10000000000,
      network_id: 5,
    },
  },

  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
