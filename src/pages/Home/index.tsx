import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, Separetor, StartCountDownButton, TaskInput, MinutesAmountInput } from "./styles";


export function Home() {
  return (
    <HomeContainer className="">
      <form action="">
        <FormContainer >
          <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
          id="task" 
          placeholder="Dê um nome para o projeto"
          list="task-suggestions"
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

        <StartCountDownButton disabled type="submit">
          Começar <Play size={24}/>
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}
