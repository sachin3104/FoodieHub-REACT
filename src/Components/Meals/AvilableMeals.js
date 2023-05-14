import React, { useCallback, useState, useEffect } from "react";

import MealsItem from "./MealsItem/MealsItem";
import classes from "./AvilableMeals.module.css";
import Card from "../UI/Card";

const AvilableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState(null);

  const fetchMealsHandler = useCallback(() => {
    const fetchMealsFunction = async () => {
      setIsLoading(true);
      seterror(null);
      try {
        const response = await fetch(
          "https://react-food-app-backend-default-rtdb.firebaseio.com/Meals.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        const fetchedMeals = [];
        for (const key in data) {
          fetchedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(fetchedMeals);
      } catch (error) {
        seterror(error.message);
      }
      setIsLoading(false);
    };
    fetchMealsFunction();
  }, []);

  useEffect(() => {
    fetchMealsHandler();
    console.log("run");
  }, [fetchMealsHandler]);

  let content = <p>No meals found!</p>;
  if (meals.length > 0) {
    content = meals.map((meal) => {
      return (
        <MealsItem
          id={meal.id}
          key={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      );
    });
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvilableMeals;
