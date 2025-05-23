export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-sans antialiased">
      {children}
    </div>
  )
} 