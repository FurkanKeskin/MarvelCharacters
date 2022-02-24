import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import { BASE_URL, URL_SUFFIX } from '../../constants';
import "./main.scss";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [allCharacters, setAllCharacters] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [limit] = useState(30);
  const [totalPages, setTotalPages] = useState(null);
  const [lastElement, setLastElement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(`${BASE_URL}${URL_SUFFIX}&limit=1`);
        console.log("TOTOL", response.data.total)
        setTotalPages(response.data.total / limit)
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  const callCharacter = async () => {
    setLoading(true);
    let { data: response } = await axios.get(
      `${BASE_URL}${URL_SUFFIX}&limit=${limit}&offset=${pageNum * limit}`
    );

    console.log("DATTA", response.data.results)
    let all = new Set([...allCharacters, ...response.data.results]);
    setAllCharacters([...all]);
    setLoading(false);
  };

  useEffect(() => {
    if (pageNum <= totalPages) {
      callCharacter();
    }
  }, [pageNum]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <div>
      <h1>All characters</h1>

      <div className="card-list">
        {allCharacters.length > 0 &&
          allCharacters.map((character, i) => {
            return i === allCharacters.length - 1 &&
              !loading &&
              pageNum <= totalPages ? (
              <div
                key={`${character.id}`}
                ref={setLastElement}
              >
                <CharacterCard data={character} />
              </div>
            ) : (
              <CharacterCard
                data={character}
                key={`${character.id}`}
              />
            );
          })}
      </div>
      {loading && <p>loading...</p>}

      {pageNum - 1 === totalPages && (
        <p>Furkan</p>
      )}
    </div>
  );
};

export default Main;