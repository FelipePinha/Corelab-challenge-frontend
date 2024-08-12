import { useMutation } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { queryClient } from "../lib/react-query";
import { api } from "../lib/axios";
import { useState } from "react";
import { EditNoteModal } from "./edit-note-modal";
import { FavoriteButton } from "./favorite-button";
import { ColorPicker } from "./color-picker";
import { clsx } from "clsx";

import X from '../assets/x.svg'
import Pencil from '../assets/pencil.svg'

interface NoteCardProps {
    todo: Todo
}

export function NoteCard({todo}: NoteCardProps) {
    const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false)

    function openEditNoteModal() {
        setIsEditNoteModalOpen(true)
    }

    function closeEditNoteModal() {
        setIsEditNoteModalOpen(false)
    }

    const mutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        }
    })

    async function deleteTodo() {
        await api.delete(`/todos/${todo.id}/delete`)
    }

    return (
        <>
            <div style={{backgroundColor: todo.color}} className='flex flex-col h-80 rounded-lg shadow-md'>
                <div className={clsx("flex justify-between items-center border-b border-b-zinc-400 p-3", {
                    'border-b-slate-50': todo.color !== '#FFFFFF',
                })}>
                    <h3 className="font-bold">{todo.title}</h3>
                    <FavoriteButton favorite={todo.favorite} id={todo.id}/>
                </div>

                <div className="flex-1 px-4 py-2 overflow-auto">
                    <p className="break-words">{todo.description}</p>
                </div>

                <div className="flex justify-between items-center px-3 py-2">
                    <div className="flex items-center gap-2">
                        <button onClick={openEditNoteModal}>
                            <img src={Pencil} />
                        </button>
                        <ColorPicker id={todo.id}/>
                    </div>
                    <button onClick={() => mutation.mutate()}>
                        <img src={X} />
                    </button>
                </div>
            </div>

            {
                isEditNoteModalOpen && (
                    <EditNoteModal 
                        closeEditNoteModal={closeEditNoteModal} 
                        title={todo.title} 
                        description={todo.description}
                        id={todo.id}
                    />
                )
            }
        </>
    )
}