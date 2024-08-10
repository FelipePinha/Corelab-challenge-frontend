import { Todo } from "../types/todo";

interface NoteCardProps {
    todo: Todo
}

export function NoteCard({todo}: NoteCardProps) {
    return (
        <div className="flex flex-col h-80 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center border-b border-b-zinc-400 p-3">
                <h3 className="font-bold">{todo.title}</h3>
                <button>
                    {todo.favorite ? (
                        <img src="star_full.svg" alt="Favorito" />
                    ) : (
                        <img src="star.svg" alt="Não Favorito" />
                    )}
                </button>
            </div>

            <div className="flex-1 px-4 py-2 overflow-auto">
                <p>{todo.description}</p>
            </div>

            <div className="flex justify-between items-center px-3 py-2">
                <div className="flex items-center gap-2">
                    <button>
                        <img src="pencil.svg" alt="Editar" />
                    </button>
                    <button>
                        <img src="color_picker.svg" alt="Selecionar Cor" />
                    </button>
                </div>
                <button>
                    <img src="x.svg" alt="Excluir" />
                </button>
            </div>
        </div>

    )
}