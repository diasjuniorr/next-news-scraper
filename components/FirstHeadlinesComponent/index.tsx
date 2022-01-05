import { Box} from "@mui/material";
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
          <h2>{headline.title}</h2>
          <p>{headline.content}</p>
        </>
      </a>
    </Box>
  );
};

export default FirstHeadlinesComponent;
