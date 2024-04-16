import { useEffect, useState } from 'react';
import Signout from './Signout';
import Navbar from './Navbar';
import Spinner from './Spinner';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import LineChart from './LineChart';


const Profile = () => {
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    const [accuracyData, setAccuracyData] = useState([]);
    const [speedData, setSpeedData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        axiosPrivate.get('/api/typing-lessons/')
            .then(res => {
                let newAccuracyData = [];
                let newSpeedData = [];
                for (let lesson of res?.data) {
                    newAccuracyData.push(lesson.typos * 100 / lesson.length);
                    newSpeedData.push(lesson.duration / lesson.length);
                }
                setAccuracyData(newAccuracyData);
                setSpeedData(newSpeedData);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    return (
        <>
            <Navbar />
            {isLoading 
                ? <Spinner />
                : <div className='profile'>
                    <LineChart data={speedData} legend={'Typing speed'} color='#1791e8'/>
                    <br />
                    <br />
                    <LineChart data={accuracyData} legend={'Accuracy'} color='#e81717'/>
                    <br />
                </div>
            }
        </>
    )
}

export default Profile