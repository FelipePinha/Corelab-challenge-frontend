import { ChangeEvent } from "react"
import colors from "../utils/color-picker-list"

interface Color {
    color_code: string
    id: string
}

interface ColorsProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Colors({ onChange }: ColorsProps) {
    return (
        <>
            {
                colors.map((color: Color) => (
                    <label key={color.color_code} htmlFor={color.id} className="cursor-pointer w-12 flex justify-center" >
                        <input 
                            onChange={event => onChange(event)}
                            className='hidden peer' 
                            type="radio" 
                            name="color-radio" 
                            id={color.id} 
                            value={color.color_code}/>
                        <div style={{backgroundColor: color.color_code}} className="w-10 h-10 rounded-full bg-light-blue peer-checked:ring-2 peer-checked:ring-black peer-checked:ring-offset-1"/>
                    </label>
                ))
            }
        </>
    )
}