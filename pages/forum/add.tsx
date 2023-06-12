import AddForumComponents from "@/components/forum/AddForum";
import { MainLayout, MainLayoutWithoutSidebar } from "@/layouts/MainLayout";
import useAuth from "@/utils/hooks/useAuth";
import { Grid, GridItem } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useLayoutEffect } from 'react';

export default function AddForum() {
  const router = useRouter();
  const isAuth = useAuth();

  useLayoutEffect(() => {
    if (!isAuth) {
      router.replace('/auth');
    }
  }, [router, isAuth]);

  return (
    <>
      <Head>
        <title>Add Forum</title>
      </Head>
      <MainLayout>
        <Grid gridTemplateColumns={'repeat(12, 1fr)'} gap={5}>
          <GridItem colSpan={{ base: 12, md: 9 }}>
            <AddForumComponents />
          </GridItem>
        </Grid>
      </MainLayout>
    </>
  )
}