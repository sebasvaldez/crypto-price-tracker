import Pagination from "@mui/material/Pagination";
import { useMediaQuery, Stack } from "@mui/material";

export const PaginationHome = ({ count, page, onChange }) => {
  const isMovile = useMediaQuery("(max-width:600px)");

  return (
    <Stack
      spacing={2}
      sx={{
        "& .MuiPaginationItem-root": {
          color: "whitesmoke",
          "&.Mui-selected": { backgroundColor: "grey", color: "black" },
        },
        marginTop: "30px",
        maxWidth: "90%",
        alignItems: "center",
      }}
    >
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        size={isMovile ? "small" : "large"}
      />
    </Stack>
  );
};
