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
        />

          <label htmlFor="">durante </label>
        <MinutesAmountInput 
          type="number" 
          id="minutesAmount" 
          placeholder="00"
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
