import React, { useState } from "react";
import COVER_IMAGE from "../../assets/6345765_24850.jpg";

const UserProfile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [location, setLocation] = useState("New York, USA");
  const [bio, setBio] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
  const [questsCompleted, setQuestsCompleted] = useState(10);
  const [rewardsEarned, setRewardsEarned] = useState(100);
  const [completedQuests, setCompletedQuests] = useState([
    { id: 1, title: "Explore Central Park", category: "Exploration" },
    { id: 2, title: "Cooking Class: Local Cuisine", category: "Culinary" },
  ]);
  const [ongoingQuests, setOngoingQuests] = useState([
    { id: 3, title: "Street Art Tour", category: "Art & Creativity" },
  ]);
  const [questPreferences, setQuestPreferences] = useState([
    "Exploration",
    "Culinary",
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle form submission, e.g., sending data to backend
  };

  return (
    <div className="w-full h-full grid items-start p-10 bg-[#28282B]">
      <div className="w-full h-full bg-[#D8DCDB] flex rounded-[25px]">
        <div className="w-4/5 h-full p-20 bg-[#D8DCDB] rounded-[25px]">
          <h1 className="text-3xl text-[#060606] font-bold mb-5">
            <a href="/">User Profile</a>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xl font-semibold text-gray-800 mt-14"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-black my-2 bg-transparent border-b border-black outline-none focus:outline-none text-[17px]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xl font-semibold text-gray-800 mt-8"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black my-2 bg-transparent border-b border-black outline-none focus:outline-none text-[17px]"
                required
                disabled
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-xl font-semibold text-gray-800 mt-8"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-black my-2 bg-transparent border-b border-black outline-none focus:outline-none text-[17px]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-xl font-semibold text-gray-800 mt-8"
              >
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full text-black my-2 bg-transparent border-b border-black outline-none focus:outline-none text-[17px]"
                rows="4"
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="block text-xl font-semibold text-gray-800 mt-5">
                  Quests Completed
                </span>
                <span className="text-gray-800 text-xl mt-2">{questsCompleted}</span>
              </div>
              <div className="flex flex-col">
                <span className="block text-xl font-semibold text-gray-800 mt-5">
                  Rewards Earned
                </span>
                <span className="text-gray-800 text-xl mt-2">{rewardsEarned}</span>
              </div>
            </div>
            <div>
              <h3 className="block text-xl font-semibold text-gray-800 mb-2 mt-8">Quest History</h3>
              <ul className="divide-y divide-gray-500">
                {completedQuests.map((quest) => (
                  <li key={quest.id} className="py-2">
                    <span className="font-semibold">{quest.title}</span> -{" "}
                    {quest.category}
                  </li>
                ))}
                {ongoingQuests.map((quest) => (
                  <li key={quest.id} className="py-2">
                    <span className="font-semibold">{quest.title}</span> -{" "}
                    {quest.category}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="block text-xl font-semibold text-gray-800 mb-2 mt-5">Quest Preferences</h3>
              <ul className="divide-y divide-gray-500">
                {questPreferences.map((preference, index) => (
                  <li key={index} className="py-2">
                    {preference}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <button
                type="submit"
                className="mt-14 w-full bg-[#060606] rounded-full text-white border-2 border-black font-semibold p-4 my-2 hover:scale-105 hover:opacity-80 duration-300"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>

        <div className="w-1/5 h-full mt-28 mr-14">
          <h1 className="text-4xl text-[#060606] font-bold mb-28 mt-28 items-center flex justify-center">
            Netropolis
          </h1>
          <img
            src={COVER_IMAGE}
            className=" object-cover rounded-[25px] p-4 bg-black"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
