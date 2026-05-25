export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="pb-6 bg-background-screen min-h-screen">{children}</div>;
}
