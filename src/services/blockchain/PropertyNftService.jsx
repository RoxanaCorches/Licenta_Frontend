import { ethers } from "ethers";
import { MARKETPLACEADDRESS, PROPERTYNFTADDRESS } from "../../blockchain/config/BlockchainConfiguration";
import  PropertyNftAbi  from "../../blockchain/abi/PropertyNftAbi.json";
import { getProviderAndSigner } from "./WalletService";

export const mintNftProperty = async (metadataUrl) => {
    const { signer } = await getProviderAndSigner();
    const contract = new ethers.Contract(PROPERTYNFTADDRESS, PropertyNftAbi, signer);
    const walletAddress = await signer.getAddress();

    // --- trimite tranzacția de mint ---
    const tx = await contract.mint(walletAddress, metadataUrl, {
        gasLimit: 500_000 // sau un număr mai mare dacă știi că mint-ul e costisitor
    })
    console.log("Mint tx hash:", tx.hash);

    // --- așteaptă confirmarea tranzacției ---
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt.transactionHash);

    // --- extrage tokenId din event-ul Minted ---
    let tokenId = null;
    console.log("Events:", receipt.events);
    for (const event of receipt.events) {
        if (event.event === "Minted") {
            tokenId = event.args.tokenId;
            break;
        }
    }

    if (!tokenId) throw new Error("Nu am găsit tokenId în event-ul Minted");

    return { tokenId, metadataUrl };
};

export const approveMarketplace = async () => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(PROPERTYNFTADDRESS, PropertyNftAbi, signer);

    const tx = await contract.setApprovalForAll(MARKETPLACEADDRESS, true);
    console.log("Approval tx hash:", tx.hash);

    await tx.wait();
};
