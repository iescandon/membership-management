import { Typography } from "@mui/material";

export default function Title() {
  return (
  <div className="flex justify-center items-center">
    <img src="/images/logo.png" className="h-14 pr-2" alt="LIT logo" />
    <Typography variant="h1" className="text-3xl text-white font-semibold">
      Membership Management
    </Typography>
  </div>
  );
}
