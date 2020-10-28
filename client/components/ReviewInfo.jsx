import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ReviewInfo = ({ info }) => (
  // const month = props.info.create_date.getMonth();
  // const date = props.info.create_date.getDate();
  // const year = props.info.create_date.getFullYear();

  <div>{info}</div>
);

ReviewInfo.propTypes = {
  info: PropTypes.string.isRequired,
};

export default ReviewInfo;
