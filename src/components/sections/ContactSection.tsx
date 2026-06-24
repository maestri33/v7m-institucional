import { type ChangeEvent, type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Phone, Send, User } from 'lucide-react'
import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

type ContactForm = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type FeedbackState = 'idle' | 'ready'

const INITIAL_FORM: ContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const SUBJECT_OPTIONS = [
  { value: '', label: 'Selecione um assunto' },
  { value: 'Educação', label: 'Educação' },
  { value: 'Afiliados', label: 'Afiliados' },
  { value: 'Tecnologia', label: 'Tecnologia' },
  { value: 'Engenharia', label: 'Engenharia' },
  { value: 'Outro', label: 'Outro' },
]

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'contato@v7m.org'

export default function ContactSection() {
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM)
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('idle')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))

    if (feedbackState !== 'idle') {
      setFeedbackState('idle')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanName = form.name.trim()
    const cleanEmail = form.email.trim()
    const cleanPhone = form.phone.trim()
    const cleanSubject = form.subject.trim()
    const cleanMessage = form.message.trim()

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return
    }

    const subject = encodeURIComponent(`Contato via v7m.org - ${cleanName}`)
    const body = encodeURIComponent(
      [
        `Nome: ${cleanName}`,
        `Email: ${cleanEmail}`,
        ...(cleanPhone ? [`Telefone: ${cleanPhone}`] : []),
        ...(cleanSubject ? [`Assunto/Interesse: ${cleanSubject}`] : []),
        '',
        'Mensagem:',
        cleanMessage,
      ].join('\n'),
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    setFeedbackState('ready')
    setForm(INITIAL_FORM)
  }

  return (
    <Section id="contato" ariaLabelledBy="contact-title">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-3xl"
      >
        <LiquidGlass className="p-6 md:p-10">
          <div className="text-center mb-8">
            <h2 id="contact-title" className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
              Fale com a <span className="text-gradient">V7M</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Entre em contato para conhecer nossas operações, propor parcerias ou explorar
              oportunidades.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
                >
                  <User size={16} aria-hidden="true" /> Nome completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition focus:border-[var(--accent-primary)] focus:bg-[rgba(255,255,255,0.07)]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
                >
                  <Mail size={16} aria-hidden="true" /> Email profissional
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@empresa.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition focus:border-[var(--accent-primary)] focus:bg-[rgba(255,255,255,0.07)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
                >
                  <Phone size={16} aria-hidden="true" /> Telefone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition focus:border-[var(--accent-primary)] focus:bg-[rgba(255,255,255,0.07)]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
                >
                  <MessageSquare size={16} aria-hidden="true" /> Assunto/Interesse
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--text-primary)] transition focus:border-[var(--accent-primary)] focus:bg-[rgba(255,255,255,0.07)] appearance-none"
                >
                  {SUBJECT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
              >
                <MessageSquare size={16} aria-hidden="true" /> Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Como podemos ajudar?"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition focus:border-[var(--accent-primary)] focus:bg-[rgba(255,255,255,0.07)] resize-none"
              />
            </div>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] px-6 py-3.5 font-semibold text-[var(--near-black)] transition hover:bg-[#e0b570] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
            >
              Enviar mensagem <Send size={18} aria-hidden="true" />
            </button>

            <p
              className="text-center text-sm text-[var(--text-secondary)]"
              aria-live="polite"
            >
              {feedbackState === 'ready'
                ? 'Abrindo seu aplicativo de email com os dados preenchidos.'
                : `Se preferir, envie direto para ${CONTACT_EMAIL}.`}
            </p>
          </form>
        </LiquidGlass>
      </motion.div>
    </Section>
  )
}
