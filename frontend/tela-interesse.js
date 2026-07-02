const TelaInteresse = {
    render: () => `
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl mx-auto">
            <h2 class="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b"><i class="fa-solid fa-file-signature text-blue-900 mr-2"></i>Formulário de Interesse (RF4)</h2>
            <form onsubmit="registrarInteresse(event)" class="space-y-4">
                <div><label class="block text-xs font-bold text-slate-600 mb-1">Nome Completo do Interessado</label><input type="text" id="int-nome" required class="w-full p-2.5 border rounded-lg text-sm"></div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label class="block text-xs font-bold text-slate-600 mb-1">Telefone / WhatsApp</label><input type="tel" id="int-tel" required class="w-full p-2.5 border rounded-lg text-sm"></div>
                    <div><label class="block text-xs font-bold text-slate-600 mb-1">Animal Pretendido</label><select id="int-pet" class="w-full p-2.5 border rounded-lg text-sm bg-white"></select></div>
                </div>
                <div><label class="block text-xs font-bold text-slate-600 mb-1">Informações Complementares sobre Habitação</label><textarea id="int-obs" rows="3" placeholder="Possui quintal? Mora em apartamento?" class="w-full p-2.5 border rounded-lg text-sm"></textarea></div>
                <div class="flex justify-end pt-2"><button type="submit" class="bg-[#0d2142] hover:bg-slate-800 text-white px-6 py-2 rounded-lg text-sm font-semibold transition">Enviar Solicitação</button></div>
            </form>
        </div>
    `
};