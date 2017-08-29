import axios from 'axios';

export async function getChannel(name) {
  const client_id = '2utooqesurkoi3fe9dkg2nmxlc2fjh';
  function getChannel(name) {
     return axios.get('https://api.twitch.tv/kraken/channels/' + name, {params: {client_id}})
  };
  function getStream(name) {
     return axios.get('https://api.twitch.tv/kraken/streams/' + name, {params: {client_id}})
  };
  return new Promise((resolve, reject) => {
    axios.all([getChannel(name), getStream(name)])
      .then(([channel, stream]) => {
        channel = channel.data;
        channel.stream = stream.data.stream;
        resolve(channel);
      });
  })
}
