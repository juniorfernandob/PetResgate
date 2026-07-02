const TelaVeterinario = {
    render: () => `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 class="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b"><i class="fa-solid fa-stethoscope text-blue-900 mr-2"></i>Lançamento de Prontuário Clínico (RF2)</h2>
                <form id="form-prontuario" onsubmit="salvarProntuario(event)" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label class="block text-xs font-bold text-slate-600 mb-1">Paciente</label><select id="vet-pet" class="w-full p-2.5 border rounded-lg text-sm bg-white"></select></div>
                        <div><label class="block text-xs font-bold text-slate-600 mb-1">Tipo de Registro Médico</label><select id="vet-tipo" class="w-full p-2.5 border rounded-lg text-sm bg-white"><option>Consulta Geral</option><option>Aplicação de Vacina</option><option>Procedimento Cirúrgico</option><option>Tratamento Emergencial</option></select></div>
                    </div>
                    <div><label class="block text-xs font-bold text-slate-600 mb-1">Evolução Clínica / Descrição e Prescrição</label><textarea id="vet-desc" rows="4" required class="w-full p-2.5 border rounded-lg text-sm" placeholder="Registrar medicamentos..."></textarea></div>
                    <div class="flex justify-end"><button type="submit" class="bg-[#0d2142] hover:bg-slate-800 text-white px-6 py-2 rounded-lg text-sm font-semibold transition">Registrar Prontuário</button></div>
                </form>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 class="text-lg font-bold text-slate-800 mb-4"><i class="fa-solid fa-clock-rotate-left text-blue-900 mr-2"></i>Histórico Clínico Unificado</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr class="bg-slate-50 border-b text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <th class="p-3">Data/Hora</th><th class="p-3">Paciente</th><th class="p-3">Tipo</th><th class="p-3">Evolução Clínica</th><th class="p-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="tbl-prontuarios" class="divide-y text-slate-700"></tbody>
                    </table>
                </div>
            </div>
        </div>
    `
};