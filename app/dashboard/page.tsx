import Link from 'next/link';
import Search from '@/app/components/Search/search';
import styles from './page.module.css';

const DashboardPage = () => {
  return (
    <div className={styles.dashboard}>
      <div>Dashboard</div>
      <Link href="/">Go back</Link>
      <Search multiple="true" />
    </div>
  );
};

export default DashboardPage;
