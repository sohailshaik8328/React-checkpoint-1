import React from 'react';
import '../stylesheets/App.css';
import Activity from './Activity';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value : "",
      activities : []
    }
  }

  componentDidMount() {
    if(localStorage.activities) {
      this.setState({activities : JSON.parse(localStorage.activities) || []});
      window.addEventListener('beforeunload', this.handleLocalStorage)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLocalStorage)
  }

  handleChange = ({target}) => {
    let {value} = target;
    this.setState({value: value})
}

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.value !== "") {
      let activity = {
        activityName : this.state.value,
        activityDays : []
      }
      this.setState({
        activities : [...this.state.activities, activity],
        value : ""
      })
    }
  }

  handleClick = (event) => {
    let id = event.target.id;
    let value = event.target.value;
    let activities = this.state.activities;

    if(!activities[id].activityDays.includes(value)) {
      activities[id].activityDays.push(value);
      let activity = activities[id].activityDays;
      this.setState((prevState) => {
      let updatedActivity =  prevState.activities.map((a, i) => {
          if(i === Number(id)) {
            return {
              ... a,
              activityDays : activity
            }
          }
          return a;
        })
        return {
          activities : updatedActivity
        }
          
        
      })
    } else {
      this.setState((prevState) => {
        let index = activities[id].activityDays.findIndex(a => a === String(value));
        activities[id].activityDays.splice(index, 1);
        let activity = activities[id].activityDays;
        let updatedActivity = prevState.activities.map((a, i) => {
          if(i === Number(id)) {
            return {
              ...a,
              activityDays : activity
            }
          }
          return a;
          
        })
        return {
          activities : updatedActivity
        }
      })
    }
  }

  handleDelete = ({target}) => {
    let {id} = target;
    this.setState((prevState) => ({activities : prevState.activities.filter((a) => a !== prevState.activities[id])}))
  }

  handleLocalStorage = () => {
    localStorage.setItem("Activities", JSON.stringify(this.state.activities))
  }

  render() {
    return (
      <>
       <section>
         <div className="container">
            <div>
              <h1 className="heading">Monthly Activity Tracker!</h1>
              <form className="form" onSubmit={this.handleSubmit}>
                <input className="input" onChange={this.handleChange} value={this.state.value} placeholder="e.g. React" name="input" type="text"/>
                <button type="submit" className="input_btn">Add Activity</button> 
              </form>
            </div>

            <div>
             {
              <Activity {...this.state} handleClick = {this.handleClick} handleDelete={this.handleDelete} /> 
             }
            </div>
         </div>
       </section>
      </>
    );
  }
}



export default App;
