'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Ad from '@/app/components/Ad'
import { Button, Space, DatePicker } from 'antd';
import usePageTargeting from '@/app/components/Ad/hooks/usePageTargeting'

export default function Home() {
  usePageTargeting()

  return (
    <main className={styles.main}>
      <meta name="ad-targeting" content="google-ad-targeting"
            data-channel="nochannel" data-subchannel="nosubchannel"
            data-feature="content" data-subfeature1="activecom_home"
            data-subfeature2="nosubfeature2" data-searchkw="na" data-age="na"
            data-gender="na" data-distance="na" data-skill="na" data-cat="na"
            data-meta="na" data-eventid="na" data-country="na" data-state="na"
            data-city="na" data-zip="na" data-dest_dma="na" data-assetid="na"
            data-change_view="true" data-topic="na" data-subtopic1="na"
            data-subtopic2="na" data-subtopic3="na"/>
      <div style={{ padding: '0 24px' }}>
        <Space>
          <DatePicker/>
          <Button type="primary">Primary Button</Button>
        </Space>
      </div>
      <div className={styles.description}>
        <Ad id="lead2" position="lead2" adUnit='/21719121593/ACT/Homepage'/>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
