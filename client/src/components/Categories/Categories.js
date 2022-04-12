import CategoryNavigation from "./CategoryNavigation/CategoryNavigation.js";
import TownNavigation from "./CategoryNavigation/TownNavigation.js";
import DoctorCard from "../Cards/DoctorCard/DoctorCard.js";
import HeaderCard from "../Cards/DoctorCard/HeaderCard.js";
import Pagination from "../Pagination/Pagination.js";
import { CardsPerPage } from "../../constants.js";

import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../utils/firebase.js';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import _ from 'lodash';

import './Categories.css';

const Categories = () => {
    let params = useParams();
    const [dataDoctors, setDataDoctors] = useState([]);
    const [flag, setFlag] = useState(true);
    const [pages, setPages] = useState([]);
    const [paginatedCards, setPaginatedCards] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    // console.log(params);

    useEffect(() => {
        let isMounted = true;
        if (params.category !== undefined && params.town === undefined) {
            (async () => {
                const doctors = collection(db, 'doctors');
                const q = query(doctors, where("type", "==", params.category));
                const dataUsers = await getDocs(q);

                if (isMounted) {
                    setDataDoctors(dataUsers.docs.map(x => (/*x.data()*/ /*x.id*/ {
                        id: x.id,
                        data: x.data()
                    })));

                    setFlag(false);
                }
            })();

        } else if (params.category !== undefined && params.town !== undefined) {
            (async () => {
                const doctors = collection(db, 'doctors');
                const q = query(doctors, where("type", "==", params.category), where("town", "==", params.town));
                const dataUsers = await getDocs(q);

                if (isMounted) {
                    setDataDoctors(dataUsers.docs.map(x => (/*x.data()*/ /*x.id*/ {
                        id: x.id,
                        data: x.data()
                    })));

                    setFlag(false);
                }
            })();
        } else {
            (async () => {
                const doctors = collection(db, 'doctors');
                const q = query(doctors);
                const dataUsers = await getDocs(q);

                if (isMounted) {
                    setDataDoctors(dataUsers.docs.map(x => ({
                        id: x.id,
                        data: x.data()
                    })));

                    setFlag(false);
                }
            })();
        }

        return () => { isMounted = false };
    }, [params.category, params.town]);

    useEffect(() => {
        const pageCount = dataDoctors ? Math.ceil(dataDoctors.length / CardsPerPage) : 0;

        setCurrentPage(prevState => 1);
        setPages(prevState => range(pageCount, 1));
        // setPages(prevState => [...Array(pageCount).keys()]);

        function range(size, startAt = 0) {
            return [...Array(size).keys()].map(i => i + startAt);
        }

        setPaginatedCards(prevState => (_(dataDoctors).slice(0).take(CardsPerPage).value()))
    }, [dataDoctors]);

    // console.log(paginatedCards);
    // console.log(dataDoctors);
    // dataDoctors.map(x => console.log(x));

    return (
        <section className="categories-container">

            <div className="categories-searching-msg">
                <h1 className="">Search your doctor</h1>
                <p>You don't know what kind of doctor you need? <Link to='/doctors/info'>Click</Link></p>
            </div>
            <div className="categories-nav-bar">
                <CategoryNavigation></CategoryNavigation>
                {params.category
                    ? <div className="towns-nav-bar"><TownNavigation category={params.category}></TownNavigation></div>
                    : null
                }
            </div>

            <div className="categories-nav-bar">
            </div>

            <div className="categories-header-card">
                <HeaderCard category={params.category}></HeaderCard>
            </div>

            {/* <div className="categories-header-card">
                <HeaderCard category={params.town}></HeaderCard>
            </div> */}
            <hr />

            <ul>
                {/* <div className="row offset-1"> */}
                <div className="row" style={style.categoriesUl}>
                    {paginatedCards?.length > 0
                        ? paginatedCards.map(x =>
                            <DoctorCard key={x.id} id={x.id} data={x.data}  >
                                {/* {console.log(x)} */}
                            </DoctorCard>)
                        : flag ? <p className="no-doctors-message">Loading...</p>
                            : <div>
                                <p className="no-doctors-message">There are no doctors added in this field yet</p>
                            </div>}
                    {/* </div> */}
                </div>
            </ul>

            <Pagination
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setPaginatedCards={setPaginatedCards}
                dataDoctors={dataDoctors}
            >
            </Pagination>
        </section>

    )
};

export default Categories;

const style = {
    categoriesUl: {
        margin: '0px'
    }
}