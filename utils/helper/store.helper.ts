import { useEffect } from "react";
import GigzaContractAbi from "../constants/Gigza.json"
import DaiContractAbi from "../constants/Dia.json"

const initialState = {
    account: null,
    isWalletConnected: false,
    isLoading: false,
    status: "",
};

// @ts-ignore
const useSetPersistStore = (store) => {
    useEffect(() => {
        // if (typeof window !== "undefined") {
        localStorage.setItem("persist-gigza", JSON.stringify(store));
        // }
        //eslint-disable-next-line
    }, [store]);
};

const useGetPersistedStore = () => {
    // useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("persist-gigza") !== 'undefined') {
        // @ts-ignore
        JSON.parse(localStorage.getItem("persist-gigza")) ||
            initialState
    }
    // 	//eslint-disable-next-line
    // }, []);
}

const GigzaContractAddress = "0xBE4230c239D96bE66B1e1E4d387adc9B73cb77A3"
const DiaContractAddress = "0xA4d4dBd2Da4fBd7DAafD8DD66ba102025d38AE7F"

const currentEpochTime = Math.floor(new Date().getTime() / 1000.0)

const bidState = ['sent', 'awarded', 'accepted', 'executed', 'fulfilled', 'cancelled']
const jobState = ['POSTED', 'OFFERED', 'ACCEPTED', 'EXECUTED', 'FUFILLED', 'CANCELLED', 'INDISPUTE', 'RESOLVED']

export {
    useSetPersistStore,
    useGetPersistedStore,
    initialState,
    GigzaContractAddress,
    DiaContractAddress,
    GigzaContractAbi,
    DaiContractAbi,
    currentEpochTime,
    bidState,
    jobState
};