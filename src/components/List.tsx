import React from 'react';

type CountryProps = {
  region: string;
  name: string;
  area: number;
};

function List({ region, name, area } : CountryProps) {
  return (
    <div className="border-bottom p-2 d-flex mx-auto">
      <div className="me-2 w-region fw-bold">{region}</div>
      <div className="me-2 w-country">{name}</div>
      <div className="me-2 w-area text-primary">{area}</div>
    </div>
  );
}

export default List;
