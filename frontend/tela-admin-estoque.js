const TelaAdminEstoque = {
    render: () => `
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-6"><i class="fa-solid fa-boxes-stacked text-blue-900 mr-2"></i>Controle de Estoque (RF7)</h2>
            <form onsubmit="adicionarEstoque(event)" class="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl mb-6">
                <div><label class="block text-xs font-bold text-slate-600 mb-1">Item de Insumo</label><input type="text" id="est-item" required class="w-full p-2 border rounded text-sm bg-white"></div>
                <div><label class="block text-xs font-bold text-slate-600 mb-1">Volume / Quantidade</label><input type="text" id="est-qtd" required class="w-full p-2 border rounded text-sm bg-white"></div>
                <div class="flex items-end"><button type="submit" class="w-full bg-[#0d2142] hover:bg-slate-800 text-white p-2 text-sm font-semibold rounded transition shadow">Adicionar Insumo</button></div>
            </form>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr class="bg-slate-50 border-b text-xs font-semibold text-slate-500 uppercase tracking-wider"><th class="p-3">Insumo / Medicamento</th><th class="p-3">Quantidade em Depósito</th></tr>
                    </thead>
                    <tbody id="tbl-estoque" class="divide-y text-slate-700"></tbody>
                </table>
            </div>
        </div>
    `
};