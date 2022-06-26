require("@nomiclabs/hardhat-waffle");
require('dotenv').config();



module.exports = {
  solidity: "0.8.10",
  networks: {
    hardhat:{
      chainId: 1337
    },
    mumbai: {
      url: process.env.STAGING_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    // mainnet: {
    //   chainId: 1,
    //   url: process.env.PROD_ALCHEMY_KEY,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  }
};