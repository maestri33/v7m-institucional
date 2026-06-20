export type RouteMeta = {
  path: string
  title: string
  description: string
}

export const routes: RouteMeta[] = [
  {
    path: '/',
    title: 'v7m.org | Estrutura para Executar',
    description: 'A V7M organiza, implanta e sustenta operações em educação, tecnologia aplicada e engenharia.',
  },
  {
    path: '/termos',
    title: 'Termos de Uso | v7m.org',
    description: 'Termos de uso do site v7m.org e serviços relacionados da V7M.',
  },
  {
    path: '/privacidade',
    title: 'Política de Privacidade | v7m.org',
    description: 'Política de privacidade do v7m.org — coleta, uso e proteção de dados pessoais.',
  },
]
