import { ChangeEvent, useState } from "react"
import { api } from "../lib/axios"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../lib/react-query"
import { clsx } from "clsx"

import ColorPickerImg from '../assets/color_picker.svg'
import { Colors } from "./colors"

interface ColorPickerInterface {
    id: number
}

export function ColorPicker({id}: ColorPickerInterface) {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
    const [color, setColor] = useState('')

    const mutation = useMutation({
        mutationFn: updateColor,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        }
    })

    function toggleColorPicker() {
        setIsColorPickerOpen(prev => !prev)
    }

    async function changeColor(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        
        setColor(value)
        
        mutation.mutate()
    }
    
    async function updateColor() {
        await api.patch(`/todos/${id}/update/color`, {color})
    
        setIsColorPickerOpen(false)
    }

    
    return (
        <div className="relative flex flex-col items-center">
            <button 
                onClick={toggleColorPicker}
                className={clsx(`rounded-full size-8 flex justify-center items-center`, {
                    'bg-light-yellow': isColorPickerOpen,
                    'bg-white': isColorPickerOpen && color === '#FFE8AC'
                })}
            >
                    <img src={ColorPickerImg} />
            </button>

            {
                isColorPickerOpen && (
                    <div className="bg-white shadow-lg rounded-lg border border-zinc-300 absolute bottom-9 left-2 w-56 p-5 space-y-5">
                        <div className="grid grid-cols-4 gap-3 justify-items-center">
                            <Colors onChange={changeColor} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}



{/* <label key={color.color_code} htmlFor={color.id} className="cursor-pointer w-12 flex justify-center" >
    <input
        onChange={changeColor}
        className='hidden peer' 
        type="radio" 
        name="color-picker-radio" 
        id={color.id} 
        value={color.color_code}
    />
    <div style={{backgroundColor: color.color_code}} 
        className="w-10 h-10 rounded-full bg-light-blue peer-checked:ring-2 peer-checked:ring-black peer-checked:ring-offset-1"
    />
</label> */}