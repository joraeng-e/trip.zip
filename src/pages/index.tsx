import TextInput from '@/components/inputs/TextInput';
import React from 'react';

export default function Home() {
  return (
    <main className="max-w-1200 mx-auto w-full">
      <h1>input</h1>
      <TextInput
        label="email"
        name="email"
        type="text"
        placeholder="이메일을 입력해주세요"
      />
      <TextInput
        label="password"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
    </main>
  );
}
