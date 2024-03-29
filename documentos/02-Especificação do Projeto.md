# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário.

## Arquitetura e Tecnologias

|Nome    | Função  | 
|------------|-----------------------------------------|
| Whatsapp, Teams | Comunicação entre a equipe; comunicação entre a equipe e o Product Owner do projeto. | 
| Github | 	Repositório da documentação e código fonte do projeto; gerenciamento de funções e tarefas. | 
| Git | 	Gestão do código fonte (versionamento). | 
| Microsoft Visual Studio | Criação do código fonte. | 
| Microsoft SQL Server | Criação e administração do banco de dados. | 
| Lucidchart | Criação dos diagramas e modelos. | 
| Marvel App | Projeto de interface e wireframes. | 
| Bootstrap, ASP.NET Core MVC | Bibliotecas e framework utilizados. |
| HTML, C#, CSS, JavaScript | Linguagens de programação utilizadas na criação do código fonte da aplicação. | 

A ilustração de como as tecnologias estão relacionadas e como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário, pode ser visualizada na figura abaixo:

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t6-kezuka-styles-agenda/assets/26356962/2e3f1e4b-a3f9-4da1-9016-7515bca6a545)

## Project Model Canvas

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t6-kezuka-styles-agenda/assets/104144665/7dcf50c5-9eee-4db0-b02f-ebf92cd9a786)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o cliente agende um horário, selecionando qual colaborador e quais serviços deseja realizar | ALTA | 
|RF-002| Permitir que o cliente cancele um horário com até 24 horas; | BAIXA |
|RF-003| Permitir que o cliente se cadastre | ALTA |
|RF-004| Permitir que o cliente recupere a senha; | MÉDIA |
|RF-005| Permitir que o cliente faça login; | ALTA |
|RF-006| Permitir que o gestor cadastre colaboradores; | ALTA |
|RF-007| Permitir que o gestor caso precise recupere a sua senha "ADM" e senhas de colaboradores; | BAIXA |
|RF-008| Permitir que o gestor visualize as agendas dos colaboradores; | ALTA |
|RF-009| Permitir que o gestor cadastre serviços no sistema; | MÉDIA |
|RF-010| Permitir que o gestor configure porcentagem de comissões de serviços a seus colaboradores; | ALTA |
|RF-011| Permitir que o gestor visualize histórico de atendimentos de seus colaboradores; | MÉDIA |
|RF-012| Permitir que o colaborador faça login | ALTA |
|RF-013| Permitir que o colaborador visualize sua agenda | ALTA |
|RF-014| Permitir que o gestor e colaborador configure as datas disponíveis e horários de atendimentos da semana.| MÉDIA |
|RF-015| Permitir que o colaborador confirme o status do atendimento como "REALIZADO" ou "CANCELADO" | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A aplicação deve ser responsiva para rodar em um dispositivo móvel | MÉDIA | 
|RNF-002| A aplicação deve processar requisições do usuário em no máximo 3s |  BAIXA | 
|RNF-003| A aplicação deve ter bom nível de contraste entre os elementos da tela em conformidade |  BAIXA | 
|RNF-004| A aplicação deve ser compatível com os navegadores mais utilizados do mercado |  MÉDIA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue no final do semestre letivo, não podendo extrapolar a data de 09/06/2024. |
|02| A plataforma deve se restringir às tecnologias básicas utilizando ferramentas de desenvolvimento pré-estabelecidas. |
|03| A plataforma se compromete em não compartilhar históricos de pesquisa e dados sensíveis dos usuários. |
|02| A equipe não pode subcontratar o desenvolvimento do trabalho. |

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

x

## Projeto da Base de Dados

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t6-kezuka-styles-agenda/assets/86859418/456ef5e5-ed37-4cdb-8ed8-389c7fd18b4e"></img>

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.

