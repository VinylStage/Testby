import React from 'react';
import Layout from '../../components/Layout';

const ContactUs =() => {
    
    return (
        <>
        <div>
            <h1 className="text-xl font-bold mt-4">Contact Us</h1>
            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input type="text" id="name" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" id="email" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                    <input type="text" id="title" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea id="description" className="border border-gray-300 rounded-md px-3 py-2 w-full" rows="4"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="mobile" className="block text-gray-700 font-bold mb-2">Mobile</label>
                    <input type="tel" id="mobile" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>
        </div>
        </>
    );
};

const Contact = () => {
    return (
        <Layout>
        <div>
            <h1>Contact Page</h1>
            {/* Add your beautiful page content here */}
            <div className="bg-gray-200 p-4 rounded-md">
                <h2 className="text-xl font-bold mb-2">Contact Information</h2>
                <p className="text-gray-700">Phone: 123-456-7890</p>
                <p className="text-gray-700">Email: example@example.com</p>
            </div>
            <ContactUs/>
        </div>
        </Layout>
    );
};

export default Contact;