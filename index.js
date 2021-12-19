const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

const newPair = new Keypair();   
console.log(newPair);

//The public key is used to uniquely identify your wallet over the blockchain and can be used to receive crypto to your wallet. The private key is used to perform transactions through your wallet.
// The newPair instance that we created in the previous section holds the public key and the secret key. Add the following line to index.js.
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();

const secretKey = newPair._keypair.secretKey


const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );
        console.log(`Wallet balance: ${walletBalance}`);
    } catch (err) {
        console.log(err);
    }
};


const airDropSol = async () => {
    try {
        //As we had had done earlier, we need to create a connection object and a walletKeyPair object for the airdrop function.
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        //Now, we first create an airdrop signature using the wallet details and the amount of SOL we want to airdrop (you can airdrop at max 2SOL in one transaction). We then await a confirmation for the transaction from the network. 
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};


// driver code
const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction();
