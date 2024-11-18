import { useState, useEffect } from 'react';
import { FaRuler, FaWater, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BookingSwim = () => {
  const [swimType, setSwimType] = useState('children');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const swimOptions = {
    children: {
      label: 'Hồ bơi trẻ em',
      description: 'Hồ bơi dành cho trẻ em dưới 18 tuổi',
      dimensions: {
        length: '50 m',
        width: '30 m',
        depth: '50cm - 1m',
      },
    },
    adult: {
      label: 'Hồ bơi người lớn',
      description: 'Hồ bơi dành cho người lớn với độ tuổi từ 18 trở lên',
      dimensions: {
        length: '100 m',
        width: '50 m',
        depth: '1.5m - 2m',
      },
    },
    professional: {
      label: 'Hồ bơi chuyên nghiệp',
      description: 'Hồ bơi chuyên thiết kế cho các vận động viên chuyên nghiệp',
      dimensions: {
        length: '200 m',
        width: '100 m',
        depth: '3m',
      },
    },
  };

  const timeSlots = ['8h - 10h', '10h - 12h', '12h - 2h', '2h - 4h', '4h - 6h'];

  const equipmentOptions = [
    { name: 'Phao bơi nhỏ', price: 5000 },
    { name: 'Phao bơi lớn', price: 10000 },
    { name: 'Phao bơi 2 người', price: 15000 },
    { name: 'Súng bắn nước nhỏ', price: 3000 },
    { name: 'Súng bắn nước lớn', price: 6000 },
    { name: 'Mắt kính nhỏ', price: 2000 },
    { name: 'Mắt kính lớn', price: 4000 },
    { name: 'Mũ đội đầu nhỏ', price: 3000 },
    { name: 'Mũ đội đầu lớn', price: 5000 },
    { name: 'Chân đeo ván', price: 7000 },
    { name: 'Nút bịt tai', price: 1000 },
    { name: 'Tủ đồ', price: 20000 },
  ];

  const navigate = useNavigate();

  const costPerSlot = {
    children: 10000,
    adult: 20000,
    professional: 50000,
  };

  const calculateTotalCost = () => {
    const slotsCost = selectedSlots.length * costPerSlot[swimType];
    const equipmentCost = selectedEquipment.reduce((total, item) => total + item.price, 0);
    setTotalCost(slotsCost + equipmentCost);
  };

  useEffect(() => {
    calculateTotalCost();
  }, [swimType, selectedSlots, selectedEquipment]);

  const handleSwimTypeChange = (e) => {
    setSwimType(e.target.value);
  };

  const handleSlotChange = (slot) => {
    const updatedSlots = selectedSlots.includes(slot)
      ? selectedSlots.filter((s) => s !== slot)
      : [...selectedSlots, slot];
    setSelectedSlots(updatedSlots);
  };

  const handleEquipmentChange = (equipment) => {
    const isAlreadySelected = selectedEquipment.some((e) => e.name === equipment.name);
    const updatedEquipment = isAlreadySelected
      ? selectedEquipment.filter((e) => e.name !== equipment.name)
      : [...selectedEquipment, equipment];
    setSelectedEquipment(updatedEquipment);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/booking-detail', {
        state: {
            name,
            phone,
            swimType,
            selectedSlots,
            totalCost
        }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-100 to-gray-100 rounded-xl shadow-2xl mt-10">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">Đặt Vé Hồ Bơi</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block mb-4 text-lg font-semibold text-gray-700">Chọn Loại Hồ Bơi:</label>
          <div className="flex flex-col space-y-4">
            {Object.entries(swimOptions).map(([key, { label, description, dimensions }]) => (
              <div
                key={key}
                className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                  swimType === key ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                }`}
                onClick={() => handleSwimTypeChange({ target: { value: key } })}
              >
                <h3 className="text-xl font-bold text-blue-600">{label}</h3>
                <p className="text-gray-500">{description}</p>
                <div className="flex space-x-4 mt-2">
                  <span className="flex items-center">
                    <FaRuler className="mr-1 text-blue-500" />
                    <span>{`Chiều dài: ${dimensions.length}`}</span>
                  </span>
                  <span className="flex items-center">
                    <FaRuler className="mr-1 text-blue-500" />
                    <span>{`Chiều rộng: ${dimensions.width}`}</span>
                  </span>
                  <span className="flex items-center">
                    <FaWater className="mr-1 text-blue-500" />
                    <span>{`Độ sâu: ${dimensions.depth}`}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block mb-4 text-lg font-semibold text-gray-700">Chọn Khung Giờ:</label>
          <div className="grid grid-cols-2 gap-4">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={`flex items-center justify-center p-3 rounded-lg border-2 transition ${
                  selectedSlots.includes(slot) ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                }`}
                onClick={() => handleSlotChange(slot)}
                role="button"
              >
                <FaClock className="mr-2 text-blue-500" />
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block mb-4 text-lg font-semibold text-gray-700">Chọn Thiết Bị:</label>
          <div className="grid grid-cols-2 gap-4">
            {equipmentOptions.map(({ name, price }) => (
              <label key={name} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedEquipment.some((e) => e.name === name)}
                  onChange={() => handleEquipmentChange({ name, price })}
                  className="mr-2"
                />
                <span>{name} - {price.toLocaleString()} VND</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="name" className="block mb-4 text-lg font-semibold text-gray-700">Tên Người Đặt:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-8">
          <label htmlFor="phone" className="block mb-4 text-lg font-semibold text-gray-700">Số Điện Thoại:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="mb-8 text-lg font-semibold text-center">
          <p>
            Tổng Chi Phí: <strong className="text-green-600">{totalCost.toLocaleString()} VND</strong>
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
        >
          Xác Nhận Đặt Vé
        </button>
      </form>
    </div>
  );
};

export default BookingSwim;