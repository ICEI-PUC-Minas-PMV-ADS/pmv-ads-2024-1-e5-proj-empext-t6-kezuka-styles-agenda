# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Arquitetura e Tecnologias

|Função    | Tecnologia  | 
|------------|-----------------------------------------|
| Linguagem | JavaScript | 
| Framework | ReactNative | 
| Bibliotecas | React Native Paper, React Navigation, Json server, Json server auth, Axios | 
| IDE | Visual Studio Code | 
| Ferramentas | Microsoft Teams, GitHub, Whatsapp | 
| Banco de dados | SQL SERVER | 

A ilustração de como as tecnologias estão relacionadas e como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário, pode ser visualizada na figura abaixo:

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t6-kezuka-styles-agenda/assets/86859418/06d9d248-a7d3-4bd9-8bfd-8e9a2df1f29b)

## Project Model Canvas

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t6-kezuka-styles-agenda/assets/104144665/7dcf50c5-9eee-4db0-b02f-ebf92cd9a786)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o cliente agende um horário, selecionando qual colaborador e quais serviços deseja realizar | ALTA | 
|RF-002| Permitir que o cliente cancele um horário com até 24 horas; | ALTA |
|RF-003| Permitir que o cliente se cadastre | MÉDIA |
|RF-004| Permitir que o cliente recupere a senha; | MÉDIA |
|RF-005| Permitir que o cliente faça login; | MÉDIA |
|RF-006| Permitir que o gestor cadastre colaboradores; | MÉDIA |
|RF-007| Permitir que o gestor caso precise recupere a sua senha "ADM" e senhas de colaboradores; | MÉDIA |
|RF-008| Permitir que o gestor visualize as agendas dos colaboradores; | MÉDIA |
|RF-009| Permitir que o gestor cadastre produtos e serviços no sistema; | MÉDIA |
|RF-010| Permitir que o gestor configure porcentagem de comissões de produtos e serviços a seus colaboradores; | MÉDIA |
|RF-011| Permitir que o gestor cadastre produtos e serviços no sistema; | MÉDIA |
|RF-012| Permitir que o gestor visualize histórico de atendimentos de seus colaboradores; | MÉDIA |
|RF-013| Permitir que o colaborador faça login | MÉDIA |
|RF-014| Permitir que o colaborador visualize sua agenda | MÉDIA |
|RF-015| Permitir que o gestor e colaborador configure as datas disponíveis e horários de atendimentos da semana.| MÉDIA |
|RF-016| Permitir que o colaborador confirme o status do atendimento como "REALIZADO" ou "CANCELADO" | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A aplicação deve ser responsiva para rodar em um dispositivo móvel | MÉDIA | 
|RNF-002| A aplicação deve processar requisições do usuário em no máximo 3s |  BAIXA | 
|RNF-003| A aplicação deve ter bom nível de contraste entre os elementos da tela em conformidade |  BAIXA | 
|RNF-004| A aplicação deve ser compatível com os navegadores mais utilizados do mercado |  MÉDIA | 
|RNF-005| A aplicação deve ser intuitiva para que o usuário consiga encontrar as informações que deseja facilmente |  ALTA | 
|RNF-006| A aplicação deve utilizar senhas criptografadas 3s |  ALTA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue no final do semestre letivo, não podendo extrapolar a data de 09/06/2024. |
|02| A plataforma deve se restringir às tecnologias básicas utilizando ferramentas de desenvolvimento pré-estabelecidas. |
|03| A plataforma se compromete em não compartilhar históricos de pesquisa e dados sensíveis dos usuários. |
|02| A equipe não pode subcontratar o desenvolvimento do trabalho. |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Modelo ER (Projeto Conceitual)

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

Sugestão de ferramentas para geração deste artefato: LucidChart e Draw.io.

A referência abaixo irá auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.
