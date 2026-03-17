import { ethers } from "ethers";
import { KYCNFTADDRESS, MARKETPLACEADDRESS } from "../../blockchain/config/BlockchainConfiguration";
import  PropertyNftAbi  from "../../blockchain/abi/PropertyNftAbi.json";
import { getProviderAndSigner } from "./WalletService";

export const mintNftProperty = async(metadataUrl)  => {
    const {signer} = await getProviderAndSigner();
    const contract = new ethers.Contract(KYCNFTADDRESS, PropertyNftAbi, signer);
    const addressWallet = await signer.getAddress();

    const tx = await contract.mint(addressWallet, metadataUrl);
    await tx.wait();
    
}

export const approveMarketplace = async () => {
    const { provider, signer } = await getProviderAndSigner();

    const network = await provider.getNetwork();
    console.log("Connected network:", network);

    const nftCode = await provider.getCode(KYCNFTADDRESS);
    const marketCode = await provider.getCode(MARKETPLACEADDRESS);

    if (nftCode === "0x") {
        throw new Error(`No NFT contract deployed at ${KYCNFTADDRESS} on chain ${network.chainId}`);
    }

    if (marketCode === "0x") {
        throw new Error(`No Marketplace contract deployed at ${MARKETPLACEADDRESS} on chain ${network.chainId}`);
    }

    const contract = new ethers.Contract(KYCNFTADDRESS, PropertyNftAbi, signer);

    const tx = await contract.setApprovalForAll(MARKETPLACEADDRESS, true);
    console.log("Approval tx hash:", tx.hash);

    await tx.wait();
};
