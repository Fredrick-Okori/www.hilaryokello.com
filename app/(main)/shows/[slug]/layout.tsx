export default function ShowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-cream min-h-screen">{children}</section>;
}
