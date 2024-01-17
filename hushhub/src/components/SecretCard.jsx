import React from 'react' 

function SecretCard({data}) {
  return (
    <div className='border-2 border-gray-200 w-90 h-40 p-6 rounded-md '>
        <hr className='h-px my-6 bg-gray-400 border-0 dark:bg-gray-700'/>
        <p className='text-l font-semibold text-gray-600'>{data}</p>
    </div>
  )
}

export default SecretCard