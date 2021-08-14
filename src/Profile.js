export default function FriendLy({img, message}) {
    return(
      <div>
        <Avatar img={img}/>
        <UserName name={message}/>
      </div>
    );
  }

  // Avatar Component
  function Avatar(props) {
    var avatarStyle = {
      marginLeft: 12,
      marginRight: 12,
      width: 150,
      height: 150,
      borderRadius: "50%",
      position: 'relative',
      float: 'left'
    }
    return(
      <img src={props.img} alt="profile pic" style={avatarStyle}/>
    );
  }

  // UserName Component
  function UserName(props) {
    var nameStyle = {
      fontSize: 24,
      textAlign: "center",
      fontFamily: "Arial, Helvetica, sans-serif",
      float: 'center',
      marginRight: 150,
    }
    return(
      <p style={nameStyle}>{props.name}</p>
    );
  }