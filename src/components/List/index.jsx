import React from "react";
import PropTypes from "prop-types";

const List = ({
  renderItem,
  data = [],
  emptyListMessage = "List is empty",
  listItemKey = null,
  ...props
}) => {
  if (!renderItem) {
    return <div>The render item functions is missing.</div>;
  }

  return (
    <ul {...props}>
      {data && data.length ? (
        data.map((item, index) => (
          <li key={listItemKey ? item[listItemKey] : index}>
            {renderItem(item, index)}
          </li>
        ))
      ) : (
        <li className='empty-message'>{emptyListMessage}</li>
      )}
    </ul>
  );
};

List.propTypes = {
  renderItem: PropTypes.func.isRequired,
  data: PropTypes.array,
  emptyListMessage: PropTypes.string,
  listItemKey: PropTypes.string,
};

export default List;
