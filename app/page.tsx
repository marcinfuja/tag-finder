'use client';

import Link from 'next/link';
import Search from '@/app/components/Search/search';
import TagBoard from '@/app/components/TagBoard/tagBoard';
import Result from '@/app/components/Result/result';
import styles from './page.module.css';
import { GrTag } from 'react-icons/gr';

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <GrTag className="item" size={32} />
        </div>
        <div className={styles.dashboard}>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <Search />
        </div>
        {/* <div className={styles.container}>
          <TagBoard />
        </div> */}
        {/* <div className={styles.container}><Result /></div> */}
      </main>
      {/* <footer className={styles.footer}>Footer</footer> */}
    </div>
  );
}
