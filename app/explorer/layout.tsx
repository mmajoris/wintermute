export default function ExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen w-screen overflow-hidden">{children}</div>;
}
