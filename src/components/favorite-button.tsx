import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../lib/react-query"
import { api } from "../lib/axios"

interface FavoriteButtonProps {
    id: number
    favorite: boolean
}

export function FavoriteButton({id, favorite}: FavoriteButtonProps) {
    const mutation = useMutation({
        mutationFn: favoriteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        }
    })

    async function favoriteNote() {
        await api.patch(`/todos/${id}/update/favorite`, {
            favorite: !favorite
        })
    }

    return (
        <button onClick={() => mutation.mutate()}>
            {favorite ? (
                <img src="star_full.svg" alt="Favorito" />
            ) : (
                <img src="star.svg" alt="Não Favorito" />
            )}
        </button>
    )
}