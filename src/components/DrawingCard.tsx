import React, { useContext } from 'react';
import Image from 'material-ui-image'
import { DrawingCardContext, DrawingCardContextType } from './DrawingBoard';


const first_url = "http://www.lesminimoys.fr/presentation_dessins/IMG/resize_drawings_ludo/"
function DrawingCard(props: {
    index : number
}): any {

    const {items} = useContext(DrawingCardContext) as DrawingCardContextType;
    
    return (
            <Image src={first_url + items[props.index].url} alt={items[props.index].title} />
    );
}

export default DrawingCard;