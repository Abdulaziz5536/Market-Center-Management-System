
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: "en" | "am") => {
    void i18n.changeLanguage(language);
  };

  return (
    <div className="language-selector">
      <label style={{marginLeft:5}} htmlFor="app-language">Language</label>

      <select
        id="app-language"
        value={i18n.resolvedLanguage?.startsWith("am") ? "am" : "en"}
        onChange={(event) =>
          changeLanguage(event.target.value as "en" | "am")
        }
      >
        <div className="option-values">
           <option style={{fontSize:10}} value="en">English</option>
           <option style={{fontSize:10}} value="am">አማርኛ</option>
        </div>
       
      </select>
    </div>
  );
};

export default LanguageSelector;
