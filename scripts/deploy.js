const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("wagmi");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("heyas",  {value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();
  console.log("Minted domain heyas.wagmi");

  txn = await domainContract.setRecord("heyas", "lol??");
  await txn.wait();
  console.log("Set record for heyas.wagmi");

  const address = await domainContract.getAddress("heyas");
  console.log("Owner of domain heyas:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();