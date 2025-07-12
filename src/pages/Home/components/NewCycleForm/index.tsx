import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { Cycle } from "../..";



interface NewCycleFormProps {  
  activeCycle: Cycle | undefined;
  setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
} 


const newCycleFormValidationSchema = zod.object({
    task:zod.string().min(1,'informe a tarefa'),
    minutesAmount:zod.number().min(1,'O intervalo precisa ser de no máximo 5 minutos').max(60, 'O intervalo precisa ser de no máximo 60 minutos ')
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function NewCycleForm({activeCycle,setCycles}: NewCycleFormProps) {
   const {register, handleSubmit, watch, formState, reset} = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task:'',
      minutesAmount:0
    }
  });
  return (
    <div>
      <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput
          id="task"
          placeholder="Dê um nome para o projeto"
          list="task-suggestions"
          disabled={!!activeCycle} //validação para caso tiver um projeto rodando desabilite o input para digitar algo
          {...register("task")}
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
          {...register("minutesAmount", { valueAsNumber: true })}
        />

        <span>minutos.</span>
      </FormContainer>
    </div>
  );
}
