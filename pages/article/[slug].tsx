import React from "react";
import http from "../../util/http";
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
  const res = await http.post("article", { slug });
  const article = res.data;

  return {
    props: { article },
  };
};

// example of static generated page
// interface Path {
//   params: { slug: string };
// }

// export const getStaticPaths: GetStaticPaths = async (context: any) => {
//   const res = await http("articles");
//   const articles = await res.data;

//   let paths: Path[] = [];

//   articles.headlines.map((article: Headline) =>
//     paths.push({ params: { slug: article.href } })
//   );

//   articles.discovers.map((article: Discover) =>
//     paths.push({ params: { slug: article.href } })
//   );

//   articles.favorites.map((article: Favorite) =>
//     paths.push({ params: { slug: article.href } })
//   );

//   articles.sections.map((article: Section) =>
//     article.list.map((item) => paths.push({ params: { slug: item.href } }))
//   );

//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps = async (context: any) => {
//   const { slug } = context.params;
//   const res = await http.post("article", { slug });
//   const article = res.data;

//   return { props: { article }, revalidate: 1 * 60 * 5 };
// };

export default ArticlePage;
