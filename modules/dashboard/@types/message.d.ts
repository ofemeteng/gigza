export interface IState  {
    toggleTranslate: boolean; 
}

export interface MessageContextType extends IState {
    store:IState;
    setStore: React.Dispatch<SetStateAction<IState>>;
    handleToggleTranslate: VoidFunction;
}
