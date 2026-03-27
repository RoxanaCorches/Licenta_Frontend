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

export const verifyAvailability = async (tokenId, startDate, endDate) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const available = await contract.isAvailableForRent(tokenId, startDate, endDate);

    return available;
};

export const rentNftProperty = async (tokenId, startDate, endDate, totalPrice ) => {
    const { signer } = await getProviderAndSigner();
    const { provider } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const priceWei = ethers.utils.parseEther(totalPrice);

    try{
        await contract.callStatic.rent(
            tokenId,
            startDate,
            endDate,
            { value: priceWei, gasLimit: 500_000  }
        );

    } catch(err) {
        console.log("Smart contract error:", err);
        throw err;
    }

    const tx = await contract.rent(
            tokenId,
            startDate,
            endDate,
            { value: priceWei, gasLimit: 500_000 }
    );

    const receip = await tx.wait();
    const block = await provider.getBlock(receip.blockNumber);
    const rentalTime = new Date(block.timestamp * 1000);

    console.log("Transaction:", tx.hash);
    console.log("Rental time:", rentalTime);

    return {
        transactionHash: tx.hash,
        reservationDate: rentalTime
    }
};

export const cancelRental = async (tokenId) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const tx = await contract.cancel(tokenId);

    await tx.wait();
};