import { ControladoraSurvey } from "../controladora/controladora-survey";
import { Notificacao, TIPOS_NOTIFICACAO } from "../infra/notificacao";

export class VisaoSurvey{

    private static INDEX_ATUAL = -1;

    iniciar() {
        const controladora = new ControladoraSurvey(this);

        /*
        window.onbeforeunload = () => {
            controladora.limpar()
        }
        */

        const nxt = document.getElementById('next-btn') as HTMLButtonElement;
        nxt.addEventListener('click', () => {
            controladora.next();
        });
    }

    
    prevIndex() {
        VisaoSurvey.INDEX_ATUAL--;
        return VisaoSurvey.INDEX_ATUAL;
    }
    nextIndex() {
        VisaoSurvey.INDEX_ATUAL++;
        return VisaoSurvey.INDEX_ATUAL;
    }

    desenharPergunta(pergunta: {titulo: string, respondida: boolean, opcoes: {opcao: string, voto: number}[]}) {
        console.log(VisaoSurvey.INDEX_ATUAL);
        const divConteudo = document.getElementById('conteudo') as HTMLDivElement;
        divConteudo.innerHTML = '';
        const progresso = document.createElement('h6');
        progresso.innerText = `${VisaoSurvey.INDEX_ATUAL + 1}/15`;
        const titulo = document.createElement('h5');
        titulo.innerText = `${pergunta.titulo}`;

        divConteudo.append(progresso,titulo);

        pergunta.opcoes.forEach(opcao => {
            if(opcao.voto == 1){
                divConteudo.innerHTML +=
                `
                <div class="form-check form-check-inline p-1">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" checked id="${pergunta.titulo},${opcao.opcao}">
                    <label class="form-check-label" for="${pergunta.titulo},${opcao.opcao}">
                        ${opcao.opcao}
                    </label>
                </div>
                `;
            } else {
                divConteudo.innerHTML +=
                `
                <div class="form-check form-check-inline p-1">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="${pergunta.titulo},${opcao.opcao}">
                    <label class="form-check-label" for="${pergunta.titulo},${opcao.opcao}">
                        ${opcao.opcao}
                    </label>
                </div>
                `;
            }
            
        });


        // setas
        divConteudo.innerHTML += 
        `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left" id="prev-btn"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right" id="next-btn"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        `;
        

        
        const controladora = new ControladoraSurvey(this);
        var checkboxElems = document.querySelectorAll("input[type='radio']") as NodeListOf<HTMLInputElement>;
        for (var i = 0; i < checkboxElems.length; i++) {
            checkboxElems[i].addEventListener('change', (e) => controladora.atualizarVoto(e));
        }

        const nxt = document.getElementById('next-btn') as HTMLButtonElement;
        nxt.addEventListener('click', () => {
            controladora.next();
        });

        const prev = document.getElementById('prev-btn') as HTMLButtonElement;
        prev.addEventListener('click', () => {
            controladora.prev();
        });
    }

    conclusao(){
        const divConteudo = document.getElementById('conteudo') as HTMLDivElement;
        divConteudo.innerHTML = '';

        const title = document.createElement('h6');
        title.innerText = 'Fim';
        const msg = document.createElement('h5');
        msg.innerText = "Você chegou ao fim! Agora, clique no botão abaixo para enviar suas respostas. Ou volte para revisar suas escolhas.";
        const btn = document.createElement('button');
        btn.classList.add('btn','btn-primary');
        btn.innerText = 'Enviar!';

        divConteudo.append(title,msg,btn);

        divConteudo.innerHTML += 
        `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left" id="prev-btn"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right close" id="next-btn"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        `;

        const controladora = new ControladoraSurvey(this);
        const prev = document.getElementById('prev-btn') as HTMLButtonElement;
        prev.addEventListener('click', () => {
            controladora.prev();
        });
    }

    inicio(){
        const divConteudo = document.getElementById('conteudo') as HTMLDivElement;
        divConteudo.innerHTML = 
        `
        <div class="title">
            <h5>Responda às próximas 15 perguntas com atenção.</h5>
            <h6>Dica: Clique na seta da esquerda para voltar na pergunta e alterar sua escolha.</h6>
            </div>
            <hr>
        <div class="title">
            <h6>Clique na seta da direita para avançar.</h6>
        </div>
        <p class="text-muted">Tempo estimado: 6min</p>

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left close" id="prev-btn"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right" id="next-btn"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        `;

        const controladora = new ControladoraSurvey(this);
        const nxt = document.getElementById('next-btn') as HTMLButtonElement;
        nxt.addEventListener('click', () => {
            controladora.next();
        });
    }

}