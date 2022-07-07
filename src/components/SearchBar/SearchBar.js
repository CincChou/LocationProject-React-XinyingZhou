import React, { useState, useRef } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import "./SearchBar.css";
import { PushpinOutlined } from '@ant-design/icons';
import { Button, AutoComplete } from 'antd';
import "antd/dist/antd.css";
import { v4 as uuid } from 'uuid';


function SearchBar({ panTo, markersStore }) {
    // AutoComplete API to get suggestions when users enter places
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43, lng: () => -79 },
            radius: 200 * 1000
        }
    });
    const [selected, setSelected] = useState(null);
    const inputRef = useRef(null);
    const [op, setOp] = useState([]);

    async function getAddressInfo(data) {
        try {
            // Asynchronous Request to get {lat, lng} from address input
            const results = await getGeocode({ address: data });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng }, 14);
            const newMarker = { id: uuid(), address: data, lat: lat, lng: lng, time: new Date() };
            markersStore(newMarker);

            // const timestamp = Math.floor(newMarker.time.getTime()/1000);
            // const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=AIzaSyAtaq8slmudqh6cqimEhKGAn16DzyVLv3E`
            // const response = await fetch(url);                                                              
            // const jsonResponse = await response.json();
            // console.log(jsonResponse)


        } catch (error) {
            console.log(error)
        }

    }

    // Enter Searching trigger for Solution 1
    // const handleKeyPress = (event) => {
    //     if (event.key === 'Enter') {
    //         console.log('enter press here! ');
    //         getAddressInfo();
    //     }

    // }

    //Reformat items / options in the suggestion box
    const options = data.map(d => ({ label: d.description, value: d.description }));

    // When user selects an item from the suggestion box
    const onSelect = (data) => {
        // console.log('onSelect', data);
        setValue(data);
        getAddressInfo(data);
    };

    // When user clicks the Search button
    const handleClick = () => {
        console.log(data[0]);
        const address = data[0].description;
        getAddressInfo(address);
    }

    return (
        <>
            <AutoComplete
                style={{
                    width: "20%"
                }}
                value={value}
                options={op}
                style={{
                    width: 200,
                }}
                onSelect={onSelect}
                onSearch={() => { setOp(options) }}
                onChange={(data) => { setValue(data) }}
                backfill={true}
                placeholder="Enter an address"
                className='autocomplete'
            />

            <Button type='primary' className='button' onClick={handleClick}>search</Button>
            {
            // Solution 1 without AntD Components
            /* <div className='search'>

                <input
                    placeholder='Enter an address'
                    value={value}
                    onChange={(event) => { setValue(event.target.value) }}
                    disabled={!ready}
                    ref={inputRef}
                    onKeyUp={
                        handleKeyPress
                        // async () => {

                        //     try {

                        //         const results = await getGeocode({ address: selected });
                        //         const { lat, lng } = await getLatLng(results[0]);
                        //         panTo({ lat, lng }, 12);
                        //         markersStore({ lat: lat, lng: lng, time: new Date() });

                        //     } catch (error) {
                        //         console.log(error)
                        //     }
                        // }
                    }
                ></input>
                <button onClick={async () => {

                    try {

                        const results = await getGeocode({ address: selected });
                        const { lat, lng } = await getLatLng(results[0]);
                        panTo({ lat, lng });
                        markersStore({ lat: lat, lng: lng, time: new Date() });

                    } catch (error) {
                        console.log(error)
                    }
                }}>Search</button>
                <ul className='itemcontainer'>
                    {status === "OK" && data.map(({ id, description }) => <li key={id} className='items' onClick={(e) => { setSelected(e.target.innerText); setValue(e.target.innerText, false); inputRef.current.focus(); }}>{description}</li>)}
                </ul>
            </div> */}
        </>
    );
}


export default SearchBar;