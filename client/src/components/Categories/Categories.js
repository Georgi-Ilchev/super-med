import CategoryNavigation from "./CategoryNavigation/CategoryNavigation.js";
import DoctorCard from "../Cards/DoctorCard/DoctorCard.js";
import HeaderCard from "../Cards/DoctorCard/HeaderCard.js";

import * as doctorService from "../../services/doctorService.js";

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import style from './Categories.css';

const Categories = () => {
    let params = useParams();
    console.log(params.category);

    const [doctors, setDoctors] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/doctors')
            .then(res => res.json())
            .then(doctors => setDoctors(doctors)
                .catch(err => console.log(err)))
    }, []);

    console.log(doctors);


    return (
        <section className="categories-container">
            <div className="categories-searching-msg">
                <h1 className="">Search your doctor</h1>

                <div className="categories-nav-bar">
                    <CategoryNavigation></CategoryNavigation>
                </div>

                <div className="categories-header-card">
                    <HeaderCard category={params.category}></HeaderCard>
                </div>

                <ul>
                    {doctors.length > 0
                        ? doctors.map(x =>
                            <DoctorCard key={x.id} data={x} />)
                        : <div>
                            <p className="no-doctors-message">There are no doctors added in this field yet</p>
                        </div>}
                </ul>
            </div>


        </section>

    )
};

export default Categories;