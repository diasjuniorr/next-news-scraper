import type { GetStaticProps } from "next";
import { getArticles } from "./api/articles";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import HeadlinePrimary from "../components/HeadlinePrimary";
import HeadlineComponent from "../components/HeadlineComponent";
import DiscoverComponent from "../components/DiscoverComponent";
import SectionComponent from "../components/SectionComponent";
import FavoriteContainer from "../components/FavoriteContainer";
import HeadlineSecondary from "../components/HeadlineSecondary";
import Layout from "../components/layout/layout";
import Headline from "../interfaces/Headline";
import Discover from "../interfaces/Discover";
import Favorite from "../interfaces/Favorite";
import Section from "../interfaces/Section";
interface ArticlesListPageProps {
  articles: {
    headlines: Headline[];
    discovers: Discover[];
    favorites: Favorite[];
    sections: Section[];
  };
}

export default function Home({ articles }: ArticlesListPageProps) {
  const { headlines, discovers, favorites, sections } = articles;
  return (
    <Layout>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          paddingTop={2}
          paddingBottom={2}
          borderBottom={"1px solid lightgray"}
        >
          <Grid item xs={12} sm={12} md={8} lg={6}>
            <HeadlinePrimary headline={headlines[0]} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <HeadlineSecondary
              firstItem={headlines[1]}
              secondItem={headlines[2]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={12} lg={3}>
            <FavoriteContainer favorites={favorites} />
          </Grid>
        </Grid>

        <Grid container spacing={3} paddingTop={2}>
          {headlines.slice(3, 7).map((headline, idx) => {
            return (
              <Grid key={idx} item xs={6} sm={6} md={3} lg={3}>
                <HeadlineComponent headline={headline} />
              </Grid>
            );
          })}
        </Grid>

        <Grid
          container
          spacing={3}
          marginTop={2}
          paddingBottom={4}
          className="background-secondary"
        >
          {discovers.map((discover, idx) => {
            return (
              <Grid key={idx} item xs={12} sm={12} md={8} lg={4}>
                <DiscoverComponent discover={discover} />
              </Grid>
            );
          })}
        </Grid>
        <div>
          <Grid container spacing={3} paddingTop={2}>
            {sections.map((section, idx) => {
              return (
                <Grid key={idx} item xs={12} sm={12} md={12} lg={3}>
                  <SectionComponent section={section} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const articles = await getArticles();

    return {
      props: { articles },
      revalidate: 1 * 60 * 5,
    };
  } catch (e: any) {
    console.log("error fetching static props:", e.message);

    return {
      notFound: true,
    };
  }
};
