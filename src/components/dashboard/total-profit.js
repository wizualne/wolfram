import { Box, Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const TotalProfit = (props) => {
  let differents = [];
  function compareArrays(arr1, arr2) {
    // comparing each element of array
    for (let i = 0; i < arr1.length; i++) {
      let diff = arr2[i] - arr1[i];
      differents.push(diff);
    }

    const max = Math.min(...differents);

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
              Największy spadek
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {max < 0 ? max : <>0</>}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "danger.main",
                height: 56,
                width: 56,
              }}
            >
              <ArrowDownwardIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <Typography color="textSecondary" gutterBottom variant="overline">
            {max < 0 ? props.customers[result] : <>Brak spadków</>}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
