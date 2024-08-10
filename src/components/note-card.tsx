export function NoteCard() {
    return (
        <div className="bg-white rounded-lg space-y-4">
            <div className="flex justify-between items-center border border-b-zinc-400 p-3">
                <h3 className="font-bold">Título</h3>

                <button>
                    <img src="star_full.svg" />
                </button>
            </div>

            <div className="px-4">
                <p>Arraste e solte aqui e tal tal tal</p>
            </div>

            <div className="flex justify-between items-center px-3 py-2">
            <div className="flex items-center gap-2">
                <button>
                    <img src="pencil.svg" />
                </button>
                <button>
                    <img src="color_picker.svg" />
                </button>
            </div>

            <button>
                <img src="x.svg" />
            </button>
            </div>
        </div>
    )
}