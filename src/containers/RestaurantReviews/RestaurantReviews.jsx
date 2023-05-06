import { Reviews } from "@/components/Reviews/Reviews";
import {
  selectIsRestaurantLoading,
  selectReviewsByRestaurantId,
} from "@/store/entities/restaurant/selectors";
import { fetchRestaurant } from "@/store/entities/restaurant/thunks/fetchRestaurant";
import { selectIsReviewLoading } from "@/store/entities/review/selectors";
import { fetchReviewsByRestaurantId } from "@/store/entities/review/thunks/fetchReviewsByRestaurantId";
import { fetchUsers } from "@/store/entities/user/thunks/fetchUsers";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const RestaurantReviewsContainer = ({ restaurantId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsReviewLoading);
  const isRestaurantLoading = useSelector(selectIsRestaurantLoading);
  const reviews = useSelector((state) =>
    selectReviewsByRestaurantId(state, { restaurantId })
  );

  useEffect(() => {
    if (restaurantId) dispatch(fetchReviewsByRestaurantId(restaurantId));
  }, [dispatch, restaurantId]);

  useEffect(() => {
    dispatch(fetchRestaurant());
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading && isRestaurantLoading) {
    return <span>Loading...</span>;
  }
  if (!reviews?.length) {
    return "No reviews";
  }

  return <Reviews reviews={reviews} />;
};
