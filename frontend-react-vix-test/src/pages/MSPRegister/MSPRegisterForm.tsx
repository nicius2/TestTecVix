import { Stack, Button } from "@mui/material";
// import { ScreenFullPage } from "../../components/ScreenFullPage"; // Removed
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CompanyInfoStep } from "./CompanyInfoStep";
import { MspAdminStep } from "./MspAdminStep";
import { api } from "../../services/api";

interface FormData {
  // Step 1 - Company Info
  companyName: string;
  location: string;
  cnpj: string;
  phone: string;
  sector: string;
  contactEmail: string;
  minConsumption: string;
  discountPercentage: string;
  isPOC: boolean;
  
  // Step 2 - Admin Info
  domain: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  adminRole: string;
  username: string;
  logo: File | null;
}

interface MSPRegisterFormProps {
    onCancel: () => void;
}

export const MSPRegisterForm = ({ onCancel }: MSPRegisterFormProps) => { 
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  
  const [formData, setFormData] = useState<FormData>({
    // Step 1
    companyName: "",
    location: "",
    cnpj: "",
    phone: "",
    sector: "",
    contactEmail: "",
    minConsumption: "",
    discountPercentage: "",
    isPOC: false,
    
    // Step 2
    domain: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
    adminRole: "Administrador",
    username: "",
    logo: null,
  });

  const handleCancelRegistration = () => {
    onCancel();
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validar step 1
      if (!formData.companyName || !formData.location || !formData.cnpj || !formData.sector || !formData.contactEmail) {
        alert(t("mspRegister.fillRequired", "Por favor, preencha todos os campos obrigatórios"));
        return;
      }
      setActiveStep(1);
    } else {
      // Submit form
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const handleChange = (field: string, value: string | boolean | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validar step 2
    if (!formData.domain || !formData.adminName || !formData.adminEmail) {
      alert(t("mspRegister.fillRequired", "Por favor, preencha todos os campos obrigatórios"));
      return;
    }

    console.log("Submitting form:", formData);

    const payload = {
      brandName: formData.companyName,
      location: formData.location,
      cnpj: formData.cnpj,
      smsContact: formData.phone,
      setorName: formData.sector,
      emailContact: formData.contactEmail,
      minConsumption: Number(formData.minConsumption),
      discountRate: Number(formData.discountPercentage),
      isPoc: formData.isPOC,
      domain: formData.domain,
      brandLogo: null, // Temporarily set to null, requires file upload logic
    };

    try {
      const response = await api.post('/brand-master', payload);
      if (response.error) {
        alert(t("mspRegister.error", `Erro ao cadastrar MSP: ${response.message}`));
      } else {
        console.log('MSP registered:', response.data);
        alert(t("mspRegister.success", "MSP cadastrado com sucesso!"));
        handleCancelRegistration(); // Reset and go back to table
      }
    } catch (error) {
      console.error('Error registering MSP:', error);
      alert(t("mspRegister.error", "Erro ao cadastrar MSP. Verifique o console para mais detalhes."));
    }
  };

  const handleClear = () => {
    if (window.confirm(t("mspRegister.confirmClear", "Tem certeza que deseja limpar todos os dados?"))) {
        setFormData({
            companyName: "",
            location: "",
            cnpj: "",
            phone: "",
            sector: "",
            contactEmail: "",
            minConsumption: "",
            discountPercentage: "",
            isPOC: false,
            domain: "",
            adminName: "",
            adminEmail: "",
            adminPhone: "",
            adminRole: "Administrador",
            username: "",
            logo: null,
          });
    }
  };

  return (
    // Removed ScreenFullPage wrapper
    <Stack
          sx={{
            background: theme[mode].mainBackground,
            borderRadius: "16px",
            width: "100%",
            padding: "24px",
            boxSizing: "border-box",
            gap: "40px",
          }}
        >
          {/* Renderizar step atual */}
          {activeStep === 0 && (
            <CompanyInfoStep formData={formData} onChange={handleChange} />
          )}
          
          {activeStep === 1 && (
            <MspAdminStep formData={formData} onChange={handleChange} />
          )}

          {/* Botões de ação */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: activeStep === 0 ? "flex-end" : "space-between",
              marginTop: "24px",
            }}
          >
            {activeStep === 1 && (
              <Button
                variant="text"
                onClick={handleClear}
                sx={{
                  color: theme[mode].textSecondary,
                  textDecoration: "underline",
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                {t("mspRegister.clear", "Limpar")}
              </Button>
            )}

            <Stack direction="row" spacing={2}>
              {activeStep === 1 && (
                <Button variant="outlined" onClick={handleBack}>
                  {t("mspRegister.back", "Voltar")}
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  backgroundColor: theme[mode].blue,
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: theme[mode].blue,
                    opacity: 0.9,
                  },
                }}
              >
                {activeStep === 0
                  ? t("mspRegister.continue", "Continuar")
                  : t("mspRegister.confirmRegister", "Confirmar cadastro")}
              </Button>

              <Button
                variant="outlined"
                onClick={handleCancelRegistration}
                sx={{
                  borderColor: theme[mode].border,
                  color: theme[mode].primary,
                }}
              >
                {t("mspRegister.cancel", activeStep === 0 ? "Cancelar" : "Voltar")}
              </Button>
            </Stack>
          </Stack>
        </Stack>
  );
};