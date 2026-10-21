const fonts = [
  {
    "family": "Inter",
    "variant": "Regular · По умолчанию",
    "weight": 400,
    "style": "normal",
    "className": "font-sans font-normal"
  },
  {
    "family": "Artegra Sans",
    "variant": "Regular",
    "weight": 400,
    "style": "normal",
    "className": "font-artegra font-normal"
  },
  {
    "family": "Artegra Sans",
    "variant": "Medium",
    "weight": 500,
    "style": "normal",
    "className": "font-artegra font-medium"
  },
  {
    "family": "Artegra Sans",
    "variant": "SemiBold",
    "weight": 600,
    "style": "normal",
    "className": "font-artegra font-semibold"
  },
  {
    "family": "Artegra Sans",
    "variant": "Bold",
    "weight": 700,
    "style": "normal",
    "className": "font-artegra font-bold"
  },
  {
    "family": "Artegra Sans Alt",
    "variant": "Bold",
    "weight": 700,
    "style": "normal",
    "className": "font-artegra-alt font-bold"
  },
  {
    "family": "Artegra Sans Extended",
    "variant": "Bold Italic",
    "weight": 700,
    "style": "italic",
    "className": "font-artegra-extended font-bold italic"
  },
  {
    "family": "Artegra Sans Extended SC",
    "variant": "SemiBold Italic",
    "weight": 600,
    "style": "italic",
    "className": "font-artegra-extended-sc font-semibold italic"
  },
  {
    "family": "Artegra Sans Extended Alt",
    "variant": "ExtraBold",
    "weight": 800,
    "style": "normal",
    "className": "font-artegra-extended-alt font-extrabold"
  },
  {
    "family": "NT Somic",
    "variant": "Regular",
    "weight": 400,
    "style": "normal",
    "className": "font-nt-somic font-normal"
  },
  {
    "family": "Space Grotesk",
    "variant": "Bold",
    "weight": 700,
    "style": "normal",
    "className": "font-space-grotesk font-bold"
  }
]

export function App() {
  return (
    <main className='mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20'>
      <header className='mb-12 max-w-2xl'>
        <p className='mb-3 text-sm font-medium tracking-widest text-primary uppercase'>Portfolio / Typography</p>
        <h1 className='text-4xl font-semibold tracking-tight sm:text-6xl'>Шрифты проекта</h1>
        <p className='mt-5 text-base leading-relaxed text-muted-foreground'>
          Все подключённые начертания на одном экране. Inter — шрифт по умолчанию.
        </p>
      </header>

      <div className='grid gap-5 md:grid-cols-2'>
        {fonts.map(font => (
          <section key={`${font.family}-${font.variant}`} className='min-w-0 rounded-2xl border bg-card p-6 sm:p-8'>
            <div className='mb-6 flex flex-wrap items-start justify-between gap-3'>
              <div>
                <h2 className='text-base font-semibold'>{font.family}</h2>
                <p className='mt-1 text-sm text-muted-foreground'>{font.variant}</p>
              </div>
              <span className='rounded-full border px-3 py-1 text-xs text-muted-foreground'>
                {font.weight} / {font.style}
              </span>
            </div>
            <div className={`${font.className} [font-synthesis:none]`}>
              <p lang='en' className='text-3xl leading-snug break-words sm:text-4xl'>The quick brown fox</p>
              <p lang='ru' className='mt-3 text-xl leading-relaxed break-words'>Съешь ещё этих мягких французских булок</p>
              <p className='mt-5 text-lg tracking-wide'>0123456789 &amp; @ # ! ?</p>
              <p lang='en' className='mt-4 text-sm leading-relaxed'>Design is in the details. Create something worth remembering.</p>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
