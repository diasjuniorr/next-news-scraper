import type {GetStaticProps } from "next";
import http from "../src/http";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import HeadlinePrimary from "../components/HeadlinePrimary";
import HeadlineComponent from "../components/HeadlineComponent";
import DiscoverComponent from "../components/DiscoverComponent";
import SectionComponent from "../components/SectionComponent";
import FavoriteContainer from "../components/FavoriteContainer";
import HeadlineSecondary from "../components/HeadlineSecondary";
import Layout from "../components/layout";
import Headline from "../interfaces/Headline";
import Discover from "../interfaces/Discover";
import Favorite from "../interfaces/Favorite";
import Section from "../interfaces/Section";

interface ArticlesListPageProps {
  headlines: Headline[];
  discovers: Discover[];
  favorites: Favorite[];
  sections: Section[];
}

export default function Home({
  headlines,
  discovers,
  favorites,
  sections,
}: ArticlesListPageProps) {
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
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <HeadlineComponent headline={headlines[3]} />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <HeadlineComponent headline={headlines[4]} />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <HeadlineComponent headline={headlines[5]} />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <HeadlineComponent headline={headlines[6]} />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          marginTop={2}
          paddingBottom={4}
          className="background-secondary"
        >
          <Grid item xs={12} sm={12} md={8} lg={4}>
            <DiscoverComponent discover={discovers[0]} />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={4}>
            <DiscoverComponent discover={discovers[1]} />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={4}>
            <DiscoverComponent discover={discovers[2]} />
          </Grid>
        </Grid>
        <div>
          <Grid container spacing={3} paddingTop={2}>
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <SectionComponent section={sections[0]} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={3}>
              <SectionComponent section={sections[1]} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={3}>
              <SectionComponent section={sections[2]} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={3}>
              <SectionComponent section={sections[3]} />
            </Grid>
          </Grid>

          <Grid container spacing={3} paddingTop={2}>
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <SectionComponent section={sections[4]} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={3}>
              <SectionComponent section={sections[5]} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={3}>
              <SectionComponent section={sections[6]} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={3}>
              <SectionComponent section={sections[7]} />
            </Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await http.get("articles");
  const { headlines, discovers, favorites, sections } = response.data;

  return {
    props: { headlines, discovers, favorites, sections },
    revalidate: 1 * 60 * 5,
  };
};
