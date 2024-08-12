import { ChangeEvent, useState } from "react"
import colors from "../utils/color-picker-list"
import { api } from "../lib/axios"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../lib/react-query"
import { clsx } from "clsx"

import ColorPickerImg from '../assets/color_picker.svg'

interface ColorPickerInterface {
    id: number
}

export function ColorPicker({id}: ColorPickerInterface) {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
    const [isColorSelected, setIsColorSelected] = useState(false)
    const [color, setColor] = useState('')

    const mutation = useMutation({
        mutationFn: updateColor,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
        }
    })

    function toggleColorPicker() {
        setIsColorPickerOpen(prev => !prev)

        if(!isColorPickerOpen) {
            setIsColorSelected(false)
        }
    }

    function changeColor(e: ChangeEvent<HTMLInputElement>) {
        const { checked, value } = e.target
        
        setColor(value)
        setIsColorSelected(checked)
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
                    'bg-light-yellow': isColorPickerOpen
                })}
            >
                    <img src={ColorPickerImg} />
            </button>

            {
                isColorPickerOpen && (
                    <div className="bg-white shadow-lg rounded-lg border border-zinc-300 absolute top-9 -left-2 w-56 p-5 space-y-5">
                        <div className="grid grid-cols-4 gap-3 justify-items-center">
                            {colors.map(color => (
                                <label key={color.color_name} htmlFor={color.id} className="cursor-pointer w-12 flex justify-center" >
                                    <input
                                        onChange={changeColor}
                                        className='hidden peer' 
                                        type="radio" 
                                        name="color-picker-radio" 
                                        id={color.id} 
                                        value={color.color_code}
                                    />
                                    <div style={{backgroundColor: color.color_code}} className="w-10 h-10 rounded-full bg-light-blue peer-checked:ring-2 peer-checked:ring-black peer-checked:ring-offset-1"/>
                                </label>
                            ))}
                        </div>
                        {
                            isColorSelected && (
                                <button onClick={() => mutation.mutate()} className="w-full bg-gray-200 hover:bg-gray-300 transition duration-100 py-1 rounded-lg text-gray-700 font-semibold">
                                    Salvar
                                </button>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}