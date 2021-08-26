import React, { Component } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";

export default class CreateRoom extends Component {
  defaultValue = 2;
  constructor(props) {
    super(props);
    this.state = {
      voteToSkip: this.defaultValue,
      guestCanPause: true,
    };
  }
  handleVotes = (e) => {
    this.setState({
      voteToSkip: parseInt(e.target.value),
    });
  };
  handleCanPause = (e) => {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  };
  handleSubmit = async () => {
    // peforms a post request using axios
    // creates a new room for the user
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/create-room/", {
        vote_to_skip: this.state.voteToSkip,
        guest_can_pause: this.state.guestCanPause,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

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
            <RadioGroup row defaultValue="true" onChange={this.handleCanPause}>
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
              onChange={this.handleVotes}
              required={true}
              type="number"
              defaultValue={this.defaultValue}
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
        {/* ======================== Grid 4 ========================== */}
        <Grid item sm={12} md={6} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleSubmit}
          >
            Create A Room
          </Button>
        </Grid>
        {/* ======================== Grid 5 ========================== */}
        <Grid item sm={12} md={6} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
