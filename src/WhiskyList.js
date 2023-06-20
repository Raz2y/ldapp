import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WhiskyList = () => {
    const [distilleries, setDistilleries] = useState([]);

    useEffect(() => {
        const fetchDistilleries = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:3001/repositories/LDApps/query',
                    {
                        query: `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX ex: <http://example.org/>

            SELECT ?distillery
            WHERE {
              ex:Bourbon ex:hasDistillery ?distillery .
            }
            `,
                    }
                );

                const data = response.data.results.bindings;
                const distilleryNames = data.map((item) => item.distillery.value);

                setDistilleries(distilleryNames);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDistilleries();
    }, []);

    return (
        <div>
            <h1>Distilleries of Bourbon</h1>
            <ul>
                {distilleries.map((distillery, index) => (
                    <li key={index}>{distillery}</li>
                ))}
            </ul>
        </div>
    );
};

export default WhiskyList;
