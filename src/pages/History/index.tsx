import { useContext } from "react";
import { HistoryContainer, ListContainer, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyxlesContext";

export function History() {

  const {cycles} = useContext(CyclesContext)



  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <pre>
        {JSON.stringify(cycles, null, 2)}
      </pre>

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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>2 meses</td>
              
              
              <td>
                  <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>2 meses</td>
              
              
              <td>
                  <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>2 meses</td>
              
              
              <td>
                  <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>2 meses</td>
              
              
              <td>
                  <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </ListContainer>
    </HistoryContainer>
  );
}
