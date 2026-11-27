# Uai Recebe — Requisitos do MVP

O Uai Recebe permite ao operador registrar vendas e recebimentos, acompanhar valores a receber e preparar cobranças de parcelas. Cada conta acessa somente seus próprios dados.

## Requisitos funcionais

| ID | Requisito |
| --- | --- |
| RF-01 | Entrar e sair com e-mail e senha e recuperar o acesso por e-mail. Exigir autenticação para acessar dados, ações financeiras e inscrições em notificações. |
| RF-02 | Cadastrar, consultar, editar e inativar clientes com nome e telefone para cobrança. Validar o telefone para uso no WhatsApp antes de abrir uma cobrança. |
| RF-03 | Cadastrar, consultar, editar e inativar produtos com nome e preço de venda em BRL. Selecionar produtos ativos e quantidades inteiras positivas para compor uma venda. |
| RF-04 | Registrar vendas à vista e a prazo. Na venda a prazo, informar entrada opcional, quantidade de parcelas e primeiro vencimento. Gerar automaticamente o plano e permitir ajustar valores e datas antes de confirmar. |
| RF-05 | Editar valores e vencimentos das parcelas abertas de uma venda confirmada. Salvar as alterações em conjunto quando for necessário redistribuir valores e registrar a edição no histórico. |
| RF-06 | Registrar recebimentos totais e parciais por parcela, com data e valor. Ao confirmar venda à vista ou entrada, registrar o recebimento correspondente. Exibir recibos registrados, saldo e situação de cada parcela. |
| RF-07 | Exibir no dashboard o total vendido e o total recebido no período, além do saldo em aberto, do saldo vencido e do saldo a vencer na data da consulta. Exibir a lista de parcelas vencidas com cliente, vencimento e saldo. |
| RF-08 | Permitir cadastrar a chave Pix da conta e preparar cobrança no WhatsApp de parcela aberta. Preencher mensagem editável com nome do cliente, vencimento, saldo atual e chave Pix, oferecer prévia e abrir a conversa com o texto somente após confirmação humana. O operador envia a mensagem pelo WhatsApp. |
| RF-09 | Permitir que o operador ative o Web Push por dispositivo compatível, no celular e no computador. Programar lembretes para três dias antes do vencimento, no dia do vencimento e um e sete dias depois. Cancelar os lembretes pendentes após a quitação. |
| RF-10 | Consultar o histórico financeiro por venda e cliente, com itens, condições originais, alterações de parcelas e recebimentos. Exibir datas, valores e autoria dos registros. |
| RF-11 | Disponibilizar a instalação como PWA nos ambientes compatíveis, com ícone, abertura em janela própria e orientação de instalação quando aplicável. |

## Regras de negócio

- **RN-01 — Precisão financeira.** Armazenar e calcular em centavos inteiros. Aceitar valores monetários positivos com até duas casas decimais. A entrada aceita zero. Rejeitar valores com mais de duas casas decimais na digitação ou no envio ao backend. Exibir os valores em BRL no padrão pt-BR.
- **RN-02 — Venda.** O total resulta da soma de quantidade × preço unitário gravado em cada item. O total deve ser positivo. A venda à vista é registrada e quitada de forma atômica em um recebimento de valor igual ao total. Na venda a prazo, a entrada representa um recebimento efetivo na confirmação. Ela deve ser menor que o total, e o saldo financiado é o total menos a entrada.
- **RN-03 — Parcelamento.** Dividir o saldo financiado pelo número inteiro positivo de parcelas por divisão inteira. Distribuir o resto, um centavo por parcela, a partir da primeira. Cada parcela deve ter pelo menos um centavo. A partir do primeiro vencimento, os seguintes usam o mesmo dia nos meses subsequentes, limitado ao último dia de cada mês. O dia de referência do primeiro vencimento é retomado quando o mês comportar esse dia.
- **RN-04 — Edições.** Exigir valores positivos e vencimentos em ordem cronológica estrita. Após a confirmação, só parcelas com saldo aberto podem ser editadas. O novo valor de cada parcela deve ser maior que o total já recebido nela. A soma de todas as parcelas deve continuar igual ao saldo financiado da venda. Se qualquer parcela do plano violar uma regra, rejeitar a edição inteira.
- **RN-05 — Recebimentos.** O saldo de uma parcela corresponde ao valor vigente menos a soma dos recebimentos registrados nela. Aceitar recebimento entre um centavo e o saldo atual, inclusive, com data igual ou posterior à venda e até a data atual. Registrar cada recebimento separadamente. Requisições repetidas para o mesmo recebimento devem produzir um único registro. Validar o saldo em uma operação atômica para impedir pagamentos simultâneos que ultrapassem o saldo.
- **RN-06 — Situação.** Saldo zero significa parcela quitada. Com saldo positivo, a parcela é pendente até o fim do dia de vencimento e vencida a partir do dia seguinte. Recebimento parcial reduz o saldo e mantém a classificação pela data do vencimento. Usar datas de calendário no fuso America/Sao_Paulo.
- **RN-07 — Indicadores.** Somar vendas pela data de registro e recebimentos pela data efetiva, considerando os limites inicial e final inclusivos no fuso do negócio. Contar entrada e venda à vista uma única vez no recebido. O saldo em aberto é a soma dos saldos pendentes e vencidos na consulta. O saldo a vencer inclui parcelas que vencem hoje.
- **RN-08 — Cobrança.** Usar o saldo remanescente e a chave Pix configurada. Exigir número válido, chave cadastrada e parcela aberta para disponibilizar a abertura da conversa. Preservar a mensagem editada pelo operador na abertura. Registrar a abertura, quando efetivamente realizada, sem atribuir a ela confirmação de envio ou entrega.
- **RN-09 — Lembretes.** Calcular as quatro datas em dias corridos no fuso do negócio. Para cada conta, usar 09h00 como horário padrão do MVP. Agendar somente horários futuros e, ao editar o vencimento, cancelar o calendário pendente anterior e usar o novo. Cada dispositivo inscrito recebe no máximo um lembrete por parcela, vencimento e intervalo, inclusive após reprocessamento. Revalidar a inscrição, o vencimento e o saldo na hora do envio. Após recebimento parcial, manter o calendário e usar o saldo atualizado no sistema. Após quitação, cancelar os lembretes pendentes e impedir novos envios para a parcela.
- **RN-10 — Histórico.** Preservar valores originais das vendas e os eventos de edição e recebimento. Alterações cadastrais de clientes e produtos não reescrevem registros financeiros anteriores. Inativar clientes e produtos preserva as referências existentes e impede seu uso em novas vendas.

## Requisitos não funcionais

| ID | Requisito |
| --- | --- |
| RNF-01 | Usar React, TypeScript e Vite, com Supabase PostgreSQL, Auth, RLS e Edge Functions. Separar domínio, aplicação, infraestrutura e interface conforme Clean Architecture e SOLID, com dependências justificadas. |
| RNF-02 | Exigir HTTPS em produção, validar dados no frontend e no backend e aplicar RLS às operações com dados de usuário. Vincular registros e inscrições Push ao usuário autenticado. Manter credenciais privilegiadas no backend e arquivos .env com segredos fora do versionamento. |
| RNF-03 | Respeitar a LGPD. Coletar apenas os dados necessários ao cadastro e à cobrança. Restringir o acesso aos dados pessoais e financeiros. Em Web Push, usar texto genérico sem nome, telefone, saldo ou chave Pix e exigir autenticação para abrir o detalhe. |
| RNF-04 | Oferecer interface mobile-first, responsiva e em português do Brasil, compatível com WCAG 2.2 AA. Exibir datas em DD/MM/AAAA e valores em BRL. Pedir confirmação para ações destrutivas. |
| RNF-05 | Usar manifest e service worker para a PWA. Permitir uso pelo navegador quando instalação ou notificações estiverem indisponíveis. Exigir conexão e confirmação do servidor para concluir operações financeiras. |
| RNF-06 | Adotar Vitest, React Testing Library e Playwright para cenários positivos, negativos e de limite. Manter cobertura mínima de 80% no domínio. Executar lint, checagem de tipos, testes e build no GitHub Actions, com ESLint e Prettier no projeto. |
| RNF-07 | Operar sem APIs de IA. |

## Critérios de aceitação

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| CA-01 | Entrar com credenciais válidas, sair ou tentar entrar com senha incorreta. Solicitar recuperação para endereços existente e inexistente. | Credenciais válidas dão acesso. A saída encerra a sessão local e bloqueia o acesso subsequente. A senha incorreta é rejeitada. A resposta pública da recuperação não revela se o e-mail existe. |
| CA-02 | Sem sessão, com sessão expirada ou com conta B, tentar consultar ou alterar diretamente clientes, produtos, vendas, parcelas, pagamentos e inscrições da conta A pela API. | Rejeita o acesso sem sessão válida e bloqueia leitura e escrita cruzadas. A conta A continua acessando seus próprios registros. O navegador, o repositório e o build não contêm credenciais privilegiadas. |
| CA-03 | Cadastrar cliente e produto, usá-los em uma venda, mudar o preço do produto e inativar ambos. Submeter também dados inválidos diretamente ao backend. | Os cadastros válidos são consultáveis. O histórico conserva o preço original e as referências após a inativação. Cadastros inativos ficam indisponíveis para novas vendas. O backend rejeita os dados inválidos. |
| CA-04 | Vender três unidades a R$ 19,99 à vista. Simular falha ao gravar o recebimento. | O total é R$ 59,97, há um único recebimento de R$ 59,97 e o saldo é zero. Em caso de falha de gravação, a venda e o recebimento são revertidos juntos. |
| CA-05 | Financiar uma venda de R$ 110,00 com entrada de R$ 10,00 e três parcelas. Repetir com entrada zero. | Com entrada, registra R$ 10,00 recebidos e parcelas de R$ 33,34, R$ 33,33 e R$ 33,33. A soma com a entrada é R$ 110,00. Com entrada zero, o plano soma R$ 110,00 e não há recebimento de entrada. |
| CA-06 | Tentar dividir R$ 0,02 em três parcelas, registrar entrada igual ao total ou enviar o preço de R$ 1,005. Gerar parcelas a partir de 31/01/2027. | Rejeita as três entradas inválidas. Os três primeiros vencimentos do plano válido são 31/01/2027, 28/02/2027 e 31/03/2027. |
| CA-07 | Alterar duas parcelas de R$ 50,00 para R$ 45,00 e R$ 55,00 e mover o primeiro vencimento. Depois tentar salvar soma de R$ 99,99, datas fora de ordem ou reduzir uma parcela a valor igual ao já recebido nela. | A alteração válida é persistida em conjunto e registrada no histórico. Cada alteração inválida é rejeitada integralmente. Parcela quitada não pode ser editada. |
| CA-08 | Receber R$ 24,99 de uma parcela de R$ 100,00 e depois receber o saldo. Tentar registrar R$ 75,02 antes da quitação ou qualquer valor após ela. | O primeiro recebimento deixa R$ 75,01 em aberto. O pagamento de R$ 75,01 quita a parcela. Os valores excedentes são rejeitados. O histórico lista os dois recebimentos válidos. |
| CA-09 | Reenviar a mesma operação de recebimento e tentar registrar simultaneamente dois pagamentos distintos de R$ 80,00 para saldo de R$ 100,00. | O reenvio gera apenas um recebimento. Na disputa pelo saldo, só um pagamento de R$ 80,00 é aceito e sobram R$ 20,00. |
| CA-10 | Registrar no período uma venda de R$ 110,00 com entrada de R$ 10,00 e duas parcelas de R$ 50,00. Receber R$ 20,00 da primeira. Consultar no vencimento da primeira e no dia seguinte, com a segunda ainda a vencer. | O período mostra R$ 110,00 vendidos e R$ 30,00 recebidos. No vencimento, R$ 80,00 estão a vencer. No dia seguinte, o aberto continua em R$ 80,00, com R$ 30,00 vencidos e R$ 50,00 a vencer. A lista de inadimplência exibe o saldo de R$ 30,00 da primeira parcela. |
| CA-11 | Preparar cobrança de parcela parcialmente paga, editar a mensagem e cancelar ou confirmar a abertura. Repetir com parcela quitada, sem telefone válido ou sem chave Pix. | A prévia usa o saldo atualizado, o vencimento, o nome e a chave Pix. Cancelar não abre a conversa. Confirmar abre o destinatário correto com o texto editado. Cada condição inválida impede a abertura. |
| CA-12 | Ativar Web Push em um celular e um computador compatíveis e criar parcela aberta com vencimento em 10/12/2026, antes da primeira data de disparo. Reprocessar cada envio. | O sistema agenda os disparos às 09h00 de 07/12, 10/12, 11/12 e 17/12, em America/Sao_Paulo. Com conectividade e permissões ativas, cada dispositivo recebe um lembrete por data, inclusive com a aplicação fechada. O reprocessamento gera zero lembretes adicionais. |
| CA-13 | Receber parcialmente, editar o vencimento e quitar a parcela antes de outro disparo. Executar também um processamento com a tarefa antiga ainda presente na fila. | O pagamento parcial mantém os lembretes futuros. A edição substitui as datas futuras. O processamento da tarefa antiga é descartado. A quitação cancela os lembretes pendentes e nenhum novo envio é iniciado depois que ela é registrada. |
| CA-14 | Negar ou revogar permissão de Web Push, testar em ambiente incompatível e abrir uma notificação com sessão expirada. | A aplicação informa a disponibilidade sem bloquear o uso financeiro. Inscrições revogadas que forem rejeitadas pelo serviço Push deixam de ser usadas. A notificação exibe texto genérico e o detalhe exige login. |
| CA-15 | Instalar a PWA em celular e desktop compatíveis, abrir pelo ícone e tentar concluir um registro financeiro sem conexão. | A PWA abre em janela própria. O registro financeiro só é mostrado como concluído após confirmação do servidor. Ao voltar a ficar online, é possível consultar as operações confirmadas. |

## Premissas propostas para validação

- Os intervalos dos lembretes usam dias corridos, com disparo padrão às 09h00. O Web Push avisa o operador em seus dispositivos inscritos e depende da compatibilidade e da permissão de cada ambiente.
- O MVP considera parcelamento mensal e valores sem juros, multa ou desconto. O Pix é informado na mensagem para pagamento externo, com baixa manual pelo operador.
- O histórico do MVP registra os eventos financeiros. Estornos, renegociações e exclusão de vendas confirmadas ficam fora desta etapa.
