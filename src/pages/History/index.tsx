import { HistoryContainer, ListContainer, Status } from "./styles";

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

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
