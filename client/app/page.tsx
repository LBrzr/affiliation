import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <main>
      <div>
        <h1>Home</h1>
        <p>Welcome !</p>
        <Link href="/login">login</Link>
        <Link href="/register">register</Link>
      </div>
    </main>
  )
}

export default Home;
