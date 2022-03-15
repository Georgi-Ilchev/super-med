import { Route, Link, NavLink, Redirect, Routes } from 'react-router-dom';
import { FormControl, Dropdown, DropdownButton, Container, Button } from 'react-bootstrap';
import React, { useState } from 'react';

import { Towns } from '../../../constants.js';

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

const TownNavigation = ({ category }) => {
    return (
        <DropdownButton variant='secondary' size="lg" title="Towns">
            <Dropdown as={CustomMenu}>
                {Towns.map(x =>
                    <Dropdown.Item key={x} as={Link} to={`/doctors/${category}/${x}`}>{x}</Dropdown.Item>
                )}
            </Dropdown>
        </DropdownButton>
    )
};

export default TownNavigation;