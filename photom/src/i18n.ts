import translationsEnglishPath from '../static/locales/en/translations.ftl'
import translationsPortuguesePath from '../static/locales/pt/translations.ftl'

const translations: { [key in string]: string } = {
  en: translationsEnglishPath,
  pt: translationsPortuguesePath,
}

const loadPath = (lng: string) => (
  lng in translations
    ? translations[lng]
    : translations.en
)

export { loadPath }
