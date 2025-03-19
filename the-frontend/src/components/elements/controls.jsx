import { css } from "@linaria/core";


const inputStyles = css`
    padding: 0.5rem;
    border--color: #565c65;
    line-height: 1.4;
    font-size: 1rem;
`;

export const elements = {
    input: (attributes) =>{
        const {className} = attributes.className ?? '';
        console.log(className)
        const classNames = [inputStyles, className].filter(c => c).join(' ');
        return <input  {...attributes} className={classNames}/>
    }
}