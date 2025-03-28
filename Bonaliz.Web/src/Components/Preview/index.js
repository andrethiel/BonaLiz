import React from "react";

// import { Container } from './styles';

function Preview({ fileData }) {
  return (
    <div className={"flex mt-4 gap-4 w-[400px]"}>
      <div className={"flex-col items-center"}>
        {/* loop over the fileData */}
        {fileData.fileList.map((f) => {
          return (
            <ol key={f.lastModified}>
              <li className={"flex mt-4 gap-4 w-[400px]"}>
                {/* display the filename and type */}
                <div key={f.name} className={"ml-8"}>
                  {f.name}
                </div>
              </li>
            </ol>
          );
        })}
      </div>
    </div>
  );
}

export default Preview;
