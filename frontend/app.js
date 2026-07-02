// Banco de dados simulado inicial padrão
const CONFIG_DB = {
    animais: [
        {id: 1, nome: "Caramelo", especie: "Cão", porte: "Médio", cor: "Dourado", fotos: ["https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800", "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800"]},
        {id: 2, nome: "Pipoca", especie: "Gato", porte: "Pequeno", cor: "Branco/Amarelo", fotos: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800"]},
        {id: 3, nome: "Thor", especie: "Cão", porte: "Grande", cor: "Preto", fotos: ["https://images.unsplash.com/photo-1552053831-71594a27632d?w=800"]}
    ],
    solicitacoes: [
        {id: 401, nome: "Carlos Souza", tel: "(11) 98888-2222", petId: 1, petNome: "Caramelo", status: "Pendente"}
    ],
    estoque: [
        {item: "Ração Filhotes Premium", qtd: "140 kg"},
        {item: "Antibiótico Veterinário Injetável", qtd: "12 un"},
        {item: "Vacina Antirrábica Coletiva", qtd: "25 doses"}
    ],
    prontuarios: [
        {id: 501, data: "19/06/2026 14:32", petNome: "Caramelo", tipo: "Aplicação de Vacina", desc: "Administrada dose de referência da vacina V10. Animal saudável."}
    ]
};

// Inicialização do LocalStorage
if(!localStorage.getItem('petresgate_v7')) {
    localStorage.setItem('petresgate_v7', JSON.stringify(CONFIG_DB));
}
let DB = JSON.parse(localStorage.getItem('petresgate_v7'));

let perfilConectado = "";
let arrayFotosOtimizadas = [];
let lineInst = null, donutInst = null;

let modalFotosAtuais = [];
let modalIndiceAtual = 0;
let modalTituloAnimal = "";

// Loop de Backup Automático
setInterval(() => {
    localStorage.setItem('petresgate_v7', JSON.stringify(DB));
    const lbl = document.getElementById('lbl-backup');
    if(lbl) lbl.innerText = "Sincronizado às " + new Date().toLocaleTimeString('pt-BR');
}, 12000);

// Mapeamento das rotas e seus respectivos objetos de Componentes carregados
const rotasPorPerfil = {
    admin: [
        {tela: 'tela-dashboard', label: 'Painel e Indicadores', icone: 'fa-chart-pie', comp: TelaDashboard},
        {tela: 'tela-admin-adocoes', label: 'Avaliar Adoções (RF5)', icone: 'fa-user-shield', comp: TelaAdminAdocoes},
        {tela: 'tela-admin-estoque', label: 'Gestão de Estoque (RF7)', icone: 'fa-boxes-stacked', comp: TelaAdminEstoque},
        {tela: 'tela-veterinario', label: 'Histórico de Prontuários (RF2)', icone: 'fa-stethoscope', comp: TelaVeterinario},
        {tela: 'tela-galeria', label: 'Ver Galeria (RF3)', icone: 'fa-images', comp: TelaGaleria}
    ],
    voluntario: [
        {tela: 'tela-cadastro-pet', label: 'Cadastrar Resgate (RF1)', icone: 'fa-square-plus', comp: TelaCadastroPet},
        {tela: 'tela-galeria', label: 'Ver Galeria (RF3)', icone: 'fa-images', comp: TelaGaleria}
    ],
    veterinario: [
        {tela: 'tela-veterinario', label: 'Prontuário Médico (RF2)', icone: 'fa-stethoscope', comp: TelaVeterinario},
        {tela: 'tela-galeria', label: 'Ver Galeria (RF3)', icone: 'fa-images', comp: TelaGaleria}
    ],
    visitante: [
        {tela: 'tela-galeria', label: 'Galeria de Animais (RF3)', icone: 'fa-images', comp: TelaGaleria},
        {tela: 'tela-interesse', label: 'Manifestar Interesse (RF4)', icone: 'fa-file-signature', comp: TelaInteresse}
    ]
};

// Ao carregar a página inicializa a tela de login
window.onload = () => {
    document.getElementById('tela-login').innerHTML = TelaLogin.render();
    document.getElementById('modal-galeria').innerHTML = TelaGaleria.renderModalMarkup();
};

function toggleMenuMobile() {
    const sidebar = document.getElementById('sidebar');
    const icone = document.getElementById('hamburguer-icon');
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
        icone.classList.remove('fa-bars');
        icone.classList.add('fa-xmark');
    } else {
        sidebar.classList.add('hidden');
        icone.classList.remove('fa-xmark');
        icone.classList.add('fa-bars');
    }
}

function verificarPermissao(perfisAutorizados) {
    if (!perfilConectado || !perfisAutorizados.includes(perfilConectado)) {
        alert(`⚠️ VIOLAÇÃO DE SEGURANÇA (RNF2): Operação Recusada!`);
        return false;
    }
    return true;
}

function executarLogin(e) {
    e.preventDefault();
    perfilConectado = document.getElementById('login-perfil').value;
    
    document.getElementById('tela-login').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('lbl-perfil').innerText = perfilConectado;

    const boxAlerta = document.getElementById('alerta-vacinas');
    if(perfilConectado === 'veterinario' || perfilConectado === 'admin') {
        boxAlerta.classList.remove('hidden');
    } else {
        boxAlerta.classList.add('hidden');
    }

    const menu = document.getElementById('menu-dinamico');
    menu.innerHTML = "";
    rotasPorPerfil[perfilConectado].forEach(r => {
        menu.innerHTML += `
            <button onclick="navegarPara('${r.tela}')" class="nav-btn flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white transition">
                <i class="fa-solid ${r.icone} w-5 text-center text-base"></i>
                <span>${r.label}</span>
            </button>
        `;
    });

    navegarPara(rotasPorPerfil[perfilConectado][0].tela);
}

function navegarPara(idTela) {
    if (!perfilConectado) return;
    const rotaEncontrada = rotasPorPerfil[perfilConectado].find(r => r.tela === idTela);
    if (!rotaEncontrada) {
        alert("Acesso Negado!");
        return;
    }

    // Injeta dinamicamente o HTML do componente separado
    document.getElementById('conteudo-tela-ativa').innerHTML = rotaEncontrada.comp.render();
    
    if (window.innerWidth < 768) {
        const sidebar = document.getElementById('sidebar');
        const icone = document.getElementById('hamburguer-icon');
        sidebar.classList.add('hidden');
        icone.classList.remove('fa-xmark');
        icone.classList.add('fa-bars');
    }

    sincronizarDadosTelas();
    if(idTela === 'tela-dashboard') atualizarPeriodoMonitoramento();
}

function atualizarPeriodoMonitoramento() {
    const canvasDonut = document.getElementById('chartDonut');
    const canvasLine = document.getElementById('chartLine');
    if(!canvasDonut || !canvasLine) return;

    const dataInicio = document.getElementById('dash-data-inicio').value;
    const dataFim = document.getElementById('dash-data-fim').value;

    const diffTempo = Math.abs(new Date(dataFim) - new Date(dataInicio));
    const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24)) || 30;
    const fator = Math.min(Math.max(diffDias / 120, 0.3), 3.0);

    document.getElementById('card-resgates').innerText = Math.floor(128 * fator);
    document.getElementById('card-alimentos').innerText = Math.floor(532 * (fator * 0.8)) + " kg";
    document.getElementById('card-doadores').innerText = Math.floor(86 * fator);
    document.getElementById('card-acolhidos').innerText = Math.floor(154 * (fator * 0.9));

    if(lineInst) lineInst.destroy();
    if(donutInst) donutInst.destroy();

    const c1 = canvasDonut.getContext('2d');
    donutInst = new Chart(c1, { 
        type: 'doughnut', 
        data: { 
            labels: ['Rações', 'Medicamentos'], 
            datasets: [{ data: [Math.floor(75 * fator), Math.floor(25 * fator)], backgroundColor: ['#0f2c59', '#3b82f6'] }] 
        }, 
        options: { responsive: true, maintainAspectRatio: false } 
    });

    const c2 = canvasLine.getContext('2d');
    lineInst = new Chart(c2, { 
        type: 'line', 
        data: { 
            labels: ['Início', 'Meio', 'Fim'], 
            datasets: [{ label: 'Atendimentos', data: [Math.floor(12 * fator), Math.floor(28 * fator), Math.floor(45 * fator)], borderColor: '#0f2c59', fill: false }] 
        }, 
        options: { responsive: true, maintainAspectRatio: false } 
    });
}

function logout() {
    perfilConectado = "";
    document.getElementById('menu-dinamico').innerHTML = "";
    document.getElementById('conteudo-tela-ativa').innerHTML = "";
    document.getElementById('alerta-vacinas').classList.add('hidden');
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('tela-login').classList.remove('hidden');
    document.getElementById('tela-login').innerHTML = TelaLogin.render();
}

function processarMultiplasFotos(input) {
    const arquivos = input.files;
    if (!arquivos || arquivos.length === 0) return;
    arrayFotosOtimizadas = [];
    const containerPreview = document.getElementById('preview-fotos-container');
    containerPreview.innerHTML = "";
    containerPreview.classList.remove('hidden');

    Array.from(arquivos).forEach(arquivo => {
        if (arquivo.size > 5 * 1024 * 1024) {
            alert(`O arquivo ${arquivo.name} excede o limite de 5MB!`);
            return;
        }
        const leitor = new FileReader();
        leitor.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 600;
                canvas.height = img.height * (600 / img.width);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const base64 = canvas.toDataURL('image/jpeg', 0.80);
                arrayFotosOtimizadas.push(base64);
                containerPreview.innerHTML += `
                    <div class="relative border rounded-lg overflow-hidden h-24 bg-slate-100">
                        <img src="${base64}" class="w-full h-full object-contain">
                    </div>
                `;
            }
        }
        leitor.readAsDataURL(arquivo);
    });
}

function salvarNovoPet(e) {
    e.preventDefault();
    if (!verificarPermissao(['voluntario', 'admin'])) return;
    const listaFotosFinal = arrayFotosOtimizadas.length > 0 ? arrayFotosOtimizadas : ["https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800"];
    const novo = {
        id: Date.now(),
        nome: document.getElementById('pet-nome').value,
        especie: document.getElementById('pet-especie').value,
        porte: document.getElementById('pet-porte').value,
        cor: document.getElementById('pet-cor').value,
        fotos: listaFotosFinal
    };
    DB.animais.push(novo);
    atualizarMemory();
    alert("Animal adicionado com sucesso!");
    e.target.reset();
    arrayFotosOtimizadas = [];
    navegarPara('tela-galeria');
}

function abrirModalGaleria(idAnimal) {
    const animal = DB.animais.find(a => a.id === idAnimal);
    if (!animal || !animal.fotos || animal.fotos.length === 0) return;
    modalFotosAtuais = animal.fotos;
    modalIndiceAtual = 0;
    modalTituloAnimal = animal.nome;
    document.getElementById('modal-galeria').classList.remove('hidden');
    renderizarFotoModal();
}

function renderizarFotoModal() {
    const img = document.getElementById('img-modal-principal');
    const titulo = document.getElementById('txt-modal-titulo');
    const contador = document.getElementById('txt-modal-contador');
    img.src = modalFotosAtuais[modalIndiceAtual];
    titulo.innerText = modalTituloAnimal;
    contador.innerText = `Foto ${modalIndiceAtual + 1} de ${modalFotosAtuais.length}`;

    const btnPrev = document.getElementById('btn-modal-prev');
    const btnNext = document.getElementById('btn-modal-next');
    if (modalFotosAtuais.length <= 1) {
        btnPrev.classList.add('hidden');
        btnNext.classList.add('hidden');
    } else {
        btnPrev.classList.remove('hidden');
        btnNext.classList.remove('hidden');
    }
}

function avancarFotoModal() {
    modalIndiceAtual = (modalIndiceAtual + 1) % modalFotosAtuais.length;
    renderizarFotoModal();
}

function retrocederFotoModal() {
    modalIndiceAtual = (modalIndiceAtual - 1 + modalFotosAtuais.length) % modalFotosAtuais.length;
    renderizarFotoModal();
}

function fecharModalGaleria() {
    document.getElementById('modal-galeria').classList.add('hidden');
}

function salvarProntuario(e) {
    e.preventDefault();
    if (!verificarPermissao(['veterinario', 'admin'])) return;
    const select = document.getElementById('vet-pet');
    const descInput = document.getElementById('vet-desc');
    if(!select || select.options.length === 0) {
        alert("Nenhum animal cadastrado no sistema.");
        return;
    }
    const novoProntuario = {
        id: Date.now(),
        data: new Date().toLocaleString('pt-BR'),
        petNome: select.options[select.selectedIndex].text,
        tipo: document.getElementById('vet-tipo').value,
        desc: descInput.value
    };
    DB.prontuarios.unshift(novoProntuario);
    atualizarMemory();
    alert("Sucesso (RF2): Prontuário gravado!");
    descInput.value = "";
}

function excluirProntuario(id) {
    if (!verificarPermissao(['veterinario', 'admin'])) return;
    if (confirm("Deseja mesmo remover?")) {
        DB.prontuarios = DB.prontuarios.filter(p => p.id !== id);
        atualizarMemory();
    }
}

function registrarInteresse(e) {
    e.preventDefault();
    if (!verificarPermissao(['visitante'])) return;
    const select = document.getElementById('int-pet');
    const solicitacao = {
        id: Date.now(),
        nome: document.getElementById('int-nome').value,
        tel: document.getElementById('int-tel').value,
        petId: select.value,
        petNome: select.options[select.selectedIndex].text,
        status: "Pendente"
    };
    DB.solicitacoes.push(solicitacao);
    atualizarMemory();
    alert("Interesse registrado!");
    e.target.reset();
    navegarPara('tela-galeria');
}

function julgarFormulario(id, novoStatus) {
    if (!verificarPermissao(['admin'])) return;
    const item = DB.solicitacoes.find(s => s.id === id);
    if(item) {
        item.status = novoStatus;
        atualizarMemory();
        alert(`Formulário alterado para: ${novoStatus}`);
        if(novoStatus === 'Aprovado') gerarTermoPDF(item);
    }
}

function excluirFormulario(id) {
    if (!verificarPermissao(['admin'])) return;
    if (confirm("Tem certeza que deseja excluir?")) {
        DB.solicitacoes = DB.solicitacoes.filter(s => s.id !== id);
        atualizarMemory();
    }
}

function gerarTermoPDF(solicitacao) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "bold");
    pdf.text("PETRESGATE — TERMO OFICIAL DE ADOÇÃO RESPONSÁVEL", 15, 20);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Nome Completo: ${solicitacao.nome}`, 20, 58);
    pdf.text(`Identificação / Nome: ${solicitacao.petNome}`, 20, 88);
    pdf.save(`Termo_Adocao_${solicitacao.petNome}.pdf`);
}

function adicionarEstoque(e) {
    e.preventDefault();
    if (!verificarPermissao(['admin'])) return;
    DB.estoque.unshift({
        item: document.getElementById('est-item').value, 
        qtd: document.getElementById('est-qtd').value
    });
    atualizarMemory();
    e.target.reset();
}

function atualizarMemory() {
    localStorage.setItem('petresgate_v7', JSON.stringify(DB));
    sincronizarDadosTelas();
}

function sincronizarDadosTelas() {
    const boxGaleria = document.getElementById('grid-galeria');
    if(boxGaleria) {
        boxGaleria.innerHTML = "";
        DB.animais.forEach(p => {
            const fotoPrincipal = (p.fotos && p.fotos.length > 0) ? p.fotos[0] : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800";
            const indicadorFotos = (p.fotos && p.fotos.length > 1) ? `<span class="absolute top-2 right-2 bg-slate-900/80 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow"><i class="fa-solid fa-images mr-1"></i> 1/${p.fotos.length}</span>` : '';
            boxGaleria.innerHTML += `
                <div onclick="abrirModalGaleria(${p.id})" class="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden cursor-pointer hover:shadow-lg transition flex flex-col group relative">
                    ${indicadorFotos}
                    <div class="w-full h-64 bg-slate-100 flex items-center justify-center overflow-hidden border-b">
                        <img src="${fotoPrincipal}" class="w-full h-full object-contain group-hover:scale-105 transition duration-300">
                    </div>
                    <div class="p-4 flex-1 flex flex-col justify-between bg-white">
                        <div>
                            <h4 class="font-bold text-slate-800 text-lg group-hover:text-blue-900 transition">${p.nome}</h4>
                            <p class="text-xs text-slate-400 mt-1"><span class="font-semibold text-slate-600">${p.especie}</span> • Porte ${p.porte} • ${p.cor}</p>
                        </div>
                        <span class="text-blue-900 text-xs font-bold mt-3 inline-flex items-center gap-1 group-hover:underline">
                            <i class="fa-solid fa-magnifying-glass-plus"></i> Ampliar e Ver Álbum
                        </span>
                    </div>
                </div>
            `;
        });
    }

    const s1 = document.getElementById('int-pet');
    if(s1) {
        s1.innerHTML = "";
        DB.animais.forEach(p => { s1.innerHTML += `<option value="${p.id}">${p.nome}</option>`; });
    }

    const s2 = document.getElementById('vet-pet');
    if(s2) {
        s2.innerHTML = "";
        DB.animais.forEach(p => { s2.innerHTML += `<option value="${p.id}">${p.nome}</option>`; });
    }

    const tblSol = document.getElementById('tbl-solicitacoes');
    if(tblSol) {
        tblSol.innerHTML = "";
        DB.solicitacoes.forEach(s => {
            let badgeColor = "bg-amber-100 text-amber-700";
            if(s.status === 'Aprovado') badgeColor = "bg-green-100 text-green-700";
            if(s.status === 'Reprovado') badgeColor = "bg-red-100 text-red-700";
            tblSol.innerHTML += `
                <tr class="border-b hover:bg-slate-50/80 transition text-xs sm:text-sm">
                    <td class="p-3 font-semibold text-slate-800">${s.nome}<br><span class="text-xs font-normal text-slate-400">${s.tel || ''}</span></td>
                    <td class="p-3 text-slate-600 font-medium">${s.petNome}</td>
                    <td class="p-3"><span class="px-2.5 py-1 text-xs font-bold rounded-full ${badgeColor}">${s.status}</span></td>
                    <td class="p-3 text-center">
                       <div class="flex flex-wrap items-center justify-center gap-1.5">
                           <button onclick="julgarFormulario(${s.id}, 'Aprovado')" class="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-2.5 py-1.5 rounded shadow-sm transition flex items-center gap-1"><i class="fa-solid fa-check"></i> Aprovar</button>
                           <button onclick="julgarFormulario(${s.id}, 'Reprovado')" class="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-2.5 py-1.5 rounded shadow-sm transition flex items-center gap-1"><i class="fa-solid fa-ban"></i> Reprovar</button>
                           <button onclick="excluirFormulario(${s.id})" class="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-2.5 py-1.5 rounded shadow-sm transition flex items-center gap-1"><i class="fa-solid fa-trash"></i> Excluir</button>
                       </div>
                    </td>
                </tr>
            `;
        });
    }

    const tblEst = document.getElementById('tbl-estoque');
    if(tblEst) {
        tblEst.innerHTML = "";
        DB.estoque.forEach(e => {
            tblEst.innerHTML += `<tr class="border-b"><td class="p-3">${e.item}</td><td class="p-3 font-bold">${e.qtd}</td></tr>`;
        });
    }

    const tblPront = document.getElementById('tbl-prontuarios');
    if(tblPront) {
        tblPront.innerHTML = "";
        DB.prontuarios.forEach(p => {
            tblPront.innerHTML += `
                <tr class="border-b hover:bg-slate-50/80 transition">
                    <td class="p-3 text-xs text-slate-400 whitespace-nowrap">${p.data}</td>
                    <td class="p-3 font-bold text-slate-800">${p.petNome}</td>
                    <td class="p-3 text-xs"><span class="bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded-full border border-blue-200">${p.tipo}</span></td>
                    <td class="p-3 text-sm text-slate-600 max-w-xs break-words">${p.desc}</td>
                    <td class="p-3 text-center">
                        <button onclick="excluirProntuario(${p.id})" class="text-slate-400 hover:text-red-600 transition p-1 text-sm"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
            `;
        });
    }
}