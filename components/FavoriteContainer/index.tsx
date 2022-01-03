import { Typography } from "@mui/material";
import FavoriteItem from "../FavoriteItem";
import Favorite from "../../interfaces/Favorite";

interface FavoriteProps {
  favorites: Favorite[];
}

const DiscoverComponent: React.FC<FavoriteProps> = ({ favorites }) => {
  return (
    <div className="headlines-favorites-container">
      <Typography variant="h6" component="h2" fontWeight={600}>
        Readers favorites
      </Typography>
      {favorites.map((favorite, index) => (
        <FavoriteItem favorite={favorite} key={index} index={index} />
      ))}
    </div>
  );
};

export default DiscoverComponent;
