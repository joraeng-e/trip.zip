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
  const onClickAddr = () => {
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
    <>
      <input
        id="address"
        type="text"
        readOnly
        onClick={onClickAddr}
        className="basic-input"
      />
      <button onClick={onClickAddr}>검색</button>
      <input id="zipNumber" type="text" readOnly className="basic-input" />
      <input id="addressDetail" type="text" className="basic-input" />
    </>
  );
}
