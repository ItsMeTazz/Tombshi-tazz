const { ethers } = require("ethers");
const fs = require('fs');
const daiAddress = '0x1DaeE24Fbb54493283F500796734a131E9e09ACD';
const daiAbi = [{"inputs":[{"internalType":"uint256","name":"_startTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"num","type":"uint256"}],"name":"CreateNode","type":"event"},{"inputs":[],"name":"MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TOKEN","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"allocPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"newDev","type":"address"}],"name":"changeDev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimTreasuryRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"compound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nodeTier","type":"uint256"},{"internalType":"uint256","name":"numNodes","type":"uint256"}],"name":"create","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dripRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dripRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amnt","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalancePool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getDayDripEstimate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getDistributionRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"}],"name":"getNodes","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardDrip","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalNodes","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"}],"name":"getTotalRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"}],"name":"isMaxPayout","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDripTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"}],"name":"maxPayout","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxReturnPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"nodes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"uint256","name":"_nodeId","type":"uint256"}],"name":"numNodes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rate","type":"uint256"}],"name":"setDripRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"setLastDripTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"setMaxReturnPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256[]","name":"_nodes","type":"uint256[]"}],"name":"setNodes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startTime","type":"uint256"}],"name":"setStartTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_tierAllocPoints","type":"uint256[]"},{"internalType":"uint256[]","name":"_tierAmounts","type":"uint256[]"}],"name":"setTierValues","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"setTreasuryFeePercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"components":[{"internalType":"uint256","name":"total_deposits","type":"uint256"},{"internalType":"uint256","name":"total_claims","type":"uint256"},{"internalType":"uint256","name":"last_distPoints","type":"uint256"}],"internalType":"struct Node.User","name":"_user","type":"tuple"}],"name":"setUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tierAllocPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tierAmounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDistributePoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDistributeRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalNodes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_claimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_deposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_users","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryFeePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasury_rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"userIndices","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"total_deposits","type":"uint256"},{"internalType":"uint256","name":"total_claims","type":"uint256"},{"internalType":"uint256","name":"last_distPoints","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org', 8453);
const contract = new ethers.Contract(daiAddress, daiAbi, provider);

let addressList = fs.readFileSync("a.txt").toString().split("\r\n");
let res = [];

const filterAddress = (index) => {
  if (index === addressList.length){
    fs.writeFile("a.txt", res.join("\n"), (error) => {});
    return;
  }
  
  contract.getNodes(addressList[index]).then((balance) => {
    balance = balance[0].toBigInt();

    
      console.log(index, addressList[index], balance);
      res.push(addressList[index] + " " +  balance);
    

    filterAddress(index + 1);
  })
}

filterAddress(0);
