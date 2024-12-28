import React from 'react';
import { useIntl } from 'react-intl';

const NumberFormat = ({ value, onChange, name, ...rest }) => {
  const intl = useIntl();

  const handleChange = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, '');
    onChange({ target: { name, value: formattedValue } });
  };

  return (
    <input
      type="text"
      value={intl.formatNumber(value, { useGrouping: true })}
      onChange={handleChange}
      name={name}
      {...rest}
    />
  );
};

export default NumberFormat;
