// src/pages/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CommonInput from '../components/CommonInput.jsx';
import CommonButton from '../components/CommonButton.jsx';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    birthday: '',
    password: '',
  });

  const isFormComplete = Object.values(formData).every(
    (value) => value.trim() !== ''
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userEmail', formData.email);
    alert('로그인 성공!');
    navigate('/main');
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br flex items-center justify-center px-4 md:hidden">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-indigo-100">
          <div className="flex items-center justify-center mb-6 gap-2">
            <h2 className="text-3xl md:text-4xl font-head text-gray-800">
              more;ing
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CommonInput
              label="ID"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
            />
            <CommonInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <CommonInput
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-xxxx-xxxx"
            />
            <CommonInput
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <CommonInput
              label="Birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              type="date"
            />
            <CommonInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />

            <CommonButton
              type="submit"
              disabled={!isFormComplete}
              variant="signin"
            >
              회원가입 완료
            </CommonButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
