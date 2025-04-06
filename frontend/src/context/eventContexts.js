import {createContext, useContext } from 'react'


export const eventContext = createContext({
    events : [
        {
            id : 1,
            title : "Event Name",
            vanue : "Event address",
            time : "Date of event"

        }
    ],
    addEvent : (events)=>{},
    removeEvent : (id)=>{},

})

export const useEvent = ()=>{
    return useContext(eventContext)
}

export const eventProvider = eventContext.Provider