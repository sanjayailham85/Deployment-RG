import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [captions, setCaptions] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = async (e) => {
    e.preventDefault();
    const data = {
      imageUrl: imageUrl,
      captions: captions,
      createdAt: new Date(),
      updatedAt: new Date(),
      secret: secret,
    };
    try {
      const response = await fetch(
        'https://gallery-app-server.vercel.app/photos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        navigate('/photos');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        {error && <div className="error-msg">{error}</div>}
        <form className="add-form" onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input
            className="submit-btn"
            type="submit"
            value="Submit"
            data-testid="submit"
          />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
