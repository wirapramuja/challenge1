/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import '../search/shipping.css';

import React, { useState, useEffect, useRef } from 'react';

type Province = {
  province_id: string;
  province: string;
};

type City = {
  city_id: string;
  city_name: string;
};

type Courier = {
  code: string;
  name: string;
};

const Shipping = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [couriers] = useState<Courier[]>([
    { code: 'jne', name: 'JNE' },
    { code: 'pos', name: 'POS Indonesia' },
    { code: 'tiki', name: 'TIKI' }
  ]);

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);
  const [weight, setWeight] = useState<number | ''>('');
  const [shippingCost, setShippingCost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Fetch Provinces
  const fetchProvinces = async () => {
    try {
      const response = await fetch('api/province');
      if (!response.ok) {
        throw new Error('Failed to fetch provinces');
      }
      const data = await response.json();
      setProvinces(data.rajaongkir.results);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  // Fetch data cities berdasarkan province_id
  const fetchCities = async (provinceId: string) => {
    try {
      const response = await fetch(`/api/city?province_id=${provinceId}`); // Panggil endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }
      const data = await response.json();
      const cityResults = data.rajaongkir.results;
      setCities(data.rajaongkir.results); // Simpan data ke state

      if (cityResults.length > 0) {
        setSelectedCity(cityResults[0].city_id);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  // Fetch Shipping Cost
  const fetchShippingCost = async () => {
    if (!selectedCity || !selectedCourier || !weight) {
      setError('Please fill in all fields.');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const shippingData = {
        origin: selectedProvince,
        destination: selectedCity,
        weight: Number(weight),
        courier: selectedCourier
      };
      console.log('Payload being sent:', shippingData); // Log parameter yang dikirim

      const response = await fetch('/api/cost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shippingData)
      });

      console.log('Response status:', response.status); // Log status respons

      if (!response.ok) {
        throw new Error('Failed to fetch shipping cost');
      }

      const data = await response.json();
      setShippingCost(data.rajaongkir.results);
    } catch (error: any) {
      console.error('Error fetching shipping cost:', error);
      setError('Failed to fetch shipping cost.');
    } finally {
      setIsLoading(false); // Set loading false setelah selesai
    }
  };

  // Scroll to the results section after shippingCost is updated
  useEffect(() => {
    if (shippingCost && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [shippingCost]); // Trigger this effect when shippingCost changes

  // Panggil fetchProvinces saat komponen dimuat
  useEffect(() => {
    fetchProvinces();
  }, []);

  // Fetch cities setiap kali province berubah
  useEffect(() => {
    if (selectedProvince) {
      fetchCities(selectedProvince);
    } else {
      setCities([]); // Reset cities jika tidak ada province yang dipilih
    }
  }, [selectedProvince]);

  const handleSelectProvince = (value: string) => {
    setSelectedProvince(value);
  };

  return (
    <section className="shipping-section">
      <h1 className="section-title">Discover Shipping Costs Easily</h1>
      <p className="section-description">
        Select a province, city, and get the cost of shipping instantly!
      </p>
      <div className="dropdown-container">
        <div className="dropdown">
          <label htmlFor="province" className="dropdown-label">
            Province
          </label>
          <select
            id="province"
            className="dropdown-select"
            value={selectedProvince || ''}
            onChange={(e) => handleSelectProvince(e.target.value)}
          >
            <option value="">Select Province</option>
            {provinces.map((province: any) => (
              <option key={province.province_id} value={province.province_id}>
                {province.province}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown">
          <label htmlFor="city" className="dropdown-label">
            City
          </label>
          <select
            id="city"
            className="dropdown-select"
            value={selectedCity || ''}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city: any) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown">
          <label htmlFor="courier" className="dropdown-label">
            Courier
          </label>
          <select
            id="courier"
            className="dropdown-select"
            value={selectedCourier || ''}
            onChange={(e) => setSelectedCourier(e.target.value)}
          >
            <option value="">Select Courier</option>
            {couriers.map((courier) => (
              <option key={courier.code} value={courier.code}>
                {courier.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="weight" className="input-label">
            Weight (grams)
          </label>
          <input
            type="number"
            id="weight"
            className="input-field"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            placeholder="Enter 100-30.000 gram"
          />
        </div>

        <button
          className="submit-button"
          onClick={fetchShippingCost}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="spinner"></div> // Tampilkan spinner saat loading
          ) : (
            'Calculate' // Tampilkan teks "Calculate" jika tidak loading
          )}
        </button>
      </div>
      {/* Menampilkan pesan error */}
      {error && <div className="error-message">{error}</div>}{' '}
      {shippingCost && (
        <div ref={resultsRef} className="results-container">
          <h2 className="results-title">Shipping Cost Results</h2>
          {shippingCost.map((courier: any) => (
            <div key={courier.code} className="courier-container">
              <h3 className="courier-name">{courier.name}</h3>
              {courier.costs.length > 0 ? (
                <ul className="cost-list">
                  {courier.costs.map((cost: any, index: number) => (
                    <li key={index} className="cost-item">
                      <h4 className="service-name">{cost.service}</h4>
                      <p className="service-description">{cost.description}</p>
                      <div className="cost-details">
                        <span className="cost-value">
                          {new Intl.NumberFormat().format(cost.cost[0].value)}{' '}
                          IDR
                        </span>
                        <span className="estimated-time">
                          Estimasi waktu: {cost.cost[0].etd} hari
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="paragraf">No shipping options available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Shipping;
