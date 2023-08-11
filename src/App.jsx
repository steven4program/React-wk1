import { useState } from 'react'
import './App.css'

function App() {
  const [drinkData, setDrinkData] = useState([
    {
      id: 1,
      name: '珍珠奶茶',
      description: '香濃奶茶搭配QQ珍珠',
      price: 50,
      count: 20,
    },
    {
      id: 2,
      name: '冬瓜檸檬',
      description: '清新冬瓜配上新鮮檸檬',
      price: 45,
      count: 18,
    },
    {
      id: 3,
      name: '翡翠檸檬',
      description: '綠茶與檸檬的完美結合',
      price: 55,
      count: 34,
    },
    {
      id: 4,
      name: '四季春茶',
      description: '香醇四季春茶，回甘無比',
      price: 45,
      count: 10,
    },
    {
      id: 5,
      name: '阿薩姆奶茶',
      description: '阿薩姆紅茶搭配香醇鮮奶',
      price: 50,
      count: 25,
    },
    {
      id: 6,
      name: '檸檬冰茶',
      description: '檸檬與冰茶的清新組合',
      price: 45,
      count: 20,
    },
    {
      id: 7,
      name: '芒果綠茶',
      description: '芒果與綠茶的獨特風味',
      price: 55,
      count: 18,
    },
    {
      id: 8,
      name: '抹茶拿鐵',
      description: '抹茶與鮮奶的絕配',
      price: 60,
      count: 20,
    },
  ])

  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(id);
  }

  const handleSave = (id, name, description, price) => {
    setDrinkData((data) => {
      return data.map((item) => {
        if (item.id === id) {
          return { ...item, name, description, price: Number(price) };
        } else {
          return item;
        }
      });
    });
    setEditingId(null);
  }

  const handleClose = () => {
    setEditingId(null);
  }

  const updateCount = (id, operation) => {
    setDrinkData((data) => {
      return data.map((item) => {
        if (item.id === id) {
          let newCount = operation === "add" ? item.count + 1 : item.count - 1;
          return { ...item, count: newCount < 0 ? 0 : newCount };
        } else {
          return item;
        }
      });
    });
  }


  const drinkItems = drinkData.flatMap((item) => {
    const rows = [
      <tr key={item.id}>
        <td>{item.name}</td>
        <td><small>{item.description}</small></td>
        <td>{item.price}</td>
        <td>
          <button onClick={() => updateCount(item.id, "minus")}>-</button>
          {item.count}
          <button onClick={() => updateCount(item.id, "add")}>+</button>
        </td>
        <td>
          <button className='editNameButton' onClick={() => handleEdit(item.id)}>Edit</button>
        </td>
      </tr>
    ];

    if (editingId === item.id) {
      rows.push(
        <tr key={`edit-${item.id}`}>
          <td colSpan={6}>
            <form onSubmit={(e) => {
              e.preventDefault();
              const name = e.target.drinkName.value;
              const description = e.target.drinkDescription.value;
              const price = e.target.drinkPrice.value;
              handleSave(item.id, name, description, price);
            }}>
              <label htmlFor="drinkName">品項</label>
              <input id="drinkName" type="text" defaultValue={item.name} />
              <label htmlFor="drinkDescription">描述</label>
              <input id="drinkDescription" type="text" defaultValue={item.description} />
              <label htmlFor="drinkPrice">價格</label>
              <input id="drinkPrice" type="number" defaultValue={item.price} />
              <button type="submit">Save</button>
              <button type="button" onClick={handleClose}>Close</button>
            </form>
          </td>
        </tr>
      );
    }

    return rows;
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">品項</th>
            <th scope="col">描述</th>
            <th scope="col">價格</th>
            <th scope="col">庫存</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {drinkItems}
        </tbody>
      </table>
    </> 
  )
}

export default App
