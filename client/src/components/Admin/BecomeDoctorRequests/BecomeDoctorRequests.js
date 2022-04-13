// Should be only for admins
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.js';
import { db } from '../../../utils/firebase.js';
import BecomeDoctorCard from "../../Cards/DoctorCard/BecomeDoctorCard.js";
import Pagination from '../../Pagination/Pagination.js';
import { CardsPerPage } from '../../../constants.js';

import { useCallback, useEffect, useState } from 'react';
import { collection, doc, getDocs, query, setDoc, where, getDoc } from 'firebase/firestore';
import _ from 'lodash';


const BecomeDoctorRequests = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [dataRequests, setDataRequests] = useState([]);
    const [flag, setFlag] = useState(true);
    const [, updateState] = useState();

    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedCards, setPaginatedCards] = useState();

    const forceUpdate = useCallback(() => updateState({}), []);
    // console.log(currentUser);

    useEffect(() => {
        if (currentUser !== undefined) {
            (async () => {
                const ref = await doc(db, 'users', currentUser?.uid);
                const user = await getDoc(ref);
                if (user.data().role !== 'admin') {
                    navigate('/');
                }
            })();
        }
    }, [currentUser])

    console.log('updated');

    useEffect(() => {
        let isMounted = true;

        (async () => {
            const requests = collection(db, 'doctor-requests');
            const q = query(requests);
            const dbRequests = await getDocs(q);

            if (isMounted) {
                setDataRequests(dbRequests.docs.map(x => ({
                    id: x.id,
                    data: x.data()
                })));

                setFlag(false);
                forceUpdate();
            }
        })();


        return () => { isMounted = false };
    }, []);

    useEffect(() => {
        const pageCount = dataRequests ? Math.ceil(dataRequests.length / CardsPerPage) : 0;

        setCurrentPage(prevState => 1);
        setPages(prevState => range(pageCount, 1));
        // setPages(prevState => [...Array(pageCount).keys()]);

        function range(size, startAt = 0) {
            return [...Array(size).keys()].map(i => i + startAt);
        }

        setPaginatedCards(prevState => (_(dataRequests).slice(0).take(CardsPerPage).value()))
    }, [dataRequests]);

    return (
        <section>
            <ul>
                <div className="row" style={style.becomeDoctorUl}>
                    {paginatedCards?.length > 0
                        ? paginatedCards.map(x => <BecomeDoctorCard key={x.id} id={x.id} data={x.data}></BecomeDoctorCard>)
                        : flag ? <p style={style.loading}>Loading...</p>
                            : <p style={style.noDoctorsYet}>No requests yet...</p>}
                </div>
            </ul>
            <Pagination
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setPaginatedCards={setPaginatedCards}
                data={dataRequests}
            >
            </Pagination>
        </section>

    )
}

export default BecomeDoctorRequests;

const style = {
    becomeDoctorUl: {
        margin: '0px'
    },
    noDoctorsYet: {
        fontSize: '50px',
        marginTop: '10rem',
        textAlign: 'center',
    },
    loading: {
        fontSize: '50px',
        marginTop: '10rem',
        textAlign: 'center',
    }
}