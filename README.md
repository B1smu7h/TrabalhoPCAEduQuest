# EduQuest

Portal educacional gamificado desenvolvido para o **Projeto Curricular Articulador (PCA)** de Introdução a Aplicações Web.

O EduQuest transforma a prática de conteúdos escolares em uma jornada: o estudante escolhe uma disciplina, responde a desafios de múltipla escolha, recebe feedback imediato e acompanha XP, acertos e aproveitamento.

## Demonstração

- **Site:** abra o `index.html` no navegador ou execute um servidor local (veja abaixo).
- **Vídeo no YouTube:** [youtu.be/VYacyZbei04](https://youtu.be/VYacyZbei04)
- **Repositório:** [github.com/B1smu7h/TrabalhoPCAEduQuest](https://github.com/B1smu7h/TrabalhoPCAEduQuest)

## Funcionalidades

- Três disciplinas: Matemática, Ciências e História.
- Quinze perguntas de múltipla escolha (cinco por disciplina).
- Feedback imediato com explicação da resposta correta.
- XP por acerto e tela de resultado ao final de cada rodada.
- Painel de progresso com XP, perguntas respondidas, acertos e aproveitamento.
- Melhor resultado e número de tentativas por disciplina.
- Persistência local no navegador com `localStorage`.
- Opção de limpar todo o progresso com confirmação.
- Layout responsivo, tema escuro e navegação por teclado.

## Tecnologias

- **HTML5** semântico.
- **CSS3** com variáveis, Grid, Flexbox e media queries.
- **JavaScript** puro, sem frameworks ou dependências de build.
- **localStorage** para persistência dos dados.
- **Google Fonts**: DM Sans e Space Grotesk.

Não há backend, cadastro ou envio de dados para servidores.

## Estrutura do projeto

```text
.
├── index.html              # Página inicial
├── desafios.html           # Quiz por disciplina
├── progresso.html          # Painel de progresso
├── favicon.svg             # Ícone do site
├── css/
│   └── style.css           # Estilos do site
├── js/
│   ├── questions.js        # Banco de perguntas
│   ├── storage.js          # Persistência e estatísticas
│   ├── quiz.js             # Lógica do quiz
│   ├── progresso.js        # Lógica do painel
│   └── main.js             # Interações da página inicial
└── README.md
```

## Como executar

Não é necessário instalar nada. As opções são:

1. Abrir `index.html` diretamente no navegador.
2. Ou iniciar um servidor local na pasta do projeto:

```bash
python3 -m http.server 8000
```

Depois acesse [http://localhost:8000](http://localhost:8000).

> O servidor local é recomendado para testar o fluxo completo e o carregamento dos arquivos JavaScript.

## Como usar

1. Na página inicial, escolha uma disciplina.
2. Responda às cinco perguntas. Cada acerto vale **10 XP**.
3. Leia o feedback e avance para a próxima pergunta.
4. Ao final, veja o resultado da rodada e tente superar seu melhor.
5. Acesse **Meu progresso** para acompanhar as estatísticas.
6. Use **Limpar progresso** se quiser recomeçar do zero.

## Persistência local

| Chave | Conteúdo |
| --- | --- |
| `eduquest-xp` | XP total acumulado |
| `eduquest-answered` | Total de perguntas respondidas |
| `eduquest-correct` | Total de respostas corretas |
| `eduquest-results` | Melhor resultado, última rodada e tentativas por disciplina |
| `eduquest-last-activity` | Data e hora da última atividade |

Os dados ficam apenas no navegador utilizado. Limpar os dados do site ou trocar de navegador reinicia o progresso.

## Acessibilidade e responsividade

- Estrutura semântica com `header`, `nav`, `main`, `section` e `footer`.
- Link "Pular para o conteúdo".
- Foco visível e navegação por teclado.
- Contraste adequado no tema escuro.
- `aria-current`, `aria-live` e `progressbar` nos pontos relevantes.
- Respeito à preferência `prefers-reduced-motion`.
- Layout adaptado para desktop, tablet e celular.

## Projeto acadêmico

Trabalho final do PCA de Introdução a Aplicações Web.
