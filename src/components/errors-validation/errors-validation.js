import React from 'react';
import './errors-validation.css';

const ErrorsValidation = (errors) => {

    const createError = (string, item) => {
        return (
            <li key={string + item}>
                {string}
                {' ' + item}
            </li>
        );
    }

    let errorsList = [];
    if (errors.errors) {
        for (let i in errors.errors) {
            errorsList.push(createError(i, errors.errors[i][0]));
        }
    }
    return (
        <ul className="errors-list">
            {errorsList}
        </ul>
    );

}

export default ErrorsValidation;