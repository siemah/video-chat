var videoConnector;
var username = prompt('Your name');

/**
 * load a video connector on user device by asking permission
 * to reach and use camera and audio microphone of device
 * @param {object} status details of video connector
 */
function onVidyoClientLoaded(status) {
  console.log('vidyo service loading..', status);
  if(status.state === 'READY'){
    VC.CreateVidyoConnector({
      viewId: 'video-container',
      viewStyle: 'VIDYO_CONNECTORSTYLE_Default',
      remoteParticipants: 10,
      logFileFilter: 'error',
      logFileName: '',
      userData: '',
    })
    .then( function(vc) {
      videoConnector = vc;
      document.querySelector('#msg').innerHTML = JSON.stringify(vc)

      // console.log('create Vidyo connector successfully')
      alert('create Vidyo connector successfully')
    })
    .catch(function(err) {alert('something went wrong'+ err.message)});
  } else {
    alert('not ready yet please wait'+status.state)
  }
}
/**
 * connect to other user
 */
function connect() {
  videoConnector.Connect({
    host: "prod.vidyo.io",
    token: 'cHJvdmlzaW9uAHVzZXIxQGNiODAxOS52aWR5by5pbwA2Mzc1NDUwNzQ1NAAAMzI4YzJkMGUwZDBjNjg5NDllZGFkZDRmMDIwYzYwZjQ4NjY5ZmRlNzVkZTBjYzM0ZmJiY2VmY2RhNTcyYWQ1NGIxNjkwYTY2ZGE0MWIyYWU5YjMwZWQ1YWQ5MjJjNDE1',
    displayName: username,
    resourceId: 'mychatroom',
    onSuccess: function () {
      alert('success connecting')
    },
    onFailure: function (reason) {
      console.error(reason);
      document.querySelector('#msg').innerHTML = JSON.stringify(reason)
    },
    onDisconnected: function (reason) {
      alert('user has discounnected', reason)
    }
  });
}