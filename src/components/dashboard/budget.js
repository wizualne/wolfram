import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoneyIcon from "@mui/icons-material/Money";
import { useEffect, useState } from "react";

export const Budget = (props) => {
  const [total, setTotal] = useState();
  const [previousTotal, setPreviousTotal] = useState();

  useEffect(() => {
    if (props.lastRate.length > 0) {
      var totalValue = props.lastRate.reduce(function (a, b) {
        return a + b;
      });
      setTotal(totalValue.toFixed(2));
    }
  }, [props.lastRate]);

  useEffect(() => {
    if (props.previousRate.length > 0) {
      var totalValue2 = props.previousRate.reduce(function (a, b) {
        return a + b;
      });
      setPreviousTotal(totalValue2.toFixed(2));
    }
  }, [props.lastRate]);

  const percentValue = 100 - (previousTotal * 100) / total;

  return (
    <>
      <Card sx={{ height: "100%" }} {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                WARTOŚĆ GIEŁDY
              </Typography>
              <Typography color="textPrimary" variant="h4">
                {total} zł
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "error.main",
                  height: 56,
                  width: 56,
                }}
              >
                <MoneyIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            {percentValue > 0 ? (
              <>
                <ArrowUpwardIcon color="success" />
                <Typography
                  color="error"
                  sx={{
                    mr: 1,
                  }}
                  variant="body2"
                ></Typography>
              </>
            ) : (
              <>
                <ArrowDownwardIcon color="error" />
                <Typography
                  color="error"
                  sx={{
                    mr: 1,
                  }}
                  variant="body2"
                />
              </>
            )}

            <Typography>{Math.abs(percentValue.toFixed(2))}% </Typography>
            <Typography color="textSecondary" variant="caption">
              Od ostatniego odczytu
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
