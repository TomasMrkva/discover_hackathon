function FriendLy(props) {
    var friendlyStyle = {
      display: 'inline-block',
      margin: 20,
      height: 300,
      width: 200,
      padding: 0,
      backgroundColor: "#FFF",
      WebkitFilter: "drop-shadow(0px 0px 5px #555)",
      filter: "drop-shadow(0px 0px 5px #555)"
    }
    return(
      <div style={friendlyStyle}>
        <Avatar img={props.img}/>
        <UserName name={props.name}/>
        <GetConnected/>
      </div>
    );
  }

  // Avatar Component
  function Avatar(props) {
    var avatarStyle = {
      marginLeft: 27,
      marginTop: 20,
      width: 150,
      height: 150,
      borderRadius: "50%"
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
      margin: 20
    }
    return(
      <h1 style={nameStyle}>{props.name}</h1>
    );
  }

  // GetConnected Complex Component
  function GetConnected() {
    var getConnectedStyle = {
      marginLeft: 15
    }
    return(
      <div style={getConnectedStyle}>
        {/* <Like/>
        <Share/>
        <Add/> */}
      </div>
    );
  }

    var iconStyle = {
      margin: 20
    }

    // Like Component
    function Like() {
      return(
        <i className="fa fa-thumbs-o-up" aria-hidden="true" style={iconStyle}></i>
      );
    }

    // Share Component
    function Share() {
      return(
        <i className="fa fa-share" aria-hidden="true" style={iconStyle}></i>
      );
    }

    // Add Component
    function Add() {
      return(
        <i className="fa fa-users" aria-hidden="true" style={iconStyle}></i>
      );
    }

    export default function Test() {
        return(
            <div>
                <FriendLy
                name="Rob"
                img="https://pbs.twimg.com/profile_images/699422966556168193/zUm4vhAo.jpg"
                />
                <FriendLy
                name="Charles"
                img="https://static.pexels.com/photos/38630/bodybuilder-weight-training-stress-38630.jpeg"
                />
                <FriendLy
                name='Alex'
                img="https://static.pexels.com/photos/91227/pexels-photo-91227.jpeg"
                />
                <FriendLy
                name='Natalie'
                img="https://static.pexels.com/photos/509195/pexels-photo-509195.jpeg"
                />
                <FriendLy
                name='Jenny'
                img="https://static.pexels.com/photos/517061/pexels-photo-517061.jpeg"
                />
                <FriendLy
                name='Sarah'
                img="https://static.pexels.com/photos/324658/pexels-photo-324658.jpeg"
                />
                <FriendLy
                name='Josh'
                img="https://static.pexels.com/photos/428339/pexels-photo-428339.jpeg"
                />
                <FriendLy
                name='Kenny'
                img="https://static.pexels.com/photos/492954/pexels-photo-492954.jpeg"
                />
                <FriendLy
                name='John'
                img="https://static.pexels.com/photos/45882/man-crazy-funny-dude-45882.jpeg"
                />
                <FriendLy
                name='Alisha'
                img="https://static.pexels.com/photos/520293/pexels-photo-520293.jpeg"
                />
            </div>
        )
    }
     