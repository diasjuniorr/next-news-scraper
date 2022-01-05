import type { GetStaticProps } from "next";
import { getArticles } from "./api/articles";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FirstHeadlinesComponent from "../components/FirstHeadlinesComponent";
import SecondHeadlinesComponent from "../components/SecondHeadlinesComponent";
import ThirdHeadlinesComponent from "../components/ThirdHeadlinesComponent";
import DiscoverComponent from "../components/DiscoverComponent";
import SectionComponent from "../components/SectionComponent";
import FavoriteContainer from "../components/FavoriteContainer";
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
            <FirstHeadlinesComponent
              headline={getFirstHeadlinesData(headlines)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SecondHeadlinesComponent
              firstItem={headlines[1]}
              secondItem={headlines[2]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={12} lg={3}>
            <FavoriteContainer favorites={favorites} />
          </Grid>
        </Grid>
        <Grid container spacing={3} paddingTop={2}>
          {getThirdHeadlinesData(headlines).map((headline, idx) => {
            return (
              <Grid key={idx} item xs={6} sm={6} md={3} lg={3}>
                <ThirdHeadlinesComponent headline={headline} />
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
        <Grid container spacing={3} paddingTop={2}>
          {sections.map((section, idx) => {
            return (
              <Grid key={idx} item xs={12} sm={12} md={12} lg={3}>
                <SectionComponent section={section} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Layout>
  );
}

function getFirstHeadlinesData(headlines: Headline[]) {
  return headlines[0];
}

function getSecondHeadlinesData(headlines: Headline[]) {
  return headlines.slice(1, 3);
}

function getThirdHeadlinesData(headlines: Headline[]) {
  return headlines.slice(3, 7);
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
