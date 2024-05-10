import React from 'react';
import CallToAction from "../components/CallToAction"

const Projects = () => {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Pojects</h1>
      <p className='text-md text-gray-500'>Build fun and engaging projects while learning
        <span className='ml-1 font-bold bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text gradient-text  dark:bg-gradient-to-l dark:from-cyan-400  dark:to-yellow-300 dark:text-transparent dark:bg-clip-text'>
         HTML, CSS, and JavaScript!
        </span></p>
      <CallToAction />
    </div>
  )
}

export default Projects