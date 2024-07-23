import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

type ValueType = {
    isSupervisor: boolean,
    setIsSupervisor: Dispatch<SetStateAction<boolean>>
}
const SupervisorCtx = createContext<ValueType | null>(null);


export const SupervisorProvider = ({children}: PropsWithChildren) => {
    const [isSupervisor, setIsSupervisor] = useState(false);

    return (
        <SupervisorCtx.Provider value={{isSupervisor, setIsSupervisor}}>
            {children}
        </SupervisorCtx.Provider>
    )
} 

export default SupervisorCtx;