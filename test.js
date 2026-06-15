import translate from "translate";

(async () => {
    translate.engine = "google";
    const text = await translate("Hello world", "es");
    console.log(text);
})();
