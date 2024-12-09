import FoodCard from "@/components/cards/FoodCard";
import SearchBar from "@/components/ui/SearchBar";
import Select from "@/components/ui/Select";
import { getAllRecipes, getAuthorNameById } from "@/lib/actions/recipe.action";
import { decodeImageURI, isSessionValid } from "@/lib/utils";
import { redirect } from "next/navigation";

const page = async () => {
  const isValid = await isSessionValid();

  if (!isValid) {
    redirect("/sign-in");
  }

  let recipes = [];

  recipes = await getAllRecipes();
  const author = await getAuthorNameById({ id: recipes[0].author });

  return (
    <div className="gap-6 flex flex-col justify-center items-center h-[90vh] relative z-10">
      {recipes.length ? (
        <>
          <SearchBar />
          <div className="flex gap-16">
            <Select
              name="Filter"
              options={["Cheese Melt", "Pepperoni", "Sauce Splatter"]}
            />
            <Select
              name="Sort"
              options={["Best rated", "Most rated", "Most ordered"]}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {recipes.map((recipe) => (
              <FoodCard
                key={recipe._id.toString()}
                id={recipe._id.toString()}
                name={recipe.name}
                photo={decodeImageURI(recipe.photo)}
                rating={recipe.rating}
                author={author}
                numberOfRatings={recipe.numberOfRatings}
              />
            ))}
          </div>
        </>
      ) : (
        <p>No recipes present at the moment</p>
      )}
    </div>
  );
};

export default page;
