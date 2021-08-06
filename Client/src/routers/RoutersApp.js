import React from 'react'
import { Route, Switch, } from 'react-router-dom'
import Close from '../components/Close/Close'
import Finalgame from '../components/Final/Final'
import FormRegister from '../components/Form/FormRegister'
import Game from '../components/Game/Game'
import Home from '../components/Home/Home'

function RoutersApp() {
    return (
        <>
            <Switch>
                <Route path='/home' component={Home} />
                <Route path='/formRegister' component={FormRegister} />
                <Route path='/game' component={Game} />
                <Route path='/close' component={Close} />
                <Route path='/final' component={Finalgame}/>
            </Switch>
        </>
    )
}

export default RoutersApp
