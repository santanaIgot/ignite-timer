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

    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.white}

    /* ${props => {
        return`background-color: ${buttonVariants[props.variant]}`
    }} */

`

