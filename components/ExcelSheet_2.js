import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';


const ExcelSheet_2 = () => {
    const [items, setItems] = useState([]);

    function submitHandler() {
      const pageHTML = document.querySelector("#section_history_7").outerHTML;
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

      <div id="section_history_7" class="con_set_1">

      <div class="title wow fadeInDown">
        <h1 class="text_center fc_bk ff_12 fw_400 mb_0">교회연혁</h1>
        <h3 class="text_center fc_gr ff_12 fw_400 fs_2">HISTORY</h3>
      </div>

      <div class="history_7">
        <ul class="tabs_2">
          <li class="active ff_12" rel="tab11">2011 ~ 현재</li>
          <li class="ff_12" rel="tab22">2001~2010</li>
          <li class="ff_12" rel="tab33">1981~2000</li>
        </ul>
        
        <div class="cons">
          <div class="tab_container">
            <div class="tab_content_2" id="tab11">
              <div>
                <h3 class="ff_12">2011 ~ 현재</h3>
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

export default ExcelSheet_2;