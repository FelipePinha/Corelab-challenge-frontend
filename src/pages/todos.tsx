import { useState } from "react"
import { CreateNoteModal } from "../components/create-note-modal"
import { NoteCard } from "../components/note-card"
import { api } from "../lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Todo } from "../types/todo"
import { Header } from "../components/header"
import { useSearchParams } from "react-router-dom"

import Star from '../assets/star.svg'

export function Todos() {
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false)
  const [searchParams] = useSearchParams()

  // get search value from url
  const search = searchParams.get('search')

  function openCreateNoteModal() {
    setIsCreateNoteModalOpen(true)
  }

  function closeCreateNoteModal() {
    setIsCreateNoteModalOpen(false)
  }

  async function getTodos(search: string | null) {
    const res = await api.get('/todos')
    const { data } = res.data

    // filter search results if search exists in url
    if(search) {
      const searchResults = data.filter((todo: Todo) => {
        return todo.title.toLowerCase().includes(search.toLowerCase())
      })
      
  
      return searchResults
    }

    return data
  }

  const { data, isLoading } = useQuery({
    queryFn: () => getTodos(search),
    queryKey: ['todos', search]
  })

  return (
    <div>
      <div className="space-y-6">
        <Header />

        <main className="max-w-7xl mx-auto space-y-6 p-3">
            <section className="w-full">
              <button onClick={openCreateNoteModal} className="w-full flex justify-center">
                <div className="flex flex-col rounded-lg w-full shadow-sm bg-white space-y-3">
                  <div className="flex item-center justify-between w-full border-b border-b-zinc-400 p-5">
                    <h3 className="font-bold">Título</h3>

                    <img src={Star} />
                  </div>

                  <div className="text-left p-5">
                    <p>Criar nota...</p>
                  </div>
                </div>
              </button>
            </section>

            <section className="space-y-2">
              <h2 className="text-zinc-500 text-sm">Favoritas</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                  !isLoading ?
                  data?.map((todo: Todo) => {
                    if(todo.favorite) {
                      return (
                        <NoteCard todo={todo} key={todo.id}/>
                      )
                    }
                  })
                  :
                  (
                    <p className="text-xs text-zinc-600">Carregando...</p>
                  )
                }
              </div>
            </section>
            
            <section className="space-y-2">
              <h2 className="text-zinc-500 text-sm">Outras</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {
                  !isLoading ?
                  data?.map((todo: Todo) => {
                    if(!todo.favorite) {
                      return (
                        <NoteCard todo={todo} key={todo.id}/>
                      )
                    }
                  })
                  :
                  (
                    <p className="text-xs text-zinc-600">Carregando...</p>
                  )
                }
              </div>
            </section>
        </main>
        
      </div>
      {
        isCreateNoteModalOpen && (
          <CreateNoteModal closeCreateNoteModal={closeCreateNoteModal}/>
        )
      }
    </div>
  )
}