import React from 'react'
import NewsPortal from '../portal/NewsPortal.js'
import UserPortal from '../portal/UserPortal.js'
import FavoritePortal from '../portal/FavoritePortal.js'

const AppContext = React.createContext()

// контекст, который будем передавать
const context = {
    user: new UserPortal(),
    news: new NewsPortal(),
    favorite: new FavoritePortal(),
}

const AppContextProvider = (props) => {
    return (
        <AppContext.Provider value={context}>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContext, AppContextProvider }