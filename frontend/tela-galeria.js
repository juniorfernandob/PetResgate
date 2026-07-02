const TelaGaleria = {
    render: () => `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-slate-800"><i class="fa-solid fa-heart-pulse text-red-500 mr-2"></i>Animais Disponíveis para Adoção (RF3)</h2>
            <p class="text-xs text-slate-400 -mt-4">Clique sobre o card de um animal para ver suas fotos ampliadas sem cortes e navegar pelo álbum.</p>
            <div id="grid-galeria" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
        </div>
    `,
    renderModalMarkup: () => `
        <button onclick="fecharModalGaleria()" class="absolute top-4 right-4 text-white text-3xl hover:text-slate-300 transition z-50 p-2">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="relative w-full max-w-4xl h-[75vh] flex items-center justify-center">
            <button id="btn-modal-prev" onclick="retrocederFotoModal()" class="absolute left-2 sm:left-4 bg-slate-900/60 text-white hover:bg-slate-800 p-4 rounded-full transition z-40 text-xl">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <img id="img-modal-principal" src="" class="w-full h-full object-contain max-h-[75vh] rounded-lg shadow-2xl">
            <button id="btn-modal-next" onclick="avancarFotoModal()" class="absolute right-2 sm:right-4 bg-slate-900/60 text-white hover:bg-slate-800 p-4 rounded-full transition z-40 text-xl">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
        <div class="mt-4 text-center text-white">
            <h4 id="txt-modal-titulo" class="text-lg font-bold"></h4>
            <p id="txt-modal-contador" class="text-xs text-slate-400 mt-1"></p>
        </div>
    `
};