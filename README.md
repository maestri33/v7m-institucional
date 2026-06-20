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

## Build de produção

```bash
npm run lint
npm run build
npm run preview
```

Arquivos gerados para deploy: `dist/`

## Variáveis de ambiente

Crie um arquivo `.env` (ou `.env.production`) baseado em `.env.example`:

```bash
VITE_CONTACT_EMAIL=contato@v7m.org
```

Se `VITE_CONTACT_EMAIL` não for definida, o site usa `contato@v7m.org` como fallback.

## SEO e indexação

- Metadados Open Graph e Twitter em `index.html`
- JSON-LD Organization em `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/og-image.png` (1200×630 para previews em redes sociais)

## Checklist de produção

- Executar `npm ci`
- Executar `npm run lint`
- Executar `npm run build`
- Validar `npm run preview`
- Publicar o conteúdo de `dist/`
- Garantir HTTPS e redirecionamento de `http` para `https`
- Configurar cache estático para assets versionados

## Observações

A navegação do site usa hash para seções e páginas legais (`#termos`, `#privacidade`).
