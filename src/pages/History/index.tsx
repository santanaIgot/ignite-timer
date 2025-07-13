import { useContext } from "react";
import { HistoryContainer, ListContainer, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyxlesContext";
import {formatDistanceToNow} from "date-fns"

export function History() {

  const {cycles} = useContext(CyclesContext)



  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      {/* <pre>
        {JSON.stringify(cycles, null, 2)}
      </pre> */}

      <ListContainer>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycles => {
              return(
                    <tr key={cycles.id}>
                      <td>{cycles.task}</td>
                      <td>{cycles.minutesAmount} minutos</td>
                      <td>{formatDistanceToNow(cycles.startDate, {
                        addSuffix: true
                      })} minutos</td>
                      {/* <td>{cycles.startDate.toDateString()}</td> */}
                      <td>
                        {/* só executara status se finesh date for verdadeiro  */}
                          {cycles.fineshedDate && (
                            <Status statusColor="green">Concluído</Status>
                          )}

                            {cycles.interruptedDate && (
                            <Status statusColor="red">Interrompido</Status>
                          )}


                          {(!cycles.fineshedDate && !cycles.interruptedDate) && (
                            <Status statusColor="yellow">Em andamento</Status>
                          )}
                      </td>
                    </tr>
              )
            })}
          </tbody>
        </table>
      </ListContainer>
    </HistoryContainer>
  );
}
