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

      <main className="max-w-7xl flex justify-center">
          <section className="w-full flex justify-center">
            <button className="w-full flex justify-center">
              <div className="flex flex-col rounded-lg w-[60%] p-5 shadow-sm bg-white space-y-3">
                <div className="flex item-center justify-between w-full">
                  <h3 className="font-bold">Título</h3>

                  <img src="star.svg" />
                </div>

                <div className="border-b border-zinc-300"/>

                <div className="text-left">
                  <p>Criar nota...</p>
                </div>
              </div>
            </button>
          </section>
      </main>
    </div>
  )
}