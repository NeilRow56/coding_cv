'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export async function deleteResume(id: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('User not authenticated')
  }

  const resume = await db.resume.findUnique({
    where: {
      id: id,
      userId: userId
    }
  })

  if (!resume) {
    throw new Error('Resume not found')
  }

  if (resume.photoUrl) {
    await del(resume.photoUrl)
  }

  await db.resume.delete({
    where: {
      id: id
    }
  })

  revalidatePath('/resumes')
}
