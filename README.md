# Mapeando funcionalidades

Essas anotações ajudam a visualizar melhor nosso projeto, a fim de entender as funcionalidades e não nos perdermos durante o desenvolvimento.

## Recuperação de senha

**Requisitos Funcionais**
- O usuário deve poder recuperar sua senha informando o seu email
- O usuário deve receber um email com instruções de recuperação de senha
- O usuário deve poder resetar sua senha

**Requisitos não Funcionais**
- Utilizar mailtrap para testar envio em ambiente de desenvolvimento
- Utilizar Amazon SES para envio em produção
- O envio de email deve acontecer em segundo plano (background job)

**Regras de negócio**
- O link enviado por email para resetar senha deve expirar em 2h
- O usuário precisa confirmar a nova senha ao resetar

## Atualização de perfil

**Requisitos Funcionais**
- O usuário deve poder atualizar seu nome, email e senha

**Regras de negócio**
- O usuário não pode alterar seu email para um já utilizado
- Para atualizar a senha, o usuário deve informar a senha antiga
- Para atualizar a senha, o usuário precisa confirmar a nova senha

## Painel do prestador

**Requisitos Funcionais**
- O prestador deve poder listar seus agendamentos por dia
- O prestador deve poder receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**Requisitos não Funcionais**
- Os agendamentos do prestador no dia devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB (Como notificações são textos e não guardam relacionamentos podemos utilizar um banco não relacional)
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.Io

**Regras de negócio**
- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar

## Agendamento de serviço

**Requisitos Funcionais**
- O usuário deve poder listar todos os prestadores de serviço cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador

**Requisitos não Funcionais**
- A listagem de prestadores deve ser armazenadas em cache (salvar dados em memória, por exemplo com Redis para consumir mais rápido a informação já salva)

**Regras de negócio**
- Cada agendamento deve durar exatamente 1h
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro 8h e último 17h)
- O usuário não pode agendar em um horário já ocupado
- O usuário não pode agendar em um horário que já passou
- O usuário não pode agendar serviços consigo mesmo

---

1. O usuário clica em esqueci minha senha
2. O usuário recebe um email com um token para resetar a senha
3. O usuário volta à aplicação, informa o token e a nova senha
4. O usuário é redirecionado para autenticação

---

1. A aplicação envia o email com um token gerado a partir do ID do usuário
2. A aplicação recebe o token e a nova senha
3. A aplicação atualiza a senha do usuário hasheando ela novamente
