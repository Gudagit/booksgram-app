import { useState } from 'react'
import { defaultProfile } from './fakeProfile'
import type { Profile } from './types'

const STORAGE_KEY = 'booksgram.profile.v1'

function asList(value: unknown, fallback: string[]) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
    ? value
    : fallback
}

function load(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProfile
    const saved = JSON.parse(raw) as Partial<Record<keyof Profile, unknown>>
    const text = (key: 'name' | 'handle' | 'bio' | 'avatarId' | 'bannerId') =>
      typeof saved[key] === 'string' ? (saved[key] as string) : defaultProfile[key]

    return {
      name: text('name'),
      handle: text('handle'),
      bio: text('bio'),
      avatarId: text('avatarId'),
      bannerId: text('bannerId'),
      genres: asList(saved.genres, defaultProfile.genres),
      audience: asList(saved.audience, defaultProfile.audience),
      tropes: asList(saved.tropes, defaultProfile.tropes),
      moods: asList(saved.moods, defaultProfile.moods),
      avoid: asList(saved.avoid, defaultProfile.avoid),
    }
  } catch {
    return defaultProfile
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(load)

  function saveProfile(next: Profile) {
    setProfile(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // storage unavailable (private window): the profile still updates on screen
    }
  }

  return [profile, saveProfile] as const
}
