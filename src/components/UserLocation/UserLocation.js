import React from 'react';
import "./UserLocation.css";
import { PushpinOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import "antd/dist/antd.css";

function UserLocation({ panTo }) {

    // Move / Recenter the map based on current position 
    const handleClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                console.log(lat, lng);
                panTo({ lat, lng }, 15);
            });

        }
    }
    return (
        <>
            <Button type="primary" onClick={handleClick} icon={<PushpinOutlined />}>
            </Button>
        </>
    );
}
export default UserLocation;