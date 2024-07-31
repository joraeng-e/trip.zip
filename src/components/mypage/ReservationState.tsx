import React, { useState } from 'react';

import Dropdown from '../commons/Dropdown';

export default function ReservationState() {
  const [value, setValue] = useState('value1');
  return (
    <Dropdown selected={value} setSelected={setValue} width={200} height={51}>
      <Dropdown.Button />
      <Dropdown.Body>
        <Dropdown.Item text="최신순" value="recent" />
        <Dropdown.Item text="낮은" value="lowest">
          낮은가격순
        </Dropdown.Item>
        <Dropdown.Item text="높은" value="highest" />
      </Dropdown.Body>
    </Dropdown>
  );
}
