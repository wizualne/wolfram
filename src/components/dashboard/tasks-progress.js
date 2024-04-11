import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect } from "react";
export const TasksProgress = (props) => {
  let differents = [];
  function compareArrays(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      let diff = arr2[i] - arr1[i];
      differents.push(diff);
    }
    const max = Math.max(...differents);
    return max;
  }

  const array1 = props.previousRate;
  const array2 = props.lastRate;
  const max = compareArrays(array1, array2);
  const result = differents.indexOf(max);

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Największy przyrost
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {max > 0 ? max : <>0</>}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <ArrowUpwardIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <Typography color="textSecondary" gutterBottom variant="overline">
            {max > 0 ? props.customers[result] : <>Brak wzrostów</>}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
