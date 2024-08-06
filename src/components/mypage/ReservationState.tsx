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
      <Dropdown.Button>
        <div>여기에요</div>
      </Dropdown.Button>
      <Dropdown.Body>
        <Dropdown.Item text="최신순" value="recent" />
        <Dropdown.Item text="lowest" value="lowest">
          낮은가격순
        </Dropdown.Item>
        <Dropdown.Item text="높은가격순" value="highest" />
      </Dropdown.Body>
    </Dropdown>
  );
}
