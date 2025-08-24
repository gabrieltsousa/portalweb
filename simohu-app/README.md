# SIMOHU App (Expo + React Native)

Aplicativo criado com Expo e TypeScript, com arquitetura modular, camada de API e normalização de erros.

## Requisitos
- Node.js LTS
- Expo CLI (opcional) `npm i -g expo`

## Instalação
```bash
cd simohu-app
npm install
```

## Executar
```bash
npm run android
# ou
npm run ios
# ou
npm run web
```

## Estrutura
```
src/
  app/                # navigation, theme helpers
  components/         # UI compartilhados (Button, TextField, TabToggle)
  features/auth/      # LoginScreen e flows de autenticação
  services/           # api.ts (axios) e auth.service.ts
  theme/              # paleta de cores
  utils/              # normalização de erros httpError.ts
```

## API
Base URL: `https://portalwebapi-simohu.onebox.one`

Login (POST `/auth/login`):
Payload:
```json
{ "login": "string", "senha": "string", "tipo": 1 }
```
- `tipo`: 1 = PF, 2 = PJ

Os erros são normalizados via `normalizeError` e propagados com `{ code, message, status }`.