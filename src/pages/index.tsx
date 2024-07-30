import Dropdown from '@/components/Dropdown';
import React, { useState } from 'react';

export default function Home() {
  const [value, setValue] = useState('');

  return (
    <div>
      <div className="mx-50 my-200">
        <Dropdown
          selected={value}
          setSelected={setValue}
          width={120}
          height={51}
        >
          <Dropdown.Button />
          <Dropdown.Body>
            <Dropdown.Item value="첫번째" />
            <Dropdown.Item value="두번째" />
            <Dropdown.Item value="세번째" />
          </Dropdown.Body>
        </Dropdown>
      </div>
    </div>
  );
}
