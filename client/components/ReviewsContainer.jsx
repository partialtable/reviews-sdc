import React from 'react';
import styled from 'styled-components';
import ReviewEntry from './ReviewEntry';

const ReviewsContainer = (props) => (
  {props.reviewsList.map((review) => (
    <ReviewEntry review={review} user={props.users[review.id_users]} />
  ))};
);

export default ReviewsContainer;
