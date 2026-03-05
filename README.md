# v7m.org

Site institucional da V7M em React + TypeScript + Vite.

## Requisitos

- Node.js LTS (18+)
- npm 9+

## Desenvolvimento

```bash
npm ci
npm run dev
```

## Build de producao

```bash
npm run lint
npm run build
npm run preview
```

Arquivos gerados para deploy: `dist/`

## Variaveis de ambiente

Crie um arquivo `.env` (ou `.env.production`) quando necessario:

```bash
VITE_CONTACT_EMAIL=contato@v7m.org
```

Se `VITE_CONTACT_EMAIL` nao for definida, o site usa `contato@v7m.org` como fallback.

## SEO e indexacao

- Metadados Open Graph e Twitter em `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

## Checklist de producao

- Executar `npm ci`
- Executar `npm run lint`
- Executar `npm run build`
- Validar `npm run preview`
- Publicar o conteudo de `dist/`
- Garantir HTTPS e redirecionamento de `http` para `https`
- Configurar cache estatico para assets versionados

## Observacoes

A navegacao do site usa hash para secoes e paginas legais (`#termos`, `#privacidade`).
