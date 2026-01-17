**Saborify — App de Receitas (HTML/CSS/JS)**

Visão Geral

Saborify é um app front‑end de receitas feito em HTML, CSS e JavaScript puro (sem frameworks). Ele oferece catálogo com filtros, modal de detalhes, favoritos por utilizador, criação de receitas e um painel de administração para aprovar/rejeitar e excluir receitas do site.

Principais Funcionalidades

- Catálogo com filtros: tipo, dificuldade e tempo máximo.
- Detalhe em modal: imagem, descrição, tempo, dificuldade, ingredientes e preparo.
- Login simples: baseado em JSON estático (data/usuarios.json) e sessão no navegador.
- Favoritos por utilizador: botão de like nos cards e listagem no perfil.
- Criar receita: título, descrição, ingredientes, preparo, tempo, tipo e imagem (URL); envia para aprovação.
- Painel do Admin: aprovar/rejeitar pendentes; ver publicadas e excluir do site.
- Perfil: ver receitas favoritas e criadas pelo utilizador.

Stack / Tecnologias

- HTML5, CSS3, JavaScript (Vanilla)
- Dados estáticos em JSON: data/receitas.json e data/usuarios.json
- Estado de sessão via sessionStorage (navegador)

Estrutura do Projeto

- Raiz
	- index.html — catálogo e filtros
	- styles.css — estilos globais (header, cards, modal, etc.)
	- script.js — lógica do catálogo e filtros
	- utils.js — helpers partilhados (sessão e rótulos)
	- data/ — JSONs de receitas/usuários
	- pages/
		- admin/
			- admin.html
			- admin.js
			- admin.css
		- criar/
			- criar.html
			- criar.css
			- criar.js
		- login/
			- login.html
			- login.css
			- login.js
		- perfil/
			- perfil.html
			- perfil.css
			- perfil.js

Como Executar (servidor estático)

O navegador bloqueia fetch() de ficheiros locais (file://). Sirva a pasta num servidor HTTP simples.

Opção Node (npx):

```bash
npx http-server -p 8080
```

Opção VS Code (Live Server):
- Instale a extensão “Live Server”
- Clique em “Go Live” na barra de status na raiz do projeto

Acesse no navegador:

http://localhost:8080/

Contas de Demonstração

- Utilizador: user@saborify.com / 123456
- Admin: admin@saborify.com / admin123

Fluxo de Dados e Persistência

- Base: data/receitas.json (catálogo inicial) e data/usuarios.json (login demo).
- sessionStorage (por separador/aba do navegador):
	- loggedUser — utilizador autenticado + favoritos na sessão.
	- receitasPendentes — receitas criadas por utilizadores e ainda não aprovadas.
	- receitasExtraAprovadas — receitas criadas e aprovadas (admin) que complementam o JSON base.
	- receitasExcluidasIds — IDs de receitas base ocultadas pelo admin (não aparecem no site).
- Observação: nada é gravado em disco; ao limpar a sessão/fechar o navegador, os dados de sessão podem desaparecer.

Como Navegar

- Catálogo: index.html
- Criar receita: pages/criar/criar.html
- Perfil: pages/perfil/perfil.html
- Admin: pages/admin/admin.html

Notas de Desenvolvimento

- utils.js centraliza helpers de sessão e rótulos de dificuldade.
- O modal tem layout padronizado (styles.css) e é usado tanto no catálogo como no admin.
- O painel do admin também lista “Receitas publicadas” para permitir excluir do site:
	- Se a receita veio do JSON base, o ID entra em receitasExcluidasIds (fica oculta).
	- Se a receita foi criada/extra aprovada, ela é removida de receitasExtraAprovadas.
- A criação de receitas inclui descrição, imagem por URL e campos essenciais; para utilizador comum, entra em aprovação; para admin, entra publicada.
- Favoritos: botão nos cards; estado salvo em sessionStorage.loggedUser e refletido no Perfil.


Possíveis Melhorias (Roadmap)

- Persistir favoritos e receitas aprovadas em localStorage (permanente por navegador).
- Backend real (API) para autenticação, receitas e aprovação persistente.
- Upload/gestão de imagens.
- Edição/remoção com histórico e auditoria.
