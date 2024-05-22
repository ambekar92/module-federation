import { Children } from 'react';

export const Show = (props: any) => {
    let when: null | any = null;
    let otherwise: null | any = null;
  
    Children.forEach(props.children, children => {
        if (!children.props.isTrue) {
            otherwise = children
        } else if (!when && children.props.isTrue === true) {
            when = children
        }
    })

    return when || otherwise
}

Show.When = ({isTrue, children}: any) => isTrue && children;
Show.Otherwise = ({render, children}: any) => render || children;