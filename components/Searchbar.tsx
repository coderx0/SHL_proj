"use client"

import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'

const Searchbar = () => {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        router.push(`/search/${inputRef.current?.value}`)
    }
  return (
    <div className='fixed top-0 left-0 flex w-full bg-stone-200 justify-center items-center p-2'>
        <form onSubmit={handleSubmit}>
            <input type='text' ref={inputRef} className='border-2 p-2 md:w-[400px] rounded-l-lg' placeholder='search projects'/>
            <button type='submit' className='outline-none border-none bg-stone-700 text-white p-2 rounded-r-lg'>
                Search
            </button>
        </form>
    </div>
  )
}

export default Searchbar