import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { initialState, useGetPersistedStore, useSetPersistStore } from 'utils/helper/store.helper';
import Web3 from 'web3';

// @ts-ignore
const ContractContext = createContext()

type ContextProviderProps = {
    children: React.ReactNode
}

const ContractContextProvider = ({ children }: ContextProviderProps) => {
    const [store, setStore] = useState(useGetPersistedStore);
    useSetPersistStore(store);

    const connectWallet = async () => {
        if (typeof window !== 'undefined') {
            // @ts-ignore
            if (!window.ethereum) return toast.error("You must install Metamask in your browser extension.")
            const notification = toast.loading("Connecting wallet")
            try {
                // @ts-ignore
                const selectedAccount = await window.ethereum
                    .request({ method: "eth_requestAccounts" })
                    .then((
                        // @ts-ignore
                        accounts
                    ) => accounts[0])
                    .catch(() => {
                        throw Error("No account selected");
                    })
                setStore(prevState => ({
                    // @ts-ignore
                    ...prevState,
                    account: selectedAccount,
                    isWalletConnected: true,
                    status: "",
                }))
                toast.success("Wallet has been connected successfully!.", {
                    id: notification
                })
            } catch (error) {
                // @ts-ignore
                toast.error(error?.message, {
                    id: notification
                })
            }
        }

    }

    const checkIfWalletConnected = async () => {
        if (typeof window !== "undefined") {
            // @ts-ignore
            const web3 = new Web3(window.ethereum)
            // @ts-ignore
            if (window.ethereum) {
                // check if user is connected but the local storage was clear
                // @ts-ignore
                if (window.ethereum.selectedAddress) {
                    setStore({
                        // @ts-ignore
                        ...store,
                        isWalletConnected: true,
                        // @ts-ignore
                        account: window.ethereum.selectedAddress,
                        status: "",
                    });
                }
                // @ts-ignore
                if (window.ethereum.selectedAddress === undefined) {
                    // not connected clear local store
                    // @ts-ignore
                    setStore({ ...initialState });
                }
                // @ts-ignore
                window.ethereum.on("accountsChanged", async (accounts) => {
                    accounts = await web3.eth.getAccounts();
                    if (accounts.length) {
                        setStore({
                            // @ts-ignore
                            ...store,
                            isWalletConnected: true,
                            account: accounts[0],
                            status: "",
                        });
                    } else {
                        // @ts-ignore
                        setStore({ ...initialState }
                        );
                    }
                });
            } else {
                setStore(prevState => ({
                    // @ts-ignore
                    ...prevState,
                    status: "",
                }))
            }
        }
    }

    useEffect(() => {
        checkIfWalletConnected()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        // @ts-ignore
        <ContractContext.Provider value={{ connectWallet, setStore, store, ...store }}>
            {children}
        </ContractContext.Provider>
    )

}

const useContractContext = () => useContext(ContractContext);

export {
    ContractContextProvider,
    useContractContext,
}
