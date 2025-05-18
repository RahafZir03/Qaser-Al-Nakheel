/* eslint-disable react/prop-types */
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded({
  count = 10,
  page,
  onChange,
  theme = "light",
}) {
  const handlePageChange = (event, value) => {
    if (onChange) {
      onChange(event, value);
    }
  };

  const isDark = theme === "dark";

  return (
    <div className="mt-9 flex justify-center">
      <Stack spacing={2}>
        <Pagination
          count={count}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          size="large"
          sx={{
            ".MuiPaginationItem-root": {
              color: isDark ? "#F3F4F6" : "#1F2937", 
            },
            ".MuiPaginationItem-outlined": {
              borderColor: isDark ? "#FFD700" : "#FFD700",
              backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
              "&:hover": {
                backgroundColor: "#FFD700",
                color: "#000000",
              },
            },
            ".MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#FFD700",
              color: "#000000",
              borderColor: "#FFD700",
              "&:hover": {
                backgroundColor: "#FACC15",
              },
            },
          }}
        />
      </Stack>
    </div>
  );
}
