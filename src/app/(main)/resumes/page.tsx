import db from '@/lib/db'

import { resumeDataInclude } from '@/lib/types'
import { auth } from '@clerk/nextjs/server'
import { Metadata } from 'next'
import ResumeItem from './ResumeItem'

export const metadata: Metadata = {
  title: 'Your resumes'
}

export default async function ResumesPage() {
  const { userId } = await auth()

  if (!userId) {
    return null
  }
  // We use the Promise.all so that we can get the count and resumes at the same time.

  const [resumes, totalCount] = await Promise.all([
    db.resume.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        updatedAt: 'desc'
      },
      include: resumeDataInclude
    }),
    db.resume.count({
      where: {
        userId: userId
      }
    })
  ])

  //TODO: check quota for non premium users

  return (
    <main className='mx-auto w-full max-w-7xl space-y-6 px-3 py-6'>
      <div className='space-y-1'>
        <h1 className='text-3xl font-bold'>Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className='flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4'>
        {resumes.map(resume => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  )
}
