import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import {
  FormProvider,
  useForm
} from "react-hook-form";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyxlesContext";

// interface newCycleFormData {
//   task: string ,
//   minutesAmount: number,
// }

export type Cycle = {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  fineshedDate?: Date;
};

// interface HomeProps {
//   amountSecondsPassed: number;
//   task: string ,
//   minutesAmount: number,
//   minutes: string,
//   seconds: string,
//   setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>,
//   handleSubmit: UseFormHandleSubmit<{minutesAmount: number;task: string;}, {minutesAmount: number; task: string;}>
//   watch: UseFormWatch<{minutesAmount: number;task: string;}>,
//   reset: UseFormReset<{minutesAmount: number;task: string;}>
// }



type newCycleFormData = {
  task: string;
  minutesAmount: number;
};




export function Home() {
 
  const {handleCreateNewCycle, handleInterruptCycle, activeCycle} = useContext(CyclesContext)

  

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "informe a tarefa"),
    minutesAmount: zod
      .number()
      .min(1, "O intervalo precisa ser de no máximo 5 minutos")
      .max(60, "O intervalo precisa ser de no máximo 60 minutos "),
  });
  
  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { watch, handleSubmit, reset} = newCycleForm;


  function handleCreateCycle(data:newCycleFormData) {
    handleCreateNewCycle(data)
    reset()
  }

  const task = watch("task");
  const isSubmitDisabled = !task;
 

  

 

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
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateCycle)}>
       

        <FormProvider {... newCycleForm}>
            <NewCycleForm/>
        </FormProvider>
          <CountDown />
     
        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            Interromper <HandPalm size={24} />
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            Começar <Play size={24} />
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
