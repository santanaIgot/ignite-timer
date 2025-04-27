import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, Separetor, StartCountDownButton, TaskInput, MinutesAmountInput } from "./styles";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'


export function Home() {


  type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

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

  const newCycleFormValidationSchema = zod.object({
    task:zod.string().min(1,'informe a tarefa'),
    minutesAmount:zod.number().min(5,'O intervalo precisa ser de no máximo 5 minutos').max(60, 'O intervalo precisa ser de no máximo 60 minutos ')
})

  const {register, handleSubmit, watch, formState, reset} = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task:'',
      minutesAmount:0,
    }
  });

  console.log(formState);
  


  function handleCreateNewCycle(data: newCycleFormData) {
    console.log(data);
    reset();
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer className="">
      <form action="">
        <FormContainer onSubmit={handleSubmit(handleCreateNewCycle)}>
          <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
          id="task" 
          placeholder="Dê um nome para o projeto"
          list="task-suggestions"
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
          min={5}
          max={60}
          {...register('minutesAmount', {valueAsNumber: true})}
        />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer >
          <span>0</span>
          <span>0</span>
          <Separetor>:</Separetor>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          Começar <Play size={24}/>
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}


