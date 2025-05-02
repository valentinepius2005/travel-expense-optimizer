import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Form from '../components/Form';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <Form />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

