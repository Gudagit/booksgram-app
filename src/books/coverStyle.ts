// Every book is bound in leather, in the colors real bound books come in.
// The tone depends only on the title, so the same book always looks the same.
const tones = ['chestnut', 'chocolate', 'cognac', 'tan', 'oxblood', 'green', 'navy', 'black']

export function coverStyle(title: string) {
  let hash = 0
  for (const char of title) hash = (hash * 31 + char.charCodeAt(0)) | 0
  return `leather tone-${tones[Math.abs(hash) % tones.length]}`
}
