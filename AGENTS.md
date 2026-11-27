
# AGENTS.md — Uai Recebe

## Objetivo
Sistema de gestão de vendas a prazo, parcelas,
recebimentos e cobranças pelo WhatsApp, com
notificações no celular e computador.

## Stack
- React + TypeScript + Vite.
- Supabase: PostgreSQL, Auth, RLS e Edge Functions.
- PWA e Web Push.
- Vitest, React Testing Library e Playwright.
- ESLint, Prettier e GitHub Actions.

## Arquitetura
- Clean Architecture e SOLID.
- Separar domínio, aplicação, infraestrutura e UI.
- Priorizar simplicidade e reutilização.
- Evitar dependências desnecessárias.
- Não utilizar APIs de IA durante a operação.

## Regras de negócio
- Cadastro de clientes, produtos e vendas.
- Vendas à vista e parceladas.
- Parcelas automáticas com valores e datas editáveis.
- Valores monetários em centavos inteiros.
- Pagamentos totais e parciais.
- Controle de parcelas vencidas e pendentes.
- Dashboard financeiro.
- Cobranças pelo WhatsApp com confirmação humana.
- Notificações sem duplicidade.
- Cancelar lembretes de parcelas quitadas.
- Preservar histórico financeiro.
- Fuso horário America/Sao_Paulo.

## Segurança
- Autenticação obrigatória.
- RLS e isolamento de dados por usuário.
- Validação no frontend e backend.
- Nunca expor credenciais.
- Não versionar arquivos .env com segredos.
- Respeitar a LGPD.
- Utilizar HTTPS em produção.

## Qualidade
- Testes automatizados desde o início.
- Cobertura mínima de 80% no domínio.
- Testar cenários positivos, negativos e limites.
- Executar lint, typecheck, testes e build.
- Não ocultar falhas nem desabilitar testes.

## Git
- Fluxo: feature/* -> develop -> test -> main.
- Conventional Commits.
- Commits pequenos e objetivos.
- Não realizar push ou merge sem autorização.

## Economia de tokens
- Executar somente a tarefa solicitada.
- Ler somente arquivos relevantes.
- Evitar análises repetidas do repositório.
- Não refatorar fora do escopo.
- Respostas curtas e objetivas.
- Não avançar sem autorização.

## Interface
- Mobile-first e responsiva.
- Português do Brasil.
- Moeda BRL.
- Datas DD/MM/AAAA.
- Acessibilidade WCAG 2.2 AA.
- Confirmação para ações destrutivas.

## Finalização de tarefas
- Executar verificações e testes pertinentes.
- Informar arquivos modificados.
- Informar resultados reais dos testes.
- Informar riscos e pendências.
- Sugerir mensagem de commit.
- Aguardar autorização para continuar.
