import { type ChangeEvent, type FormEvent, useState } from 'react'
import { Send } from 'lucide-react'

type ContactForm = {
  name: string
  email: string
  message: string
}

type FeedbackState = 'idle' | 'ready'

const INITIAL_FORM: ContactForm = {
  name: '',
  email: '',
  message: '',
}

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'contato@v7m.org'

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM)
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('idle')

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    const fieldName = name as keyof ContactForm
    setForm((previous) => ({
      ...previous,
      [fieldName]: value,
    }))

    if (feedbackState !== 'idle') {
      setFeedbackState('idle')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanName = form.name.trim()
    const cleanEmail = form.email.trim()
    const cleanMessage = form.message.trim()

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return
    }

    const subject = encodeURIComponent(`Contato via v7m.org - ${cleanName}`)
    const body = encodeURIComponent(
      [
        `Nome: ${cleanName}`,
        `Email: ${cleanEmail}`,
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
    <section id="contato" className="section-alt" aria-labelledby="contact-title">
      <div className="container contact-layout">
        <div className="section-heading">
          <h2 id="contact-title" className="section-title">
            Fale com a <span className="text-gradient">V7M</span>
          </h2>
          <p className="section-description">
            Entre em contato para compreender ou participar das operações de infraestrutura, parcerias e expansão educacional.
          </p>
        </div>

        <div className="glass-panel contact-panel">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="name">Nome completo</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Seu nome"
                className="field-control"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="email">Email profissional</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@empresa.com"
                className="field-control"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Como podemos ajudar?"
                className="field-control"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Enviar mensagem <Send size={18} aria-hidden="true" />
            </button>
          </form>

          <p className="contact-helper" aria-live="polite">
            {feedbackState === 'ready'
              ? 'Abrindo seu aplicativo de email com os dados preenchidos.'
              : `Se preferir, envie direto para ${CONTACT_EMAIL}.`}
          </p>
        </div>
      </div>
    </section>
  )
}
