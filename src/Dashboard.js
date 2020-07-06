import React, { useState, useContext } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from './Store';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '50px',
    padding: theme.spacing(3, 2),
  },
  flex: { display: 'flex', alignItems: 'center' },
  topicsWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey',
  },
  chatWindow: { width: '70%', height: '300px', padding: '20px' },
  chatBox: { width: '85%' },
  button: { width: '15%' },
  // chip: {},
}));

const Dashboard = () => {
  const classes = useStyles();

  // Context
  const [allChats] = useContext(Context);
  const topics = Object.keys(allChats);

  // Local
  const [textValue, setTextValue] = useState('');
  const [activeTopic, setActiveTopic] = useState(topics[0]);

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant='h4' component='h4'>
        Simple Chat App
      </Typography>
      <Typography variant='h5' component='h5'>
        {activeTopic}{' '}
      </Typography>
      <div className={classes.flex}>
        <div className={classes.topicsWindow}>
          <List>
            {topics.map((topic) => (
              <ListItem
                onClick={(e) => {
                  setActiveTopic(e.target.innerText);
                }}
                key={topic}
                button
              >
                <ListItemText primary={topic} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.chatWindow}>
          {allChats[activeTopic].map((chat, i) => (
            <div key={i} className={classes.flex}>
              <Chip label={chat.from} className={classes.chip} />
              <Typography variant='body1' gutterBottom>
                {chat.msg}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.flex}>
        <TextField
          label='Send a text'
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          className={classes.chatBox}
        />

        <Button variant='contained' color='primary'>
          Send
        </Button>
      </div>
    </Paper>
  );
};

export default Dashboard;
