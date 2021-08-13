export default function FriendLy({img, message}) {
    var friendlyStyle = {
      // display: 'inline-block',
      // margin: 20,
      // height: 300,
      // width: 200,
      // padding: 0,
      // backgroundColor: "#FFF",
      // WebkitFilter: "drop-shadow(0px 0px 5px #555)",
      // filter: "drop-shadow(0px 0px 5px #555)"
    }
    return(
      <div style={friendlyStyle}>
        <Avatar img={img}/>
        <UserName name={message}/>
        {/* <GetConnected/> */}
      </div>
    );
  }

  // Avatar Component
  function Avatar(props) {
    var avatarStyle = {
      marginLeft: 12,
      width: 150,
      height: 150,
      borderRadius: "50%",
      float: 'left',
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
      marginRight: 75,
    }
    return(
      <h1 style={nameStyle}>{props.name}</h1>
    );
  }