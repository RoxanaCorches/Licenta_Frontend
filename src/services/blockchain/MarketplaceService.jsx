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

export const rentNftProperty = async (tokenId, startDate, endDate, totalPrice ) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const priceWei = ethers.utils.parseEther(totalPrice);

    try{
        await contract.callStatic.rent(
            tokenId,
            startDate,
            endDate,
            { value: priceWei, gasLimit: 500_000  }
        );

    }catch(err)
    {
        console.log("Smart contract error:", err);
        throw err;
    }

      const tx = await contract.rent(
            tokenId,
            startDate,
            endDate,
            { value: priceWei, gasLimit: 500_000 }
        );


     await tx.wait();
     console.log("Transaction:", tx.hash);
     return tx.hash;
};