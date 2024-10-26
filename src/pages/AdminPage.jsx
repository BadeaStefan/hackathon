import { Tabs } from 'antd';
import AddParty from '../components/AddParty';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import EditParty from '../components/EditParty';
export default function AdminPage() {


    const token = localStorage.getItem('userInfo');
    const navigate = useNavigate();
    const userInfo = jwtDecode(token);
    const isAdmin = userInfo.isAdmin;
    console.log(isAdmin)
    useEffect(() => {
        if (isAdmin === false) {
            localStorage.removeItem('userInfo');
            navigate('/login');
        }

    }, [navigate, isAdmin]);
    
    const items = [
        {
            key: '1',
            label: 'Add party',
            children: <AddParty></AddParty>
        },
        {
            key: '2',
            label: 'Edit party',
            children: <EditParty></EditParty>
        },
        {
            key: '3',
            label: 'Tab 3',
            children: 'Content of Tab Pane 3',
        },
    ];

    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
}