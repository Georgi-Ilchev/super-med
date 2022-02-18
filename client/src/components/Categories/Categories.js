import CategoryNavigation from "./CategoryNavigation/CategoryNavigation.js";
import DoctorCard from "../Cards/DoctorCard/DoctorCard.js";
import HeaderCard from "../Cards/DoctorCard/HeaderCard.js";

import * as doctorService from "../../services/doctorService.js";

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../utils/firebase.js';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { CardGroup } from 'react-bootstrap';


import './Categories.css';

const Categories = () => {
    let params = useParams();
    const [dataDoctors, setDataDoctors] = useState([]);

    useEffect(() => {
        if (params.category !== undefined) {
            (async () => {
                const doctors = collection(db, 'doctors');
                const q = query(doctors, where("type", "==", params.category));
                const dataUsers = await getDocs(q);
                setDataDoctors(dataUsers.docs.map(x => (/*x.data()*/ /*x.id*/ {
                    id: x.id,
                    data: x.data()
                })));
            })();
        } else {
            (async () => {
                const doctors = collection(db, 'doctors');
                const q = query(doctors);
                const dataUsers = await getDocs(q);
                setDataDoctors(dataUsers.docs.map(x => ({
                    id: x.id,
                    data: x.data()
                })));
            })();
        }
    }, [params.category]);

    // console.log(dataDoctors);

    // dataDoctors.map(x => console.log(x));

    return (
        <section className="categories-container">

            <div className="categories-searching-msg">
                <h1 className="">Search your doctor</h1>
            </div>
            <div className="categories-nav-bar">
                <CategoryNavigation></CategoryNavigation>
            </div>

            <div className="categories-header-card">
                <HeaderCard category={params.category}></HeaderCard>
            </div>

            <ul>
                {/* <div className="row offset-1"> */}

                {dataDoctors.length > 0
                    ?
                    dataDoctors.map(x =>

                        <DoctorCard key={x.id} id={x.id} data={x.data}  >
                            {/* {console.log(x)} */}
                        </DoctorCard>
                    )
                    : <div>
                        <p className="no-doctors-message">There are no doctors added in this field yet</p>
                    </div>}
                {/* </div> */}

            </ul>


        </section>

    )
};

export default Categories;