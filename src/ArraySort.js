import React, { useEffect, useState } from 'react';
import './App.css'

const App = () => {

  const objs = [
    { age: 44, name: 'vinay', city: 'karachi' },
    { age: 24, name: 'deepak', city: 'lahore' },
    { age: 74, name: 'suresh', city: 'islamabad' }
  ];
  // Returns
  // [{"age":24,"name":"deepak"},{"age":44,"name":"vinay"},{"age":74,"name":"suresh"}]
  // objs.sortBy('age');

  const [data, setData] = useState(objs);
  const [sortBy, setsortBy] = useState('name');
  const [sortOrder, setsortOrder] = useState(1);

  const handleSorting = (array, property, direction) => {
    setsortBy(property);
    setsortOrder(direction);
    direction = direction || 1;
    array.sort((a, b) => {
        let comparison = 0;
        if (a[property] > b[property]) {
            comparison = 1 * direction;
        } else if (a[property] < b[property]) {
            comparison = -1 * direction;
        }
        return comparison;
    });
    return array; // Chainable
  };

  useEffect(() => {

    const udpatedData = handleSorting(data,sortBy,sortOrder);
    setData(udpatedData);
    console.log(udpatedData);

  }, [sortBy, sortOrder]);

  return (
    <div>
      <h2>HTML Table</h2>

      <table>
        <tr>
          <th onClick={() => handleSorting(data, 'name', sortOrder === 1 ? -1 : 1)}>Name</th>
          <th onClick={() => handleSorting(data, 'age', sortOrder === 1 ? -1 : 1)}>Age</th>
          <th onClick={() => handleSorting(data, 'city', sortOrder === 1 ? -1 : 1)}>City</th>
        </tr>
        {data.map((item) => <tr>
          <th>{item.name}</th>
          <th>{item.age}</th>
          <th>{item.city}</th>
        </tr>)}
      </table>
    </div>
  );
}

export default App;