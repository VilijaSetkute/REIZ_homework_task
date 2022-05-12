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
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Filter: FC<SortingComponentProps> = ({countries, setCountries, setCurrentPage}) => {

    const [getToggle, setToggle] = useState<boolean>(false)
    const [getSelection, setSelection] = useState<string>('Filter countries')

    async function filterCountries(text: string) {
        let data: Country[]
        await fetch('https://restcountries.com/v2/all?fields=name,region,area')
            .then(res => res.json())
            .then(records => {
                data = records
            })

        if (text === 'remove') {
            // @ts-ignore
            setCountries([...data])
            setSelection('Filter countries')
        } else {
            if (text === 'oceania') {
                // @ts-ignore
                const filtered = data.filter(el => el.region === 'Oceania')
                setSelection('Oceania region')
                setCountries([...filtered])
            }
            if (text === 'size') {
                // @ts-ignore
                const sizeLT = data.filter(el => el.name === 'Lithuania')[0].area
                // @ts-ignore
                const filtered = data.filter(el => el.area < sizeLT)
                setSelection('Smaller than Lithuania')
                setCountries([...filtered])
            }
            setCurrentPage(1)
        }
        setToggle(false)



        // if (text === 'remove') {
        //     await fetch('https://restcountries.com/v2/all?fields=name,region,area')
        //         .then(res => res.json())
        //         .then(records => {
        //             setCountries(records)
        //         })
        //     setSelection('Filter countries')
        // } else {
        //     if (text === 'oceania') {
        //         const filtered = countries.filter(el => el.region === 'Oceania')
        //         setSelection('Oceania region')
        //         setCountries([...filtered])
        //     }
        //     if (text === 'size') {
        //         const sizeLT = countries.filter(el => el.name === 'Lithuania')[0].area
        //         const filtered = countries.filter(el => el.area < sizeLT)
        //         setSelection('Smaller than Lithuania')
        //         setCountries([...filtered])
        //     }
        //     setCurrentPage(1)
        // }
        // setToggle(false)
    }

    return (
        <div className='ms-1 w-200'>

            <div className='w-100 sorting position-relative'>
                <div className={`${getToggle && 'btn-success'} selection d-flex justify-content-between align-items-center rounded-2`}
                     onClick={() => setToggle(!getToggle)}>
                    <div>{getSelection}</div>
                </div>
                {getToggle && <div className='optionSet position-absolute' >
                    <div className='option' onClick={() => filterCountries('remove')}>Remove filter</div>
                    <div className='option' onClick={() => filterCountries('oceania')}>In Oceania region</div>
                    <div className='option' onClick={() => filterCountries('size')}>Smaller than Lithuania</div>
                </div>}
            </div>

        </div>
    );
};

export default Filter;