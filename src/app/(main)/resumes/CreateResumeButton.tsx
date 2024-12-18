'use client'

import { Button } from '@/components/ui/button'

import { PlusSquare } from 'lucide-react'
import Link from 'next/link'

interface CreateResumeButtonProps {
  canCreate: boolean
}

let canCreate = true

export default function CreateResumeButton({
  canCreate
}: CreateResumeButtonProps) {
  if (canCreate) {
    return (
      <Button asChild className='mx-auto flex w-fit gap-2'>
        <Link href='/editor'>
          <PlusSquare className='size-5' />
          New resume
        </Link>
      </Button>
    )
  }

  return (
    <Button onClick={() => {}} className='mx-auto flex w-fit gap-2'>
      <PlusSquare className='size-5' />
      New resume
    </Button>
  )
}
