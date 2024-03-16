import { LanguageContext } from "../provider/LanguageProvider";
import { useContext, useEffect } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

function LanguageButton() {
    const context = useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={() => {
                context?.changeLanguage(context?.language === "en" ? "zh" : "en");
            }}
        >
            {t("changeLanguage")}
        </Button>
    );
};

export default LanguageButton;