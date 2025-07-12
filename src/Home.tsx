import {createContext, useContext} from 'react';  

const CycleContext = createContext({
    activeCycle : 1,
});

function NewCycleForm() {
    return <h1>New cycle form</h1>
}

function Countown() {
    return <h1>Count down</h1>
}

export function Home() {
    const activeCycle = 1;
    return(
        <div>
            <h1>Home</h1>
            <NewCycleForm/>
            <Countown/>
        </div>
    )
}