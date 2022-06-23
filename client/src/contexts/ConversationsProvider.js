import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
// import { ContactsContext } from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ContactsContext)
}

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])

  const { contacts } = useContacts()

  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const formattedConversations = conversations.map(conversation => {
    const recipients = conversation.recipients.map(recipient => {
        const contact = contacts.find(contact => {
            return contact.id === recipient
        })
        const name = (contact && contact.name) || recipient
        return { id: recipient, name }
    })
    return { ... conversation, recipients }
  })

  return (
    <ConversationsContext.Provider value={{ conversations: formattedConversations, createConversation }}>
      {children}
    </ConversationsContext.Provider>
  )
}
