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

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t6-kezuka-styles-agenda/assets/104144665/9fd74c9d-a0d8-451c-9cfb-cc9a8e9fcfab)



# Personas

## Persona 1: João, o Gestor

- **Nome:** João Oliveira
- **Idade:** 45 anos
- **Cargo:** Gestor do Salão Kezuka Style’s
- **Localização:** Belo Horizonte, Minas Gerais
- **Hobbies:** Jogar futebol nos finais de semana, viajar com a família.
- **Tecnologia:** Utiliza smartphone e computador frequentemente, mas prefere soluções simples e intuitivas.
- **Objetivos:** Melhorar a eficiência do agendamento e gerenciamento do salão. Deseja liberar mais tempo para focar na qualidade do serviço ao cliente e na expansão do negócio.
- **Desafios:** Lutar contra a desorganização causada pelo sistema atual de agendamentos via WhatsApp e Excel, o que muitas vezes resulta em duplas marcações e confusões.

## Persona 2: Carlos, o Barbeiro

- **Nome:** Carlos Silva
- **Idade:** 33 anos
- **Cargo:** Barbeiro
- **Localização:** Belo Horizonte, Minas Gerais
- **Hobbies:** Sair com os amigos, ir a Workshops e assitir aulas de cursos online para aprender novas tecnicas de cortes.
- **Tecnologia:** Está sempre conectado no seu smartphone, usando redes sociais para divulgar seu trabalho.
- **Objetivos:** Quer organizar melhor seu tempo para atender mais clientes sem comprometer a qualidade dos serviços.
- **Desafios:** - Precisa de um sistema que lhe permita visualizar e gerenciar sua agenda de forma eficiente.

## Persona 3: Carlos, o Cliente Regular

- **Nome:** Carlos Pereira
- **Idade:** 29 anos
- **Profissão:** Advogado
- **Localização:** Belo Horizonte, Minas Gerais
- **Hobbies:** Corrida, jogos de tabuleiro com amigos.
- **Tecnologia:** Utiliza tecnologia para todas as suas necessidades diárias, desde agendamentos até pedidos de comida.
- **Objetivos:** Procura uma forma prática e rápida de agendar seus cortes de cabelo e serviços de barbearia, preferencialmente de seu smartphone.
- **Desafios:** Encontra dificuldade em marcar horários devido à sua agenda lotada e ao sistema atual de agendamento do salão.

## Persona 4: Lívia, a Mãe Atarefada

- **Nome:** Lívia Rocha
- **Idade:** 38 anos
- **Profissão:** Empreendedora no ramo de alimentação saudável
- **Localização:** Belo Horizonte, Minas Gerais
- **Hobbies:** Yoga, cozinhar pratos saudáveis para a família.
- **Tecnologia:** Busca soluções digitais que otimizem seu tempo, já que equilibra a maternidade com a carreira.
- **Objetivos:** Precisa agendar cortes de cabelo e outros serviços de beleza para seus filhos de maneira conveniente e rápida.
- **Desafios:** Enfrenta dificuldades para conciliar a agenda dos filhos com a disponibilidade dos serviços oferecidos pelo salão, além da preferência por um atendimento especializado para crianças.

# Histórias de Usuário

## História 1: Agendamento Online

**Como** cliente do Salão Kezuka Style’s,  
**Quero** poder agendar meus serviços online através de uma interface intuitiva,  
**Para que** eu possa escolher o melhor horário sem a necessidade de ligar ou enviar mensagens.

### Critérios de Aceitação:

- A interface deve ser acessível via dispositivos móveis e desktops.
- Deve ser possível visualizar a disponibilidade de horários em tempo real.
- O sistema deve permitir a seleção de serviços específicos desejados.

## História 2: Gerenciamento de Agenda para Profissionais

**Como** profissional de beleza no Salão Kezuka Style’s,  
**Quero** acessar e gerenciar minha agenda de agendamentos,  
**Para que** eu possa organizar meu tempo de forma eficiente e estar preparado para os serviços agendados.

### Critérios de Aceitação:

- Os profissionais podem visualizar, adicionar, remover ou modificar agendamentos.
- A agenda deve atualizar as disponibilidades em tempo real após cada agendamento.

## História 3: Visualização e Gestão de Comissões

**Como** profissional de beleza no Salão Kezuka Style’s,  
**Quero** ter acesso a um sistema que me permita visualizar e gerenciar minhas comissões,  
**Para que** eu possa ter clareza sobre minha renda e planejar financeiramente.

### Critérios de Aceitação:

- O sistema Deve permitir a visualização do histórico de serviços prestados e as comissões correspondentes.
- O acesso às informações de comissão deve ser seguro e privado.



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

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t6-kezuka-styles-agenda/assets/104144665/c2a4d8cf-c9b5-4a30-933d-f8d7c756b460)



## Modelo ER (Projeto Conceitual)

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t6-kezuka-styles-agenda/assets/104144665/47f19a6c-2a39-44d4-9b77-230698bcf626)


## Projeto da Base de Dados

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t6-kezuka-styles-agenda/assets/86859418/71235aa9-77a2-46ba-8020-d87e25143ddb"></img>

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.

