import React, {useEffect, useState} from 'react';
import List from "./List";
import Sorting from "./Sorting";
import Filter from "./Filter";
import Pagination from "./Pagination";

type Country = {
    name: string;
    region: string;
    area: number;
    independent: boolean
}

const MainView = () => {

    const [countries, setCountries] = useState<Country[]>([])

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [postPerPage] = useState<number>(20)

    const lastCountryPerPage = currentPage * postPerPage
    const firstCountryPerPage = lastCountryPerPage - postPerPage
    const currentPosts = countries.slice(firstCountryPerPage, lastCountryPerPage)

    useEffect(() => {
        async function getData() {
            await fetch('https://restcountries.com/v2/all?fields=name,region,area')
                .then(res => res.json())
                .then(records => {
                    setCountries(records)
                })
        }
        getData()
    }, [])

    const paginate = (pageNum: number) => setCurrentPage(pageNum);

    return (
        <div className='container mx-auto mt-3 w-max'>
            <div className='d-flex mb-2 flex-row-reverse'>
                <Sorting countries={countries} setCountries={setCountries} setCurrentPage={setCurrentPage}/>
                <Filter countries={countries} setCountries={setCountries} setCurrentPage={setCurrentPage}/>
            </div>
            <div className='mb-2'>
                <div className='p-2 d-flex'>
                    <div className='fs-5 me-2 fw-bold w-region'>Region</div>
                    <div className='fs-5 me-2 fw-bold w-country'>Country</div>
                    <div className='fs-5 me-2 fw-bold w-area'>Size <span className='fs-6'>(km<sup>2</sup>)</span></div>
                </div>
                <div>
                    {currentPosts.map(({area, name, region}, i) =>
                        <List key={i} region={region} name={name} area={area}/>
                    )}
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <Pagination postsPerPage={postPerPage} totalPosts={countries.length} paginate={paginate} currentPage={currentPage}/>
            </div>
        </div>
    );
};

export default MainView;