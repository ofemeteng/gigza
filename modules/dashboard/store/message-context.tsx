import { createContext, useContext, useState } from "react";
import { IState, MessageContextType } from "../@types";

type MessageContextProviderProps = {
    children: React.ReactNode
}

const MessageContext = createContext<MessageContextType | null>(null)

const MessageContextProvider = ({ children }: MessageContextProviderProps) => {

    const initialState = {
        toggleTranslate: false,
    }
    const [store, setStore] = useState<IState>(initialState)

    const handleToggleTranslate = () => {
        setStore(prev=>({
            ...prev,
            toggleTranslate: !prev.toggleTranslate
        }))
    }
    return (
        <MessageContext.Provider
            value={{
                store,
                setStore,
                handleToggleTranslate,
                ...store
            }}
        >
            {children}
        </MessageContext.Provider>
    )

}

const useMessageStoreContext = () => useContext(MessageContext) as MessageContextType

export {
    MessageContextProvider,
    useMessageStoreContext
}