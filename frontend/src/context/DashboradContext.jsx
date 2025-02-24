import { createContext, useState } from 'react';

const DashboardContext = createContext()

function DashboardProvider({children}) {

    const [positionActive, setPositionActive] = useState(1)


    return (
        <DashboardContext.Provider value={{positionActive, setPositionActive}}>
            {children}
        </DashboardContext.Provider>
    )

}

export {DashboardContext, DashboardProvider}

