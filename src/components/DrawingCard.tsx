import React, { useContext } from 'react';
import styles from '../styles/drawingCard.module.css';
import Image from 'material-ui-image'
import { DrawingCardContext, DrawingCardContextType } from './DrawingBoard';


const first_url = "http://www.lesminimoys.fr/presentation_dessins/IMG/resize_drawings_ludo/"
function DrawingCard(props: {
    index : number
}): any {

    const {items} = useContext(DrawingCardContext) as DrawingCardContextType;
    console.log("drawingCard",items);
 
    return (
        <div className={styles.drawing_card} >

            <Image imageStyle={{ width: '100px', height: '200px' }} src={first_url + items[props.index].url} alt={items[props.index].title} />

        </div>
    );
}

export default DrawingCard;