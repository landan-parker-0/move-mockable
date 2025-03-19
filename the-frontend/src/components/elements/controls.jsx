import { css } from "@linaria/core";


const inputStyles = css`
    padding: 0.5rem;
    border-color:rgba(86, 92, 101, 0.43);
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