import React, { useState } from 'react';
import { Button, Table } from 'antd';
import "antd/dist/antd.css";

const columns = [
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Latitude',
        dataIndex: 'lat',
    },
    {
        title: 'Longitude',
        dataIndex: 'lng',
    },

];


function Page({ markers, handleDelete }) {
    // Reformat the markers array into dataSource for Table
    let markerData = markers.map((m) => ({ key: m.id, address: m.address, lat: m.lat, lng: m.lng }));
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const hasSelected = selectedRowKeys.length > 0;


    const rowSelection = {
        type: 'checkbox',
        selectedRowKeys: selectedRowKeys,
        onSelect: (record,selected,selectedRows) => {setSelectedRowKeys(selectedRows.map(r => r.key))},
    };

    // Store seletedRowKeys when the Deleted button is clicked
    const onTableClick = () => {
        handleDelete(selectedRowKeys);
        setSelectedRowKeys([]);
    }

    

    return (
        <>
            <div
                style={{
                    marginBottom: 16,
                    marginLeft: 10
                }}
            >
                <Button type="primary" onClick={onTableClick}>
                    Delete
                </Button>
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={markerData} style={{width:"80%", backgroundColor:"white", marginLeft:"10px"}} />
        </>
    );
}

// Referrence: Antd Component API

export default Page;