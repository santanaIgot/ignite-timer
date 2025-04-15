import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, Separetor } from "./styles";


export function Home() {
  return (
    <HomeContainer className="">
      <form action="">
        <FormContainer >
          <label htmlFor="task">Vou trabalhar em</label>
          <input id="task" />

          <label htmlFor="">durante </label>
          <input type="number" id="minutesAmount" />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer >
          <span>0</span>
          <span>0</span>
          <Separetor>:</Separetor>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <button type="submit">Começar <Play size={24}/></button>
      </form>
    </HomeContainer>
  );
}
