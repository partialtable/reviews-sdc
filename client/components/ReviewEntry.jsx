/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import ReviewInfo from './ReviewInfo';
import Stars from './Stars';

const Wrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: solid 1px #d8d9db;
  color: #2d333f;
  display: flex;
  flex-direction: row;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
  margin-left: 1rem;
  width: 6rem;
  position: relative;
  flex: none;
`;

const AvatarBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const AvatarImg = styled.img`
width: 4rem;
height: 4rem;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
`;

const Location = styled.div`
  line-height: 1.43;
  color: #6f737b;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  text-align: center;
`;

const Names = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  text-align: center;
  color: #2d333f;
  word-break: break-word;
`;

const UserInfoGraphic = styled.div`

`;

const UserReviewBlock = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.43;
  flex: none;
  white-space: nowrap;
  color: #6f737b;
  margin: 0;
  padding: 0;
`;

const CommentBoxIcon = styled.svg`
  display: inline-block;
  position: relative;
  flex: none;
  margin-right: 0.25rem;
`;

const UserReviewNumber = styled.div`
  white-space: nowrap;
  color: #6f737b;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.43;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Row1DotDate = styled.div`
  display: flex;
  font-size: 0.875rem;
  line-height: 1.43;
`;

const Row1Dot = styled.div`
  padding-right: 0.5rem;
  color: #2d333f;
`;

const Dined = styled.div`
  margin: 0 0.25rem;
  font-size: 0.875rem;
  line-height: 1.43;
  color: #2d333f;
  font-weight: 500;
`;

const SingleStar = styled.div`
  height: 16px;
  margin: 0 4px 0 0;
  display: inline-block;
  position: relative;
  flex: none;
`;

const Row2 = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  line-height: 1.15;
  padding: 0;
`;

const Row2Word = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.43;
  text-transform: capitalize;
  margin: 0 0.5rem 0 0;
`;

const Row2NumDot = styled.div`
  display: flex;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.43;
  color: #da3743;
`;

const Row2Dot = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  color: #2d333f;
`;

const Row3 = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  max-height: calc(3rem * 1.5);
  line-height: 1.5;
  font-size: 1rem;
  font-weight: normal;
  overflow-wrap: anywhere;
  color: #2d333f;
  -webkit-font-smoothing: antialiased;
`;

const Row4 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ReadMore = styled.div`
  display: none;
`;

const ReportBlockWrapper = styled.div`
  display: flex;
  position: relative;
  align-self: flex-start;
  margin: 0;
  padding: 0;
`;

const ReportBlock = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

const Report = styled.div`
  margin: 0 0 0 0.25rem;
  font-weight: 500;
  line-height: 1.43;
  font-size: 0.875rem;
  color: #6f737b;
`;

const ReviewEntry = (props) => (

  <Wrapper>
    <Left>
      <AvatarBox>
        <AvatarImg src={props.review.avatar} alt="" />
      </AvatarBox>
      <Names>{`${props.review.first_name + props.review.last_name[0]}`}</Names>
      <Location>{props.review.locale}</Location>
      <UserReviewBlock>
        <CommentBoxIcon width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <title>universal / icon / details / small / ic_ticket copy</title>
          <path d="M4.5 3.5A1.5 1.5 0 0 0 3 5v4.099a1.5 1.5 0 0 0 1.5 1.5h3.073L9.8 12.091a.5.5 0 0 0 .779-.409l.013-1.083h.908a1.5 1.5 0 0 0 1.5-1.5V5a1.5 1.5 0 0 0-1.5-1.5h-7z" stroke="#6F737B" fill="none" />
        </CommentBoxIcon>
        <UserReviewNumber>{props.review.number_of_reviews} reviews</UserReviewNumber>
      </UserReviewBlock>
    </Left>
    <Right>
      <Row1>
        <Stars full={props.full} partial={props.partial} empty={props.empty} />
        <Row1DotDate>
          <Row1Dot>·</Row1Dot>
          <Dined>Dined on {props.review.create_date_month} {props.review.create_date_day}, {props.review.create_date_year}</Dined>
        </Row1DotDate>
      </Row1>
      <Row2>

        <Row2Word>Overall</Row2Word>
        <Row2NumDot>
          {props.review.rating_overall}
          <Row2Dot>·</Row2Dot>
        </Row2NumDot>

        <Row2Word>Food</Row2Word>
        <Row2NumDot>
          {props.review.rating_food}
          <Row2Dot>·</Row2Dot>
        </Row2NumDot>

        <Row2Word>Service</Row2Word>
        <Row2NumDot>
          {props.review.rating_service}
          <Row2Dot>·</Row2Dot>
        </Row2NumDot>

        <Row2Word>Ambience</Row2Word>
        <Row2NumDot>
          {props.review.rating_ambience}
        </Row2NumDot>

      </Row2>
      <Row3>{props.review.review_message}</Row3>
      <Row4>
        <ReportBlockWrapper>
          <ReportBlock>
            <ReadMore></ReadMore>
            <Report>Report</Report>
          </ReportBlock>
        </ReportBlockWrapper>
      </Row4>
    </Right>
  </Wrapper>

);

export default ReviewEntry;
