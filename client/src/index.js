import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppContextProvider } from './components/AppContext.js'
import "./css/style.css"
import "./css/js/main.js"
// import "./css/js/plugins.js"
// import "./css/js/jquery.min.js"
ReactDOM.render(
    <React.StrictMode>
        <AppContextProvider>
            <App />

        </AppContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
