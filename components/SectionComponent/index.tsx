import { Typography } from "@mui/material";
import Section from "../../interfaces/Section";

interface SectionProps {
  section: Section;
}

const DiscoverComponent: React.FC<SectionProps> = ({ section }) => {
  const firstLink = `/article/${section.list[0].href}`;
  const secondLink = `/article/${section.list[1].href}`;
  const thirdLink = `/article/${section.list[2].href}`;

  return (
    <>
      <div className="sections-container">
        <Typography variant="h6" component="h2" fontWeight={600}>
          {section.section}
        </Typography>
        <a href={firstLink}>
          <img src={section.list[0].img} style={{ maxWidth: "100%" }} alt="" />
          <Typography variant="h6">{section.list[0].title}</Typography>
        </a>
      </div>
      <div className="lists-article-container">
        <a href={secondLink}>
          <Typography variant="h6">{section.list[1].title}</Typography>
        </a>
      </div>
      <div className="lists-article-container">
        <a href={thirdLink}>
          <Typography variant="h6">{section.list[2].title}</Typography>
        </a>
      </div>
    </>
  );
};

export default DiscoverComponent;
