import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

function DrawerList(props) {
    const useStyles = makeStyles((theme) => ({
      nested: {
        paddingLeft: theme.spacing(4),
      },
    }));
  
    const classes = useStyles();
  
    const handleClick = (slide) => (e) => {
      props.onSlideSelect(slide);
    };
  
    return(
      <div>
        {props.data.map((group, index) => {
          return (
            <List dense={true}>
              <ListItem>
                <ListItemText primary={group.name} />
              </ListItem>
              {group.slides.map((slide, index) => {
                return (
                  <List dense={true}>
                    <ListItem key={index} button className={classes.nested} onClick={handleClick(slide)}>
                      <ListItemText primary={slide.name} />
                    </ListItem>
                  </List>
                )
              })}
            </List>
          )
        })}
      </div>
    );
  }

  export default DrawerList;