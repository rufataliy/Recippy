import React, { useEffect, useState } from "react";
import { Sidebar } from "../views/Sidebar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import { VideoIcon, FlagIcon, LinkIcon } from "../views/icons";
import { categories } from "../asssets/img/icons";
import "../asssets/styles/review.css";
import { useStore } from "../customHooks";

interface Props {
  open: boolean;
}

const mapIngredientToMeasure = (recipe: Recipe) => {
  const elements = [];
  for (let i = 1; true; i++) {
    const ingrd = `strIngredient${i}`;
    const msr = `strMeasure${i}`;
    if (!recipe[ingrd]) {
      break;
    }
    elements.push(
      <ListItem key={ingrd} className="list-item">
        <ListItemText primary={recipe[ingrd]} />
        <ListItemText className="text-right" primary={recipe[msr]} />
      </ListItem>
    );
  }
  return elements;
};

export const RecipeView: React.FC<Props> = ({ open }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { selectedRecipeId, setSelectedRecipeId } = useStore();

  useEffect(() => {
    if (!selectedRecipeId) return;
    fetch(
      "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + selectedRecipeId
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => setRecipe(data.meals[0]));
    return () => setSelectedRecipeId(null);
  }, [selectedRecipeId, setSelectedRecipeId]);

  return (
    <Sidebar
      position={"right"}
      open={open}
      toggleSidebar={() => setSelectedRecipeId(null)}
    >
      <div className="review-area">
        {recipe != null ? (
          <>
            <div className="review-img">
              <img src={recipe.strMealThumb} alt="" />
            </div>
            <div className="review-wrapper">
              <Typography variant="h4">{recipe.strMeal}</Typography>
              <div className="review-info">
                <Chip
                  label="Video"
                  component="a"
                  target="_blank"
                  variant="outlined"
                  icon={<VideoIcon />}
                  href={recipe.strYoutube}
                  clickable
                />
                {recipe.strSource && (
                  <Chip
                    component="a"
                    target="_blank"
                    label={"website"}
                    variant="outlined"
                    href={recipe.strSource}
                    icon={<LinkIcon />}
                    clickable
                  />
                )}
                <Chip
                  icon={<FlagIcon />}
                  label={recipe.strArea}
                  variant="outlined"
                />
                <Chip
                  icon={
                    <img
                      className="custom-icon"
                      src={categories[recipe.strCategory]}
                      alt=""
                    />
                  }
                  label={recipe.strCategory}
                  variant="outlined"
                />
              </div>
            </div>
            <div className="review-scroll">
              <div className="review-wrapper">
                <Typography variant="h5">Instructions</Typography>
                <Typography paragraph>{recipe.strInstructions}</Typography>
                <Typography variant="h5">Ingredients</Typography>
                <List>{mapIngredientToMeasure(recipe)}</List>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </Sidebar>
  );
};
