import styled from "styled-components";

export const HistoryContainer = styled.div`
    /* background: ${props => props.theme["gray-500"]}; */
`


export const TarefaContainer = styled.div`
    background:  ${props => props.theme["gray-500"]};
    margin-top: 1rem;
    height: 2rem;
    padding: 2rem;
    align-items: flex-start;
    text-align: center;
    justify-content: center;
    border-radius: 5px;
`

export const ListContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    ul{
        margin-top: -0.5rem;
    }   
   
    
`