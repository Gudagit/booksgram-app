import { Link } from 'react-router'

type CreditItem = {
  name: string
  author: string
  license: string
  href: string
}

const images: CreditItem[] = [
  {
    name: 'Leather texture, "Leather 014"',
    author: 'ambientCG',
    license: 'CC0 1.0',
    href: 'https://ambientcg.com/view?id=Leather014',
  },
  {
    name: 'Paper texture, "Paper 006"',
    author: 'ambientCG',
    license: 'CC0 1.0',
    href: 'https://ambientcg.com/view?id=Paper006',
  },
]

const fonts: CreditItem[] = [
  {
    name: 'Inter',
    author: 'The Inter Project Authors',
    license: 'SIL Open Font License 1.1',
    href: 'https://github.com/rsms/inter',
  },
  {
    name: 'Lora',
    author: 'The Lora Project Authors',
    license: 'SIL Open Font License 1.1',
    href: 'https://github.com/cyrealtype/Lora-Cyrillic',
  },
]

const libraries: CreditItem[] = [
  {
    name: 'React',
    author: 'Meta Platforms, Inc. and affiliates',
    license: 'MIT',
    href: 'https://react.dev',
  },
  {
    name: 'React Router',
    author: 'React Training LLC, Remix Software Inc., Shopify Inc.',
    license: 'MIT',
    href: 'https://reactrouter.com',
  },
  {
    name: 'Supabase JS',
    author: 'Supabase',
    license: 'MIT',
    href: 'https://github.com/supabase/supabase-js',
  },
]

type CreditListProps = {
  title: string
  items: CreditItem[]
}

function CreditList({ title, items }: CreditListProps) {
  return (
    <section>
      <h2>{title}</h2>
      <ul className="credit-list">
        {items.map((item) => (
          <li key={item.name}>
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.name}
            </a>
            <span>
              {item.author}, {item.license}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function CreditsPage() {
  return (
    <main className="feed credits">
      <h1>Credits and licenses</h1>
      <p>
        Knjigoljubac is a demo with fictional people, posts and reviews. The
        source code is proprietary. The material below belongs to its authors
        and is used under the licenses shown.
      </p>
      <CreditList title="Images" items={images} />
      <CreditList title="Fonts" items={fonts} />
      <CreditList title="Libraries" items={libraries} />
      <p>Smaller supporting packages are licensed under MIT or 0BSD.</p>
      <Link to="/">Back to Home</Link>
    </main>
  )
}

export default CreditsPage
