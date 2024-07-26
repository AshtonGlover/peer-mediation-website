import { useEffect, useState } from "react";
import { addWord, clearUser, getWords } from "../utils/api";
import { getLoginCookie } from "../utils/cookie";
import "../styles/AboutUs.css"

export default function FirestoreDemo() {
  const [words, setWords] = useState<string[]>([]);

  const USER_ID = getLoginCookie() || "";

  useEffect(() => {
    getWords().then((data) => {
      setWords(data.words);
    });
  }, []);

  const addFavoriteWord = async (newWord: string) => {
    // - update the client words state to include the new word
    setWords([...words, newWord]);
    // - query the backend to add the new word to the database
    await addWord(newWord);
  };

  return (
    <div className="firestore-demo">
      {/* adding new words: */}
      <p className = "about-us-text"> We are a club at Clover High School The circumstances behind Zambada and Guzman Lopez being taken into custody were not immediately clear as of Thursday evening, however, the men were arrested in an operation that ended on U.S. soil.

They were placed in handcuffs by FBI agents during an operation culminating at an airstrip not far from El Paso.

"The arrest of Ismael Zambada García, better known as 'El Mayo,' one of the alleged founders and leaders of the Sinaloa Cartel, strikes at the heart of the cartel that is responsible for the majority of drugs, including fentanyl and methamphetamine, killing Americans from coast to coast. El Mayo is one of DEA's most wanted fugitives and he is in custody tonight and will soon face justice in a U.S. court of law," said Drug Enforcement Administration Administrator Anne Milgram. that runs alksfjasdklfjvcewk;slfcjeawklfcjerawsklfcjawe;kllkdjsaf;klsdjfads;kljfdsa;klfjasdkl;fjads;aaaaaaaaaaaaaaaaaaaaaaaaa s;kfljsad;fkljasdf;klsjadf;kladjsf;lksdjfk;ldsjfkl;asdjfdls;kjf;lsdkjfsa;lkdsjflksdjf;sakljdfsa;klfdjsal;kfjas;lkfjsal;kfjasd;fklasdjf;lksajdfkl;asdjfa;lskdfjask;ldfjasdkl;afjsa;lkdfjs;lkdfjadsl;kfjasdlk;fjadsklfjadskl;fjads;klfjads;klfjsadlfjasewk;lfjsadl;k</p>
      <label htmlFor="new-word">Add a favorite word:</label>
      <input aria-label="word-input" id="new-word" type="text" />
      <button
        aria-label="add-word-button"
        onClick={() => {
          const newWord = (
            document.getElementById("new-word") as HTMLInputElement
          ).value;
          addFavoriteWord(newWord);
        }}
      >
        Add ✈️
      </button>
      {/* Clear words button */}
      <button
        onClick={async () => {
          // - query the backend to clear the user's words
          setWords([]);
          // - clear the user's words in the database
          await clearUser();
        }}
      >
        Clear words
      </button>

      {/* list of words from db: */}
      <p>
        <i aria-label="user-header">Favorite words for user {USER_ID}:</i>
      </p>
      <ul aria-label="favorite-words">
        {words.map((word, index) => (
          <p key={index} aria-label="word">
            {word}
          </p>
        ))}
      </ul>
    </div>
  );
}
