# Compra Eficiente - API Backend

> Economize em cada compra.
>
> API backend do aplicativo **Compra Eficiente** - uma rede colaborativa de preços de supermercado que ajuda consumidores a controlar gastos, acompanhar evolução de preços e calcular sua inflação pessoal.
>
> ## 🛠 Stack Tecnológica
>
> - **Framework:** NestJS
> - - **ORM:** Prisma
>   - - **Banco de Dados:** PostgreSQL (Railway)
>     - - **Autenticação:** Firebase Authentication + JWT
>       - - **IA:** Google Gemini API
>         - - **Linguagem:** TypeScript
>          
>           - ## 📁 Estrutura de Branches
>          
>           - - `main` - Produção
>             - - `develop` - Desenvolvimento
>               - - `feature/*` - Funcionalidades (ex: `feature/login`, `feature/scanner`)
>                
>                 - ## 🗄 Estrutura do Banco de Dados
>                
>                 - ### Tabelas Principais
>                
>                 - - `users` - Usuários do sistema
> - `user_settings` - Configurações de privacidade
> - - `products` - Biblioteca universal de produtos
>   - - `product_images` - Imagens dos produtos
>     - - `markets` - Mercados cadastrados
>       - - `purchases` - Compras registradas
>         - - `purchase_items` - Itens de cada compra
>           - - `community_prices` - Preços compartilhados pela comunidade
>             - - `subscriptions` - Assinaturas Premium
>               - - `promo_codes` - Cupons promocionais
>                 - - `user_promo_codes` - Resgates de cupons
>                   - - `ai_analysis` - Análises geradas por IA
>                    
>                     - ## 🚀 Como Executar
>                    
>                     - ```bash
>                       # Instalar dependências
>                       npm install
>
>                       # Configurar variáveis de ambiente
>                       cp .env.example .env
>
>                       # Executar migrations do Prisma
>                       npx prisma migrate dev
>
>                       # Iniciar em modo desenvolvimento
>                       npm run start:dev
>                       ```
>
> ## ⚙️ Variáveis de Ambiente
>
> ```env
> DATABASE_URL=postgresql://...
> FIREBASE_PROJECT_ID=...
> GEMINI_API_KEY=...
> JWT_SECRET=...
> ```
>
> ## 📋 Sprint 1 - Fundação Técnica
>
> - [x] Criar repositório GitHub
> - [ ] - [ ] Inicializar projeto NestJS
> - [ ] - [ ] Configurar Prisma + PostgreSQL
> - [ ] - [ ] Configurar autenticação Firebase
> - [ ] - [ ] Primeiro deploy no Railway
>
> - [ ] ## 🔗 Links
>
> - [ ] - [App Mobile](https://github.com/lilssends/compra-eficiente-app)
> - [ ] - [Railway (Deploy)](https://railway.com)
> - [ ] 
