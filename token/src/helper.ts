import { Keypair, PublicKey, Transaction, Connection, sendAndConfirmTransaction } from "@solana/web3.js";
import { createCreateMetadataAccountV2Instruction, createUpdateMetadataAccountV2Instruction, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";

const MINT_KEY = new PublicKey('cfd5WPGcSw4dgtXHVuQV2e1KF8CPaXvkaKZYkbybdon');
const CONNECTION = new Connection('https://api.devnet.solana.com');

function openWallet(keypairFile: string): Keypair {
    const fs = require("fs");
    const key = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(`${__dirname}/${keypairFile.toString()}`)))
    );
    return key;
}

function getMetadata (
    mint: PublicKey
){
    return (
        PublicKey.findProgramAddressSync(
        [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
        ],
        PROGRAM_ID
        )
    )[0];
};

async function createFungibleToken (
    accounts: any,
    args: any,
    signer: Keypair
){
    let transaction = new Transaction();
    transaction.add(
        createCreateMetadataAccountV2Instruction(accounts, args)
    );
    return await sendAndConfirmTransaction(CONNECTION, transaction, [signer]);
};

async function updateFungibleToken (
    accounts: any,
    args: any,
    signer: Keypair
){
    let transaction = new Transaction();
    transaction.add(
        createUpdateMetadataAccountV2Instruction(accounts, args)
    );
    return await sendAndConfirmTransaction(CONNECTION, transaction, [signer]);
};

export {
    MINT_KEY,
    openWallet,
    getMetadata,
    createFungibleToken,
    updateFungibleToken
}