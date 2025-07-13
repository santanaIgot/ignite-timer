import {createContext, useContext, useState} from 'react';  

const CycleContext = createContext({} as  any);

function NewCycleForm() {
    const {activeCycle, setActiveCycle} = useContext(CycleContext);
    return (
        
        <h1>
            New cycle form {activeCycle}
             <button onClick={() => {
                setActiveCycle(1)
            }}>Change Cycle</button>
        </h1>
    )
}

function Countown() {
    const {activeCycle} = useContext(CycleContext);
    return <h1>Count down {activeCycle}</h1>
    
}

export function Context() {
    const [activeCycle, setActiveCycle] = useState(0);
    
    return(
        <CycleContext.Provider value={{activeCycle, setActiveCycle}}>       
            <div>
                <h1>Home</h1>
                <NewCycleForm/>
                <Countown/>
            </div>
        </CycleContext.Provider>
    )
}