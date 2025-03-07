import { ControladoraMenu } from "../controladora/controladora-menu";
import { Notificacao, TIPOS_NOTIFICACAO } from "../infra/notificacao";

export class VisaoMenu{

    iniciar() {
        const controladora = new ControladoraMenu(this);
        controladora.carregarSurveysDisponiveis();

        const botao = document.getElementById('iniciar') as HTMLButtonElement;
        botao.addEventListener('click', (event) => {
            event.preventDefault();
            controladora.carregarSurvey();
        });
        
        const select = document.getElementById('pesquisas') as HTMLSelectElement;
        if(select.value === '')
            this.exibirNotificacaoSelecioneUmaPesquisa();

    }

    botaoCarregamento(){
        const botao = document.getElementById('iniciar') as HTMLButtonElement;
        botao.setAttribute('disabled','true');
        botao.innerHTML = 
        `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Carregando...</span>
        `;
    }

    valorPesquisaSelecionada(): string{
        const select = document.getElementById('pesquisas') as HTMLSelectElement;
        return select.value ? select.value : '';
    }

    exibirNotificacaoSelecioneUmaPesquisa() {
        Notificacao.exibirNotificacao(['Selecione uma pesquisa para iniciar o survey.'],TIPOS_NOTIFICACAO.INFO);
    }

    desenharPesquisasDisponiveis(pesquisas: []){
        const select = document.getElementById('pesquisas') as HTMLSelectElement;
        select.innerHTML = `<option value="" selected>-- Selecione uma pesquisa --</option>`;
        // TODO
    }

}