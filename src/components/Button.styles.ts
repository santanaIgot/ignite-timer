import styled from 'styled-components';


export type ButtonVariant = 'primary' | 'sencodary' | 'danger' | 'success' ;


interface ButtonContainerProps{
    variant : ButtonVariant;
}

const buttonVariants = {
    primary: 'green',
    sencodary: 'white',
    danger:'orange',
    success:'blue'

}
export const ButtonContainer = styled.button<ButtonContainerProps>`
    
    width: 100px;
    height:40px;

    ${props => {
        return`background-color: ${buttonVariants[props.variant]}`
    }}

`

