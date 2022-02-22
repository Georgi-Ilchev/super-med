import { Route, Link, NavLink, Redirect, Routes } from 'react-router-dom';
import { FormControl, Dropdown, DropdownButton, Container, Button } from 'react-bootstrap';
import React, { useState } from 'react';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);

const CategoryNavigation = () => {
    return (
            <DropdownButton variant='warning' size="lg" title="Types">
                <Dropdown as={CustomMenu}>
                    <Dropdown.Item as={Link} to="/doctors/allergists">Allergists</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/anesthesiologists">Anesthesiologists</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/cardiologists">Cardiologists</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/dermatologists">Dermatologists</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/endocrinologists">Endocrinologists</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/gastroenterologists">Gastroenterologists</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/infectious">Infectious</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/oncologists">Oncologists</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/pediatricians">Pediatricians</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/physiatrists">Physiatrists</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/plastic-surgeons">Plastic Surgeons</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/psychiatrists">Psychiatrists</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/radiologists">Radiologists</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/general-surgeons">General Surgeons</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/doctors/urologists">Urologists</Dropdown.Item>
                </Dropdown>
            </DropdownButton>
    )
};

export default CategoryNavigation;