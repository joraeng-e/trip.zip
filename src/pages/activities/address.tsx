import Button from '@/components/button';

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddress {
  address: string;
  zonecode: string;
}

export default function Address() {
  const onClickAddress = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: IAddress) {
          (document.getElementById('address') as HTMLInputElement).value =
            data.address;
          (document.getElementById('zipNumber') as HTMLInputElement).value =
            data.zonecode;
          document.getElementById('addressDetail')?.focus();
        },
        theme: {
          bgColor: '#D9E5DA',
          pageBgColor: '#D9EED8',
          queryTextColor: '#112211',
          outlineColor: '#112211',
        },
      }).open();
    } else {
      console.error('Daum Postcode script is not loaded');
    }
  };

  return (
    <div>
      <div className="flex-center">
        <input
          id="zipNumber"
          type="text"
          readOnly
          className="basic-input w-100"
          placeholder="우편번호"
        />
        <Button
          className="w-100"
          variant="activeButton"
          onClick={onClickAddress}
        >
          검색
        </Button>
      </div>
      <input
        id="address"
        type="text"
        readOnly
        onClick={onClickAddress}
        className="basic-input"
        placeholder="도로명 주소를 검색해주세요"
      />
      <input
        id="addressDetail"
        type="text"
        className="basic-input"
        placeholder="상세 주소를 입력해주세요"
      />
    </div>
  );
}
