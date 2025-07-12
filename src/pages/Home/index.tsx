import { HandPalm, Play, Watch } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import {useForm, UseFormHandleSubmit, UseFormReset, UseFormWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import {differenceInSeconds} from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";


export type Cycle = {
    id: string,
    task: string,
    minutesAmount: number,
    startDate : Date ,
    interruptedDate?: Date,
    fineshedDate?: Date,
}

interface HomeProps {
  amountSecondsPassed: number;
  task: string ,
  minutesAmount: number,
  minutes: string,
  seconds: string,
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>,
  handleSubmit: UseFormHandleSubmit<{minutesAmount: number;task: string;}, {minutesAmount: number; task: string;}>
  watch: UseFormWatch<{minutesAmount: number;task: string;}>,
  reset: UseFormReset<{minutesAmount: number;task: string;}>
}

type newCycleFormData = {
    task: string;
    minutesAmount: number;
}


export function Home({amountSecondsPassed, minutes, seconds, setAmountSecondsPassed, handleSubmit, reset,watch}: HomeProps) {
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [cycles, setCycles] = useState<Cycle[]>([]);

  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);
  const totalSenconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;


  const currentSeconds = activeCycle ? totalSenconds - amountSecondsPassed : 0;
      
  
  const task = watch('task');
  const isSubmitDisabled = !task;



  function handleCreateNewCycle(data: newCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }


    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    console.log(data);
    reset();  
  }


  function handleInterruptCycle() {
      setCycles(
        cycles.map((cycle) => {
          if(cycle.id == activeCycleId){
            return{...cycle, interruptDate: new Date()}
          }else{
            return cycle
          }
        }),
      )
      setActiveCycleId(null) 
  }
  

  useEffect(() =>{
    if(activeCycle){
      document.title = `${minutes}:${seconds}`
    }
  },[minutes, seconds,activeCycle])



  // interface newCycleFormData {
  //   task: string ,
  //   minutesAmount: number,
  // }


  //form é um objeto onde tem várias funções dentro dele 
  //register nada mais é do que uma função que vai adicionar um input dentro do nosso formulario 

  // register (string name){
  //     return{
  //        onChange: () => void
  //        onBlur: () => void 
  //        onFocus: () => void
  //      }
  // }


  
  return (
    <HomeContainer >
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm activeCycle={activeCycle} setCycles={setCycles}/>
        <CountDown activeCycle={activeCycle} setCycles={setCycles} currentSeconds={currentSeconds} 
        activeCycleId={activeCycleId} cycles={cycles} totalSenconds={totalSenconds}/>
        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle}  type="button">
          Interromper <HandPalm size={24}/>
        </StopCountDownButton>
        ): (
        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          Começar <Play size={24}/>
        </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}


