import ForumComponents from "@/components/forum";
import { MainLayout } from "@/layouts/MainLayout";
import useAuth from "@/utils/hooks/useAuth";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useLayoutEffect } from 'react';

export default function IndexPage() {
  const router = useRouter();
  const isAuth = useAuth();

  useLayoutEffect(() => {
    if (!isAuth) {
      router.replace('/auth')
    }
  }, [router, isAuth]);

  return (
    <>
      <Head>
        <title>Forum App</title>
      </Head>
      <MainLayout>
        <ForumComponents />
      </MainLayout>
    </>
  )
}