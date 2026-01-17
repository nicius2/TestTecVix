import {
  Stack,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../components/Text1S";
import {
  Visibility,
  VisibilityOff,
  Edit,
  CloudUpload,
} from "@mui/icons-material";
import { useState } from "react";

interface MspAdminStepProps {
  formData: {
    domain: string;
    adminName: string;
    adminEmail: string;
    adminPhone: string;
    adminRole: string;
    username: string;
    logo: File | null;
  };
  onChange: (field: string, value: string | File | null) => void;
}

export const MspAdminStep = ({ formData, onChange }: MspAdminStepProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    onChange("logo", null);
    setLogoPreview(null);
  };

  return (
    <Stack spacing={4}>
      {/* Domínio do MSP */}
      <Box>
        <TextRob16Font1S
          sx={{
            color: theme[mode].black,
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "24px",
            marginBottom: "16px",
          }}
        >
          {t("mspRegister.mspDomain", "Domínio do MSP")}
        </TextRob16Font1S>

        <TextField
          fullWidth
          label={t("mspRegister.domain", "Domínio")}
          placeholder="xx.xxx.xxx"
          value={formData.domain}
          onChange={(e) => onChange("domain", e.target.value)}
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
          }}
        />
      </Box>

      {/* Administrador principal da MSP */}
      <Box>
        <TextRob16Font1S
          sx={{
            color: theme[mode].black,
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "24px",
            marginBottom: "16px",
          }}
        >
          {t("mspRegister.mainAdmin", "Administrador principal da MSP")}
        </TextRob16Font1S>

        <Stack spacing={3}>
          {/* Nome completo e E-mail */}
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label={t("mspRegister.fullName", "Nome completo")}
              placeholder="josé da Silva"
              value={formData.adminName}
              onChange={(e) => onChange("adminName", e.target.value)}
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
              }}
            />

            <TextField
              fullWidth
              type="email"
              label={t("mspRegister.email", "E-mail")}
              placeholder="jose@email.com"
              value={formData.adminEmail}
              onChange={(e) => onChange("adminEmail", e.target.value)}
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
              }}
            />
          </Stack>

          {/* Telefone, Cargo, Senha inicial, Nome de Usuário */}
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label={t("mspRegister.phone", "Telefone")}
              placeholder="(00) 00000-0000"
              value={formData.adminPhone}
              onChange={(e) => onChange("adminPhone", e.target.value)}
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
              }}
            />

            <TextField
              fullWidth
              select
              label={t("mspRegister.role", "Cargo")}
              value={formData.adminRole}
              onChange={(e) => onChange("adminRole", e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme[mode].mainBackground,
                  color: theme[mode].primary,
                },
              }}
            >
              <MenuItem value="Administrador">
                {t("mspRegister.administrator", "Administrador")}
              </MenuItem>
              <MenuItem value="Gerente">
                {t("mspRegister.manager", "Gerente")}
              </MenuItem>
              <MenuItem value="Operador">
                {t("mspRegister.operator", "Operador")}
              </MenuItem>
            </TextField>

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label={t("mspRegister.initialPassword", "Senha inicial")}
              placeholder={t(
                "mspRegister.generatedByEmail",
                "Gerada e enviada por e-mail",
              )}
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ color: theme[mode].primary }} />
                      ) : (
                        <Visibility sx={{ color: theme[mode].primary }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme[mode].mainBackground,
                  color: theme[mode].primary,
                },
              }}
            />

            <TextField
              fullWidth
              label={t("mspRegister.username", "Nome de Usuário")}
              placeholder={t("mspRegister.username", "Nome de Usuário")}
              value={formData.username}
              onChange={(e) => onChange("username", e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme[mode].mainBackground,
                  color: theme[mode].primary,
                },
              }}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Logotipo da empresa */}
      <Box>
        <TextRob16Font1S
          sx={{
            color: theme[mode].black,
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "24px",
            marginBottom: "8px",
          }}
        >
          {t("mspRegister.companyLogo", "Logotipo da empresa")}
        </TextRob16Font1S>

        <TextRob16Font1S
          sx={{
            color: theme[mode].alternativeDarkText,
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          {t(
            "mspRegister.logoNote",
            "O logo ficará visível no sistema e poderá ser alterado mais tarde.",
          )}
        </TextRob16Font1S>

        <Stack direction="row" spacing={3} alignItems="flex-start">
          {/* Área de upload/preview */}
          <Box
            sx={{
              width: "280px",
              height: "200px",
              border: `2px dashed ${theme[mode].black}`,
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme[mode].mainBackground,
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                borderColor: theme[mode].primary,
              },
            }}
            component="label"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <>
                <CloudUpload
                  sx={{ fontSize: 48, color: theme[mode].alternativeDarkText, mb: 1 }}
                />
                <TextRob16Font1S
                  sx={{ color: theme[mode].alternativeDarkText, textAlign: "center" }}
                >
                  {t(
                    "mspRegister.clickToUpload",
                    "Clique aqui para fazer upload do seu logo",
                  )}
                </TextRob16Font1S>
              </>
            )}
            <input
              type="file"
              hidden
              accept="image/svg+xml,image/png,image/jpeg,image/gif,image/webp"
              onChange={handleLogoUpload}
            />
          </Box>

          {/* Preview e informações */}
          {logoPreview && (
            <Stack spacing={1}>
              <Box
                sx={{
                  width: "80px",
                  height: "80px",
                  border: `1px solid ${theme[mode].dark}`,
                  borderRadius: "4px",
                  backgroundColor: theme[mode].blue,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                }}
              >
                <img
                  src={logoPreview}
                  alt="Logo preview small"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              <Box>
                <TextRob16Font1S
                  component="button"
                  onClick={() =>
                    document.querySelector('input[type="file"]')?.click()
                  }
                  sx={{
                    color: theme[mode].blue,
                    textDecoration: "underline",
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                    padding: 0,
                    fontSize: "14px",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  {t("mspRegister.changeLogo", "Alterar logo")}
                </TextRob16Font1S>

                <TextRob16Font1S
                  component="button"
                  onClick={handleRemoveLogo}
                  sx={{
                    color: theme[mode].blue,
                    textDecoration: "underline",
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                    padding: 0,
                    fontSize: "14px",
                    display: "block",
                  }}
                >
                  {t("mspRegister.removeLogo", "Remover logo")}
                </TextRob16Font1S>
              </Box>

              <Box sx={{ marginTop: "16px" }}>
                <TextRob16Font1S
                  sx={{ fontSize: "12px", color: theme[mode].textSecondary }}
                >
                  • {t("mspRegister.logoSize", "Padrão: 165x50px")}
                </TextRob16Font1S>
                <TextRob16Font1S
                  sx={{ fontSize: "12px", color: theme[mode].textSecondary }}
                >
                  • {t("mspRegister.maxSize", "Tamanho: 50mb")}
                </TextRob16Font1S>
                <TextRob16Font1S
                  sx={{ fontSize: "12px", color: theme[mode].textSecondary }}
                >
                  •{" "}
                  {t(
                    "mspRegister.formats",
                    "Formatos: svg, png, jpg, gif, webp",
                  )}
                </TextRob16Font1S>
              </Box>
            </Stack>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};
