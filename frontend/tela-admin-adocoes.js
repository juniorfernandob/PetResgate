const TelaAdminAdocoes = {
    render: () => `
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-6"><i class="fa-solid fa-user-shield text-blue-900 mr-2"></i>Triagem de Formulários pós Entrevista (RF5)</h2>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr class="bg-slate-50 border-b text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th class="p-3">Adotante</th><th class="p-3">Pet Solicitado</th><th class="p-3">Status</th><th class="p-3 text-center">Decisão Técnico-Administrativa</th>
                        </tr>
                    </thead>
                    <tbody id="tbl-solicitacoes" class="divide-y text-slate-700"></tbody>
                </table>
            </div>
        </div>
    `
};