import { useState } from 'react';
import Head from 'next/head';
import ExcelSheet from '../components/ExcelSheet';
import ExcelSheet_2 from '../components/ExcelSheet_2';

function HomePage() {
   const selectList = [
     { value: "default", name: "디자인 유형선택" },
     { value: "1", name: "1번" },
     { value: "2", name: "2번" },
   ];
   const [selected, setSelected] = useState("디자인 유형선택");

   const handleSelect = (e) => {
     setSelected(e.target.value);
     
   };

   console.log(selected);

  return (
    <div className="cayaContent">
      <Head>
        <title>엑셀파일 연혁 변환기</title>
      </Head>

      <main>
        <div>
          <h1>엑셀파일 연혁 변환기</h1>
          <select
            className="select-box"
            onChange={handleSelect}
            value={selected}
          >
            {selectList.map((item) => {
              return (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {selected == 1 && <ExcelSheet />}
          {selected == 2 && <ExcelSheet_2 />}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
