'use client'

import { useSearchParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type targetUsersType = {
   avatar?: string
   name?: string
   username?: string
}

const targetUsers: targetUsersType[] = [
   {
      avatar: '/elham436.png',
      name: 'Elham',
      username: '_.elham436'
   },
   {
      avatar: '/elham436.png',
      name: '𝖇𝖊𝖐𝖎',
      username: 'be.ki7415'
   }
]

function getTarget(username: string) {
   // Use find to return a single object or undefined
   return targetUsers.find(item => item.username === username)
}

export default function Target() {
   const searchParams = useSearchParams()
   const target = searchParams.get('username')
   const user = getTarget(target ?? '')

   // Derive display data from the found user with fallbacks
   const targetData = {
      avatar: user?.avatar || '/instagram-colored.svg',
      name: user?.name || '-',
      username: user?.username || '-'
   }

   return (
      <div className='flex items-center justify-center gap-2 flex-col mb-3'>
         <Avatar className='h-20 w-20'>
            <AvatarImage src={targetData.avatar} />
            <AvatarFallback>{targetData.name}</AvatarFallback>
         </Avatar>
         <p className='text-muted-foreground text-sm'>{targetData.username}</p>
         <p className='text-2xl text-md'>{targetData.name}</p>
      </div>
   )
}