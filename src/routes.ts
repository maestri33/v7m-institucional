export type RouteMeta = {
  path: string
  title: string
  description: string
}

export const routes: RouteMeta[] = [
  {
    path: '/',
    title: 'V7M — Educação, Tecnologia e Engenharia',
    description: 'V7M é uma estrutura operacional brasileira em Educação EAD e supletivo, rede de afiliados para vender cursos, programação e automações com IA, e engenharia civil e elétrica.',
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
