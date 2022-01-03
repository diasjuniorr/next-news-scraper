import { Typography } from "@mui/material";
import Headline from "../../interfaces/Headline";

interface HeadlineSecondaryProps {
  firstItem: Headline;
  secondItem: Headline;
}

const HeadlineSecondary: React.FC<HeadlineSecondaryProps> = ({
  firstItem,
  secondItem,
}) => {
  const firstLink = `/article/${firstItem.href}`;
  const secondLink = `/article/${secondItem.href}`;

  return (
    <div className="headlines-secondary">
      <a href={firstLink}>
        <img
          src={firstItem.img as string}
          style={{ maxWidth: "100%" }}
          alt=""
        />
        <Typography variant="h6" component="h2">
          {firstItem.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          marginBottom={3}
          marginTop={1}
        >
          {firstItem.content}
        </Typography>
      </a>
      <div style={{ borderTop: "1px solid lightgray" }}>
        <a href={secondLink}>
          <Typography variant="h6" component="h2">
            {secondItem.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            marginBottom={3}
            marginTop={1}
          >
            {secondItem.content}
          </Typography>
        </a>
      </div>
    </div>
  );
};

export default HeadlineSecondary;
