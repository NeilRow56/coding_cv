import { Metadata } from 'next'
import React from 'react'
import ResumeEditor from './ResumeEditor'

export const metadata: Metadata = {
  title: 'Design your resume'
}

export default function Editor() {
  return <ResumeEditor />
}
