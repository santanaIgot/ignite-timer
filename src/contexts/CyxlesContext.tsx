import { createContext, useState } from "react";
import { Cycle } from "../pages/Home";


interface CreateCycleData {
    task: string,
    minutesAmount: number
}

interface CyclesContextType {
  activeCycle: Cycle | undefined,
  cycles: Cycle[],
  setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>,
  activeCycleId: string | null,
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>,
  amountSecondsPassed: number,
  handleCreateNewCycle(data: CreateCycleData): void,
  handleInterruptCycle(): void,
  
}

export const CyclesContext = createContext({} as CyclesContextType);



export function CyclesContextProvider({children}:any){

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

  function handleCreateNewCycle(data: CreateCycleData) {
      const id = String(new Date().getTime());
      const newCycle: Cycle = {
        id,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date(),
      };
  
      setCycles((state) => [...state, newCycle]);
      setActiveCycleId(id);
      setAmountSecondsPassed(0);
      console.log(data);
    //   reset();
    }
  
    function handleInterruptCycle() {
      setCycles(
        cycles.map((cycle) => {
          if (cycle.id == activeCycleId) {
            return { ...cycle, interruptDate: new Date() };
          } else {
            return cycle;
          }
        })
      );
      setActiveCycleId(null);
    }
    return(
         <CyclesContext.Provider value={{activeCycle, 
         activeCycleId, 
         cycles, 
         setCycles, 
         setAmountSecondsPassed, 
         amountSecondsPassed,
         handleCreateNewCycle, 
         handleInterruptCycle
         }}>
            {children}
         </CyclesContext.Provider>
    )
}