import { useEffect, useState } from "react";
import app, { db, auth } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

function ReviewPopUp({ isOpen, onClose, target, user }) {
  const [name, setName] = useState(target != null ? target.name : "");
  const [type, setType] = useState(target != null ? target.type : "");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (target) {
      setName(target.name);
      setType(target.type);
    }
  }, [target]);

  function generateRandomId() {
    return "id-" + Math.random().toString(36).substr(2, 9);
  }

  const submitReview = async (review) => {
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        id: target.id,
        name: user.name,
        uid: user.uid,
        comment: review.comment,
        rating: review.rating,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = generateRandomId();
    console.log("Submitted:", { name, type, rating, comment, images }, user);
    submitReview({ id, name, type, rating, comment, images });
    onClose();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 6) {
      alert("You can only upload up to 6 images");
      return;
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-h-screen overflow-y-auto relative">
        <h2 className="text-2xl font-bold mb-4">Add Review</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Establishment Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            readOnly
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            disabled
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
          <div className="mb-4">
            <label className="block mb-2">Upload Images (max 6):</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mb-4"
          >
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="aspect-square absolute right-2 top-2 shadow-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            fill="#101010"
            width="14px"
            height="14px"
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ReviewPopUp;
