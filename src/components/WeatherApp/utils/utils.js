export function getIcon(weather) {
  const id = weather.id;
  const daytime = weather.icon[2];
  const rootUrl = 'http://www.clemensjanes.com/fcc-project/img/';
  var icon;
  switch (true) {
    case id < 300:
      icon = 'thunderstorm.svg';
      break;
    case id < 600:
      icon = 'rain.svg';
      break;
    case id < 700:
      icon = 'snowing.svg';
      break;
    case id === 800 && daytime === 'd':
      icon = 'sun.svg';
      break;
      case id === 800 && daytime === 'n':
        icon = 'moon.svg';
        break;
      case id < 900:
        icon = 'cloud.svg';
        break;
    default:
      icon = 'thunderstorm.svg';
  }
  return rootUrl + icon;
}
