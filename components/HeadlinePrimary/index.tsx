import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Headline from "../../interfaces/Headline";

interface HeadlinePrimaryProps {
  headline: Headline;
}

const HeadlinePrimary: React.FC<HeadlinePrimaryProps> = ({ headline }) => {
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

export default HeadlinePrimary;
