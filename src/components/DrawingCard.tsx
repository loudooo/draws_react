import React from 'react';
import styles from '../styles/drawingCard.module.css';
import Image from 'material-ui-image'

const first_url = "http://www.lesminimoys.fr/presentation_dessins/IMG/resize_drawings_ludo/"
function DrawingCard(props: {
    title: string | undefined;
    url: string | undefined;
}): any {
    return (
        <div className={styles.drawing_card} >

            <Image imageStyle={{ width: '100px', height: '200px' }} src={first_url + props.url} alt={props.title} />

        </div>
    );
}

export default DrawingCard;