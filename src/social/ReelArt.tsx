import type { Reel } from './types'

type ReelArtProps = {
  reel: Reel
}

const stars: [number, number, number][] = [
  [36, 38, 1.4],
  [88, 72, 1],
  [150, 28, 1.6],
  [214, 62, 1.1],
  [262, 24, 1.5],
  [336, 52, 1],
  [372, 96, 1.3],
  [118, 104, 1],
  [306, 118, 1.2],
  [58, 124, 1.1],
]

const lanterns: [number, number][] = [
  [250, 164],
  [190, 104],
  [304, 106],
  [346, 160],
  [246, 92],
]

const mix = (color: string, percent: number, other: string) =>
  `color-mix(in srgb, ${color} ${percent}%, ${other})`

const pine = (x: number, base: number, height: number) =>
  `M${x} ${base - height} L${x + height * 0.3} ${base} L${x - height * 0.3} ${base}Z`

function ReelArt({ reel }: ReelArtProps) {
  const color = reel.color
  const top = mix(color, 68, 'black')
  const bottom = mix(color, 50, '#ffe9b8')
  const mid = mix(color, 80, 'black')
  const deep = mix(color, 58, 'black')
  const dark = mix(color, 34, 'black')
  const gradient = `sky-${reel.id}`

  return (
    <svg
      className="art"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: top }} />
          <stop offset="0.6" style={{ stopColor: color }} />
          <stop offset="1" style={{ stopColor: bottom }} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gradient})`} />

      {reel.scene === 'hills' && (
        <>
          <circle cx="270" cy="150" r="62" fill="#fff0c4" opacity="0.18" />
          <circle cx="270" cy="150" r="30" fill="#fff0c4" opacity="0.95" />
          <path
            d="M0 200 C60 160 130 195 200 180 S340 150 400 185 V300 H0Z"
            fill={mid}
          />
          <path
            d="M0 238 C70 205 150 240 240 220 S350 205 400 228 V300 H0Z"
            fill={deep}
          />
          <path
            d="M0 272 C80 255 170 278 260 264 S360 256 400 270 V300 H0Z"
            fill={dark}
          />
          <g fill={dark}>
            <path d="M60 232 l8 -34 l8 34z" />
            <path d="M84 236 l6 -26 l6 26z" />
            <path d="M318 214 l9 -38 l9 38z" />
          </g>
        </>
      )}

      {reel.scene === 'sea' && (
        <>
          <circle cx="110" cy="128" r="86" fill="#fff4d6" opacity="0.14" />
          <circle cx="110" cy="128" r="44" fill="#fff4d6" opacity="0.92" />
          <rect y="178" width="400" height="122" fill={deep} />
          <path
            d="M170 184 h60 M178 194 h44 M184 204 h32"
            stroke="#fff4d6"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M0 226 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0"
            stroke={bottom}
            strokeWidth="2"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M0 258 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0"
            stroke={bottom}
            strokeWidth="2"
            fill="none"
            opacity="0.25"
          />
          {lanterns.map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="14" fill="#ffbf5e" opacity="0.22" />
              <circle cx={x} cy={y} r="4" fill="#ffd88a" />
            </g>
          ))}
        </>
      )}

      {reel.scene === 'night' && (
        <>
          {stars.map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#fff4d6" />
          ))}
          <path
            d="M300 70 a30 30 0 1 0 22 52 a24 24 0 1 1 -22 -52z"
            fill="#fff4d6"
          />
          <path
            d="M0 215 C70 180 150 210 230 195 S350 180 400 205 V300 H0Z"
            fill={deep}
          />
          <path
            d="M0 255 C80 235 160 262 250 246 S350 238 400 252 V300 H0Z"
            fill={dark}
          />
          <g fill={dark}>
            <rect x="92" y="212" width="28" height="22" />
            <path d="M88 212 l18 -14 l18 14z" />
            <rect x="268" y="222" width="22" height="18" />
            <path d="M264 222 l15 -12 l15 12z" />
          </g>
          <g fill="#ffd27a">
            <rect x="99" y="219" width="5" height="6" />
            <rect x="109" y="219" width="5" height="6" />
            <rect x="274" y="228" width="5" height="6" />
          </g>
        </>
      )}

      {reel.scene === 'forest' && (
        <>
          <circle cx="296" cy="72" r="80" fill="#fff0c4" opacity="0.2" />
          <circle cx="296" cy="72" r="26" fill="#fff0c4" opacity="0.9" />
          <g fill={mid}>
            {[20, 70, 120, 170, 230, 280, 330, 380].map((x, i) => (
              <path key={x} d={pine(x, 220, 90 + (i % 3) * 14)} />
            ))}
          </g>
          <rect y="190" width="400" height="40" fill={bottom} opacity="0.35" />
          <g fill={deep}>
            {[0, 55, 105, 160, 215, 265, 320, 375].map((x, i) => (
              <path key={x} d={pine(x, 270, 120 + (i % 3) * 18)} />
            ))}
          </g>
          <rect y="262" width="400" height="38" fill={dark} />
        </>
      )}

      <circle
        cx="200"
        cy="150"
        r="22"
        fill="rgba(255, 248, 230, 0.16)"
        stroke="#fff6e0"
        strokeWidth="2.5"
      />
      <path d="M192 138 v24 l20 -12z" fill="#fff6e0" />
    </svg>
  )
}

export default ReelArt
