
// Exercise Roster, part 3

let pt = React.PropTypes;

// Complete the User declaration so that it works as expected!
class User extends React.Component {
  render() {
    return <p>Not yet implemented! Open up the file <code>yourcode3.js</code> and try to figure it out!</p>;
  }
  static get propTypes() {
    return {
      name: pt.string.isRequired,
      skill: pt.number.isRequired
    };
  }
}

class UserForm extends React.Component {} // copy me from the previous exercise, no change needed!


let Tester = () => <User name="John Doe" skill={3} />;

ReactDOM.render(<Tester/>,document.getElementById("target"));

