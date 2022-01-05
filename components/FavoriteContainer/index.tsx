import { Box, Typography } from "@mui/material";
import FavoriteItem from "../FavoriteItem";
import Favorite from "../../interfaces/Favorite";

interface FavoriteProps {
  favorites: Favorite[];
}

const DiscoverComponent: React.FC<FavoriteProps> = ({ favorites }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#F5F4EE",
        height: "100%",
        padding: "16px",
      }}
    >
      <Typography variant="h6" component="h2" fontWeight={600}>
        Readers favorites
      </Typography>
      {favorites.map((favorite, index) => (
        <FavoriteItem favorite={favorite} key={index} index={index} />
      ))}
    </Box>
  );
};

export default DiscoverComponent;
