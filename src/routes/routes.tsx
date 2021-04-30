import React from "react"
import { Route } from "react-router-dom"
import Home from "../pages/Home"

const Routes: React.FC = () => {
    return(
        <Route path="/" component={Home} exact />
    )
}

export default Routes