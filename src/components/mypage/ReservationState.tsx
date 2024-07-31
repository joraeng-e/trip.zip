import React, { useState } from 'react';

import Dropdown from '../commons/Dropdown';

export default function ReservationState() {
  const [value, setValue] = useState('value1');
  return (
    <Dropdown selected={value} setSelected={setValue} width={200} height={51}>
      <Dropdown.Button />
      <Dropdown.Body>
        <Dropdown.Item value="value1" />
        <Dropdown.Item value="value2" />
      </Dropdown.Body>
    </Dropdown>
  );
}
