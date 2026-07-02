const TelaCadastroPet = {
    render: () => `
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl mx-auto">
            <h2 class="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b"><i class="fa-solid fa-square-plus text-blue-900 mr-2"></i>Cadastrar Animal Resgatado (RF1)</h2>
            <form onsubmit="salvarNovoPet(event)" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label class="block text-xs font-bold text-slate-600 mb-1">Nome do Pet</label><input type="text" id="pet-nome" required class="w-full p-2.5 border rounded-lg text-sm"></div>
                    <div><label class="block text-xs font-bold text-slate-600 mb-1">Espécie</label><input type="text" id="pet-especie" placeholder="Ex: Cão, Gato" required class="w-full p-2.5 border rounded-lg text-sm"></div>
                    <div><label class="block text-xs font-bold text-slate-600 mb-1">Porte</label><select id="pet-porte" class="w-full p-2.5 border rounded-lg text-sm bg-white"><option>Pequeno</option><option>Médio</option><option>Grande</option></select></div>
                    <div><label class="block text-xs font-bold text-slate-600 mb-1">Cor Predominante</label><input type="text" id="pet-cor" required class="w-full p-2.5 border rounded-lg text-sm"></div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1">Fotos do Animal (Limite: 5MB)</label>
                    <input type="file" id="pet-fotos" accept="image/*" multiple onchange="processarMultiplasFotos(this)" class="w-full p-2 border rounded-lg text-sm bg-slate-50">
                    <div id="preview-fotos-container" class="mt-3 grid grid-cols-3 gap-2 hidden"></div>
                </div>
                <div class="flex justify-end space-x-3 pt-4"><button type="submit" class="bg-[#0d2142] hover:bg-slate-800 text-white px-6 py-2 rounded-lg text-sm font-semibold transition">Salvar Registro</button></div>
            </form>
        </div>
    `
};