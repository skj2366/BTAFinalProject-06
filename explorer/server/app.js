const {
    Client,
    PrivateKey,
    Hbar,
    AccountId,
    AccountCreateTransaction,
    TopicCreateTransaction
} = require("@hashgraph/sdk");

async function main() {

    const node = {"127.0.0.1:50211":new AccountId(3)}
    const client = Client.forNetwork(node).setMirrorNetwork("127.0.0.1:5600");

    client.setOperator(AccountId.fromString("0.0.2"), PrivateKey.fromString("302e020100300506032b65700422042091132178e72057a1d7528025956fe39b0b847f200ab59b2fdd367017f3087137"));

    const newAccount = await new AccountCreateTransaction()
    .setKey(PrivateKey.fromString("302e020100300506032b65700422042091132178e72057a1d7528025956fe39b0b847f200ab59b2fdd367017f3087137"))
    .setInitialBalance(new Hbar(20))
    .execute(client);

    const transaction = new AccountCreateTransaction()
    .setKey(PrivateKey.fromString("302e020100300506032b65700422042091132178e72057a1d7528025956fe39b0b847f200ab59b2fdd367017f3087137"))
    .setInitialBalance(new Hbar(20))

    //Sign with the client operator account key and submit to a Hedera network
    const txResponse2 = await transaction.execute(client);

    //Request the record of the transaction
    const record = await txResponse2.getRecord(client);

    console.log("The transaction record is " +record);

    const receipt = await newAccount.getReceipt(client);

    const newAccountId = receipt.accountId;
    console.log(receipt);

    //Create a new topic
let txResponse = await new TopicCreateTransaction().execute(client);

//Get the receipt of the transaction
let receipt2 = await txResponse.getReceipt(client);

//Grab the new topic ID from the receipt
let topicId = receipt2.topicId;

//Log the topic ID
console.log(`Your topic ID is: ${topicId}`);

// Wait 5 seconds between consensus topic creation and subscription 
await new Promise((resolve) => setTimeout(resolve, 5000));

}
void main();