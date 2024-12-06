import useDimensions from '@/hooks/useDimensions'
import { cn } from '@/lib/utils'
import { ResumeValues } from '@/lib/validation'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

interface ResumePreviewProps {
  resumeData: ResumeValues
  className?: string
}

export default function ResumePreview({
  resumeData,
  className
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { width } = useDimensions(containerRef)

  return (
    <div
      className={cn(
        // aspect ratio below represents a sheet of A4 paper
        'aspect-[210/297] h-fit w-full bg-white text-black',
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn('space-y-6 p-6', !width && 'invisible')}
        style={{
          zoom: (1 / 794) * width
        }}
      >
        <pre>{JSON.stringify(resumeData, null, 2)}</pre>
        <PersonalInfoHeader resumeData={resumeData} />
      </div>
    </div>
  )
}

interface ResumeSectionProps {
  resumeData: ResumeValues
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email
    //   colorHex,
    //   borderStyle,
  } = resumeData

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? '' : photo)

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : ''
    if (objectUrl) setPhotoSrc(objectUrl)
    if (photo === null) setPhotoSrc('')
    return () => URL.revokeObjectURL(objectUrl)
  }, [photo])

  return (
    <div className='flex items-center gap-6'>
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt='Author photo'
          className='aspect-square object-cover'
          // style={{
          //   borderRadius:
          //     borderStyle === BorderStyles.SQUARE
          //       ? "0px"
          //       : borderStyle === BorderStyles.CIRCLE
          //         ? "9999px"
          //         : "10%",
          // }}
        />
      )}
      <div className='space-y-2.5'>
        <div className='space-y-1'>
          <p
            className='text-3xl font-bold'
            //   style={{
            //     color: colorHex,
            //   }}
          >
            {firstName} {lastName}
          </p>
          <p
            className='font-medium'
            //   style={{
            //     color: colorHex,
            //   }}
          >
            {jobTitle}
          </p>
        </div>
        <p className='text-xs text-gray-500'>
          {city}
          {city && country ? ', ' : ''}
          {country}
          {(city || country) && (phone || email) ? ' • ' : ''}
          {[phone, email].filter(Boolean).join(' • ')}
        </p>
      </div>
    </div>
  )
}
