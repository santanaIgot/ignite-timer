import { HistoryContainer, ListContainer, TarefaContainer } from "./styles";


export function History() {
    return (
        <HistoryContainer >
            <h1>Meu histórico</h1>

            <TarefaContainer className="">
                <ListContainer>
                    <ul>
                        <h3>Tarefa</h3>
                    </ul>
                    <ul>
                        <h3>Duração</h3>
                    </ul>
                    <ul>
                        <h3>Inicio</h3>
                    </ul>
                    <ul>
                        <h3>Status</h3>
                    </ul>
                </ListContainer>
            </TarefaContainer>
        </HistoryContainer>
    )
}