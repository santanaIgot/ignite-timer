import { HandPalm, Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, Separetor, StartCountDownButton, TaskInput, MinutesAmountInput, StopCountDownButton } from "./styles";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import {differenceInSeconds} from "date-fns";



export function Home() {


  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleFormValidationSchema = zod.object({
    task:zod.string().min(1,'informe a tarefa'),
    minutesAmount:zod.number().min(1,'O intervalo precisa ser de no máximo 5 minutos').max(60, 'O intervalo precisa ser de no máximo 60 minutos ')
})

  const {register, handleSubmit, watch, formState, reset} = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task:'',
      minutesAmount:0
    }
  });

  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);


  const totalSenconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSenconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;


  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
 
  useEffect(() => {
    let interval: number;
    if(activeCycle ){
        interval =setInterval(() => {
          const secondsDifference = differenceInSeconds(
            new Date(), 
            activeCycle.startDate
          )
          if(secondsDifference >= totalSenconds ){
            setCycles(
              cycles.map((cycle) => {
                if(cycle.id == activeCycleId){
                  return{...cycle, fineshedDate: new Date()}
                }else{
                  return cycle
                }
              }),
            )
            setAmountSecondsPassed(totalSenconds)
            clearInterval(interval)
          }else{

            setAmountSecondsPassed(secondsDifference)
          }
          
      },1000)
    }
    return ()=>{
      clearInterval(interval)
    }
  },[activeCycle, totalSenconds,activeCycleId])

  console.log(formState);

  type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
  
  const task = watch('task');
  const isSubmitDisabled = !task;
  interface Cycle{
    id: string,
    task: string,
    minutesAmount: number,
    startDate : Date ,
    interruptedDate?: Date,
    fineshedDate?: Date,
  }



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



  
  console.log(activeCycle);

 
  

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

  console.log(cycles);
  
  
  return (
    <HomeContainer >
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer >
          <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
          id="task" 
          placeholder="Dê um nome para o projeto"
          list="task-suggestions"
          disabled={!!activeCycle} //validação para caso tiver um projeto rodando desabilite o input para digitar algo
          {...register('task')}
          
        />

        <datalist id="task-suggestions">
          <option value="Projeto 1"></option>
          <option value="Projeto 2"></option>
          <option value="Projeto 3"></option>
          <option value="Projeto 4"></option>
        </datalist>

          <label htmlFor="">durante </label>
        <MinutesAmountInput 
          type="number" 
          id="minutesAmount" 
          placeholder="00"
          step={5}
          min={1}
          max={60}
          disabled={!!activeCycle} //validação para caso tiver um projeto rodando desabilite o input para digitar algo
          {...register('minutesAmount', {valueAsNumber: true})}
        />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer >
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separetor>:</Separetor>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

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


