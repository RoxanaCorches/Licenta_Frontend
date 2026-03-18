import { MARKETPLACEADDRESS } from "../../blockchain/config/BlockchainConfiguration";
import  MarketplaceAbi  from "../../blockchain/abi/MarketplaceAbi.json";
import { getProviderAndSigner } from "./WalletService";
import { ethers } from "ethers";

export const listNftProperty = async (tokenId, price, hoursForCheckIn) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const tx = await contract.listNftOnMarketplace(tokenId, price, hoursForCheckIn);

    await tx.wait();
};

export const delistNftProperty = async (tokenId) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const tx = await contract.delistNftFromMarketplace(tokenId);

    await tx.wait();
};