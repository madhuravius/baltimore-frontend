import PropTypes from 'prop-types';

export const data = PropTypes.shape({
  features: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
});
