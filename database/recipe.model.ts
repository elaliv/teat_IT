import { Schema, models, model, Document } from "mongoose";

export interface IRecipe extends Document {
  name: string;
  description: string;
  photo: string;
  rating: number;
  numberOfRatings: number;
  author: Schema.Types.ObjectId;
}

const RecipeSchema = new Schema({
  name: { type: String, required: true},
  description: { type: String, required: true },
  photo: { type: String },
  rating: { type: Number },
  numberOfRatings: { type: Number },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Recipe = models.Recipe || model("Recipe", RecipeSchema);

export default Recipe;