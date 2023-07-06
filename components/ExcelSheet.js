import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';


const ExcelSheet = () => {
    const [items, setItems] = useState([]);

    function submitHandler() {
      const pageHTML = document.querySelector("#section_history_1").outerHTML;
      const blob = new Blob([pageHTML], { type: "text/html" });

      saveAs(blob, "history.html");
    }
 
    const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, {
                type: "buffer"
            });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            console.log(data);
            resolve(data);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
    promise.then((d) => {
        setItems(d);
    });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <button onClick={submitHandler}>다운로드 받기</button>

      <div id="section_history_1">
        <div className="cons">
          <h1 className="title">교회연혁</h1>
          <div className="history_1">
            <ul className="tabs">
              <li className="active" rel="tab1">
                2020~현재
              </li>
              <li rel="tab2">2016~2019</li>
              <li rel="tab3">2012~2015</li>
              <li rel="tab4">2009~2011</li>
            </ul>
            <div className="tab_container">
              <div className="tab_content" id="tab1">
                <div>
                  <h3 className="fc_r3">2020 ~ 현재</h3>
                  <ul>
                    {items &&
                      items.map((data, index) => (
                        <li key={index}>
                          <p>{data.date}</p>
                          <p>{data.content}</p>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ExcelSheet;