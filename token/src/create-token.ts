import { MINT_KEY, openWallet, getMetadata, createFungibleToken } from "./helper";

async function createToken() {
    console.log("Create Fungible Token");
    
    const myKeypair = openWallet('ccdZsCq74BAevLRQuHv2391k1NqchzUsN83ArbLc8pZ.json');

    const metadata = getMetadata(MINT_KEY);
   
    const accounts = {
        metadata: metadata,
        mint: MINT_KEY,
        mintAuthority: myKeypair.publicKey,
        payer: myKeypair.publicKey,
        updateAuthority: myKeypair.publicKey,
    }

    const dataV2 = {
        name: "CCDXTKN",
        symbol: "CCD",
        uri: "https://gateway.pinata.cloud/ipfs/QmS9YE7DNt2SGediPaUMdE3PHeupvnnCesHV6KS3Hs7pCb",
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
    }

    const args =  {
        createMetadataAccountArgsV2: {
            data: dataV2,
            isMutable: true
        }
    };

    const response = await createFungibleToken(
        accounts,
        args,
        myKeypair
    )

    console.log(response);

}

createToken();