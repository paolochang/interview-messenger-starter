import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description: string;
}

const MetaDecorator: React.FC<Props> = ({ title, description }) => {
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
