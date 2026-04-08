export default function ShowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-black min-h-screen">{children}</section>;
}
