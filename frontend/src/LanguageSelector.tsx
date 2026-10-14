
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (language: "en" | "am") => {
    await i18n.changeLanguage(language);
    localStorage.setItem("appLanguage", language);
  };

  return (
    <div className="language-selector">
      <label htmlFor="app-language">Language</label>

      <select
        id="app-language"
        value={i18n.resolvedLanguage?.startsWith("am") ? "am" : "en"}
        onChange={(event) =>
          void changeLanguage(event.target.value as "en" | "am")
        }
      >
        <option value="en">English</option>
        <option value="am">አማርኛ</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
