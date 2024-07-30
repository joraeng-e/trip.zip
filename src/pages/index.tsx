import Dropdown from '@/components/Dropdown';
import Header from '@/components/Header';
import React, { useState } from 'react';

export default function Home() {
  const [selected, setSelected] = useState('number0');

  return (
    <div>
      <Header />
      <main className="page-container bg-gray-500">
        <button className="flex-center h-35 rounded-full border-2 px-10 text-24">
          버튼
        </button>
        <div className="text-xl-bold text-custom-orange-200"></div>
      </main>
      <Dropdown selected={selected} setSelected={setSelected}>
        <Dropdown.Button>trigger</Dropdown.Button>
        <Dropdown.Body>
          <Dropdown.Item value="number1">number1</Dropdown.Item>
          <Dropdown.Item value="number2">number2</Dropdown.Item>
          <Dropdown.Item value="number3">number3</Dropdown.Item>
          <Dropdown.Item value="number4">number4</Dropdown.Item>
        </Dropdown.Body>
      </Dropdown>
    </div>
  );
}
