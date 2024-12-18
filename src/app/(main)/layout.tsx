import Navbar from './Navbar'

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      {children}
    </div>
  )
}
