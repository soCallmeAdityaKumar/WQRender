import React from 'react';
import COVER_IMAGE from "../../assets/scene.jpg";

const DetailsPage = () => {
  // Dummy quest data (replace with actual quest data)
  const quest = {
    title: 'Explore Central Park',
    description: 'Embark on a guided tour through the iconic Central Park, discovering its rich history, scenic landmarks, and hidden gems. This tour is perfect for nature enthusiasts, history buffs, and anyone looking to experience the beauty of one of New York City\'s most famous landmarks.',
    category: 'Exploration',
    location: 'New York City, USA',
    duration: '2 hours',
    difficulty: 'Easy',
    prerequisites: 'None',
    rewards: 'Earn 100 points upon completion',
    participantLimit: 20,
    organizer: 'Local Tour Guides Inc.',
    organizerContact: 'tourguides@example.com',
    tasksOverview: [
      'Visit Bethesda Terrace and Fountain',
      'Explore the Ramble and Lake',
      'Admire the Bow Bridge',
      'Discover Strawberry Fields',
    ],
    requirements: [
      'Comfortable walking shoes',
      'Water bottle',
      'Camera or smartphone for capturing memories',
      'Sunscreen and hat (weather-dependent)',
    ],
    instructions: 'Meet at the designated meeting point 15 minutes before the start time. Follow the guide\'s instructions throughout the tour. Be respectful of the park and fellow participants.',
  };

  return (
    <div className="flex p-8 bg-[#28282B]">
      <div className='flex w-full h-full'>
      <div className="w-4/6 p-8 bg-white rounded-lg shadow-md relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center">{quest.title}</h2>
        <p className="text-gray-800 mb-4">{quest.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Quest Details</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Category:</span> {quest.category}</li>
              <li><span className="font-semibold">Location:</span> {quest.location}</li>
              <li><span className="font-semibold">Duration:</span> {quest.duration}</li>
              <li><span className="font-semibold">Difficulty:</span> {quest.difficulty}</li>
              <li><span className="font-semibold">Prerequisites:</span> {quest.prerequisites}</li>
              <li><span className="font-semibold">Rewards:</span> {quest.rewards}</li>
              <li><span className="font-semibold">Participant Limit:</span> {quest.participantLimit}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Organizer Details</h3>
            <ul className="list-disc list-inside">
              <li><span className="font-semibold">Organizer:</span> {quest.organizer}</li>
              <li><span className="font-semibold">Contact:</span> {quest.organizerContact}</li>
            </ul>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Requirements</h3>
          <ul className="list-disc list-inside">
            {quest.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Tasks Overview</h3>
          <ul className="list-disc list-inside">
            {quest.tasksOverview.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Instructions</h3>
          <p className="text-gray-800">{quest.instructions}</p>
        </div>
        <div className="flex justify-center">
          <button className="text-[17px] py-3 px-6 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 hover:scale-105 scale-110">Accept Task</button>
        </div>
      </div>
      <div className="w-2/6 h-full flex flex-col">
          <img
            src={COVER_IMAGE}
            className="w-full h-full object-cover rounded-[25px] p-2 ml-8 hover:scale-105 hover:opacity-90 duration-300"
          />
        </div>
        </div>
    </div>
  );
};

export default DetailsPage;
