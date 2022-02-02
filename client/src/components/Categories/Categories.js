import CategoryNavigation from "./CategoryNavigation/CategoryNavigation.js";
import style from './Categories.css';

const Categories = () => {
    return (
        <section className="categories-container">
            <div className="categories-searching-msg">
                <h1 className="">Search your doctor</h1>

                <div className="categories-nav-bar">
                    <CategoryNavigation></CategoryNavigation>
                </div>
            </div>


        </section>

    )
};

export default Categories;