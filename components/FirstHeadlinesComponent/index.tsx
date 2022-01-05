import { Box, Typography} from "@mui/material";
import Headline from "../../interfaces/Headline";

interface HeadlinePrimaryProps {
  headline: Headline;
}

const FirstHeadlinesComponent: React.FC<HeadlinePrimaryProps> = ({ headline }) => {
  const link = `/article/${headline.href}`;

  return (
    <Box>
      <a href={link}>
        <>
          <img src={headline.img} style={{ maxWidth: "100%" }} alt="" />
          <Typography variant="h3" component="h1">
            {headline.title}
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary">
            {headline.content}
          </Typography>
        </>
      </a>
    </Box>
  );
};

export default FirstHeadlinesComponent;
