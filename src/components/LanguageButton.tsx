import { LanguageContext } from "../provider/LanguageProvider";
import { useContext } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

function LanguageButton() {
    const context = useContext(LanguageContext);
    const { t } = useTranslation();

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={() => {
                console.log(context?.language);
                context?.changeLanguage(context?.language === "en" ? "zh" : "en");
            }}
        >
            {t("changeLanguage")}
        </Button>
    );
};

export default LanguageButton;