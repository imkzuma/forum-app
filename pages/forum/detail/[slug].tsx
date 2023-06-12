import DetailForumComponents from "@/components/forum/DetailForum";
import { MainLayoutWithoutSidebar } from "@/layouts/MainLayout";
import Head from "next/head";
import { useRouter } from "next/router"

export default function DetailForum() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>Forum App | Detail Forum</title>
      </Head>

      <MainLayoutWithoutSidebar>
        <DetailForumComponents id={slug as string} />
      </MainLayoutWithoutSidebar>
    </>
  )
}