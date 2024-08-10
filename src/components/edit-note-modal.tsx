import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { queryClient } from "../lib/react-query"
import { api } from "../lib/axios"

interface CreateNoteModalProps {
    closeEditNoteModal: () => void
    title: string
    description: string
    id: number
}

export function EditNoteModal({closeEditNoteModal, title, description, id}: CreateNoteModalProps) {
  const [formData, setFormData] = useState({
    title,
    description
  })

  const mutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['todos']})
    }
  })

  async function updateNote() {
    await api.patch(`/todos/${id}/update`, formData)
    
    closeEditNoteModal()
  }

  return (
      <div className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-black/50">
            <div className="bg-white p-5 flex flex-col space-y-6 w-full md:w-1/2 rounded-lg relative">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-xl">Editar nota</h2>
                    <button onClick={closeEditNoteModal}>
                        <img src="x.svg" />
                    </button>
                </div>

                <div className="space-y-1">
                    <label>Título</label>
                    <input
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        type="text" 
                        className="border-2 px-2 h-10 text-md rounded-md w-full outline-none p-3" 
                        placeholder="Título da nota"
                        value={formData.title}
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <label>Descrição</label>
                    <textarea
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        className="border-2 px-2 h-36 rounded-md text-md w-full outline-none resize-none p-3" 
                        placeholder="conte mais sobre..."
                    >
                    {description}        
                    </textarea>
                </div>

                <div className="text-end">
                    <button 
                        onClick={() => mutation.mutate()}
                        className="bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-400 transition duration-100"
                    >
                        Atualizar
                    </button>
                </div>
            </div>
        </div>
  )
}