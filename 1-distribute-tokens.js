async function run(runtimeEnv, deployer) {
    const { executeTransaction } = require("@algo-builder/algob");
    const { types } = require("@algo-builder/web");
    const algosdk = require("algosdk");
     async function run(runtimeEnv, deployer){
        // create asset receiver
    const master = deployer.accountsByName.get("master");
    const receiver = deployer.accountsByName.get("buyer");
    await executeTransaction(deployer, {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.SecretKey,
        fromAccount: master,
        toAccountAddr: receiver.addr,
        amountMicroAlgos: 300000,
        payFlags: { totalFee: 1000 },
    });
    // asset opt in
    await executeTransaction(deployer, {
        type: types.TransactionType.OptInASA,
        sign: types.SignType.SecretKey,
        fromAccount: receiver,
        assetID: 1,
        payFlags: { totalFee: 1000 },
    });
    // transfer asset
    await executeTransaction(deployer, {
        type: types.TransactionType.TransferAsset,
        sign: types.SignType.SecretKey,
        fromAccount: master,
        toAccountAddr: receiver.addr,
        amount: 100,
        assetID: 1,
        payFlags: { totalFee: 1000 },
    });
    const receiverAcc = await deployer.algodClient.accountInformation(receiver.addr).do();
    console.log(receiverAcc.assets);
}

module.exports = { default: run };

}