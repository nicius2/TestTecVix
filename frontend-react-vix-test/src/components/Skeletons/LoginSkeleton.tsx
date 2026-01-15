import { Stack, Skeleton, Box } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { useWindowSize } from "../../hooks/useWindowSize";

export const LoginSkeleton = () => {
  const { mode } = useZTheme();
  const { width, height } = useWindowSize();

  return (
    <Stack
      sx={{
        height,
        width,
        overflowY: "auto",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        background:
          mode === "light"
            ? "linear-gradient(117deg, #FFF 39.68%, var(--c1, #F9F9F9) 100%);"
            : "linear-gradient(117deg, var(--c6, #252930) 39.61%, var(--alt-gray, #181B20) 100%);",
      }}
    >
      {/* Login box */}
      <Stack
        sx={{
          width: "100%",
          padding: "16px",
          maxWidth: "700px",
          height: "100%",
          alignItems: "center",
          justifyContent: "center", // Center vertically like content might be
        }}
      >
        <Stack
          sx={{
            width: "100%",
            maxWidth: "482px", // Match MainLoginForm max-width
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
          }}
        >
          {/* Switch mode and languages placeholder */}
          <Stack
            sx={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="circular" width={24} height={24} />
          </Stack>

          {/* Logo placeholder */}
          <Stack sx={{ width: "100%", mb: 3 }}>
            <Skeleton variant="rectangular" width={120} height={40} />
          </Stack>

          {/* Form Title */}
          <Stack sx={{ width: "100%", mb: 3 }}>
            <Skeleton variant="text" width={200} height={40} />
          </Stack>

          {/* Input 1 (Email) */}
          <Stack sx={{ width: "100%", mb: 2 }}>
            <Skeleton variant="text" width={50} height={20} sx={{ mb: 0.5 }} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={48}
              sx={{ borderRadius: "12px" }}
            />
          </Stack>

          {/* Input 2 (Password) */}
          <Stack sx={{ width: "100%", mb: 2 }}>
            <Skeleton variant="text" width={50} height={20} sx={{ mb: 0.5 }} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={48}
              sx={{ borderRadius: "12px" }}
            />
          </Stack>

          {/* Keep logged in and forgot password */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%", mb: 3 }}
          >
            <Stack direction="row" gap={1} alignItems="center">
              <Skeleton variant="rectangular" width={20} height={20} />
              <Skeleton variant="text" width={100} height={20} />
            </Stack>
            <Skeleton variant="text" width={120} height={20} />
          </Stack>

          {/* Button */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={48}
            sx={{ borderRadius: "12px", mb: 3 }}
          />

          {/* Footer links */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              gap: 2,
              width: "100%",
            }}
          >
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="text" width={80} height={20} />
          </Box>
        </Stack>
      </Stack>

      {/* Carousel */}
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: "900px",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
          display: "flex",
          "@media (max-width: 1000px)": {
            display: "none",
          },
        }}
      >
        {/* Carousel Container Skeleton */}
        <Stack
          sx={{
            borderRadius: "32px",
            // Use a subtle background for the skeleton container or match the gradient
            background:
              "linear-gradient(153deg, var(--c5, #474B54) 0%, var(--c7, #0F1216) 32%)",
            width: "100%",
            maxWidth: "678px",
            height: "80%", // Approximate height
            maxHeight: "98vh",
            overflow: "hidden",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Content inside carousel */}
          <Skeleton
            variant="rectangular"
            width="80%"
            height="60%"
            sx={{ borderRadius: "16px", bgcolor: "rgba(255,255,255,0.1)" }}
          />
          {/* Pagination dots */}
          <Stack
            direction="row"
            gap={1}
            sx={{ position: "absolute", bottom: "32px" }}
          >
            <Skeleton
              variant="circular"
              width={12}
              height={12}
              sx={{ bgcolor: "rgba(255,255,255,0.3)" }}
            />
            <Skeleton
              variant="circular"
              width={12}
              height={12}
              sx={{ bgcolor: "rgba(255,255,255,0.3)" }}
            />
            <Skeleton
              variant="circular"
              width={12}
              height={12}
              sx={{ bgcolor: "rgba(255,255,255,0.3)" }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
