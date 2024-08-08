export function App() {
  return (
    <div className="space-y-6">
      <header className="h-14 flex items-center justify-between px-6 bg-white shadow-sm">
        <div className="flex items-center gap-5 w-[80%]">
          <img src="logo.svg" />
          <input type="text" className="border-2 px-2 h-8 rounded-md text-sm w-full outline-none" placeholder="Pesquisar notas"/>
        </div>

        <div>
          <img src="x.svg" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6 px-3">
          <section className="w-full">
            <button className="w-full flex justify-center">
              <div className="flex flex-col rounded-lg w-full shadow-sm bg-white space-y-3">
                <div className="flex item-center justify-between w-full border-b border-b-zinc-400 p-5">
                  <h3 className="font-bold">Título</h3>

                  <img src="star.svg" />
                </div>

                <div className="text-left p-5">
                  <p>Criar nota...</p>
                </div>
              </div>
            </button>
          </section>

          <section className="space-y-2">
            <h2 className="text-zinc-500 text-sm">Favoritas</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg space-y-4">
                <div className="flex justify-between items-center border border-b-zinc-400 p-3">
                  <h3 className="font-bold">Título</h3>

                  <img src="star_full.svg" />
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
            </div>
          </section>
          
          <section className="space-y-2">
            <h2 className="text-zinc-500 text-sm">Outras</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg space-y-4">
                <div className="flex justify-between items-center border border-b-zinc-400 p-3">
                  <h3 className="font-bold">Título</h3>

                  <img src="star_full.svg" />
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
            </div>
          </section>
      </main>
    </div>
  )
}