import React, { useEffect, useState } from 'react';
import { Input } from "./components/Input";
import { Autocomplete } from "./components/Autocomplete";
import data from "./data";

function App() {

  return (
    <div className="App bg-slate-300 font-semibold min-h-screen flex items-center justify-center text-xs">
      <div className="p-4 bg-white flex flex-col gap-3">
        <Input type="text" placeholder="Some text" errorMessage="Broken" />
        <Autocomplete
          onLoad={(value) =>
            new Promise((res) =>
              setTimeout(() =>
                res(data.filter(item => item[ 0 ].includes(value))),
                500
              )
            )
          }
          getLabel={(item) => `${item[ 0 ]} - ${item[ 1 ]} ~ ${item[ 2 ]}`}
          onClickItem={console.log}
          getKey={(item) => `${item[ 0 ]}`}
        />
      </div>
    </div>
  );
}

export default App;
