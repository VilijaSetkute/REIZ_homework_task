import React, {FC, useState} from 'react';

type Country = {
    name: string;
    region: string;
    area: number;
    independent: boolean
}

interface SortingComponentProps {
    countries: Country[];
    setCountries:  React.Dispatch<React.SetStateAction<Country[]>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Sorting: FC<SortingComponentProps> = ({countries, setCountries}) => {

    const [getToggle, setToggle] = useState<boolean>(false)
    const [getSelection, setSelection] = useState<string>('Sort by')

    async function sort(text: string) {
        if (text === 'remove') {
            await fetch('https://restcountries.com/v2/all?fields=name,region,area')
                .then(res => res.json())
                .then(records => {
                    setCountries(records)
                })
            setSelection('Sort by')
        } else {
            if (text === 'asc') {
                const sorted = countries.sort((a, b) => a.name > b.name ? 1 : -1)
                setSelection('Country name (A to Z)')
                setCountries([...sorted])
            }
            if (text === 'desc') {
                const sorted = countries.sort((a, b) => a.name < b.name ? 1 : -1)
                setSelection('Country name (Z to A)')
                setCountries([...sorted])
            }
        }
        setToggle(false)
    }

    return (
        <div className='ms-1 w-200'>

            <div className='w-100 sorting position-relative'>
                <div className={`${getToggle && 'btn-success'} selection d-flex justify-content-between align-items-center rounded-2`}
                     onClick={() => setToggle(!getToggle)}>
                    <div>{getSelection}</div>
                </div>
                {getToggle && <div className='optionSet position-absolute' >
                    <div className='option' onClick={() => sort('remove')}>Remove sort results</div>
                    <div className='option' onClick={() => sort('asc')}>Country name (A to Z)</div>
                    <div className='option' onClick={() => sort('desc')}>Country name (Z to A)</div>
                </div>}
            </div>

        </div>
    );
};

export default Sorting;