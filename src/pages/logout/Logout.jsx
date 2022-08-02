import { useLogout } from "../../hooks/useLogout";
import Button from "@mui/material/Button";

const Logout = () => {
  const { logout } = useLogout();

  const handleSubmitLogout = (e) => {
    e.preventDefault();
    logout();
  };
  
  return (
    <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmitLogout}>
      Logout
    </Button>
  );
};

export default Logout;
