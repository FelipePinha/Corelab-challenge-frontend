import colors from "../utils/color-picker-list"

interface CreateNoteModalProps {
    closeCreateNoteModal: () => void
}

export function CreateNoteModal({closeCreateNoteModal}: CreateNoteModalProps) {
    return (
        <div className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-black/50">
            <div className="bg-white p-5 flex flex-col space-y-6 w-full md:w-1/2 rounded-lg relative">
              <button onClick={closeCreateNoteModal} className="absolute right-5 top-5">
                <img src="x.svg" />
              </button>
              <div className="space-y-1">
                <label>Título</label>
                <input type="text" className="border-2 px-2 h-10 text-md rounded-md w-full outline-none p-3" placeholder="Título da nota"/>
              </div>
              <div className="flex flex-col space-y-1">
                <label>Descrição</label>
                <textarea className="border-2 px-2 h-36 rounded-md text-md w-full outline-none resize-none p-3" placeholder="conte mais sobre..."></textarea>
              </div>

              <div className="space-y-2">
                <p>Escolha uma cor (opcional)</p>
                <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-3">
                  {
                    colors.map(color => (
                        <label key={color.color_name} htmlFor={color.id} className="cursor-pointer w-12 flex justify-center" >
                            <input className='hidden peer' type="radio" name="color-radio" id={color.id} value={color.color_code}/>
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
                    <input className="hidden peer" type="checkbox" name="favorite" id="favorite"/>
                    <img src="star.svg" className="peer-checked:hidden"/>
                    <img src="star_full.svg" className="hidden peer-checked:block"/>
                  </label>
                </div>
              </div>

              <div className="text-end">
                <button className="bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-400 transition duration-100">Criar</button>
              </div>
            </div>
        </div>
    )
}