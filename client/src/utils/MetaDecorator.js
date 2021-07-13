import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const MetaDecorator = (props) => {
  const { title, description } = props;

  const browserTitle = `${title} | Messenger`;

  return (
    <Helmet>
      <title>{browserTitle}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default MetaDecorator;
