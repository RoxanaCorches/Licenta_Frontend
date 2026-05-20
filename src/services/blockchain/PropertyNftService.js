import { ethers } from "ethers";
import { MARKETPLACEADDRESS, PROPERTYNFTADDRESS } from "../../blockchain/config/BlockchainConfiguration";
import  PropertyNftAbi  from "../../blockchain/abi/PropertyNftAbi.json";
import { getProviderAndSigner } from "./WalletService";

/*
export const getNftContract = async () => {
  const { signer } = await getProviderAndSigner();

  return new ethers.Contract(
    PROPERTYNFTADDRESS,
    PropertyNftAbi,
    signer
  );
};
*/

export const mintNftProperty = async (metadataUrl) => {
    const { signer } = await getProviderAndSigner();
    const contract = new ethers.Contract(PROPERTYNFTADDRESS, PropertyNftAbi, signer);
    const walletAddress = await signer.getAddress();

    const txMint = await contract.mint(walletAddress, metadataUrl, {
        gasLimit: 500_000 
    })
    console.log("Mint tx hash:", txMint.hash);
    
    return txMint;
};

export const approveMarketplace = async () => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(PROPERTYNFTADDRESS, PropertyNftAbi, signer);

    const txApprove = await contract.setApprovalForAll(MARKETPLACEADDRESS, true);
    console.log("Approval tx hash:", txApprove.hash);

    return txApprove;
};
