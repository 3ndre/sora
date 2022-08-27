require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    matic: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/ENZXGT0Qxaq7fqJLJcYoJRThBUY3yZnY', 
      accounts: ["4e3c1c03d106b5fd1a0b96503236c5afb6f4949eac574af5197b0cdd378678da"],
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};



