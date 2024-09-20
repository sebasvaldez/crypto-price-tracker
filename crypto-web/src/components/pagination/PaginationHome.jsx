import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const PaginationHome = ({count, page, onChange}) => {


 
  return (
    <Stack spacing={2}
    sx={{ justifyContent: "center", marginTop: "2rem",alignItems: "center" }}
    >
      <Pagination count={count} page={page} onChange={onChange} />
    </Stack>
  );
};
