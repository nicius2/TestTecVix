import { Stack, TextField, MenuItem, Checkbox, FormControlLabel, InputAdornment, IconButton } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../components/Text1S";
import { Edit } from "@mui/icons-material";

interface CompanyInfoStepProps {
  formData: {
    companyName: string;
    location: string;
    cnpj: string;
    phone: string;
    sector: string;
    contactEmail: string;
    minConsumption: string;
    discountPercentage: string;
    isPOC: boolean;
  };
  onChange: (field: string, value: string | boolean) => void;
}

export const CompanyInfoStep = ({ formData, onChange }: CompanyInfoStepProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  const sectors = [
    { value: "telecom", label: "Telecom" },
    { value: "tecnologia", label: "Tecnologia" },
    { value: "financeiro", label: "Financeiro" },
    { value: "saude", label: "Saúde" },
    { value: "educacao", label: "Educação" },
    { value: "varejo", label: "Varejo" },
    { value: "industria", label: "Indústria" },
    { value: "servicos", label: "Serviços" },
  ];

  return (
    <Stack spacing={4}>
      {/* Título */}
      <TextRob16Font1S
        sx={{
          color: theme[mode].black,
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "24px",
        }}
      >
        {t("mspRegister.companyInfo", "Informações da empresa MSP")}
      </TextRob16Font1S>

      {/* Linha 1: Nome da empresa, Localização, CNPJ */}
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label={t("mspRegister.companyName", "Nome da empresa MSP")}
          placeholder="Vituax"
          value={formData.companyName}
          onChange={(e) => onChange("companyName", e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" size="small">
                  <Edit sx={{ color: theme[mode].primary, fontSize: 20 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme[mode].mainBackground,
              color: theme[mode].primary,
            },
            "& .MuiInputLabel-root": {
              color: theme[mode].textSecondary,
            },
          }}
        />

        <TextField
          fullWidth
          label={t("mspRegister.location", "Localização")}
          placeholder="Brasil"
          value={formData.location}
          onChange={(e) => onChange("location", e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" size="small">
                  <Edit sx={{ color: theme[mode].primary, fontSize: 20 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme[mode].mainBackground,
              color: theme[mode].primary,
            },
            "& .MuiInputLabel-root": {
              color: theme[mode].textSecondary,
            },
          }}
        />

        <TextField
          fullWidth
          label={t("mspRegister.cnpj", "CNPJ")}
          placeholder="00.000.000/0001-00"
          value={formData.cnpj}
          onChange={(e) => onChange("cnpj", e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" size="small">
                  <Edit sx={{ color: theme[mode].primary, fontSize: 20 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme[mode].mainBackground,
              color: theme[mode].primary,
            },
            "& .MuiInputLabel-root": {
              color: theme[mode].textSecondary,
            },
          }}
        />
      </Stack>

      {/* Linha 2: Telefone, Setor de atuação, E-mail de contato */}
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label={t("mspRegister.phone", "Telefone")}
          placeholder="(00) 00000-0000"
          value={formData.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" size="small">
                  <Edit sx={{ color: theme[mode].primary, fontSize: 20 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme[mode].mainBackground,
              color: theme[mode].primary,
            },
            "& .MuiInputLabel-root": {
              color: theme[mode].textSecondary,
            },
          }}
        />

        <TextField
          fullWidth
          select
          label={t("mspRegister.sector", "Setor de atuação")}
          value={formData.sector}
          onChange={(e) => onChange("sector", e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" size="small">
                  <Edit sx={{ color: theme[mode].primary, fontSize: 20 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme[mode].mainBackground,
              color: theme[mode].primary,
            },
            "& .MuiInputLabel-root": {
              color: theme[mode].textSecondary,
            },
          }}
        >
          {sectors.map((sector) => (
            <MenuItem key={sector.value} value={sector.value}>
              {sector.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          type="email"
          label={t("mspRegister.contactEmail", "E-mail de contato")}
          placeholder="vituax@gmail.com"
          value={formData.contactEmail}
          onChange={(e) => onChange("contactEmail", e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" size="small">
                  <Edit sx={{ color: theme[mode].primary, fontSize: 20 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme[mode].mainBackground,
              color: theme[mode].primary,
            },
            "& .MuiInputLabel-root": {
              color: theme[mode].textSecondary,
            },
          }}
        />
      </Stack>

      {/* Linha 3: Consumo mínimo, Porcentagem de desconto, Checkbox POC */}
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <TextField
          fullWidth
          type="number"
          label={t("mspRegister.minConsumption", "Consumo mínimo para o MSP (em R$)")}
          placeholder="0"
          value={formData.minConsumption}
          onChange={(e) => onChange("minConsumption", e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme[mode].mainBackground,
              color: theme[mode].primary,
            },
            "& .MuiInputLabel-root": {
              color: theme[mode].textSecondary,
            },
          }}
        />

        <TextField
          fullWidth
          type="number"
          label={t("mspRegister.discountPercentage", "Porcentagem de desconto para o MSP")}
          placeholder="0"
          value={formData.discountPercentage}
          onChange={(e) => onChange("discountPercentage", e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme[mode].mainBackground,
              color: theme[mode].primary,
            },
            "& .MuiInputLabel-root": {
              color: theme[mode].textSecondary,
            },
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isPOC}
              onChange={(e) => onChange("isPOC", e.target.checked)}
              sx={{
                color: theme[mode].primary,
                "&.Mui-checked": {
                  color: theme[mode].blue,
                },
              }}
            />
          }
          label={
            <TextRob16Font1S sx={{ color: theme[mode].primary }}>
              {t("mspRegister.pocPhase", "MSP em fase de POC")}
            </TextRob16Font1S>
          }
          sx={{ marginTop: "8px", whiteSpace: "nowrap" }}
        />
      </Stack>
    </Stack>
  );
};