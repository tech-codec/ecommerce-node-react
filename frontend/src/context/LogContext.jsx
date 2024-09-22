import React, { createContext, useState } from 'react'


const LogContext = createContext()

function LogProvider({children}) {

    const [signIn, setsignIn] = useState(false)
    const [signUp, setsignUp] = useState(false)

    return (
        <LogContext.Provider value={{signIn, setsignIn, signUp, setsignUp}}>
            {children}
        </LogContext.Provider>
    )
}


export { LogContext, LogProvider }
