import { ethers } from "ethers";
import { MARKETPLACEADDRESS, PROPERTYNFTADDRESS } from "../../blockchain/config/BlockchainConfiguration";
import  PropertyNftAbi  from "../../blockchain/abi/PropertyNftAbi.json";
import { getProviderAndSigner } from "./WalletService";

export const mintNftProperty = async (metadataUrl) => {
    const { signer } = await getProviderAndSigner();

    const start = performance.now();
    const contract = new ethers.Contract(PROPERTYNFTADDRESS, PropertyNftAbi, signer);
    const walletAddress = await signer.getAddress();

    const txMint = await contract.mint(walletAddress, metadataUrl, {
        gasLimit: 500_000 
    })
    console.log("Mint tx hash:", txMint.hash);
    const end = performance.now();
    console.log("Execution time:", (end-start) / 1000,  "sec");
    return txMint;
};

export const getOwner = async (tokenId) => {
    const { signer } = await getProviderAndSigner();
    const contract = new ethers.Contract(PROPERTYNFTADDRESS, PropertyNftAbi, signer);
    const owner = await contract.ownerOf(tokenId);
    return owner;
}

export const approveMarketplace = async () => {
    const { signer } = await getProviderAndSigner();

     const start = performance.now();
    const contract = new ethers.Contract(PROPERTYNFTADDRESS, PropertyNftAbi, signer);

    const txApprove = await contract.setApprovalForAll(MARKETPLACEADDRESS, true);
    console.log("Approval tx hash:", txApprove.hash);

    const end = performance.now();
    console.log("Execution time:", (end-start) / 1000,  "sec");
    return txApprove;
};
