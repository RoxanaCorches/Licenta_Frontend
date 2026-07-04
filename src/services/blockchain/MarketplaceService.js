import { MARKETPLACEADDRESS } from "../../blockchain/config/BlockchainConfiguration";
import  MarketplaceAbi  from "../../blockchain/abi/MarketplaceAbi.json";
import { getProviderAndSigner } from "./WalletService";
import { ethers } from "ethers";

export const listNftProperty = async (tokenId, price, hoursIn, hoursOut) => {
    const { signer } = await getProviderAndSigner();

    const start = performance.now();
    
    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const txList = await contract.listNftOnMarketplace(tokenId, price, hoursIn, hoursOut,
        { gasLimit: 400000  }
    );

    const end = performance.now();
    console.log("Execution time:", (end-start) / 1000,  "sec");
    return txList;
};

export const delistNftProperty = async (tokenId) => {
    const { signer } = await getProviderAndSigner();

     const start = performance.now();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const txDelist = await contract.delistNftFromMarketplace(tokenId);

    const end = performance.now();
    console.log("Execution time:", (end-start) / 1000,  "sec");

    return txDelist;
};

export const checkIsListed = async (tokenId) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);
    const isListed = await contract.isNftListed(tokenId);
    return isListed;
}


export const updatePriceAndHours = async (tokenId, newPrice, startHours, endHours) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const txUpdate = await contract.updatePriceAndHours(tokenId, newPrice, startHours, endHours,
         { gasLimit: 400000  }
    );

    return txUpdate;
};

export const verifyAvailability = async (tokenId, startDate, endDate) => {
    const { signer } = await getProviderAndSigner();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const available = await contract.isAvailableForRent(tokenId, startDate, endDate);

    return available;
};

export const rentNftProperty = async (tokenId, startDate, endDate, nrNights ) => {
    const { signer } = await getProviderAndSigner();
    const { provider } = await getProviderAndSigner();

    const start = performance.now();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const priceperNight = await contract.pricePerDay(tokenId);
    console.log("Price per night from list nft property:", priceperNight.toString());

    const totalPrice = priceperNight.mul(nrNights);
    console.log("Total price in wei:", totalPrice.toString());

    try {
        await contract.callStatic.rent(
            tokenId,
            startDate,
            endDate,
            { value: totalPrice, gasLimit: 400000  }
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
        { value: totalPrice, gasLimit: 500000 }
    );

    const receip = await tx.wait();
    const block = await provider.getBlock(receip.blockNumber);
    const rentalTime = new Date(block.timestamp * 1000);

    console.log("Transaction:", tx.hash);
    console.log("Rental time:", rentalTime);

    const end = performance.now();
    console.log("Execution time for rent:", (end-start) / 1000,  "sec");

    return {
        transactionHash: tx.hash,
        reservationDate: rentalTime
    }
};

export const cancelRental = async (tokenId) => {
    const { signer } = await getProviderAndSigner();

    const start = performance.now();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    const txCancel = await contract.cancel(tokenId);

    const end = performance.now();
    console.log("Execution time for cancel:", (end-start) / 1000,  "sec");

    return txCancel;
};

export const checkInBlockchain = async (tokenId, startDate) => {
    const { signer } = await getProviderAndSigner();

    const start = performance.now();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    try {
        await contract.callStatic.checkIn(tokenId, startDate);
    } catch(err) {
        const message =
        err.reason ||
        err.error?.message ||
        err.data?.message ||
        "Transaction failed";
        throw new Error(message);
    }

    const txCheckIn = await contract.checkIn(tokenId, startDate,  { gasLimit: 400000 });

    const end = performance.now();
    console.log("Execution time for check-in:", (end-start) / 1000,  "sec");
    return txCheckIn;
};

export const checkOutBlockchain = async (tokenId) => {
    const { signer } = await getProviderAndSigner();

    const start = performance.now();

    const contract = new ethers.Contract(MARKETPLACEADDRESS, MarketplaceAbi, signer);

    try {
        await contract.callStatic.checkout(tokenId);
    } catch(err) {
        const message =
        err.reason ||
        err.message ||
        err.data?.message ;
        
        throw new Error(message);
    }

    const txCheckOut = await contract.checkout(tokenId, { gasLimit: 400000 });
    const end = performance.now();
    console.log("Execution time for check-out:", (end-start) / 1000,  "sec");

    return txCheckOut;
};