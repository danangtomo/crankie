import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Crankie</title>
        <meta name="description" content="Crankie" />
      </Head>

      <main className={styles.main}>
        <Image src="/logo.gif" width="134" height="64" />
        <h1 className={styles.title}>COMING SOON !</h1>
        <p>The page is under construction</p>
      </main>
    </div>
  );
}
