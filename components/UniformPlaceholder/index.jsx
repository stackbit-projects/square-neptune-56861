import React from "react";

const UniformPlaceholder = (props) => {

  const { placeholderKey } = props;
  const { placeholderComponent } = props;

  const placeholderProps = {
    key: props.index + placeholderKey, //this is still TODO, the key might need to be extended with rendering id - Kate
    index: props.index,
    placeholderKey: placeholderKey,
    renderingContext: { ...props.renderingContext },
  };

  return React.createElement(placeholderComponent, placeholderProps);
};

export default UniformPlaceholder;
