import { FormEvent, useState } from "react"
import { api } from "../lib/axios"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../lib/react-query"
import { isAxiosError } from "axios"
import { ErrorMessage } from "./error-message"
import { TodoError } from "../types/todo"

import X from '../assets/x.svg'
import Star from '../assets/star.svg'
import StarFull from '../assets/star_full.svg'
import { Colors } from "./colors"

interface CreateNoteModalProps {
    closeCreateNoteModal: () => void
}

export function CreateNoteModal({closeCreateNoteModal}: CreateNoteModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#FFFFFF')
  const [favorite, setFavorite] = useState(false)

  const [errors, setErrors] = useState<TodoError>()

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']})
    }
  })

  async function postTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = {
      title,
      description,
      color,
      favorite
    }

    try {
      await api.post('/todos/create', formData)

      closeCreateNoteModal()
    } catch (error) {
      if(isAxiosError(error)) {
        setErrors(error.response?.data.errors)
      }
    }
  }

  return (
      <div className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-black/50">
        <form onSubmit={e => mutation.mutate(e)} className="bg-white p-5 flex flex-col space-y-6 w-full md:w-1/2 rounded-lg relative">
          <h2 className="font-bold text-xl">Criar nota</h2>

          <button onClick={closeCreateNoteModal} className="absolute right-5 top-0">
            <img src={X} />
          </button>
          <div className="space-y-1">
            <label>Título</label>
            <input
              onChange={e => setTitle(e.target.value)}
              type="text" 
              className="border-2 px-2 h-10 text-md rounded-md w-full outline-none p-3" 
              placeholder="Título da nota"
            />
            <ErrorMessage error={errors?.title} />
          </div>
          <div className="flex flex-col space-y-1">
            <label>Descrição</label>
            <textarea
              onChange={e => setDescription(e.target.value)}
              className="border-2 px-2 h-36 rounded-md text-md w-full outline-none resize-none p-3" 
              placeholder="conte mais sobre...">
            </textarea>
            <ErrorMessage error={errors?.description} />
          </div>

          <div className="space-y-2">
            <p>Escolha uma cor (opcional)</p>
            <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-3">
              <Colors onChange={event => setColor(event.target.value)}/>
            </div>
          </div>

          <div>
            <p>Favoritar</p>

            <div className="w-6">
              <label htmlFor="favorite" className="cursor-pointer">
                <input 
                  onChange={e => setFavorite(e.target.checked)}
                  className="hidden peer" 
                  type="checkbox" 
                  name="favorite" 
                  id="favorite"
                />
                <img src={Star} className="peer-checked:hidden"/>
                <img src={StarFull} className="hidden peer-checked:block"/>
              </label>
            </div>
          </div>

          <div className="text-end">
            <button type="submit" className="bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-400 transition duration-100">Criar</button>
          </div>
        </form>
      </div>
  )
}