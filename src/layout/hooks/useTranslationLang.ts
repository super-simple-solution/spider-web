import { useNav } from "./nav";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { watch, getCurrentInstance } from "vue";

export function useTranslationLang() {
  const { changeTitle } = useNav();
  const { locale, t } = useI18n();
  const route = useRoute();
  const instance =
    getCurrentInstance().appContext.config.globalProperties.$storage;

  function translationCh() {
    instance.locale = { locale: "zh" };
    locale.value = "zh";
  }

  function translationEn() {
    instance.locale = { locale: "en" };
    locale.value = "en";
  }

  watch(
    () => locale.value,
    () => {
      changeTitle(route.meta);
    }
  );
  return {
    t,
    locale,
    translationCh,
    translationEn
  };
}
