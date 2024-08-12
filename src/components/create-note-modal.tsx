import { FormEvent, useState } from "react"
import colors from "../utils/color-picker-list"
import { api } from "../lib/axios"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../lib/react-query"
import { isAxiosError } from "axios"
import { ErrorMessage } from "./error-message"
import { TodoError } from "../types/todo"

import X from '../assets/x.svg'
import Star from '../assets/star.svg'
import StarFull from '../assets/star_full.svg'

interface CreateNoteModalProps {
    closeCreateNoteModal: () => void
}

export function CreateNoteModal({closeCreateNoteModal}: CreateNoteModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    color: '#FFFFFF',
    favorite: false
  })

  const [errors, setErrors] = useState<TodoError>()

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']})
    }
  })

  async function postTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await api.post('/todos/create', formData)

      closeCreateNoteModal()
    } catch (error) {
      if(isAxiosError(error)) {
        setErrors(error?.response?.data.errors)
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
              onChange={e => setFormData({...formData, title: e.target.value})}
              type="text" 
              className="border-2 px-2 h-10 text-md rounded-md w-full outline-none p-3" 
              placeholder="Título da nota"
            />
            <ErrorMessage error={errors?.title} />
          </div>
          <div className="flex flex-col space-y-1">
            <label>Descrição</label>
            <textarea
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="border-2 px-2 h-36 rounded-md text-md w-full outline-none resize-none p-3" 
              placeholder="conte mais sobre...">
            </textarea>
            <ErrorMessage error={errors?.description} />
          </div>

          <div className="space-y-2">
            <p>Escolha uma cor (opcional)</p>
            <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-3">
              {
                colors.map(color => (
                    <label key={color.color_name} htmlFor={color.id} className="cursor-pointer w-12 flex justify-center" >
                        <input 
                          onChange={e => setFormData({...formData, color: e.target.value})}
                          className='hidden peer' 
                          type="radio" 
                          name="color-radio" 
                          id={color.id} 
                          value={color.color_code}/>
                        <div style={{backgroundColor: color.color_code}} className="w-10 h-10 rounded-full bg-light-blue peer-checked:ring-2 peer-checked:ring-black peer-checked:ring-offset-1"/>
                    </label>
                ))
              }

            </div>
          </div>

          <div>
            <p>Favoritar</p>

            <div className="w-6">
              <label htmlFor="favorite" className="cursor-pointer">
                <input 
                  onChange={e => setFormData({...formData, favorite: e.target.checked})}
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