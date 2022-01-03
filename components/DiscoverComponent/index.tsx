import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import Discover from "../../interfaces/Discover";

interface DiscoverProps {
  discover: Discover;
}

const DiscoverComponent: React.FC<DiscoverProps> = ({ discover }) => {
  const link = `/article/${discover.href}`;

  return (
    <div className="discovers-container">
      <Avatar src={discover.img}></Avatar>
      <div className="discovers-content">
        <a href={link}>
          <Typography variant="h6">{discover.title}</Typography>
          <Typography variant="body2">{discover.content}</Typography>
        </a>
      </div>
    </div>
  );
};

export default DiscoverComponent;
