import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Headline from "../../interfaces/Headline";

interface HeadlineProps {
  headline: Headline;
}

const HeadlineComponent: React.FC<HeadlineProps> = ({ headline }) => {
  const link = `/article/${headline.href}`;

  return (
    <Box>
      <Link href={link}>
        <a>
          <img
            src={headline.img}
            style={{ width: "100%" }}
            alt={headline.title}
          />
          <Typography variant="h6">{headline.title}</Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            marginTop={0}
          >
            {headline.content}
          </Typography>
        </a>
      </Link>
    </Box>
  );
};

export default HeadlineComponent;
