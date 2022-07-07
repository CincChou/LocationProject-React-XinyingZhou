import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import "antd/dist/antd.css";


function TimeZone({ lastMarker }) {
    const [info, setInfo] = useState({});
    // Asynchronous Request to get TimeZone info from Google API
    const getTimeZoneInfo = async () => {
        try {
            //timestamp is based on UTC, in second [ needs to adjust depending on Local TimeZone]
            const timestamp = Math.floor(lastMarker.time.getTime() / 1000 + lastMarker.time.getTimezoneOffset() * 60);
            const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lastMarker.lat},${lastMarker.lng}&timestamp=${timestamp}&key=AIzaSyAtaq8slmudqh6cqimEhKGAn16DzyVLv3E`

            const response = await fetch(url);
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            if (jsonResponse.status === 'OK') {
                setInfo({
                    timeZoneId: jsonResponse.timeZoneId,
                    timeZoneName: jsonResponse.timeZoneName,
                    dstOffset: jsonResponse.dstOffset,
                    rawOffset: jsonResponse.rawOffset,
                    timestamp: timestamp
                });
                console.log(jsonResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Loading Asynchronous requests in useEffect, everytime the lastMarker changes
    useEffect(()=> {getTimeZoneInfo()}, [lastMarker]);

    // Date Object requires a timestamp in millisecond
    const newTimestamp = (info.timestamp + info.dstOffset + info.rawOffset)*1000;
    const localDate = new Date(newTimestamp).toLocaleString();
    console.log(localDate)

    return (
        <div>
            {lastMarker && <Card
                size="small"
                title="Latest Marker Info"
                // extra={<a href="#">More</a>}
                style={{
                    width: 300,
                }}
            >
                <p>Time Zone: {info.timeZoneName}</p>
                <p>Time Zone Id : {info.timeZoneId}</p>
                <p>Created Time(in local time): {localDate}</p>
            </Card>}
        </div>
    );
}

export default TimeZone;