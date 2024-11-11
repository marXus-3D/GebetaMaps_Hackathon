import { useState } from "react";

function EstablishmentPopup({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { name, type, rating, comment });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add Establishment</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Establishment Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="restaurant">Restaurant</option>
            <option value="cafe">Cafe</option>
            <option value="bar">Bar</option>
            <option value="shop">Shop</option>
            <option value="other">Other</option>
          </select>
          <div className="mb-4">
            <label className="block mb-2">Rating:</label>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    rating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            rows="3"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mb-4"
          >
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-700 p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EstablishmentPopup;
