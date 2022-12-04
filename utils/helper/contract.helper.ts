import { ethers } from "ethers";
import { DaiContractAbi, DiaContractAddress, GigzaContractAbi, GigzaContractAddress } from "./store.helper";



const initGigzaContract = async () => {
    if (typeof window !== 'undefined') {
        try {
            // @ts-ignore
            if (!window.ethereum) return "You must install Metamask in your browser extension."
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const _walletAddress = await signer.getAddress();

            const _contract = new ethers.Contract(
                GigzaContractAddress,
                GigzaContractAbi,
                signer
            );
            return {
                contract: _contract,
                walletAddress: _walletAddress,
            };
        } catch (error) {
            throw Error("Address is Null")
        }
    }
}

const initDaiContract = async () => {
    if (typeof window !== 'undefined') {
        try {
            // @ts-ignore
            if (!window.ethereum) return "You must install Metamask in your browser extension."
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const _walletAddress = await signer.getAddress();

            const _contract = new ethers.Contract(
                DiaContractAddress,
                DaiContractAbi,
                signer
            );
            return {
                contract: _contract,
                walletAddress: _walletAddress,
            };
        } catch (error) {
            throw Error("Address is Null")
        }
    }

}




export {
    initGigzaContract,
    initDaiContract,
}

