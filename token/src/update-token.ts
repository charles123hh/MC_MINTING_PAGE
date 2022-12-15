import { MINT_KEY, openWallet, getMetadata, updateFungibleToken } from "./helper";

async function createToken() {
    console.log("Update Fungible Token");
    
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
        name: "CCD TEST Token",
        symbol: "EZ",
        uri: "https://gateway.pinata.cloud/ipfs/QmS9YE7DNt2SGediPaUMdE3PHeupvnnCesHV6KS3Hs7pCb",
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
    }

    const args =  {
        updateMetadataAccountArgsV2: {
            data: dataV2,
            isMutable: true,
            updateAuthority: myKeypair.publicKey,
            primarySaleHappened: true
        }
    };

    const response = await updateFungibleToken(
        accounts,
        args,
        myKeypair
    )

    console.log(response);

}

createToken();