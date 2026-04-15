import { MARKETPLACEADDRESS } from "../../blockchain/config/BlockchainConfiguration";
import  MarketplaceAbi  from "../../blockchain/abi/MarketplaceAbi.json";
import { getProviderAndSigner } from "./WalletService";
import { ethers } from "ethers";


export const listNftProperty = async (tokenId, price, hoursForCheckIn) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const txList = await contract.listNftOnMarketplace(tokenId, price, hoursForCheckIn);

    return txList;
};

export const delistNftProperty = async (tokenId) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const txDelist = await contract.delistNftFromMarketplace(tokenId);

    return txDelist;
};

export const updatePrice = async (tokenId, newPrice) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const txUpdatePrice = await contract.updatePricePerDay(tokenId, newPrice);

    return txUpdatePrice;
};

export const updateHours = async (tokenId, newHours) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const txUpdateHours = await contract.updateHoursToCheckIn(tokenId, newHours);

    return txUpdateHours;
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

    try {
        await contract.callStatic.rent(
            tokenId,
            startDate,
            endDate,
            { value: priceWei, gasLimit: 400000  }
        );

    } catch(err) {
        console.log("Smart contract error:", err);
        const message =
        err.reason ||
        err.error?.message ||
        err.data?.message ||
        "Transaction failed";
        throw new Error(message);
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

    const txCancel = await contract.cancel(tokenId);

    return txCancel;
};

export const checkIn = async (tokenId) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    try {
        await contract.callStatic.checkIn(tokenId);
    } catch(err) {
        const message =
        err.reason ||
        err.error?.message ||
        err.data?.message ||
        "Transaction failed";
        throw new Error(message);
    }

    const txCheckIn = await contract.checkIn(tokenId,  { gasLimit: 400000 });
    return txCheckIn;
};

export const checkOut = async (tokenId) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    try {
        await contract.callStatic.checkOut(tokenId);
    } catch(err) {
        const message =
        err.reason ||
        err.error?.message ||
        err.data?.message ||
        "Transaction failed";
        throw new Error(message);
    }

    const txCheckOut = await contract.checkOut(tokenId, { gasLimit: 400000 });
    return txCheckOut;
};
