import { Box, Typography } from "@mui/material";
import Favorite from "../../interfaces/Favorite";

interface FavoriteProps {
  favorite: Favorite;
  index: number;
}

const FavoriteItem: React.FC<FavoriteProps> = ({ favorite, index }) => {
  const link = `/article/${favorite.href}`;

  return (
    <Box>
      <a href={link}>
        <Typography variant="h6" fontSize={"1rem"}>
          <span style={{ color: "red", fontSize: "1.5rem" }}>{index + 1}.</span>
          &nbsp;{favorite.title}
        </Typography>
      </a>
    </Box>
  );
};

export default FavoriteItem;
