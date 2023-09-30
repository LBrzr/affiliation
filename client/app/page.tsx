import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <main>
      <div>
        <h1>Home</h1>
        <p>Welcome !</p>
        <span>Go to </span>
        <span>
          <Link href="/login">login</Link>
        </span>
        <span> or </span>
        <span>
          <Link href="/register">register</Link>
        </span>
      </div>
    </main>
  )
}

export default Home;
