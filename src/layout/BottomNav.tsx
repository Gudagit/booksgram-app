import type { ReactNode } from 'react'

type NavKey = 'home' | 'search' | 'profile'

type BottomNavProps = {
  active: NavKey
}

const items: { key: NavKey; label: string; icon: ReactNode }[] = [
  {
    key: 'home',
    label: 'Home',
    icon: <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  },
  {
    key: 'search',
    label: 'Search',
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m20 20-4.2-4.2" />
      </>
    ),
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6z" />
      </>
    ),
  },
]

function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={active === item.key ? 'nav-item active' : 'nav-item'}
          aria-current={active === item.key ? 'page' : undefined}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {item.icon}
          </svg>
          {item.label}
        </button>
      ))}
    </nav>
  )
}

export default BottomNav
