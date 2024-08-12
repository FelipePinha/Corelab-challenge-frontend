import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../lib/react-query"
import { api } from "../lib/axios"

import Star from '../assets/star.svg'
import StarFull from '../assets/star_full.svg'

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
                <img src={StarFull} alt="Favorito" />
            ) : (
                <img src={Star} alt="Não Favorito" />
            )}
        </button>
    )
}