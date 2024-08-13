import {Map} from '@vis.gl/react-google-maps';

export default function GoogleMap()
{
    return (
        <Map
            style={{width: '40vw', height: '40vh'}}
            defaultCenter={{lat: 26.609, lng: -80.352}}
            defaultZoom={9.2}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        >

        </Map>
    )
}