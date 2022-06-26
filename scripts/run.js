const main = async () => {
    const [owner, superCoder] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("wagmi");
    await domainContract.deployed();

    console.log("Contract owner:", owner.address);
    console.log("Contract deployed to:", domainContract.address);
  
    let txn = await domainContract.register("helloworld",  {value: hre.ethers.utils.parseEther('1234')});
    await txn.wait();
  
    console.log("Minted domain helloworld.wagmi");

    txn = await domainContract.setRecord("helloworld", "this is nft");
    await txn.wait();
    console.log("Set record for helloworld.wagmi");
  
    const address = await domainContract.getAddress("helloworld");
    console.log("Owner of domain wagmi:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

    try {
        txn = await domainContract.connect(superCoder).withdraw();
        await txn.wait();
      } catch(error){
        console.log("Could not rob contract");
      }

    let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
      
    txn = await domainContract.connect(owner).withdraw();
    await txn.wait();

    const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
    ownerBalance = await hre.ethers.provider.getBalance(owner.address);

    console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
    console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

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