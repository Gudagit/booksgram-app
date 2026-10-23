import type { ReactNode } from 'react'

type EditSectionProps = {
  title: string
  children: ReactNode
}

function EditSection({ title, children }: EditSectionProps) {
  return (
    <section className="edit-section">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

export default EditSection
