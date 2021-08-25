import React, { Component } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  //   FormGroup,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";

export default class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.defaultValues = 2;
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item sm={12} align="center">
          <Typography component="h4" variant="h4">
            Create A Room
          </Typography>
        </Grid>
        {/* ======================== Grid 2 ========================== */}
        <Grid item sm={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of playback state</div>
            </FormHelperText>
            <RadioGroup row defaultValue="true">
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />

              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {/* ======================== Grid 3 ========================== */}
        <Grid item sm={12} align="center">
          <FormControl component="fieldset">
            <TextField
              required={true}
              type="number"
              defaultValue={this.defaultValues}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align="center">Votes to skip song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}
