import React from "react";
import { http } from "../../util/http";
import { useSession, signIn } from "next-auth/react";

import { GetServerSideProps, NextPage } from "next";
import { Container, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";

import Layout from "../../components/layout/layout";

interface Article {
  title: string;
  paragraphs: string[];
}

interface ArticlePageProps {
  article: Article;
}

const loadingParagraphs = [1, 2, 3, 4, 5, 6, 7, 8];

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Layout maxWidth="md">
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <Typography component="h1" variant="h2" marginBottom={4}>
              {article.title}
            </Typography>
            {article.paragraphs?.map((paragraph, index) => (
              <Typography key={index} marginBottom={2}>
                {paragraph}
              </Typography>
            ))}
          </Box>
        </Container>
      </Layout>
    );
  }

  if (status === "unauthenticated") {
    signIn();
  }

  return (
    <Layout maxWidth="md">
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Typography component="h1" variant="h2" marginBottom={4}>
            <Skeleton width={1000} />
            <Skeleton width={750} />
          </Typography>

          {loadingParagraphs.map((paragraph) => (
            <Typography key={paragraph} marginBottom={2} width="100%">
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="40%" />
            </Typography>
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { slug } = context.params;

  try {
    const response = await http(`http://localhost:3000/api/article/${slug}`);
    const article = await response.json();

    return {
      props: { article },
    };
  } catch (e) {
    console.log("getServerSideProps failed: ",e);

    return {
      notFound: true,
    };
  }
};

export default ArticlePage;
