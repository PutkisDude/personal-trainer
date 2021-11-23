import React, {useEffect, useState} from "react";


function Training() {

    const [trainings, setTrainings] = useState();

    useEffect(() => {
        FetchTrainings();
    }, []) 

    const FetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    return (<div>
        

    </div>)

}

export default Training;