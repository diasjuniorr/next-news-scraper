import { Box, Typography } from "@mui/material";
import Section from "../../interfaces/Section";

interface SectionProps {
  section: Section;
}

const DiscoverComponent: React.FC<SectionProps> = ({ section }) => {
  const firstLink = `/articles/${section.list[0].href}`;
  const secondLink = `/articles/${section.list[1].href}`;
  const thirdLink = `/articles/${section.list[2].href}`;

  return (
    <>
      <Box
        sx={{
          borderTop: "1px solid #000",
        }}
      >
        <Typography variant="h6" component="h2" fontWeight={600}>
          {section.section}
        </Typography>
        <a href={firstLink}>
          <img src={section.list[0].img} style={{ maxWidth: "100%" }} alt="" />
          <Typography variant="h6">{section.list[0].title}</Typography>
        </a>
      </Box>
      <Box
        sx={{
          marginTop: "12px",
          paddingTop: "4px",
          borderTop: "1px solid lightgray",
        }}
      >
        <a href={secondLink}>
          <Typography variant="h6">{section.list[1].title}</Typography>
        </a>
      </Box>
      <Box
        sx={{
          marginTop: "12px",
          paddingTop: "4px",
          borderTop: "1px solid lightgray",
        }}
      >
        <a href={thirdLink}>
          <Typography variant="h6">{section.list[2].title}</Typography>
        </a>
      </Box>
    </>
  );
};

export default DiscoverComponent;
