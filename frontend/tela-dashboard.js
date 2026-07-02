const TelaDashboard = {
    render: () => `
        <div class="space-y-6">
            <div class="flex flex-col lg:flex-row justify-between lg:items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 gap-4">
                <div>
                    <h2 class="text-xl font-bold text-slate-800">Dashboard de Controle Geral</h2>
                    <p class="text-xs text-slate-400 mt-0.5">Indicadores de desempenho calculados em tempo real</p>
                </div>
                <div class="flex flex-wrap items-center gap-2 bg-slate-50 border p-2 rounded-xl text-xs font-medium text-slate-600">
                    <span class="text-slate-500 font-bold px-1"><i class="fa-solid fa-calendar-days mr-1 text-[#0d2142]"></i> Monitoramento:</span>
                    <div class="flex items-center gap-1">
                        <label class="text-[10px] uppercase text-slate-400 font-bold">De</label>
                        <input type="date" id="dash-data-inicio" value="2026-01-01" class="border rounded px-2 py-1 bg-white focus:outline-none focus:border-blue-900">
                    </div>
                    <div class="flex items-center gap-1">
                        <label class="text-[10px] uppercase text-slate-400 font-bold">Até</label>
                        <input type="date" id="dash-data-fim" value="2026-06-30" class="border rounded px-2 py-1 bg-white focus:outline-none focus:border-blue-900">
                    </div>
                    <button onclick="atualizarPeriodoMonitoramento()" class="bg-[#0d2142] hover:bg-slate-800 text-white px-3 py-1 rounded font-bold transition shadow-sm">Filtrar</button>
                </div>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><p class="text-xs font-bold text-slate-400 uppercase">Resgates e Doações</p><p id="card-resgates" class="text-2xl font-black text-slate-800 mt-1">128</p></div>
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><p class="text-xs font-bold text-slate-400 uppercase">Estoque de Alimentos</p><p id="card-alimentos" class="text-2xl font-black text-slate-800 mt-1">532 kg</p></div>
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><p class="text-xs font-bold text-slate-400 uppercase">Doadores Registrados</p><p id="card-doadores" class="text-2xl font-black text-slate-800 mt-1">86</p></div>
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><p class="text-xs font-bold text-slate-400 uppercase">Animais Acolhidos</p><p id="card-acolhidos" class="text-2xl font-black text-slate-800 mt-1">154</p></div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><h3 class="text-sm font-bold text-slate-700 uppercase mb-4">Insumos por Destinação</h3><div class="h-60"><canvas id="chartDonut"></canvas></div></div>
                <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm lg:col-span-2"><h3 class="text-sm font-bold text-slate-700 uppercase mb-4">Fluxo Mensal de Acolhimento</h3><div class="h-60"><canvas id="chartLine"></canvas></div></div>
            </div>
        </div>
    `
};