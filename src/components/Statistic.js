import React, {useState, useEffect} from "react";
import {XAxis, Tooltip, Bar, BarChart, YAxis, ResponsiveContainer } from "recharts";
import _ from "lodash";

function Statistic() {

    const [stats, setStats] = useState([]);

    const fetchStats = () =>  {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(res => res.json())
        .then(data => {
            let tempStats = _(data).groupBy('activity').map((training, id) => ({
                activity: id,
                minutes: _.sumBy(training, 'duration')
            })).value();
            setStats(tempStats);
        })
        .catch(e => console.error(e))
    }

    useEffect(() => {
        fetchStats();
    }, [])

    return(
    <ResponsiveContainer width="90%" height={400}>
        <BarChart width="500" height="300" data={stats} margin={{top: 45, right: 30, left: 10, bottom: 5}}>
            <XAxis dataKey="activity" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="minutes" fill="blue" />
        </BarChart>
    </ResponsiveContainer>
    )
}

export default Statistic;