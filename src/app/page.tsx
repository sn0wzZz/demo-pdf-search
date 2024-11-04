'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const mockResults = [
    {
      text: 'Чл. 1. (1) ВЪЗЛОЖИТЕЛЯТ възлага, а ИЗПЪЛНИТЕЛЯТ приема да [предостави/предоставя], срещу възнаграждение и при условията на този',
      document: 'Образец 3 - Образец на дого...(1).pdf',
      date: '4 ноември 2024 в 10:31',
    },
    {
      text: 'които Възложителят следва да предостави на Изпълнителя с оглед изпълнението на Услугите (ако е приложимо)].',
      document: 'Образец 3 - Образец на дого...(1).pdf',
      date: '4 ноември 2024 в 10:31',
    },
    {
      text: 'като ВЪЗЛОЖИТЕЛЯТ не дължи заплащането на каквито и да е други разноски, направени от ИЗПЪЛНИТЕЛЯ.',
      document: 'Образец 3 - Образец на дого...(1).pdf',
      date: '4 ноември 2024 в 10:31',
    },
    {
      text: 'Чл. 9. (1) ВЪЗЛОЖИТЕЛЯТ плаща на ИЗПЪЛНИТЕЛЯ цената по този Договор в срок не по-късно от 20 дни от одобряване на получената фактура, както следва:',
      document: 'Образец 3 - Образец на дого...(1).pdf',
      date: '4 ноември 2024 в 10:31',
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if(searchTerm.trim() === '') {
      return
    }
    setIsSearching(true)
    setShowResults(false)

    setTimeout(() => {
      if (searchTerm.toUpperCase() === 'ВЪЗЛОЖИТЕЛЯТ') {
        setShowResults(true)
      }
      setIsSearching(false)
    }, 1500)
  }

  const highlightText = (text: string) => {
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'))
    return parts.map((part, i) =>
      part.toUpperCase() === searchTerm.toUpperCase() ? (
        <span key={i} className='bg-yellow-200'>
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <main className='min-h-screen p-8 bg-white'>
      <form
        onSubmit={handleSearch}
        className='max-w-2xl mx-auto flex items-center border-2   p-2 rounded-full'
      >
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full p-2  rounded text-black outline-none'
          placeholder='Въведете текст за търсене...'
        />
        <button
          type='submit'
          className='px-4 py-2 bg-black text-white rounded-full'
        >
          Търси
        </button>
      </form>

      {isSearching && (
        <div className='flex justify-center mt-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-l-2  border-black'></div>
        </div>
      )}

      {showResults && (
        <div className='max-w-2xl mx-auto mt-8'>
          <div className='mb-4 text-black'>
            <p>Намерени 2 документа и 6 съвпадения</p>
          </div>

          <div className='space-y-6'>
            {mockResults.map((result, index) => (
              <div key={index} className='border-b pb-4'>
                <p className='mb-2 text-gray-500'>
                  {index + 1}. {highlightText(result.text)}
                </p>
                <Link href='/' className='text-sm text-gray-700 underline hover:text-black transition-colors duration-300'>
                  В ДОКУМЕНТ с име: {result.document} качен на {result.date}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
