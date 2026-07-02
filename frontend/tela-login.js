const TelaLogin = {
    render: () => `
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="flex flex-col items-center justify-center text-center md:border-r md:border-slate-200 md:pr-8">
                <div class="w-20 h-20 md:w-24 md:h-24 bg-slate-100 rounded-full flex items-center justify-center text-blue-900 text-4xl md:text-5xl shadow-inner mb-3 md:mb-4">
                    <i class="fa-solid fa-paw"></i>
                </div>
                <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">PetResgate</h1>
                <p class="text-xs md:text-sm text-slate-500 mt-1 md:mt-2">Gestão Unificada de Resgates e Doações</p>
            </div>
            <div class="w-full">
                <div class="text-center mb-6 border-t border-slate-100 pt-6 md:border-t-0 md:pt-0">
                    <h2 class="text-lg md:text-xl font-bold text-slate-800">Acesse sua conta</h2>
                    <p class="text-xs text-slate-400 mt-1">Selecione o nível correspondente ao seu perfil (RNF2)</p>
                </div>
                <form id="form-login" onsubmit="executarLogin(event)" class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Perfil de Acesso</label>
                        <select id="login-perfil" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:border-blue-900 focus:outline-none">
                            <option value="admin">Administrador (Completo)</option>
                            <option value="voluntario">Voluntário (Resgates)</option>
                            <option value="veterinario">Veterinário (Clínica)</option>
                            <option value="visitante">Visitante / Adotante</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">E-mail</label>
                        <input type="email" id="login-email" value="ong@petresgate.org" required class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-blue-900 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Senha</label>
                        <input type="password" id="login-senha" value="123456" required class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-blue-900 focus:outline-none">
                    </div>
                    <button type="submit" class="w-full bg-[#0d2142] hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition tracking-wide shadow">Entrar</button>
                </form>
            </div>
        </div>
    `
};