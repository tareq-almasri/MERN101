import React from 'react'
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom'
import Home from './Home'
import Cart from './Cart'
import Product from './Product'

export default function Container() {
    return (
        <Router>

            <header>
               <NavLink to='/' exact activeStyle={{ color: "gray" }} style={style}> Home </NavLink>
               <NavLink to='/cart'  activeStyle={{ color: "gray" }} style={style}> Cart </NavLink>
            </header>
            
            <main>
                <Switch>
                    <Route path='/' exact component={Home} /> 
                    <Route path='/cart' component={Cart} />
                    <Route path='/product/:id' component={Product} />
                </Switch>  
            </main>

            <footer>
                MERN101 &copy; 2020
            </footer>

        </Router>
    )
}

const style = { color: "white", textDecoration: "none" };