# SaniAlert - Índice do Projeto

Este repositório contém o sistema SaniAlert para monitoramento da qualidade da água.

## Estrutura Principal

- **sanialert-backend/**  
  Backend em Java (Spring Boot)
  - `src/main/java/` - Código-fonte da API
  - `src/main/resources/application.properties` - Configurações
  - `pom.xml` - Dependências Maven

- **sanialert-frontend/**  
  Frontend em React + TypeScript
  - `src/` - Código-fonte da interface
  - `components/` - Componentes reutilizáveis
  - `pages/` - Telas principais
  - `services/` - Serviços de API
  - `store/` - Gerenciamento de estado

## Como rodar

1. **Backend:**
   - Requisitos: Java 17+, Maven
   - Comandos:
     - `cd sanialert-backend/sanialert`
     - `./mvnw spring-boot:run` (Linux/Mac) ou `mvnw.cmd spring-boot:run` (Windows)

2. **Frontend:**
   - Requisitos: Node.js 18+
   - Comandos:
     - `cd sanialert-frontend/sanialert`
     - `npm install`
     - `npm run dev`

Acesse o frontend em [http://localhost:5173](http://localhost:5173).

## Observações
- As credenciais de administrador a seguir:
 (email: admin@sanialert.com, password: Sani123).
---

