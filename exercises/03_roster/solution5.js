
// Roster part 5 solution


let pt = React.PropTypes;

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = { editing: false };
    this.startEdit = this.startEdit.bind(this);
    this.submit = this.submit.bind(this);
  }
  startEdit() {
    this.setState({ editing: true });
  }
  submit(data) {
    this.props.update(data);
    this.setState({ editing: false });
  }
  render() {
    let p = this.props;
    return this.state.editing ? <UserForm values={{name:p.name,skill:p.skill}} callback={this.submit}/> : <div>
      <p>Name: {p.name}, skill: {p.skill} <button onClick={this.startEdit}>Edit</button></p>
    </div>;
  }
  static get propTypes() {
    return {
      name: pt.string.isRequired,
      skill: pt.number.isRequired,
      update: pt.func.isRequired
    };
  }
}

class UserForm extends React.Component {
  submit() {
    this.props.callback({
      name: this.refs.name.value,
      skill: parseInt(this.refs.skill.value)
    });
  }
  render() {
    let v = this.props.values;
    return <div>
      <label htmlFor="name">Enter name: </label>
      <input name="name" type="text" ref="name" defaultValue={v.name}/>
      <br/>
      <label htmlFor="skill">Assess skill:</label>
      <input name="skill" type="range" min="1" max="10" ref="skill" defaultValue={v.skill}/>
      <br/>
      <button onClick={e=>this.submit()}>Submit</button>
    </div>
  }
  static get propTypes() {
    return {
      callback: pt.func.isRequired,
      values: pt.shape({
        name: pt.string.isRequired,
        skill: pt.number.isRequired
      }).isRequired
    }
  }
}

class Roster extends React.Component {
  constructor(props){
    super(props);
    this.state = { users: this.props.users };
    this.update = this.update.bind(this);
  }
  update(usernumber,newuserdata) {
    let updatedusers = [].concat(this.state.users); // making a copy to be nice
    updatedusers.splice(usernumber,1,newuserdata);
    this.setState({users:updatedusers});
  }
  render() {
    let users = this.state.users.map(function(u,n){
      return <User key={n} name={u.name} skill={u.skill} update={this.update.bind(this,n)} />;
    }.bind(this));
    return <div>{users}</div>;
  }
}

let userdata = [{name:"David",skill:10},{name:"Hannes",skill:8},{name:"Jacob",skill:6}];

let Tester = () => <Roster users={userdata} />;

ReactDOM.render(<Tester/>,document.getElementById("target"));



