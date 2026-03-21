import React from 'react'

interface AppLayoutProps {
  header: React.ReactNode
  left: React.ReactNode
  right: React.ReactNode
}

export default function AppLayout({ header, left, right }: AppLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      <header>{header}</header>
      <main className="grid md:grid-cols-[1fr_1.5fr] gap-4">
        <div>{left}</div>
        <div>{right}</div>
      </main>
    </div>
  )
}
