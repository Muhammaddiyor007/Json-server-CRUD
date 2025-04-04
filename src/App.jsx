import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [cars, setCars] = useState([]);
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');
  const [editingCarId, setEditingCarId] = useState(null);

  async function fetchCars() {
    const res = await axios.get('http://localhost:5000/cars');
    setCars(res.data);
  }

  useEffect(() => {
    fetchCars();
  }, []);

  const deletecar = (id) => {
    axios.delete(`http://localhost:5000/cars/${id}`).then(() => {
      setCars(cars.filter((car) => car.id !== id));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/cars', { name, model, price, year, image }).then(() => {
      setName('');
      setModel('');
      setPrice('');
      setYear('');
      setImage('');
      fetchCars();
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingCarId) return;

    axios.put(`http://localhost:5000/cars/${editingCarId}`, { name, model, price, year, image }).then(() => {
      setName('');
      setModel('');
      setPrice('');
      setYear('');
      setImage('');
      setEditingCarId(null);
      fetchCars();
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Mashinalar Roʻyxati</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {cars.map((car) => (
          <div key={car.id} className="border border-gray-300 shadow-md rounded-lg p-4 bg-white">
            <img src={car.image || 'https://via.placeholder.com/150'} alt={car.name} className="w-full h-40 object-cover rounded-t-lg" />
            <h2 className="text-xl font-semibold">Name: {car.name}</h2>
            <p className="text-gray-600">Model: {car.model}</p>
            <p className="text-gray-600">Price: {car.price} $</p>
            <p className="text-gray-600">Year: {car.year} yil</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => deletecar(car.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                🗑 O‘chirish
              </button>
              <button
                onClick={() => {
                  setEditingCarId(car.id);
                  setName(car.name);
                  setModel(car.model);
                  setPrice(car.price);
                  setYear(car.year);
                  setImage(car.image);
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                ✏️ Tahrirlash
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 w-full max-w-md">
        <form onSubmit={editingCarId ? handleUpdate : handleSubmit} className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <button type="submit" className={`text-white px-4 py-2 rounded-lg transition ${editingCarId ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}>
            {editingCarId ? "Yangilash" : "Qo‘shish"}
          </button>
          {editingCarId && (
            <button
              type="button"
              onClick={() => {
                setEditingCarId(null);
                setName('');
                setModel('');
                setPrice('');
                setYear('');
                setImage('');
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Bekor qilish
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
