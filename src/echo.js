
  import Echo from 'laravel-echo';
  import Pusher from 'pusher-js';
  import Cookies from 'js-cookie';

  const userToken = Cookies.get('userToken');

  window.Pusher = Pusher;

  const echo= new Echo({
      broadcaster: 'pusher',
      key: 'ABCDE',
      cluster: 'mt1',
      wsHost: '127.0.0.1', //
      wsPort: 6001, //
      disableStats:true, //
      forceTLS: false , //
      authEndpoint:'http://127.0.0.1:8000/api/user',
      auth:{
      headers:{
        Authorization: `Bearer ${userToken}`,
        Accept:"application/json"
      }
      }
    
  });

  
export default echo;