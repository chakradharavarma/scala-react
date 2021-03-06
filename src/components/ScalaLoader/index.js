import React from 'react';
import Loader from 'react-loaders'
import 'loaders.css/loaders.min.css';
import Fade from '@material-ui/core/Fade';


const ScalaLoader = (props) => {

    if(!props.active) {
        return props.children
    }

    return (
        <Fade in={props.active} timeout={{ enter: 200, exit: 300 }}>
            {
                props.centered ? (
                    <div className='centered with-height'>
                        <Loader type="ball-grid-pulse" active={props.active} />
                    </div>
                ) : <Loader type="ball-grid-pulse" active={props.active} />
            }
        </Fade>
    )
}

export default ScalaLoader;