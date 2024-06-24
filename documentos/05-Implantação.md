# Implantação do Software

## Planejamento da Implantação 

A implantação do software foi meticulosamente planejada, envolvendo a descrição das tecnologias utilizadas e o processo de implementação. A seguir, detalhamos os aspectos-chave desse planejamento:

## Tecnologias Utilizadas

ASP-NET API REST | ENTITY FRAMEWORK | MIGRATION | SQLSERVER | Deploy Back-end + DB em VM via FTP (File Transfer Protocol).
REACT NATIVE + VITE | Deploy via github in gh-pages and Vercel.

# Processo de Implantação

## A implantação da aplicação seguiu um processo cuidadosamente elaborado, garantindo sua estabilidade e disponibilidade. Utilizamos plataformas de hospedagem confiáveis para garantir que a aplicação esteja sempre acessível. Atualmente, a API está disponível online no endereço "https://api.kezukastyles.com.br" e a documentação pode ser encontrada em [https://find-ong-api.onrender.com/docs](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t6-kezuka-styles-agenda).

# Planejamento de Evolução da Aplicação

## O desenvolvimento da aplicação está em constante evolução, visando oferecer uma experiência ainda mais completa e satisfatória aos usuários. As próximas etapas do planejamento incluem:

Desenvolvimento de um Aplicativo Utilizando React Native: Está prevista a implementação de um web aplicativo móvel utilizando a tecnologia React Native. Essa iniciativa visa facilitar a interação entre cliente e colaboradores a acessibilidade da plataforma, permitindo que os usuários acessem seus recursos de forma mais conveniente e intuitiva.
Configurações de Ambiente
Para garantir uma configuração consistente e eficiente do ambiente de desenvolvimento e produção, são fornecidos os seguintes recursos:

## Deploy front-end -> https://agenda.kezukastyles.com.br

## A publicação de um projeto via Vercel envolve um processo de CI/CD (Continuous Integration/Continuous Deployment) simplificado, onde o código é automaticamente implantado cada vez que é atualizado no repositório. Abaixo está uma visão geral de como funciona essa pipeline: é feito uma serie de configurações no projeto e na plataforma da vercel assim os desenvolvedores podem iniciar a aplicação de forma rápida e fácil, garantindo uma experiência de desenvolvimento sem complicações.

## Deploy back-end -> https://api.kezukastyles.com.br

## Para fazer o deploy do meu back-end, utilizo uma máquina virtual (VM) que acesso via FTP. A VM é configurada com o ambiente necessário, incluindo servidor web, banco de dados e outras dependências. Uso um cliente FTP, como FileZilla ou WinSCP, para transferir os arquivos do projeto do meu computador para o servidor. Após a transferência, acesso a VM via SSH para ajustar permissões e reiniciar serviços, garantindo que a aplicação funcione corretamente. Este método permite controle total sobre o ambiente de execução e flexibilidade para ajustes, mantendo a segurança com conexões FTPS ou SFTP.

Essas configurações de ambiente foram projetadas para facilitar o desenvolvimento, garantindo a consistência e a eficiência em todas as etapas do ciclo de vida da aplicação.
