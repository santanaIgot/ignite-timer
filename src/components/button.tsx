import { ButtonContainer, ButtonVariant } from './Button.styles';


interface ButtonProps{
    color?:ButtonVariant;
}


export function Button({color= 'primary'}: ButtonProps) {
    return(
        <>
            <ButtonContainer variant={color}>Enviar</ButtonContainer>
        </>
    )
}