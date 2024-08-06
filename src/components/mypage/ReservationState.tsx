import React, { useState } from 'react';

import Dropdown from '../commons/Dropdown';

export default function ReservationState() {
  const [value, setValue] = useState('value1');

  return (
    <Dropdown
      selected={value}
      setSelected={setValue}
      width={50}
      maxWidth={100}
      height={50}
    >
      <Dropdown.Button className="shadow-md">
        <div>여기에요</div>
      </Dropdown.Button>
      <Dropdown.Body>
        <Dropdown.Item value="recent" />
        <Dropdown.Item value="lowest">낮은가격순</Dropdown.Item>
      </Dropdown.Body>
    </Dropdown>
  );
}
