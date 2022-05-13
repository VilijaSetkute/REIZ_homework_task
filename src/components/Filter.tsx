import React, { useState } from 'react';

type Country = {
  name: string;
  region: string;
  area: number;
  independent: boolean;
};

type SortingComponentProps = {
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

function Filter({ setCountries, setCurrentPage } : SortingComponentProps) {
  const [getToggle, setToggle] = useState<boolean>(false);
  const [getSelection, setSelection] = useState<string>('Filter countries');

  async function filterCountries(text: string) {
    let data: Country[] = [];
    await fetch('https://restcountries.com/v2/all?fields=name,region,area')
      .then((res) => res.json())
      .then((records) => {
        data = records;
      });
    if (text === 'remove') {
      setCountries([...data]);
      setSelection('Filter countries');
    } else {
      if (text === 'oceania') {
        const filtered = data.filter((el) => el.region === 'Oceania');
        setSelection('Oceania region');
        setCountries([...filtered]);
      }
      if (text === 'size') {
        const sizeLT = data.filter((el) => el.name === 'Lithuania')[0].area;
        const filtered = data.filter((el) => el.area < sizeLT);
        setSelection('Smaller than Lithuania');
        setCountries([...filtered]);
      }
      setCurrentPage(1);
    }
    setToggle(false);
  }

  return (
    <div className="ms-1 w-200">

      <div className="w-100 sorting position-relative">
        <button
          type="button"
          className={`${getToggle && 'btn-success'} selection d-flex justify-content-between align-items-center rounded-2`}
          onClick={() => setToggle(!getToggle)}
        >
          <div>{getSelection}</div>
        </button>
        {getToggle && (
          <div className="optionSet position-absolute">
            <button type="button" className="option" onClick={() => filterCountries('remove')}>Remove filter</button>
            <button type="button" className="option" onClick={() => filterCountries('oceania')}>In Oceania region</button>
            <button type="button" className="option" onClick={() => filterCountries('size')}>Smaller than Lithuania</button>
          </div>
        )}
      </div>

    </div>
  );
}

export default Filter;
