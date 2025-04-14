import { Outlet } from 'react-router-dom'
import {Header} from '../../components/Header'
import { LayoutContainer } from './styles'


export function Index() {
    return(
        <LayoutContainer>
             <Header/>
             <Outlet/> 
        </LayoutContainer>
    )
}