import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
// import { ContactsContext } from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ContactsContext)
}

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])

  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  return (
    <ConversationsContext.Provider value={{ conversations, createConversation }}>
      {children}
    </ConversationsContext.Provider>
  )
}
