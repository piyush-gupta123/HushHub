import React from 'react'
import Feed from './Feed'

function Home() {
  return (
    <section>
      <h1 className="head_text text-center text-4xl font-semibold">Discover And Share</h1>
      <br className="max-md:hidden" />
      <h3 className="text-orange-500 text-center text-2xl mb-5">People's Secrets</h3>
      <p className="desc text-center text-xl mb-40 text-black">
        HushHub is an open source secret sharing tool for modern world to
        discover, share secrets without revealing their identity.
      </p>
      <Feed />
    </section>
  )
}

export default Home