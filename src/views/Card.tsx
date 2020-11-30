import React from "react";
import Link from "next/link";
import MUICard from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { ChevronRightIcon } from "@/views/icons";
import "@/asssets/styles/card.css";

interface Props {
  getRecipeById: (id: string) => void;
  recipe: Recipe;
}

export const Card: React.FC<Props> = React.memo(({ recipe }) => {
  const { strMeal, strMealThumb, idMeal } = recipe;

  return (
    <MUICard className="card">
      <CardMedia className="card-img" image={strMealThumb} title={strMeal} />
      <CardHeader
        classes={{ content: "card-content" }}
        title={
          <Tooltip title={strMeal}>
            <Typography variant="h6">{strMeal}</Typography>
          </Tooltip>
        }
      />

      <CardContent>
        <Typography className="card-short-info" color="textSecondary" paragraph>
          {recipe.strInstructions &&
            recipe.strInstructions.substring(0, 100) + "..."}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Tooltip title="See the recipe">
          <Link shallow href={`/?recipeid=${idMeal}`}>
            <a>
              <Button endIcon={<ChevronRightIcon />} aria-label="see more">
                View
              </Button>
            </a>
          </Link>
        </Tooltip>
      </CardActions>
    </MUICard>
  );
});
