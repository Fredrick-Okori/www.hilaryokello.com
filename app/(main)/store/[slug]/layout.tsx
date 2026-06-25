export default function StoreItemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-black min-h-screen">{children}</section>;
}
