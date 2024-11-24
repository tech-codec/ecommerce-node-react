import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const ThemeContext = createContext()


export const ThemeProvider = ({children})=>{

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    const [open, setOpen] = useState(false)

    const toggleOpen = ()=>{
        setOpen(!open)
    }

    useEffect(()=>{

        localStorage.setItem('theme', theme)

        if(theme === 'dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }

    }, [theme])

    const toggleTheme = ()=>{setTheme((preveTheme) => (preveTheme === 'light' ? 'dark' : 'light') )}

    return (
        <ThemeContext.Provider value={{theme, toggleTheme, toggleOpen, open}}>
            {children}
        </ThemeContext.Provider>
    )
}


export const useTheme = ()=> useContext(ThemeContext)

