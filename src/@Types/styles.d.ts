import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

 
//só pode ter codigo typescript , um arquivo que só tem tipagem




type ThemeType = typeof defaultTheme;

declare module 'styled-components'{
    export interface DefaultTheme extends ThemeType{}
}
