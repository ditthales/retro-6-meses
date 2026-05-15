import { useEffect, useRef, useState } from 'react'
// import html2canvas from 'html2canvas'
import './App.css'

const STORY_DURATION = 6500

const slides = [
  {
    id: 'volume',
    kicker: 'NOSSO VOLUME',
    title: '42.371',
    subtitle: 'mensagens trocadas nesses 6 meses.',
    stat: 'Thales: 21.620 • Laise: 20.748',
    note: 'a gente falou bastante',
    theme: {
      bg: 'linear-gradient(130deg, #0a1a2a 0%, #0b3b2e 50%, #3fffd2 100%)',
      glow: '#51ffd6',
    },
  },
  {
    id: 'hit',
    kicker: 'O HIT DO SEMESTRE',
    title: '"Amo"',
    subtitle: 'a palavra que a gente mais repetiu.',
    stat: 'dita mais de 1.000 vezes!',
    note: 'nunca vai ser demais dizer isso.',
    theme: {
      bg: 'linear-gradient(140deg, #2a1406 0%, #7a2d00 45%, #ff8a00 100%)',
      glow: '#ffb347',
    },
  },
  {
    id: 'prime-time',
    kicker: 'NOSSO PRIME TIME',
    title: '23:00',
    subtitle: 'o horário que a gente mais se fala.',
    stat: 'segunda-feira é o nosso dia mais agitado.',
    note: 'minha parte favorita do dia é essa.',
    theme: {
      bg: 'linear-gradient(150deg, #0b1633 0%, #162c63 55%, #4d9de0 100%)',
      glow: '#78c7ff',
    },
  },
  {
    id: 'surto',
    kicker: 'O DIA DO SURTO',
    title: '14 de Abril',
    subtitle: 'o dia em que batemos nosso recorde!',
    stat: '841 mensagens em um único dia.',
    note: 'abril inteiro foi assim, sem moto é foda...',
    theme: {
      bg: 'linear-gradient(140deg, #15131d 0%, #321348 55%, #7b2cff 100%)',
      glow: '#8f3dff',
    },
  },
  {
    id: 'mood',
    kicker: 'NOSSO MOOD',
    title: '😭',
    subtitle: 'o emoji que mais nos define no chat.',
    stat: 'Usado mais de 400 vezes!',
    note: 'Thales também usa muito: 🙏 e 😔. Laise também usa muito: 🥺 e 🤡.',
    theme: {
      bg: 'linear-gradient(135deg, #1c0f2e 0%, #2b0a3d 45%, #ff6f91 100%)',
      glow: '#ff7ad9',
    },
  },
  {
    id: 'dialeto',
    kicker: 'NOSSO DIALETO',
    title: '1.451',
    subtitle: 'figurinhas enviadas.',
    stat: 'média de 6 figurinhas por dia.',
    note: 'às vezes vale mais que 1000 palavras.',
    theme: {
      bg: 'linear-gradient(140deg, #0f1f18 0%, #1b4b35 45%, #31e89b 100%)',
      glow: '#6bffb5',
    },
  },
  {
    id: 'bom-dia',
    kicker: 'DONA DO BOM DIA',
    title: 'Laise ☀️',
    subtitle: "quem mais manda o primeiro 'bom dia'.",
    stat: '90% das vezes entre 05:00 e 09:00.',
    note: 'esperado.',
    theme: {
      bg: 'linear-gradient(140deg, #0a1a2a 0%, #173e6b 50%, #5dd1ff 100%)',
      glow: '#69d7ff',
    },
  },
  {
    id: 'textoes',
    kicker: 'RAINHA DOS TEXTÕES',
    title: 'Laise ☀️',
    subtitle: 'quem envia as mensagens mais longas',
    stat: 'média de 25 caracteres contra meus 22.',
    note: 'não fiquei tão atrás nessa.',
    theme: {
      bg: 'linear-gradient(135deg, #181322 0%, #3a1a4d 55%, #c560ff 100%)',
      glow: '#d580ff',
    },
  },
  {
    id: 'abril',
    kicker: 'MÊS DE OURO',
    title: 'Abril',
    subtitle: 'o mês que a gente mais conversou.',
    stat: 'foram mais de 14.000 mensagens só nele.',
    note: 'o mês que o assunto não acabou nunca.',
    theme: {
      bg: 'linear-gradient(140deg, #2c0f1b 0%, #7a214a 50%, #ff6a8b 100%)',
      glow: '#ff8ba8',
    },
  },
  {
    id: 'estrada',
    kicker: 'NOSSA ESTRADA',
    title: '226 Dias',
    subtitle: 'desde aquele meu primeiro "oii".',
    stat: '6 meses da nossa história registrada',
    note: 'e é só o começo. Te amo! 💜',
    theme: {
      bg: 'linear-gradient(140deg, #0f1f18 0%, #1b4b35 45%, #31e89b 100%)',
      glow: '#6bffb5',
    },
  },
]

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartY, setDragStartY] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const storyRef = useRef(null)

  const slide = slides[activeIndex]
  const isLast = activeIndex === slides.length - 1

  const progressStyles = {
    '--duration': `${STORY_DURATION}ms`,
    '--segments': slides.length,
  }

  useEffect(() => {
    if (!isOpen || isLast || isPaused) return undefined
    const timer = setTimeout(() => {
      setActiveIndex((current) => Math.min(current + 1, slides.length - 1))
    }, STORY_DURATION)
    return () => clearTimeout(timer)
  }, [isOpen, isLast, activeIndex, isPaused])

  const handleOpen = () => {
    setIsOpen(true)
    setActiveIndex(0)
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsPaused(false)
    setIsDragging(false)
    setDragOffset(0)
  }

  const handlePressStart = () => setIsPaused(true)
  const handlePressEnd = () => setIsPaused(false)

  const handlePrev = () => {
    setActiveIndex((current) => Math.max(current - 1, 0))
  }

  const handleNext = () => {
    setActiveIndex((current) => Math.min(current + 1, slides.length - 1))
  }

  // const handleShare = async () => {
  //   const node = storyRef.current
  //   if (!node) return

  //   const canvas = await html2canvas(node, {
  //     backgroundColor: null,
  //     scale: 2,
  //     useCORS: true,
  //   })
  //   const blob = await new Promise((resolve) =>
  //     canvas.toBlob(resolve, 'image/png', 0.95),
  //   )

  //   if (!blob) return

  //   const file = new File([blob], `story-${slide.id}.png`, {
  //     type: 'image/png',
  //   })

  //   if (navigator.canShare?.({ files: [file] })) {
  //     try {
  //       await navigator.share({
  //         files: [file],
  //         title: slide.kicker,
  //       })
  //     } catch (error) {
  //       print(error)
  //     }
  //     return
  //   }

  //   const url = URL.createObjectURL(blob)
  //   window.open(url, '_blank', 'noopener,noreferrer')
  //   setTimeout(() => URL.revokeObjectURL(url), 10000)
  // }

  const handleDragStart = (event) => {
    setDragStartY(event.clientY)
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleDragMove = (event) => {
    if (!isDragging) return
    const delta = Math.max(0, event.clientY - dragStartY)
    setDragOffset(delta)
  }

  const handleDragEnd = (event) => {
    if (isDragging) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    const delta = Math.max(0, event.clientY - dragStartY)
    const shouldClose = delta > 120
    setIsDragging(false)
    setDragOffset(0)
    if (shouldClose) {
      handleClose()
    }
  }

  return (
    <div className="app">
      <main className="hero">
        <div className="hero-card">
          <span className="hero-badge">Retrospectiva 6 meses</span>
          <h1>Nossas conversas em formato de Wrapped</h1>
          <p>
            Um passeio com as mensagens, os horários e as palavras que marcaram
            cada momento.
          </p>
          <button className="cta" type="button" onClick={handleOpen}>
            Ver retrospectiva
          </button>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="halo" />
          <div className="pulse" />
          <div className="orb" />
          <div className="orb secondary" />
        </div>
      </main>

      {isOpen && (
        <section
          className="story"
          role="dialog"
          aria-modal="true"
          onClick={handleClose}
        >
          <div
            className={`story-frame ${isPaused ? 'is-paused' : ''} ${isDragging ? 'is-dragging' : ''}`}
            style={{
              '--glow': slide.theme.glow,
              '--drag-offset': `${dragOffset}px`,
            }}
            onClick={(event) => event.stopPropagation()}
            ref={storyRef}
            onPointerDown={handlePressStart}
            onPointerUp={handlePressEnd}
            onPointerLeave={handlePressEnd}
            onPointerCancel={handlePressEnd}
            onPointerDownCapture={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUpCapture={handleDragEnd}
            onPointerCancelCapture={handleDragEnd}
          >
            <header className="story-header">
              <div className="story-progress" style={progressStyles}>
                {slides.map((item, index) => {
                  const state =
                    index < activeIndex
                      ? 'is-complete'
                      : index === activeIndex
                        ? 'is-active'
                        : 'is-idle'
                  return (
                    <span
                      key={item.id}
                      className={`progress-bar ${state}`}
                    />
                  )
                })}
              </div>
              <button
                className="story-close"
                type="button"
                aria-label="Fechar"
                onClick={(event) => {
                  event.stopPropagation()
                  handleClose()
                }}
                onPointerDown={(event) => event.stopPropagation()}
              />
            </header>

            <article
              className="story-slide"
              style={{ '--slide-bg': slide.theme.bg }}
            >
              <div className="story-surface">
                <span className="kicker">{slide.kicker}</span>
                <h2>{slide.title}</h2>
                <p className="subtitle">{slide.subtitle}</p>
                <div className="metric">
                  <span className="metric-label">Destaque</span>
                  <span className="metric-value">
                    {slide.stat || slide.highlight}
                  </span>
                </div>
                <p className="note">{slide.note}</p>
                {/* <button
                  className="story-share"
                  type="button"
                  onClick={handleShare}
                  aria-label="Compartilhar no Instagram"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 .17 1L7.9 9.07a3 3 0 1 0 0 5.86L15.17 19c-.11.33-.17.67-.17 1a3 3 0 1 0 3-3 2.99 2.99 0 0 0-2.09.85L8.74 13.7a3.02 3.02 0 0 0 0-3.4l7.17-4.15A2.99 2.99 0 0 0 18 8Z" />
                  </svg>
                </button> */}
              </div>
              <div className="story-shapes" aria-hidden="true">
                <div className="shape circle" />
                <div className="shape ring" />
                <div className="shape dotted" />
                <div className="shape zigzag" />
                <div className="shape wave" />
                <div className="shape diamond" />
              </div>
            </article>

            <button
              className="tap-zone left"
              type="button"
              onClick={handlePrev}
              onPointerDown={handlePressStart}
              onPointerUp={handlePressEnd}
              onPointerLeave={handlePressEnd}
              onPointerCancel={handlePressEnd}
              aria-label="Voltar"
              disabled={activeIndex === 0}
            />
            <button
              className="tap-zone right"
              type="button"
              onClick={handleNext}
              onPointerDown={handlePressStart}
              onPointerUp={handlePressEnd}
              onPointerLeave={handlePressEnd}
              onPointerCancel={handlePressEnd}
              aria-label="Avançar"
              disabled={isLast}
            />

          </div>
        </section>
      )}
    </div>
  )
}

export default App
