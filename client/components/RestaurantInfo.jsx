/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';

const BigWrapper = styled.div`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: solid 1px #d8d9db;
  display: block;
  font-family: Helvetica, sans-serif;
  background-color: #fff;
  width: 640px;
`;

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.33;
  color: #2d333f;
  border-bottom: 1px solid #d8d9db;
  padding-bottom: 1rem;
  margin: 0 0 1rem;
`;

const SmallWrapper = styled.div`
  width: 100%;
  padding-bottom: 2rem;
`;

const Header2 = styled.h2`
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 550;
`;

const Header3 = styled.h3`
  padding-top: 0.5rem;
  font-size: 1rem;
  font-weight: normal;
  margin: 0;
  padding: 0;

`;

const StarRating = styled.div`
  display: grid;
  grid-template-columns: 5% 15% 80%;

`;

const StarsBar = styled.div`
  border: 1px solid #d8d9db;
  background-color: red;
`;

const Header4 = styled.h4`
  margin: 0 0.25rem;
  font-size: 0.875rem;
  line-height: 1.43;
  font-weight: 500;
`;

const MidSection = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding-bottom: 1rem;
`;

const Left = styled.div`
  display: grid;
  grid-template-rows: 33% 33% 33%;
`;

const Right = styled.div`
`;

const RatingCol = styled.div`
  display: grid;
  grid-template-columns: 10% 10% 10% 10% 60%;
`;

const RatingRow = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
`;

const RestaurantInfo = (props) => (
  <div>
    <BigWrapper>
      {props.length === 1 ? <Header>What {props.length} people are saying</Header> : <Header>What {props.length} people are saying</Header>}
      <SmallWrapper>
        <Header2>Overall ratings and reviews</Header2>
        <Header3>Reviews can only be made by diners who have eaten at this restaurant</Header3>

        <StarRating>
          <StarsBar fill={props.restaurant.rating_recent} />
          <Header4> {props.restaurant.rating_recent} based on recent ratings</Header4>
        </StarRating>

        <MidSection>
          <Left>
            <RatingCol>
              <RatingRow>
                <h2>{props.restaurant.rating_food}</h2>
                <h5>Food</h5>
              </RatingRow>
              <RatingRow>
                <h2>{props.restaurant.rating_service}</h2>
                <h5>Service</h5>
              </RatingRow>
              <RatingRow>
                <h2>{props.restaurant.rating_ambience}</h2>
                <h5>Ambience</h5>
              </RatingRow>
              <RatingRow>
                <h2>{props.restaurant.rating_overall}</h2>
                <h5>Value</h5>
              </RatingRow>
            </RatingCol>

            <img></img>
            <h6><b>Noise </b>{props.restaurant.noise_level}</h6>

            <img></img>
            <h6>{props.restaurant.would_recommend * 100}% of people would recommend it to a friend</h6>
          </Left>

          <Right>
            <div className="barChart">{'--->BAR CHART<---'}</div>
          </Right>
        </MidSection>
        <div className="loved">
          <h2>Loved for</h2>
          <img></img>
          <div className="lovedContainer">
            <img></img>
            <h4>{props.restaurant.loved_for}</h4>
            <h5>San Francisco Bay Area</h5>
          </div>
        </div>
      </SmallWrapper>
    </BigWrapper>
  </div>
);

export default RestaurantInfo;
