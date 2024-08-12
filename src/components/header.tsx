import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export function Header() {
    const [searchValue, setSearchValue] = useState('')
    const [_, setSearchParams] = useSearchParams()

    function SearchNote() {
        setSearchParams(state => {
            if(searchValue) {
                state.set('search', searchValue)
            } else {
                state.delete('search')
            }

            return state
        })
    }

    function changeSearchValue(event: ChangeEvent<HTMLInputElement>) {
       const { value } = event.target

        if(!value) {
            setSearchParams(state => {
                state.delete('search')
                
                return state
            })
        }

        setSearchValue(value)
    }

    return (
        <header className="flex flex-col md:flex-row gap-3 items-center justify-between px-6 py-3 bg-white shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-[80%]">
            <img src="logo.svg" />
            <input 
                onChange={changeSearchValue}
                type="text" 
                className="border-2 px-2 h-8 rounded-[0.25rem] w-full text-sm outline-none shadow-md" 
                placeholder="Pesquisar notas"
                value={searchValue}
            />
          </div>

          <div>
            <button
                onClick={SearchNote}
                className='text-white tracking-wide bg-zinc-900 w-32 py-1.5 rounded-md flex items-center gap-3 justify-center'
            >
                Filtrar
                <img src="search.svg" />
            </button>
          </div>
        </header>
    )
}