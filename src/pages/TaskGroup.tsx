import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../components/Dashboard/Title";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect, ConnectedProps } from "react-redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import LoopIcon from "@material-ui/icons/Loop";
import PublishIcon from "@material-ui/icons/Publish";

import {
  createTaskGroups,
  getTaskGroups,
  setTaskGroup,
  uploadTaskGroupFile,
  generateTaskGroup,
} from "../redux/store/taskgroup/actions";
import { TaskGroupForm } from "../components/TaskGroup";

interface TaskGroup {
  id?: number;
  name: string;
  path: string;
  status: string;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minHeight: "80%",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const TaskGroupTable: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [taskGroup, setTaskGroup] = useState<TaskGroup>({
    name: "",
    path: "",
    status: "CREATED",
  });
  const hiddenFileInput: any = React.useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    props.createTaskGroups(taskGroup);
    setOpen(false);
  };
  const handleUploadClk = (row: TaskGroup) => {
    props.setTaskGroup(row);
    hiddenFileInput.current.click();
  };

  const handleGenerateClk = (row: TaskGroup, rowId: number) => {
    props.setTaskGroup(row);
    props.generateTaskGroup(rowId);
  };

  const fileChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    if (!fileUploaded) return;

    props.uploadTaskGroupFile(fileUploaded, props.data.id);
    alert(fileUploaded);
    // props.handleFile(fileUploaded);
  };

  const fab = {
    color: "primary",
    className: classes.fab,
    icon: <AddIcon />,
    label: "Add",
  };

  useEffect(() => {
    props.getTaskGroups();
  }, []);

  return (
    <React.Fragment>
      <Title>TaskGroups</Title>
      <Table size="small" className={classes.table}>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={fileChange}
          style={{ display: "none" }}
        />
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>path</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.list.map((row: any) => {
            const isUploaded: boolean = row.status == "UPLOADED";
            const isGenerated: boolean = row.status == "GENERATED";
            return (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.path}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell>
                  {props.isLoading && props.data.id === row.id ? (
                    <IconButton aria-label="upload" color="primary">
                      <LoopIcon />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        aria-label="upload"
                        color="primary"
                        disabled={isGenerated}
                        onClick={() => handleUploadClk(row)}
                      >
                        <CloudUploadIcon />
                      </IconButton>

                      {isUploaded && !isGenerated && (
                        <IconButton
                          aria-label="generate"
                          color="primary"
                          onClick={() => handleGenerateClk(row, row.id)}
                        >
                          <PublishIcon />
                        </IconButton>
                      )}
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* Add Add icon */}
      <Fab
        aria-label={fab.label}
        className={fab.className}
        color={fab.color as any}
        onClick={handleOpen}
      >
        {fab.icon}
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <TaskGroupForm
              data={taskGroup}
              onChange={(key, value) =>
                setTaskGroup({
                  ...taskGroup,
                  [key]: value,
                })
              }
              onSubmit={onSubmit}
            />
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    list: state.taskgroup.taskgroups,
    data: state.taskgroup.taskgroup,
    isLoading: state.taskgroup.isLoading,
  };
};

const mapDispatchToProps = {
  createTaskGroups,
  getTaskGroups,
  setTaskGroup,
  uploadTaskGroupFile,
  generateTaskGroup,
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  list: TaskGroup[];
};

const TaskGroups = (props: Props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TaskGroupTable {...props} />
      </Grid>
    </Grid>
  );
};

export default connector(TaskGroups);
