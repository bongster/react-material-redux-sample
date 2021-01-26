import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export interface TaskGroupFormProps {
  onSubmit?: (e: any) => void;
  onChange: (key: string, value: any) => void;
  data: TaskGroup;
}

export interface TaskGroup {
  id?: number | undefined;
  name: string | undefined;
  path: string | undefined;
  status: string | undefined;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const TaskGroupForm = ({ onSubmit, onChange, data }: TaskGroupFormProps) => {
  const classes = useStyles();
  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            className={classes.margin}
            required
            id="name"
            label="Name"
            fullWidth
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskGroupForm;
